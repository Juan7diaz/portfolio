'use client';

import Link from 'next/link';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { seeded } from '@/lib/ready';
import { playStep } from '@/lib/sound';

export interface WheelProject {
  slug: string;
  name: string;
  label: string;
  role: string;
  date: string;
  summary: string;
  tags: string[];
  github?: string;
}

const R = 49; // radio del arco en el viewBox 0-100
const CIRC = 2 * Math.PI * R;
const SWAP_MS = 260;

const pad = (n: number) => String(n).padStart(2, '0');
const mod = (n: number, m: number) => ((n % m) + m) % m;

function ProjectWheel({ projects }: { projects: WheelProject[] }) {
  const total = projects.length;
  // `step` es acumulativo para que la rueda gire siempre por el camino corto
  const [step, setStep] = useState(0);
  const [shown, setShown] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const touch = useRef<number | null>(null);

  const index = mod(step, total);
  const rotation = -(step / total) * 360;
  const p = projects[shown];

  // Transición del panel: sale, cambia el contenido y vuelve a entrar
  useEffect(() => {
    if (index === shown) return undefined;
    setLeaving(true);
    const t = window.setTimeout(() => {
      setShown(index);
      setLeaving(false);
    }, SWAP_MS);
    return () => window.clearTimeout(t);
  }, [index, shown]);

  // Nota de la escala según el proyecto al que se llega (no en el montaje)
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    playStep(index);
  }, [index]);

  const go = useCallback((delta: number) => setStep((s) => s + delta), []);

  const goTo = (i: number) => {
    setStep((s) => {
      const cur = mod(s, total);
      let delta = i - cur;
      if (delta > total / 2) delta -= total;
      if (delta < -total / 2) delta += total;
      return s + delta;
    });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      go(1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      go(-1);
    }
  };

  // Puntos decorativos con semilla (idénticos en servidor y cliente)
  const deco = useMemo(() => {
    const rnd = seeded(7);
    return Array.from({ length: 8 }, (_, i) => {
      const a = ((i / 8) * 360 + 15) * (Math.PI / 180);
      const r = 38 + rnd() * 18;
      return {
        left: 50 + r * Math.cos(a),
        top: 50 + r * Math.sin(a),
        size: 4 + rnd() * 5,
        opacity: 0.15 + rnd() * 0.2,
      };
    });
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onKeyDown={onKeyDown}
      className="relative grid items-center gap-0 md:min-h-[500px] md:grid-cols-2 md:gap-16"
    >
      {/* ── Rueda ── */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 w-full max-w-[300px] -translate-x-1/2 -translate-y-1/2 opacity-[0.14] md:pointer-events-auto md:relative md:left-auto md:top-auto md:mx-auto md:max-w-[420px] md:translate-x-0 md:translate-y-0 md:opacity-100">
        <div data-thread="orbit" className="relative aspect-square w-full">
          <div className="absolute inset-0 rounded-full border border-line" />
          <div className="absolute inset-[15%] rounded-full border border-line" />

          {/* Marcas tipo bisel */}
          <svg
            viewBox="0 0 100 100"
            aria-hidden
            className="absolute inset-0 h-full w-full"
          >
            {Array.from({ length: 60 }, (_, i) => {
              const a = (i / 60) * Math.PI * 2;
              const long = i % 5 === 0;
              const r1 = 46.2;
              const r2 = long ? 44.2 : 45.2;
              return (
                <line
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  x1={50 + r1 * Math.cos(a)}
                  y1={50 + r1 * Math.sin(a)}
                  x2={50 + r2 * Math.cos(a)}
                  y2={50 + r2 * Math.sin(a)}
                  stroke={
                    long ? 'rgb(var(--c-line-strong))' : 'rgb(var(--c-line))'
                  }
                  strokeWidth={0.3}
                />
              );
            })}
          </svg>

          {/* Arco de progreso */}
          <svg
            viewBox="0 0 100 100"
            aria-hidden
            className="absolute -inset-[2px] h-[calc(100%+4px)] w-[calc(100%+4px)] -rotate-90"
          >
            <circle
              cx="50"
              cy="50"
              r={R}
              fill="none"
              stroke="rgb(var(--c-accent))"
              strokeWidth={0.7}
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={CIRC - ((index + 1) / total) * CIRC}
              className="transition-[stroke-dashoffset] duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
            />
          </svg>

          {/* Capa giratoria: puntos + etiquetas */}
          <div
            className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {deco.map((dot, i) => (
              <span
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                aria-hidden
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
                style={{
                  left: `${dot.left}%`,
                  top: `${dot.top}%`,
                  width: dot.size,
                  height: dot.size,
                  opacity: dot.opacity,
                }}
              />
            ))}

            {projects.map((proj, i) => {
              const a = ((i / total) * 360 - 90) * (Math.PI / 180);
              const isActive = i === index;
              return (
                <React.Fragment key={proj.slug}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    data-sound="custom"
                    data-sound-hover
                    aria-label={`Ver ${proj.name}`}
                    aria-pressed={isActive}
                    className="group/dot absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                    style={{
                      left: `${50 + 50 * Math.cos(a)}%`,
                      top: `${50 + 50 * Math.sin(a)}%`,
                    }}
                  >
                    <span
                      className={`block rounded-full bg-accent transition-all duration-500 ease-out-quint ${
                        isActive
                          ? 'h-4 w-4 opacity-100 shadow-[0_0_0_4px_rgb(var(--c-accent)/0.2)]'
                          : 'h-3 w-3 opacity-30 group-hover/dot:scale-125 group-hover/dot:opacity-80'
                      }`}
                    />
                  </button>
                  <span
                    aria-hidden
                    className={`absolute hidden whitespace-nowrap font-serif italic transition-[color,font-size] duration-500 md:block ${
                      isActive
                        ? 'text-[17px] text-text-primary'
                        : 'text-[15px] text-text-tertiary'
                    }`}
                    style={{
                      left: `${50 + 62 * Math.cos(a)}%`,
                      top: `${50 + 62 * Math.sin(a)}%`,
                      // Contrarrota para que el texto quede siempre derecho
                      transform: `translate(-50%, -50%) rotate(${-rotation}deg)`,
                      transition:
                        'transform 900ms cubic-bezier(0.65,0,0.35,1), color 500ms, font-size 500ms',
                    }}
                  >
                    {proj.label}
                  </span>
                </React.Fragment>
              );
            })}
          </div>

          {/* Centro: número estilo odómetro */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="block font-mono text-[11px] tracking-[0.08em] text-text-tertiary">
              Proyecto
            </span>
            <span className="block h-[52px] overflow-hidden font-serif text-[48px] font-light lining-nums leading-[52px] text-text-primary">
              <span key={index} className="block animate-line-up">
                {pad(index + 1)}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* ── Detalle ── */}
      <div
        className="relative z-[2] py-10 text-center md:py-0 md:text-left"
        onTouchStart={(e) => {
          touch.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touch.current === null) return;
          const dx = e.changedTouches[0].clientX - touch.current;
          touch.current = null;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        }}
      >
        <div
          aria-live="polite"
          className={`transition-[opacity,transform] duration-500 ease-smooth ${
            leaving ? 'translate-x-5 opacity-0' : 'translate-x-0 opacity-100'
          }`}
        >
          <p className="mb-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
            <span className="text-[6px]">●</span>
            {p.label}
          </p>
          <h3 className="mb-1.5 font-serif text-[clamp(28px,4vw,44px)] font-normal leading-[1.15]">
            {p.name}
          </h3>
          <p className="mb-4 font-mono text-[11px] tracking-[0.06em] text-text-secondary">
            {p.role} · {p.date}
          </p>
          <p className="mx-auto mb-5 max-w-[420px] text-[14px] font-light leading-[1.7] text-text-secondary md:mx-0">
            {p.summary}
          </p>
          <ul
            key={shown}
            className="mb-6 flex flex-wrap justify-center gap-1.5 md:justify-start"
            aria-label="Tecnologías"
          >
            {p.tags.map((t, i) => (
              <li
                key={t}
                className="animate-fade-up cursor-default border border-line px-2.5 py-1 font-mono text-[9px] tracking-[0.04em] text-text-secondary transition-colors duration-200 hover:border-accent hover:text-text-primary"
                style={{ animationDelay: `${i * 35}ms` }}
              >
                {t}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap justify-center gap-3 md:justify-start">
            <Link href={`/project/${encodeURI(p.slug)}`} className="pill group">
              Ver proyecto
              <span
                aria-hidden
                className="transition-transform duration-500 ease-spring group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="pill group"
              >
                GitHub
                <span
                  aria-hidden
                  className="transition-transform duration-500 ease-spring group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                >
                  ↗
                </span>
              </a>
            )}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 md:justify-start">
          {[
            { d: -1, label: 'Proyecto anterior', icon: '←' },
            { d: 1, label: 'Proyecto siguiente', icon: '→' },
          ].map((b) => (
            <button
              key={b.d}
              type="button"
              onClick={() => go(b.d)}
              data-sound="custom"
              data-sound-hover
              aria-label={b.label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-base text-text-primary transition-[background-color,color,transform] duration-300 hover:bg-text-primary hover:text-background active:scale-90"
            >
              {b.icon}
            </button>
          ))}
          <span className="ml-3 font-mono text-[11px] tabular-nums tracking-[0.08em] text-text-tertiary">
            <span className="text-text-primary">{pad(index + 1)}</span> /{' '}
            {pad(total)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProjectWheel;
