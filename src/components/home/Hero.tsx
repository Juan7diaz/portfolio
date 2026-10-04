import Link from 'next/link';
import React from 'react';
import cv from '@/data/cv.json';
import getAllFiles from '@/utils/getAllFiles';
import CountUp from '@/components/ui/CountUp';
import LocalTime from '@/components/ui/LocalTime';
import { container } from '@/lib/styles';

const handles = [
  '-left-[3.5px] -top-[3.5px]',
  '-right-[3.5px] -top-[3.5px]',
  '-bottom-[3.5px] -left-[3.5px]',
  '-bottom-[3.5px] -right-[3.5px]',
];

// Retraso (ms) de cada pieza, encadenado tras la cortina del preloader
const d = (ms: number) => ({ animationDelay: `${ms}ms` });

function Hero() {
  const { profile, experience, education } = cv;
  const work = experience.filter((e) => e.type === 'work');
  const firstWorkYear = Math.min(...work.map((e) => Number(e.startDate)));
  const years = Math.max(1, new Date().getFullYear() - firstWorkYear);
  const current = work.find((e) => e.endDate === 'Presente') ?? work[0];
  const [edu] = education;

  const stats = [
    { value: years, label: 'Años exp.' },
    { value: getAllFiles('projects').length, label: 'Proyectos' },
    { value: cv.skill.length, label: 'Tecnologías' },
  ];

  const strip = [
    profile.location.replace(', Magdalena', ''),
    current && `${current.company} — ${current.role}`,
    edu &&
      `${edu.instituteName.replace('Universidad', 'Univ.')} '${edu.endDate.slice(-2)}`,
  ].filter(Boolean) as string[];

  return (
    <section
      id="inicio"
      className={`${container} relative flex min-h-[100svh] flex-col pb-10 pt-28 md:pt-24`}
    >
      <div className="my-auto">
        <p
          className="label await-ready flex animate-fade-up items-center gap-2 text-accent before:h-px before:w-5 before:bg-accent"
          style={d(100)}
        >
          {profile.headline}
          <span className="text-text-tertiary">
            · {profile.location.split(',')[0]}, CO
          </span>
        </p>

        <h1 className="mt-6 font-serif text-[clamp(60px,16vw,184px)] font-light leading-[0.94] tracking-[-0.035em]">
          <span
            className="await-ready block animate-line-mask pb-[0.04em]"
            style={d(180)}
          >
            <span
              className="await-ready inline-block animate-line-up"
              style={d(180)}
            >
              De {/* "Figma" seleccionado como en la herramienta de diseño */}
              <span className="group/figma relative inline-block">
                <em className="italic text-accent">Figma</em>
                <span
                  aria-hidden
                  className="await-ready pointer-events-none absolute -inset-x-[0.06em] -bottom-[0.2em] top-[0.16em] animate-frame-in border border-accent/60 transition-colors duration-300 group-hover/figma:border-accent"
                  style={d(1150)}
                >
                  {handles.map((pos, i) => (
                    <span
                      key={pos}
                      className={`await-ready absolute h-[7px] w-[7px] animate-handle-in border border-accent bg-background transition-transform duration-300 group-hover/figma:scale-125 ${pos}`}
                      style={d(1250 + i * 60)}
                    />
                  ))}
                  <span
                    className="await-ready absolute -top-[22px] left-[-1px] hidden animate-fade-in whitespace-nowrap bg-accent px-1.5 py-[3px] font-mono text-[9px] font-medium not-italic leading-none tracking-[0.04em] text-background md:block"
                    style={d(1450)}
                  >
                    Frame · Hero
                  </span>
                  <span
                    className="await-ready absolute -bottom-[22px] right-[-1px] hidden animate-fade-in whitespace-nowrap bg-accent px-1.5 py-[3px] font-mono text-[9px] font-medium not-italic leading-none tracking-[0.04em] text-background md:block"
                    style={d(1500)}
                  >
                    1440 × 900
                  </span>
                </span>
              </span>
            </span>
          </span>
          <span
            className="await-ready block animate-line-mask pb-[0.06em] md:pl-[11%]"
            style={d(300)}
          >
            <span
              className="await-ready inline-block animate-line-up"
              style={d(300)}
            >
              a producción<span className="text-accent">.</span>
            </span>
          </span>
        </h1>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
          <div>
            <p
              className="await-ready max-w-[460px] animate-fade-up text-[14px] font-light leading-[1.7] text-text-secondary md:text-[15px]"
              style={d(560)}
            >
              <span className="text-text-primary">{profile.name}</span> —{' '}
              {profile.intro}
            </p>

            <div
              className="await-ready mt-8 flex animate-fade-up flex-wrap items-center gap-x-6 gap-y-4"
              style={d(680)}
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

          <div
            className="await-ready flex animate-fade-up gap-8 md:gap-10"
            style={d(800)}
          >
            {stats.map((st, i) => (
              <div key={st.label} className="group text-left md:text-center">
                <p className="font-serif text-[clamp(30px,3.4vw,40px)] font-light leading-none text-text-primary">
                  <CountUp value={st.value} delay={i * 120} />
                  <span className="inline-block text-accent transition-transform duration-500 ease-spring group-hover:-translate-y-1 group-hover:rotate-90">
                    +
                  </span>
                </p>
                <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-text-tertiary">
                  {st.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Franja de datos */}
      <div
        className="await-ready mt-14 flex animate-fade-up flex-col items-start gap-x-3 gap-y-2 border-t border-line pt-6 font-mono text-[10px] tracking-[0.04em] text-text-secondary md:flex-row md:flex-wrap md:items-center md:justify-between md:text-[11px]"
        style={d(880)}
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
