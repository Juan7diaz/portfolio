'use client';

import { useEffect, useState } from 'react';
import cv from '@/data/cv.json';
import { play } from '@/lib/sound';

const KEY = 'jdg-preloaded';
const HOLD = 1900; // ms hasta que la barra termina
const EXIT = 900; // ms de la cortina subiendo

// Cortina de entrada: nombre, barra de carga y porcentaje.
// Solo aparece en la primera visita de la sesión.
function Preloader() {
  const [phase, setPhase] = useState<'loading' | 'exit' | 'done'>('loading');
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const html = document.documentElement;
    if (html.hasAttribute('data-preloaded')) {
      setPhase('done');
      return undefined;
    }

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    // Sonido solo si el navegador ya permite audio (antes de interactuar
    // suele estar bloqueado y simplemente no suena)
    const swell = window.setTimeout(() => play('loadStart'), 500);

    // Contador sincronizado con la barra (misma curva ease-in-out)
    const start = performance.now() + 500;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(Math.max((now - start) / 1400, 0), 1);
      const eased = t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
      setPercent(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const exit = window.setTimeout(() => {
      setPhase('exit');
      play('loadDone');
      html.setAttribute('data-ready', '');
      document.body.style.overflow = overflow;
      try {
        sessionStorage.setItem(KEY, '1');
      } catch {
        /* modo privado: no pasa nada */
      }
    }, HOLD + 300);
    const done = window.setTimeout(() => setPhase('done'), HOLD + 300 + EXIT);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(swell);
      window.clearTimeout(exit);
      window.clearTimeout(done);
      document.body.style.overflow = overflow;
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div
      aria-hidden
      className={`preloader fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-5 bg-surface-dark transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        phase === 'exit' ? '-translate-y-full' : ''
      }`}
    >
      <div
        className={`flex flex-col items-center gap-5 transition-[opacity,transform] duration-500 ${
          phase === 'exit' ? '-translate-y-6 opacity-0' : ''
        }`}
      >
        <p className="animate-fade-up font-serif text-[clamp(26px,4vw,44px)] font-light tracking-[0.06em] text-text-primary [animation-delay:300ms]">
          {cv.profile.name}
        </p>
        <div className="relative h-px w-[180px] animate-fade-in overflow-hidden bg-line-strong [animation-delay:500ms]">
          <span className="absolute inset-0 origin-left animate-load-bar bg-accent [animation-delay:500ms]" />
        </div>
        <div className="flex w-[180px] animate-fade-in justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary [animation-delay:700ms]">
          <span>Portafolio · {new Date().getFullYear()}</span>
          <span className="tabular-nums text-text-secondary">
            {String(percent).padStart(3, '0')}
          </span>
        </div>
      </div>
      {/* Borde inferior de la cortina */}
      <span className="absolute inset-x-0 bottom-0 h-px bg-accent/40" />
    </div>
  );
}

export default Preloader;
