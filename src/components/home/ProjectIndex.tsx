'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import Reveal from '@/components/ui/Reveal';

export interface ProjectItem {
  slug: string;
  name: string;
  type: string;
  year: string;
  summary: string;
  stack: string[];
  cover: string;
}

const PREVIEW_W = 320;
const PREVIEW_H = 214;

// Índice editorial de proyectos con una vista previa flotante que sigue al cursor
function ProjectIndex({ projects }: { projects: ProjectItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  const visible = active !== null;

  // Interpolación suave (lerp) + leve inclinación según la velocidad.
  // El bucle solo corre mientras la vista previa está visible.
  useEffect(() => {
    if (!visible) return undefined;
    const tick = () => {
      const c = current.current;
      const t = target.current;
      const dx = t.x - c.x;
      c.x += dx * 0.14;
      c.y += (t.y - c.y) * 0.14;
      const tilt = Math.max(-7, Math.min(7, dx * 0.06));
      if (previewRef.current) {
        // A la derecha del cursor para no tapar el título, sin salirse de la pantalla
        const x = Math.min(c.x + 36, window.innerWidth - PREVIEW_W - 24);
        previewRef.current.style.transform = `translate3d(${x}px, ${c.y - PREVIEW_H / 2}px, 0) rotate(${tilt}deg)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [visible]);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    target.current = { x: e.clientX, y: e.clientY };
  };

  const onEnterList = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    // Evita que la vista previa "vuele" desde la esquina al entrar
    target.current = { x: e.clientX, y: e.clientY };
    current.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <div className="relative">
      <ul
        onPointerMove={onMove}
        onPointerEnter={onEnterList}
        onPointerLeave={() => setActive(null)}
        className="group/list border-t border-hairline"
      >
        {projects.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={i * 80}>
            <Link
              href={`/project/${encodeURI(p.slug)}`}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className="group relative block border-b border-hairline py-7 transition-opacity duration-500 ease-apple md:py-9 md:hover:!opacity-100 md:group-hover/list:opacity-35"
            >
              {/* Imagen en línea solo en pantallas táctiles / pequeñas */}
              <span className="relative mb-6 block aspect-[16/10] overflow-hidden rounded-2xl bg-surface md:hidden">
                <Image
                  src={p.cover}
                  alt={`Captura de ${p.name}`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </span>

              <span className="grid grid-cols-[auto_1fr_auto] items-start gap-x-4 md:grid-cols-[64px_1fr_160px_auto] md:gap-x-6">
                <span className="pt-1.5 font-mono text-xs text-text-tertiary md:pt-3">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span className="min-w-0">
                  <span className="block text-[28px] font-semibold leading-[1.08] tracking-display text-text-primary transition-transform duration-700 ease-out-expo md:text-[44px] md:group-hover:translate-x-2">
                    {p.name}
                  </span>
                  <span className="mt-3 block max-w-xl text-[15px] leading-relaxed text-text-secondary">
                    {p.summary}
                  </span>
                  <span className="mt-3 block text-[13px] text-text-tertiary">
                    {p.stack.slice(0, 5).join(' · ')}
                    {p.stack.length > 5 && ` · +${p.stack.length - 5}`}
                  </span>
                </span>

                <span className="hidden pt-3 text-[13px] leading-snug text-text-tertiary md:block">
                  {p.type}
                  <br />
                  {p.year}
                </span>

                <span className="mt-1 flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-text-secondary transition-all duration-500 ease-spring group-hover:rotate-45 group-hover:border-transparent group-hover:bg-text-primary group-hover:text-black md:mt-2">
                  <FiArrowUpRight aria-hidden size={18} />
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>

      {/* Vista previa flotante (solo escritorio con ratón) */}
      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
        style={{ width: PREVIEW_W, height: PREVIEW_H }}
      >
        <div
          className={`relative h-full w-full overflow-hidden rounded-2xl bg-surface shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/10 transition-[opacity,transform] duration-500 ease-out-expo ${
            visible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          }`}
        >
          {projects.map((p, i) => (
            <Image
              key={p.slug}
              src={p.cover}
              alt=""
              fill
              sizes={`${PREVIEW_W}px`}
              className={`object-cover transition-[opacity,transform] duration-700 ease-out-expo ${
                active === i ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectIndex;
