'use client';

import React, { useRef } from 'react';

// Tarjeta con un halo de luz y un borde iluminado que siguen al puntero
function SpotlightCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number>();

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const node = ref.current;
    if (!node) return;
    const { clientX, clientY } = e;

    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = node.getBoundingClientRect();
      node.style.setProperty('--x', `${clientX - rect.left}px`);
      node.style.setProperty('--y', `${clientY - rect.top}px`);
    });
  };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      className={`spotlight ${className}`}
    >
      {children}
    </div>
  );
}

export default SpotlightCard;
