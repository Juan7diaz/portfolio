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

type Params = { params: { project: string } };

export function generateStaticParams() {
  return getProjects().map((p) => ({ project: p.fileName }));
}

export function generateMetadata({ params }: Params): Metadata {
  const { data } = getFrontmatter<ProjectFrontmatter>(
    params.project,
    'projects',
  );
  return {
    title: data.name,
    description: data.resumen,
    openGraph: { images: [data.coverImage] },
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

  return (
    <div className={container}>
      <ProjectHeader data={data} />
      <Reveal delay={360}>
        <Carousel imgs={data.carouselImages} alt={data.name} />
      </Reveal>
      <article className="mx-auto max-w-[692px]">
        <ReactMarkdown components={MarkdownComponents as any}>
          {content}
        </ReactMarkdown>
      </article>
      <ProjectFooter next={next} />
    </div>
  );
}

export default ProjectPage;
