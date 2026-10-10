'use client';

import { useEffect, useRef, useState } from 'react';
import { whenReady } from '@/lib/ready';

// Cuenta de 0 a `value` cuando es visible y el preloader ya terminó
function CountUp({
  value,
  duration = 1600,
  delay = 0,
}: {
  value: number;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return undefined;
    }

    let raf = 0;
    let timer = 0;
    let stopReady = () => {};
    const run = () => {
      timer = window.setTimeout(() => {
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          setDisplay(Math.round((1 - (1 - t) ** 4) * value));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      }, delay);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        stopReady = whenReady(run);
      },
      { threshold: 0.5 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      stopReady();
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [value, duration, delay]);

  return (
    <span ref={ref} className="lining-nums tabular-nums">
      {display}
    </span>
  );
}

export default CountUp;
