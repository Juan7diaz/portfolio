'use client';

import { useEffect, useMemo, useRef } from 'react';

// Texto que se ilumina palabra a palabra a medida que se hace scroll
function ScrollText({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<HTMLSpanElement[]>([]);

  const paragraphs = useMemo(
    () =>
      text
        .split('\n')
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p) => p.split(/\s+/)),
    [text],
  );

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      wordRefs.current.forEach((w) => {
        w?.style.setProperty('opacity', '1');
      });
      return undefined;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 cuando el bloque asoma por abajo, 1 cuando su final pasa el centro
      const progress = (vh * 0.85 - rect.top) / (rect.height + vh * 0.25);
      const words = wordRefs.current;
      const lit = Math.max(0, Math.min(1, progress)) * words.length;
      words.forEach((w, i) => {
        if (!w) return;
        const o = Math.max(0, Math.min(1, lit - i));
        w.style.setProperty('opacity', String(0.16 + o * 0.84));
      });
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
  }, [paragraphs]);

  let index = 0;

  return (
    <div ref={containerRef} className={className}>
      {paragraphs.map((words, p) => (
        // eslint-disable-next-line react/no-array-index-key
        <p key={p} className={p > 0 ? 'mt-8' : ''}>
          {words.map((word) => {
            const i = index;
            index += 1;
            return (
              <span
                key={i}
                ref={(el) => {
                  if (el) wordRefs.current[i] = el;
                }}
                className="transition-opacity duration-200 ease-linear"
                style={{ opacity: 0.16 }}
              >
                {word}{' '}
              </span>
            );
          })}
        </p>
      ))}
    </div>
  );
}

export default ScrollText;
