'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import cv from '@/data/cv.json';

const links = [
  { id: 'experiencia', label: 'Exp.' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'skills', label: 'Skills' },
  { id: 'contacto', label: 'Contacto' },
];

const initials = cv.profile.name
  .split(' ')
  .map((w) => w[0])
  .join('');

interface Pill {
  left: number;
  width: number;
  visible: boolean;
}

function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [collapsed, setCollapsed] = useState(false);
  const [peek, setPeek] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [pill, setPill] = useState<Pill>({ left: 0, width: 0, visible: false });
  const progressRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const peekTimer = useRef<number>();

  const href = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  // Colapso al bajar (solo escritorio) + progreso de lectura
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setCollapsed(window.innerWidth > 900 && y > 120);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  // Sección visible
  useEffect(() => {
    if (!isHome) {
      setActive(null);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ['inicio', ...links.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  // Pastilla que se desliza bajo el enlace en hover o activo
  useEffect(() => {
    const key = hovered ?? active;
    const el = key ? linkRefs.current[key] : null;
    if (el)
      setPill({ left: el.offsetLeft, width: el.offsetWidth, visible: true });
    else setPill((p) => ({ ...p, visible: false }));
  }, [hovered, active]);

  useEffect(() => () => window.clearTimeout(peekTimer.current), []);

  const onTab = () => {
    setPeek(true);
    window.clearTimeout(peekTimer.current);
    peekTimer.current = window.setTimeout(() => setPeek(false), 4000);
  };

  return (
    <header
      className="nav-wrap"
      data-collapsed={collapsed}
      data-peek={peek}
      onMouseLeave={() => setPeek(false)}
    >
      <button
        type="button"
        onClick={onTab}
        className="nav-tab glass group"
        aria-label="Mostrar navegación"
        tabIndex={collapsed ? 0 : -1}
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="h-3.5 w-3.5 fill-none stroke-text-secondary stroke-2 transition-[stroke,transform] duration-300 group-hover:translate-y-px group-hover:stroke-accent"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <nav aria-label="Principal" className="nav-pill glass">
        <Link
          href="/"
          className="border-r border-white/[0.08] pr-3 font-serif text-[15px] font-semibold tracking-[0.02em] text-text-primary transition-colors duration-300 hover:text-accent"
          aria-label="Inicio"
        >
          {initials}
          <span className="text-accent">.</span>
        </Link>

        <div className="flex items-center gap-1">
          <ul
            className="relative flex gap-0.5"
            onMouseLeave={() => setHovered(null)}
          >
            <span
              aria-hidden
              className="absolute inset-y-0 rounded-full bg-white/[0.06] transition-all duration-500 ease-out-quint"
              style={{
                left: pill.left,
                width: pill.width,
                opacity: pill.visible ? 1 : 0,
              }}
            />
            {links.map((l) => (
              <li key={l.id}>
                <Link
                  href={href(l.id)}
                  ref={(el) => {
                    linkRefs.current[l.id] = el;
                  }}
                  onMouseEnter={() => setHovered(l.id)}
                  onFocus={() => setHovered(l.id)}
                  onBlur={() => setHovered(null)}
                  aria-current={active === l.id ? 'true' : undefined}
                  className={`relative block rounded-full px-2 py-2 font-mono text-[9px] uppercase tracking-[0.04em] transition-colors duration-300 min-[901px]:px-3 min-[901px]:py-1.5 min-[901px]:text-[10px] ${
                    active === l.id || hovered === l.id
                      ? 'text-text-primary'
                      : 'text-text-tertiary'
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {cv.profile.openToWork && (
            <Link
              href={href('contacto')}
              className="hidden items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.08em] text-surface-dark transition-[filter,transform] duration-300 hover:brightness-110 active:scale-95 min-[901px]:flex"
            >
              <span className="h-[5px] w-[5px] animate-soft-pulse rounded-full bg-surface-dark" />
              Disponible
            </Link>
          )}
        </div>

        {/* Progreso de lectura en el borde inferior de la píldora */}
        <span
          ref={progressRef}
          aria-hidden
          className="absolute inset-x-5 bottom-0 h-px origin-left bg-accent/70"
          style={{ transform: 'scaleX(0)' }}
        />
      </nav>
    </header>
  );
}

export default Navbar;
