'use client';

import React, { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

type Theme = 'dark' | 'light';

export const THEME_KEY = 'jdg-theme';
const BG: Record<Theme, string> = { dark: '#050505', light: '#f4f1ec' };

type DocWithVT = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> };
};

const rays = Array.from({ length: 8 }, (_, i) => (i * Math.PI) / 4);

// Botón sol/luna. El icono se transforma (los rayos se recogen y un círculo
// "muerde" el sol para formar la luna) y el tema nuevo se revela en círculo
// desde el botón cuando el navegador soporta View Transitions.
function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    setTheme(
      document.documentElement.getAttribute('data-theme') === 'light'
        ? 'light'
        : 'dark',
    );
  }, []);

  const apply = (next: Theme) => {
    document.documentElement.setAttribute('data-theme', next);
    document
      .querySelectorAll('meta[name="theme-color"]')
      .forEach((m) => m.setAttribute('content', BG[next]));
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* almacenamiento no disponible */
    }
    setTheme(next);
  };

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    const doc = document as DocWithVT;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!doc.startViewTransition || calm) {
      apply(next);
      return;
    }

    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = doc.startViewTransition(() => {
      flushSync(() => apply(next));
    });
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 700,
          easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
          pseudoElement: '::view-transition-new(root)',
        },
      );
    });
  };

  const isDark = theme === 'dark';
  const ease = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
      className="group flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-text-secondary transition-[color,background-color,transform] duration-300 hover:bg-text-primary/[0.07] hover:text-text-primary active:scale-90"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="h-4 w-4 transition-transform duration-500 group-hover:rotate-[15deg]"
        style={{ transitionTimingFunction: ease }}
      >
        <mask id="theme-moon-mask">
          <rect width="24" height="24" fill="white" />
          <circle
            cx="17"
            cy="7"
            r="7"
            fill="black"
            style={{
              transition: `transform 600ms ${ease}`,
              transform: isDark ? 'none' : 'translate(10px, -10px)',
            }}
          />
        </mask>
        <circle
          cx="12"
          cy="12"
          r="9"
          fill="currentColor"
          mask="url(#theme-moon-mask)"
          style={{
            transformBox: 'fill-box',
            transformOrigin: 'center',
            transition: `transform 600ms ${ease}`,
            transform: isDark ? 'none' : 'scale(0.5)',
          }}
        />
        <g
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            transformBox: 'view-box',
            transformOrigin: 'center',
            transition: `transform 600ms ${ease}, opacity 300ms ease`,
            transform: isDark ? 'rotate(-60deg) scale(0.4)' : 'none',
            opacity: isDark ? 0 : 1,
          }}
        >
          {rays.map((a) => (
            <line
              key={a}
              x1={12 + Math.cos(a) * 8}
              y1={12 + Math.sin(a) * 8}
              x2={12 + Math.cos(a) * 10.5}
              y2={12 + Math.sin(a) * 10.5}
            />
          ))}
        </g>
      </svg>
    </button>
  );
}

export default ThemeToggle;
