import type { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import getFrontmatter from '@/utils/getFrontmatter';
import getProjects from '@/utils/getProjects';
import MarkdownComponents from '@/components/common/MarkdownComponents';
import ProjectFooter from '@/components/Project/ProjectFooter';
import ProjectHeader from '@/components/Project/ProjectHeader';
import { ProjectFrontmatter } from '@/interfaces/ProjectFrontmatter.interface';
import Carousel from '@/components/common/Carousel';
import Reveal from '@/components/ui/Reveal';
import { container } from '@/lib/styles';
import JsonLd from '@/components/common/JsonLd';
import cv from '@/data/cv.json';
import { absolute, siteUrl } from '@/lib/site';

type Params = { params: { project: string } };

// Resumen + stack principal, sin pasar de ~160 caracteres
const projectDescription = (data: ProjectFrontmatter) => {
  const base = (data.summary ?? data.resumen).trim();
  const stack = data.technologies?.slice(0, 3).join(', ');
  const full = stack ? `${base} Hecho con ${stack}.` : base;
  return full.length <= 160 ? full : base;
};

export function generateStaticParams() {
  return getProjects().map((p) => ({ project: p.fileName }));
}

export function generateMetadata({ params }: Params): Metadata {
  const { data } = getFrontmatter<ProjectFrontmatter>(
    params.project,
    'projects',
  );
  const description = projectDescription(data);
  const url = `/project/${data.fileName}`;
  return {
    title: data.name,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      siteName: cv.profile.name,
      locale: 'es_CO',
      title: data.name,
      description,
      images: [{ url: data.coverImage, alt: data.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.name,
      description,
      images: [data.coverImage],
    },
  };
}

function ProjectPage({ params }: Params) {
  const { content, data } = getFrontmatter<ProjectFrontmatter>(
    params.project,
    'projects',
  );

  const projects = getProjects();
  const current = projects.findIndex((p) => p.fileName === data.fileName);
  const next =
    projects.length > 1 ? projects[(current + 1) % projects.length] : undefined;

  const url = absolute(`/project/${data.fileName}`);
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': `${url}#project`,
        name: data.name,
        headline: data.name,
        description: projectDescription(data),
        url,
        image: data.carouselImages?.map((src) => absolute(src)),
        inLanguage: 'es-CO',
        genre: data.label,
        keywords: data.technologies?.join(', '),
        author: { '@id': `${siteUrl}/#person` },
        creator: {
          '@type': 'Person',
          '@id': `${siteUrl}/#person`,
          name: cv.profile.name,
          url: siteUrl,
        },
        ...(data.github && { codeRepository: data.github }),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Proyectos',
            item: `${siteUrl}/#proyectos`,
          },
          { '@type': 'ListItem', position: 3, name: data.name, item: url },
        ],
      },
    ],
  };

  return (
    <div className={container}>
      <JsonLd data={schema} />
      <ProjectHeader data={data} />
      <Reveal delay={360} className="mx-auto max-w-[880px]">
        <Carousel imgs={data.carouselImages} alt={data.name} />
      </Reveal>
      <article className="mx-auto max-w-[720px]">
        <ReactMarkdown components={MarkdownComponents as any}>
          {content}
        </ReactMarkdown>
      </article>
      <ProjectFooter next={next} />
    </div>
  );
}

export default ProjectPage;
