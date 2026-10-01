'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Logo from '@/components/common/Logo';
import cv from '@/data/cv.json';

const sections = [
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'formacion', label: 'Formación' },
];

interface Pill {
  left: number;
  width: number;
  visible: boolean;
}

function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [pill, setPill] = useState<Pill>({ left: 0, width: 0, visible: false });
  const progressRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const firstName = cv.profile.name.split(' ').slice(0, 2).join(' ');
  const href = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  // Estado "con scroll" + barra de progreso de lectura
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 8);
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

  // Sección visible actualmente
  useEffect(() => {
    if (!isHome) {
      setActive(null);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ['inicio', ...sections.map((s) => s.id), 'contacto'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  // La pastilla se desliza al enlace en hover, o descansa en la sección activa
  useEffect(() => {
    const key = hovered ?? active;
    const el = key ? linkRefs.current[key] : null;
    if (el) {
      setPill({ left: el.offsetLeft, width: el.offsetWidth, visible: true });
    } else {
      setPill((p) => ({ ...p, visible: false }));
    }
  }, [hovered, active]);

  // Menú móvil: bloquear scroll y cerrar con Escape
  useEffect(() => {
    if (!open) return undefined;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Principal"
        className={`relative transition-[background-color,border-color,backdrop-filter] duration-500 ease-apple ${
          scrolled || open
            ? 'glass border-b border-hairline'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-[var(--nav-height)] max-w-[1024px] items-center justify-between px-6">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="group flex items-center gap-2 text-[15px] font-semibold tracking-tight text-text-primary"
            aria-label="Inicio"
          >
            <Logo
              color="currentColor"
              className="h-5 w-auto transition-transform duration-500 ease-spring group-hover:-rotate-6 group-hover:scale-110"
            />
            <span className="transition-opacity duration-300 group-hover:opacity-80">
              {firstName}
            </span>
          </Link>

          <ul
            className="relative hidden items-center sm:flex"
            onMouseLeave={() => setHovered(null)}
          >
            <span
              aria-hidden
              className="absolute top-1/2 h-8 -translate-y-1/2 rounded-full bg-white/[0.08] transition-all duration-500 ease-out-expo"
              style={{
                left: pill.left,
                width: pill.width,
                opacity: pill.visible ? 1 : 0,
              }}
            />
            {sections.map((s) => (
              <li key={s.id}>
                <Link
                  href={href(s.id)}
                  ref={(el) => {
                    linkRefs.current[s.id] = el;
                  }}
                  onMouseEnter={() => setHovered(s.id)}
                  onFocus={() => setHovered(s.id)}
                  onBlur={() => setHovered(null)}
                  aria-current={active === s.id ? 'true' : undefined}
                  className={`relative z-10 block rounded-full px-3.5 py-1.5 text-[13px] transition-colors duration-300 ${
                    active === s.id || hovered === s.id
                      ? 'text-text-primary'
                      : 'text-text-secondary'
                  }`}
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href={href('contacto')}
              className="pressable hidden rounded-full bg-accent-strong px-3.5 py-1.5 text-[13px] font-medium text-white hover:bg-accent-hover sm:block"
            >
              Contactar
            </Link>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              className="pressable relative -mr-2 flex h-10 w-10 items-center justify-center rounded-full sm:hidden"
            >
              <span
                className={`absolute h-[1.5px] w-[18px] rounded-full bg-text-primary transition-transform duration-500 ease-out-expo ${
                  open ? 'rotate-45' : '-translate-y-[4px]'
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-[18px] rounded-full bg-text-primary transition-transform duration-500 ease-out-expo ${
                  open ? '-rotate-45' : 'translate-y-[4px]'
                }`}
              />
            </button>
          </div>
        </div>

        <div
          ref={progressRef}
          aria-hidden
          className={`absolute inset-x-0 bottom-[-1px] h-px origin-left bg-gradient-to-r from-[#5ac8fa] via-accent to-[#bf5af2] transition-opacity duration-500 ${
            scrolled ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transform: 'scaleX(0)' }}
        />
      </nav>

      {/* Menú móvil a pantalla completa */}
      <div
        id="mobile-menu"
        className={`glass fixed inset-x-0 bottom-0 top-[var(--nav-height)] transition-[opacity,visibility] duration-500 ease-out-expo sm:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <ul className="flex flex-col gap-1 px-8 pt-8">
          {[...sections, { id: 'contacto', label: 'Contacto' }].map((s, i) => (
            <li
              key={s.id}
              className="transition-[opacity,transform] duration-700 ease-out-expo"
              style={{
                transitionDelay: open ? `${80 + i * 45}ms` : '0ms',
                opacity: open ? 1 : 0,
                transform: open ? 'none' : 'translateY(-10px)',
              }}
            >
              <Link
                href={href(s.id)}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="block py-2 text-[28px] font-semibold tracking-display text-text-primary transition-colors active:text-text-secondary"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
