'use client';

import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { play } from '@/lib/sound';

const arrowBtn =
  'absolute inset-y-0 z-10 my-auto flex h-11 w-11 items-center justify-center rounded-full border border-text-primary/10 glass text-base text-text-primary transition-[opacity,transform,background-color,color] duration-500 ease-out-quint hover:bg-text-primary hover:text-background active:scale-90 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100 md:focus-visible:opacity-100';

const pad = (n: number) => String(n).padStart(2, '0');

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

  // Deslizamiento suave al cambiar de imagen (no en el montaje)
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    play('swipe', index);
  }, [index]);

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
        className="group relative aspect-[16/10] touch-pan-y select-none overflow-hidden border border-line bg-surface"
      >
        {imgs.map((img, i) => (
          <div
            key={img}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-out-quint ${
              i === index
                ? 'scale-100 opacity-100'
                : 'pointer-events-none scale-[1.02] opacity-0'
            }`}
          >
            <Image
              src={img}
              alt={`${alt} — captura ${i + 1} de ${count}`}
              fill
              sizes="(min-width: 960px) 880px, 100vw"
              priority={i === 0}
              draggable={false}
              onLoad={() => setLoaded((l) => ({ ...l, [i]: true }))}
              className={`object-contain transition-opacity duration-700 ${
                loaded[i] ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
        ))}

        {!loaded[index] && (
          <div
            aria-hidden
            className="absolute inset-x-0 top-1/2 mx-auto h-px w-[180px] overflow-hidden bg-line-strong"
          >
            <span className="absolute inset-0 origin-left animate-[load-bar_1.4s_ease-in-out_infinite] bg-accent" />
          </div>
        )}

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              data-sound="custom"
              aria-label="Imagen anterior"
              className={`${arrowBtn} left-4 md:-translate-x-2`}
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              data-sound="custom"
              aria-label="Imagen siguiente"
              className={`${arrowBtn} right-4 md:translate-x-2`}
            >
              →
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="mt-5 flex items-center gap-5">
          <span
            className="font-mono text-[11px] tabular-nums tracking-[0.08em] text-text-tertiary"
            aria-live="polite"
          >
            <span className="text-text-primary">{pad(index + 1)}</span> /{' '}
            {pad(count)}
          </span>
          {/* Segmentos: el activo se llena en acento */}
          <div className="flex flex-1 gap-1.5">
            {imgs.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setIndex(i)}
                data-sound="custom"
                aria-label={`Ver imagen ${i + 1}`}
                aria-current={i === index}
                className="group/seg flex h-5 flex-1 items-center"
              >
                <span
                  className={`block h-px w-full transition-colors duration-500 ${
                    i === index
                      ? 'bg-accent'
                      : 'bg-line-strong group-hover/seg:bg-text-tertiary'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Carousel;
