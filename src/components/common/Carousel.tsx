'use client';

import Image from 'next/image';
import React, { useCallback, useRef, useState } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

const arrow =
  'glass absolute inset-y-0 z-10 my-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-text-primary shadow-lg transition-all duration-500 ease-out-expo hover:scale-105 hover:bg-white/20 active:scale-90 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100 md:focus-visible:opacity-100';

function Carousel({
  imgs = [],
  alt = 'Proyecto',
}: {
  imgs: string[];
  alt?: string;
}) {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const start = useRef<{ x: number; y: number } | null>(null);
  const count = imgs.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  if (count === 0) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    }
  };

  // Gesto de deslizar en pantallas táctiles
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') return;
    start.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!start.current) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    start.current = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
  };

  return (
    <section
      aria-roledescription="carrusel"
      aria-label={`Galería de ${alt}`}
      className="my-14 md:my-20"
    >
      {/* Región enfocable: permite navegar con las flechas del teclado */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        role="region"
        aria-label="Usa las flechas del teclado para navegar"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          start.current = null;
        }}
        className="group relative aspect-[16/10] touch-pan-y select-none overflow-hidden rounded-[28px] border border-white/[0.06] bg-surface"
      >
        {imgs.map((img, i) => (
          <div
            key={img}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-out-expo ${
              i === index
                ? 'scale-100 opacity-100'
                : 'pointer-events-none scale-[1.03] opacity-0'
            }`}
          >
            <Image
              src={img}
              alt={`${alt} — captura ${i + 1} de ${count}`}
              fill
              sizes="(min-width: 1024px) 976px, 100vw"
              priority={i === 0}
              draggable={false}
              onLoad={() => setLoaded((l) => ({ ...l, [i]: true }))}
              className={`object-contain transition-[filter,opacity] duration-700 ease-apple ${
                loaded[i] ? 'opacity-100 blur-0' : 'opacity-0 blur-md'
              }`}
            />
          </div>
        ))}

        {!loaded[index] && (
          <div aria-hidden className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 animate-shine bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
          </div>
        )}

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Imagen anterior"
              className={`${arrow} left-4 md:-translate-x-2`}
            >
              <IoChevronBack aria-hidden size={20} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Imagen siguiente"
              className={`${arrow} right-4 md:translate-x-2`}
            >
              <IoChevronForward aria-hidden size={20} />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="mt-5 flex items-center justify-center gap-4">
          <div className="flex items-center rounded-full bg-white/[0.06] px-2 py-1.5">
            {imgs.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ver imagen ${i + 1}`}
                aria-current={i === index}
                className="group/dot flex h-4 items-center px-[3px]"
              >
                <span
                  className={`block h-[7px] rounded-full transition-all duration-500 ease-out-expo ${
                    i === index
                      ? 'w-6 bg-text-primary'
                      : 'w-[7px] bg-white/30 group-hover/dot:bg-white/60'
                  }`}
                />
              </button>
            ))}
          </div>
          <p
            className="min-w-[3.5rem] text-xs tabular-nums text-text-tertiary"
            aria-live="polite"
          >
            {index + 1} / {count}
          </p>
        </div>
      )}
    </section>
  );
}

export default Carousel;
