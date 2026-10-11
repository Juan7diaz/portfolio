'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface Cert {
  title: string;
  issuer: string;
  year: string;
  url: string;
}

// Carril horizontal de certificados: arrastrable con el ratón, con bordes
// que se desvanecen y una barra de progreso fina.
function CertScroller({ certs }: { certs: Cert[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [progress, setProgress] = useState(0);
  const [grabbing, setGrabbing] = useState(false);

  const update = () => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({ start: el.scrollLeft <= 2, end: el.scrollLeft >= max - 2 });
    setProgress(max > 0 ? el.scrollLeft / max : 1);
  };

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    drag.current = { x: e.clientX, left: ref.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || !ref.current) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4) {
      d.moved = true;
      setGrabbing(true);
    }
    ref.current.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    drag.current = null;
    setGrabbing(false);
  };
  // Si se arrastró, se cancela el clic para no abrir el enlace por accidente
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current?.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const mask = `linear-gradient(to right, ${edges.start ? '#000' : 'transparent'} 0, #000 48px, #000 calc(100% - 48px), ${
    edges.end ? '#000' : 'transparent'
  } 100%)`;

  return (
    <div className="mt-4">
      <div
        ref={ref}
        onScroll={update}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        // Se libera tras el clic para que onClickCapture sepa si hubo arrastre
        onPointerUp={() => window.setTimeout(endDrag, 0)}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        className={`overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          grabbing ? 'cursor-grabbing select-none' : 'md:cursor-grab'
        }`}
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      >
        <ul className="flex w-max gap-3">
          {certs.map((c) => (
            <li key={c.url}>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                draggable={false}
                className="group relative flex h-full min-w-[280px] max-w-[300px] flex-col justify-between gap-6 border border-line bg-surface p-5 transition-[border-color,transform] duration-300 hover:-translate-y-px hover:border-line-strong"
              >
                <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out-quint group-hover:scale-x-100" />
                <span className="font-serif text-[17px] font-normal leading-snug text-text-primary">
                  {c.title}
                </span>
                <span className="flex items-center justify-between font-mono text-[10px] tracking-[0.04em] text-text-tertiary">
                  {c.issuer} · {c.year}
                  <span
                    aria-hidden
                    className="text-text-tertiary transition-[color,transform] duration-500 ease-spring group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  >
                    ↗
                  </span>
                </span>
              </a>
            </li>
          ))}
          <li className="flex min-w-[280px] flex-col justify-between gap-6 border border-dashed border-line p-5">
            <span className="font-serif text-[17px] italic text-text-secondary">
              Más certificaciones próximamente
            </span>
            <span className="font-mono text-[10px] tracking-[0.04em] text-text-tertiary">
              En progreso →
            </span>
          </li>
        </ul>
      </div>

      <div className="mt-2 flex items-center gap-4">
        <div className="relative h-px flex-1 bg-line">
          <span
            className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-200"
            style={{ width: `${Math.max(progress * 100, 8)}%` }}
          />
        </div>
        <span className="hidden font-mono text-[9px] uppercase tracking-[0.14em] text-text-tertiary md:block">
          Arrastra →
        </span>
      </div>
    </div>
  );
}

export default CertScroller;
