'use client';

import { useEffect, useRef, useState } from 'react';

const INTERACTIVE = 'a, button, [role="button"], label, [data-cursor]';

// Punto de acento que sigue al ratón con un ligero retraso. Sobre elementos
// interactivos se abre en un anillo fino y al hacer clic se contrae.
function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia(
      '(hover: hover) and (pointer: fine)',
    ).matches;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || calm) return undefined;
    setEnabled(true);

    const pos = { x: -100, y: -100 };
    const cur = { x: -100, y: -100 };
    let raf = 0;
    let first = true;

    const loop = () => {
      cur.x += (pos.x - cur.x) * 0.3;
      cur.y += (pos.y - cur.y) * 0.3;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (first) {
        cur.x = pos.x;
        cur.y = pos.y;
        first = false;
      }
      setVisible(true);
      const target = e.target as Element | null;
      setHover(Boolean(target?.closest?.(INTERACTIVE)));
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const onLeave = () => setVisible(false);

    raf = requestAnimationFrame(loop);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9998]"
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height,background-color,border-color,opacity,transform] duration-300 ease-out-quint ${
          hover
            ? 'h-10 w-10 border border-accent/70 bg-accent/[0.06]'
            : 'h-2 w-2 border border-transparent bg-accent'
        } ${down ? 'scale-75' : 'scale-100'}`}
        style={{ opacity: visible ? 1 : 0 }}
      />
    </div>
  );
}

export default Cursor;
