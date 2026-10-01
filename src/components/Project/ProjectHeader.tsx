import Image from 'next/image';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import { IoChevronBack } from 'react-icons/io5';
import cv from '@/data/cv.json';
import { ProjectFrontmatter } from '@/interfaces/ProjectFrontmatter.interface';
import Reveal from '@/components/ui/Reveal';
import { btnSecondary } from '@/lib/styles';

function ProjectHeader({ data }: { data: ProjectFrontmatter }) {
  const specs = [
    { label: 'Rol', value: data.role },
    { label: 'Fecha', value: data.date },
    { label: 'Tipo', value: data.type },
  ];

  return (
    <header className="pt-[calc(var(--nav-height)+40px)] md:pt-[calc(var(--nav-height)+64px)]">
      <Reveal>
        <Link
          href="/#proyectos"
          className="group -ml-1 inline-flex items-center gap-1 rounded-full px-1 py-1 text-[15px] text-accent"
        >
          <IoChevronBack
            aria-hidden
            className="transition-transform duration-500 ease-spring group-hover:-translate-x-1"
          />
          <span className="group-hover:underline group-hover:underline-offset-4">
            Todos los proyectos
          </span>
        </Link>
      </Reveal>

      <Reveal delay={60}>
        <p className="eyebrow mt-10">{data.type}</p>
      </Reveal>
      <Reveal delay={120}>
        <h1 className="mt-3 text-[40px] font-semibold leading-[1.04] tracking-tightest text-text-primary md:text-[72px]">
          {data.name}
        </h1>
      </Reveal>
      <Reveal delay={180}>
        <p className="mt-5 max-w-3xl text-xl leading-snug tracking-tight text-text-secondary md:text-2xl">
          {data.resumen}
        </p>
      </Reveal>

      <Reveal delay={240}>
        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-hairline pt-6 md:grid-cols-4">
          <div className="col-span-2 flex items-center gap-3 md:col-span-1">
            <Image
              src={cv.profile.avatarLink}
              alt={`Foto de ${cv.profile.name}`}
              width={80}
              height={80}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <dt className="text-xs text-text-tertiary">Autor</dt>
              <dd className="text-sm font-medium text-text-primary">
                {cv.profile.name}
              </dd>
            </div>
          </div>
          {specs.map((s) => (
            <div key={s.label}>
              <dt className="text-xs text-text-tertiary">{s.label}</dt>
              <dd className="mt-0.5 text-sm font-medium text-text-primary">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal delay={300}>
        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {data.technologies?.length > 0 && (
            <ul className="flex flex-wrap gap-1.5" aria-label="Tecnologías">
              {data.technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-white/[0.06] bg-white/[0.04] px-3 py-1 text-xs text-text-secondary"
                >
                  {tech}
                </li>
              ))}
            </ul>
          )}
          {data.github && (
            <a
              href={data.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnSecondary} shrink-0 self-start md:self-auto`}
            >
              <FaGithub aria-hidden />
              Ver código
              <FiArrowUpRight
                aria-hidden
                className="text-text-tertiary transition-transform duration-500 ease-spring group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          )}
        </div>
      </Reveal>
    </header>
  );
}

export default ProjectHeader;
