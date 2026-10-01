import Image from 'next/image';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { IoChevronForward } from 'react-icons/io5';
import { ProjectFrontmatter } from '@/interfaces/ProjectFrontmatter.interface';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { iconButton } from '@/lib/styles';

const MAX_TAGS = 5;

function ProjectCard({
  project,
  featured = false,
}: {
  project: ProjectFrontmatter;
  featured?: boolean;
}) {
  const url = `/project/${encodeURI(project.fileName)}`;
  const tags = project.technologies ?? [];
  const hidden = tags.length - MAX_TAGS;

  return (
    <SpotlightCard
      className={`group h-full overflow-hidden rounded-[28px] border border-white/[0.06] bg-surface transition-[transform,box-shadow,background-color] duration-700 ease-out-expo hover:-translate-y-1.5 hover:bg-surface-raised hover:shadow-[0_40px_80px_-30px_rgba(41,151,255,0.28)] ${
        featured ? 'md:grid md:grid-cols-[1.25fr_1fr]' : 'flex flex-col'
      }`}
    >
      {/* Enlace que cubre toda la tarjeta */}
      <Link
        href={url}
        className="absolute inset-0 z-[3] rounded-[28px]"
        aria-label={`Ver proyecto ${project.name}`}
      />

      <div
        className={`relative overflow-hidden bg-surface-raised ${
          featured
            ? 'aspect-[16/10] md:aspect-auto md:min-h-[360px]'
            : 'aspect-[16/10]'
        }`}
      >
        <Image
          src={project.coverImage}
          alt={`Captura de ${project.name}`}
          fill
          sizes={
            featured
              ? '(min-width: 768px) 560px, 100vw'
              : '(min-width: 768px) 480px, 100vw'
          }
          className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-30" />
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-text-tertiary">
          {project.type} · {project.date}
        </p>
        <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-text-primary md:text-[28px]">
          {project.name}
        </h3>
        <p className="mt-3 leading-relaxed text-text-secondary">
          {project.resumen}
        </p>

        {tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tecnologías">
            {tags.slice(0, MAX_TAGS).map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-white/[0.06] bg-white/[0.04] px-2.5 py-1 text-xs text-text-secondary transition-colors duration-500 group-hover:border-white/10"
              >
                {tech}
              </li>
            ))}
            {hidden > 0 && (
              <li className="rounded-full px-2 py-1 text-xs text-text-tertiary">
                +{hidden}
              </li>
            )}
          </ul>
        )}

        <div className="mt-auto flex items-center justify-between pt-7">
          <span className="inline-flex items-center gap-1 text-[15px] font-medium text-accent">
            Ver proyecto
            <IoChevronForward
              aria-hidden
              size={14}
              className="transition-transform duration-500 ease-spring group-hover:translate-x-1"
            />
          </span>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Código de ${project.name} en GitHub`}
              title="Ver código en GitHub"
              className={`${iconButton} relative z-[4] h-10 w-10`}
            >
              <FaGithub size={17} aria-hidden />
            </a>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}

export default ProjectCard;
