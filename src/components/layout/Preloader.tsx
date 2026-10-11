'use client';

import { useEffect, useState } from 'react';
import cv from '@/data/cv.json';
import { play } from '@/lib/sound';

const KEY = 'jdg-preloaded';
const START = 150; // ms antes de que arranque la barra
const BAR = 800; // ms que tarda la barra en llenarse
const HOLD = START + BAR + 120; // pequeña pausa al llegar a 100
const EXIT = 650; // ms de la cortina subiendo

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
    const swell = window.setTimeout(() => play('loadStart'), START);

    // Contador sincronizado con la barra (misma curva ease-in-out)
    const start = performance.now() + START;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(Math.max((now - start) / BAR, 0), 1);
      const eased = t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
      setPercent(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    let exited = false;
    let done = 0;
    const leave = () => {
      if (exited) return;
      exited = true;
      setPercent(100);
      setPhase('exit');
      play('loadDone');
      html.setAttribute('data-ready', '');
      document.body.style.overflow = overflow;
      try {
        sessionStorage.setItem(KEY, '1');
      } catch {
        /* modo privado: no pasa nada */
      }
      done = window.setTimeout(() => setPhase('done'), EXIT);
    };
    const exit = window.setTimeout(leave, HOLD);

    // Clic, tecla o rueda: se salta la intro
    const skip = ['pointerdown', 'keydown', 'wheel', 'touchstart'] as const;
    skip.forEach((e) => window.addEventListener(e, leave, { once: true }));

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(swell);
      window.clearTimeout(exit);
      window.clearTimeout(done);
      skip.forEach((e) => window.removeEventListener(e, leave));
      document.body.style.overflow = overflow;
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div
      aria-hidden
      className={`preloader fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-5 bg-surface-dark transition-transform duration-[650ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        phase === 'exit' ? '-translate-y-full' : ''
      }`}
    >
      <div
        className={`flex flex-col items-center gap-5 transition-[opacity,transform] duration-500 ${
          phase === 'exit' ? '-translate-y-6 opacity-0' : ''
        }`}
      >
        <p className="animate-fade-up font-serif text-[clamp(26px,4vw,44px)] font-light tracking-[0.06em] text-text-primary [animation-delay:0ms]">
          {cv.profile.name}
        </p>
        <div className="relative h-px w-[180px] animate-fade-in overflow-hidden bg-line-strong [animation-delay:100ms]">
          <span
            className="absolute inset-0 origin-left bg-accent"
            style={{ transform: `scaleX(${percent / 100})` }}
          />
        </div>
        <div className="flex w-[180px] animate-fade-in justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary [animation-delay:200ms]">
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
