import Link from 'next/link';
import { ProjectFrontmatter } from '@/interfaces/ProjectFrontmatter.interface';

const d = (ms: number) => ({ animationDelay: `${ms}ms` });

function ProjectHeader({ data }: { data: ProjectFrontmatter }) {
  const specs = [
    { label: 'Rol', value: data.role },
    { label: 'Fecha', value: data.date },
    { label: 'Tipo', value: data.type },
    { label: 'Stack', value: `${data.technologies?.length ?? 0} tecnologías` },
  ];

  return (
    <header className="pt-32 md:pt-40">
      <Link
        href="/#proyectos"
        className="await-ready group inline-flex animate-fade-up items-center gap-2 font-mono text-[11px] tracking-[0.06em] text-text-secondary transition-colors duration-300 hover:text-text-primary"
        style={d(80)}
      >
        <span
          aria-hidden
          className="text-accent transition-transform duration-500 ease-spring group-hover:-translate-x-1"
        >
          ←
        </span>
        <span className="link-draw pb-0.5">Todos los proyectos</span>
      </Link>

      <p
        className="label await-ready mt-12 flex animate-fade-up items-center gap-2 text-accent before:h-px before:w-5 before:bg-accent"
        style={d(140)}
      >
        {data.label ?? data.type}
      </p>

      <h1 className="mt-5 font-serif text-[clamp(40px,6vw,80px)] font-light leading-[1.04] tracking-[-0.02em]">
        <span className="block overflow-hidden pb-[0.06em]">
          <span
            className="await-ready inline-block animate-line-up"
            style={d(200)}
          >
            {data.name}
          </span>
        </span>
      </h1>

      <p
        className="await-ready mt-5 max-w-2xl animate-fade-up text-[15px] font-light leading-[1.7] text-text-secondary md:text-base"
        style={d(320)}
      >
        {data.summary ?? data.resumen}
      </p>

      <dl
        className="await-ready mt-12 grid animate-fade-up grid-cols-2 gap-6 border-t border-line pt-6 md:grid-cols-4"
        style={d(420)}
      >
        {specs.map((s) => (
          <div key={s.label}>
            <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-text-tertiary">
              {s.label}
            </dt>
            <dd className="mt-1.5 font-serif text-[19px] leading-tight text-text-primary">
              {s.value}
            </dd>
          </div>
        ))}
      </dl>

      <div
        className="await-ready mt-8 flex animate-fade-up flex-col gap-6 md:flex-row md:items-center md:justify-between"
        style={d(500)}
      >
        {data.technologies?.length > 0 && (
          <ul className="flex flex-wrap gap-1.5" aria-label="Tecnologías">
            {data.technologies.map((t) => (
              <li
                key={t}
                className="cursor-default border border-line px-2.5 py-1 font-mono text-[9px] tracking-[0.04em] text-text-secondary transition-colors duration-200 hover:border-accent hover:text-text-primary"
              >
                {t}
              </li>
            ))}
          </ul>
        )}
        {data.github && (
          <a
            href={data.github}
            target="_blank"
            rel="noopener noreferrer"
            className="pill group shrink-0 self-start md:self-auto"
          >
            Ver código
            <span
              aria-hidden
              className="transition-transform duration-500 ease-spring group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            >
              ↗
            </span>
          </a>
        )}
      </div>
    </header>
  );
}

export default ProjectHeader;
