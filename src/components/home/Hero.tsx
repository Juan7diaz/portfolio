import Link from 'next/link';
import React from 'react';
import cv from '@/data/cv.json';
import getAllFiles from '@/utils/getAllFiles';
import CountUp from '@/components/ui/CountUp';
import LocalTime from '@/components/ui/LocalTime';
import { container } from '@/lib/styles';

const lines: React.ReactNode[] = [
  'Construyo',
  'experiencias',
  <em key="em" className="italic text-accent">
    digitales
  </em>,
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
      <div className="my-auto grid gap-10 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
        <div>
          <p
            className="label await-ready flex animate-fade-up items-center gap-2 text-accent before:h-px before:w-5 before:bg-accent"
            style={d(100)}
          >
            {profile.headline}
          </p>

          <h1 className="mt-5 font-serif text-[clamp(42px,6.2vw,88px)] font-light leading-[1.04] tracking-[-0.02em]">
            {lines.map((line, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <span key={i} className="block overflow-hidden pb-[0.06em]">
                <span
                  className="await-ready inline-block animate-line-up"
                  style={d(180 + i * 120)}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="await-ready mt-5 max-w-[400px] animate-fade-up text-[14px] font-light leading-[1.7] text-text-secondary"
            style={d(520)}
          >
            <span className="text-text-primary">{profile.name}</span> —{' '}
            {profile.intro}
          </p>

          <div
            className="await-ready mt-8 flex animate-fade-up flex-wrap items-center gap-x-6 gap-y-4"
            style={d(640)}
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
          style={d(760)}
        >
          {stats.map((s, i) => (
            <div key={s.label} className="group text-left md:text-center">
              <p className="font-serif text-[clamp(30px,3.4vw,40px)] font-light leading-none text-text-primary">
                <CountUp value={s.value} delay={i * 120} />
                <span className="inline-block text-accent transition-transform duration-500 ease-spring group-hover:-translate-y-1 group-hover:rotate-90">
                  +
                </span>
              </p>
              <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-text-tertiary">
                {s.label}
              </p>
            </div>
          ))}
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
