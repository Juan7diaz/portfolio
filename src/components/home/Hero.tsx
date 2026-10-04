import Link from 'next/link';
import React from 'react';
import cv from '@/data/cv.json';
import LocalTime from '@/components/ui/LocalTime';
import { container } from '@/lib/styles';

// Retraso (ms) de cada pieza, encadenado tras la cortina del preloader
const d = (ms: number) => ({ animationDelay: `${ms}ms` });

function Hero() {
  const { profile, experience, education } = cv;
  const work = experience.filter((e) => e.type === 'work');
  const firstWorkYear = Math.min(...work.map((e) => Number(e.startDate)));
  const years = Math.max(1, new Date().getFullYear() - firstWorkYear);
  const current = work.find((e) => e.endDate === 'Presente') ?? work[0];
  const [edu] = education;

  const summary = profile.summary.replace('{years}', String(years));

  const strip = [
    profile.location.replace(', Magdalena', ''),
    edu &&
      `${edu.instituteName.replace('Universidad', 'Univ.')} '${edu.endDate.slice(-2)}`,
  ].filter(Boolean) as string[];

  return (
    <section
      id="inicio"
      className={`${container} relative flex min-h-[100svh] flex-col pb-10 pt-28 md:pt-24`}
    >
      <div className="my-auto">
        <div>
          {edu && (
            <p
              className="label await-ready flex animate-fade-up items-center gap-2 text-accent before:h-px before:w-5 before:bg-accent"
              style={d(100)}
            >
              {edu.degree}
            </p>
          )}

          <h1 className="mt-5 font-serif text-[clamp(44px,6.4vw,84px)] font-light leading-[1.02] tracking-[-0.02em]">
            <span className="block overflow-hidden pb-[0.06em]">
              <span
                className="await-ready inline-block animate-line-up"
                style={d(180)}
              >
                {profile.name}
              </span>
            </span>
          </h1>

          {current && (
            <p
              className="await-ready mt-4 animate-fade-up text-[17px] font-light text-text-secondary md:text-[20px]"
              style={d(320)}
            >
              Desarrollador frontend en{' '}
              {current.url ? (
                <a
                  href={current.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link text-text-primary"
                >
                  <span className="link-draw pb-0.5">{current.company}</span>
                  <span
                    aria-hidden
                    className="ml-1 inline-block text-[0.8em] text-accent transition-transform duration-500 ease-spring group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                  >
                    ↗
                  </span>
                </a>
              ) : (
                <span className="text-text-primary">{current.company}</span>
              )}
            </p>
          )}

          <p
            className="await-ready mt-4 max-w-[560px] animate-fade-up text-[15px] font-light leading-[1.7] text-text-secondary md:text-[16px]"
            style={d(400)}
          >
            {summary}
          </p>

          <p
            className="await-ready mt-5 flex animate-fade-up flex-wrap gap-x-2 gap-y-1 font-mono text-[11px] tracking-[0.06em] text-text-tertiary"
            style={d(480)}
          >
            {profile.stack.map((tech, i) => (
              <React.Fragment key={tech}>
                {i > 0 && <span aria-hidden>·</span>}
                <span className="whitespace-nowrap">{tech}</span>
              </React.Fragment>
            ))}
          </p>

          <div
            className="await-ready mt-9 flex animate-fade-up flex-wrap items-center gap-x-6 gap-y-4"
            style={d(580)}
          >
            <Link href="#proyectos" className="pill group">
              Ver proyectos
              <span
                aria-hidden
                className="transition-transform duration-500 ease-spring group-hover:translate-y-0.5"
              >
                ↓
              </span>
            </Link>
            <a
              href={cv.contact.cv.value}
              download
              className="group font-mono text-[11px] tracking-[0.06em] text-text-secondary transition-colors duration-300 hover:text-text-primary"
            >
              <span className="link-draw pb-0.5">Descargar CV</span>
              <span
                aria-hidden
                className="ml-1.5 inline-block text-accent transition-transform duration-500 ease-spring group-hover:translate-y-0.5"
              >
                ↓
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Franja de datos */}
      <div
        className="await-ready mt-14 flex animate-fade-up flex-col items-start gap-x-3 gap-y-2 border-t border-line pt-6 font-mono text-[10px] tracking-[0.04em] text-text-secondary md:flex-row md:flex-wrap md:items-center md:justify-between md:text-[11px]"
        style={d(760)}
      >
        {strip.map((item) => (
          <React.Fragment key={item}>
            <span>{item}</span>
            <span
              aria-hidden
              className="hidden h-[3px] w-[3px] rounded-full bg-line-strong md:block"
            />
          </React.Fragment>
        ))}
        <span>
          <LocalTime className="text-accent" />
          <span className="text-text-tertiary"> COT</span>
        </span>
        {profile.openToWork && (
          <>
            <span
              aria-hidden
              className="hidden h-[3px] w-[3px] rounded-full bg-line-strong md:block"
            />
            <span className="flex items-center gap-1.5 text-accent">
              <span className="h-[5px] w-[5px] animate-soft-pulse rounded-full bg-accent" />
              Disponible
            </span>
          </>
        )}
      </div>

      {/* Indicador de scroll vertical */}
      <div
        aria-hidden
        className="await-ready absolute bottom-36 left-3 hidden animate-fade-in items-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.15em] text-text-tertiary [writing-mode:vertical-rl] xl:flex"
        style={d(1100)}
      >
        Scroll
        <span className="block h-7 w-px animate-scroll-line bg-text-tertiary" />
      </div>
    </section>
  );
}

export default Hero;
