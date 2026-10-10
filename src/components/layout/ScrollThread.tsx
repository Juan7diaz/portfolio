'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { seeded } from '@/lib/ready';

// ─────────────────────────────────────────────────────────────────────────
// Hilo que se va dibujando al hacer scroll y se "enreda" en la página:
// recorre los márgenes, da vueltas alrededor de los elementos marcados con
// data-thread y termina anudado en "Hablemos.".
//
//   data-thread="hero"  → lazo suelto al lado del nombre
//   data-thread="loop"  → encierra el elemento (números de sección)
//   data-thread="orbit" → orbita alrededor (rueda de proyectos)
//   data-thread="end"   → nudo final
//
// Para quitar el efecto basta con borrar <ScrollThread /> del layout.
// ─────────────────────────────────────────────────────────────────────────

type P = [number, number];

// Curva suave que pasa por todos los puntos (Catmull-Rom → Bézier cúbica)
function smoothPath(pts: P[]) {
  if (pts.length < 2) return '';
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i += 1) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1: P = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: P = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d;
}

// Puntos de una vuelta alrededor de un centro (elipse), empezando en `from`
function loop(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  from: number,
  turns = 1,
  dir = 1,
  spread = 0.12,
) {
  const steps = Math.round(10 * turns);
  const out: P[] = [];
  for (let k = 0; k <= steps; k += 1) {
    const a = from + dir * (k / steps) * Math.PI * 2 * turns;
    // El radio crece un poco en cada vuelta: parece un hilo, no un círculo perfecto
    const grow = 1 + (k / steps) * spread;
    out.push([cx + Math.cos(a) * rx * grow, cy + Math.sin(a) * ry * grow]);
  }
  return out;
}

function buildRoute(width: number, height: number, vh: number) {
  const rnd = seeded(11);
  const jitter = (v: number, amt: number) => v + (rnd() - 0.5) * amt;
  const sy = window.scrollY;
  const box = (el: Element) => {
    const r = el.getBoundingClientRect();
    return { x: r.left, y: r.top + sy, w: r.width, h: r.height };
  };

  // Margen libre a cada lado del contenido (el contenedor mide 1200px)
  const desktop = width >= 768;
  const content = Math.min(width, 1200);
  const side = Math.max((width - content) / 2, 0);
  const pad = desktop ? 40 : 20;
  const left = Math.max(side + pad * 0.35, 8);
  const right = width - left;
  const amp = Math.min(left * 0.22, 24); // ondulación al bajar por el margen

  const nodes = Array.from(document.querySelectorAll('[data-thread]'));
  if (nodes.length < 2) return null;

  const pts: P[] = [[width + 40, vh * 0.1]];
  let lastSide: 'l' | 'r' = 'r';
  const margin = () => (lastSide === 'r' ? right : left);

  // Baja por el margen actual hasta `toY`, ondulando suavemente
  const goDown = (toY: number) => {
    const prev = pts[pts.length - 1];
    const gap = toY - prev[1];
    if (gap <= 8) return;
    const steps = Math.max(1, Math.round(gap / (vh * 0.42)));
    for (let k = 1; k <= steps; k += 1) {
      const wave = k === steps ? 0 : (k % 2 ? -1 : 1) * amp;
      pts.push([jitter(margin() + wave, 6), prev[1] + (gap * k) / steps]);
    }
  };

  const innerSelector: Record<string, string> = {
    hero: '.inline-block',
    end: 'a',
  };

  nodes.forEach((el) => {
    const kind = el.getAttribute('data-thread') ?? '';
    // Para títulos de bloque se mide el texto real, no la caja completa
    const inner = innerSelector[kind]
      ? el.querySelector(innerSelector[kind])
      : null;
    const b = box(inner ?? el);
    const cx = b.x + b.w / 2;
    const cy = b.y + b.h / 2;

    if (kind === 'hero') {
      // Lazo amplio en el espacio libre a la derecha del nombre
      const free = right - (b.x + b.w);
      const r = Math.min(70, Math.max(30, free * 0.18));
      const lx = Math.min(b.x + b.w + free * 0.55, right - r * 1.4);
      pts.push([lx + r * 1.6, cy - r * 1.4]);
      pts.push(...loop(lx, cy, r, r * 0.8, -Math.PI / 2, 1, -1));
      pts.push([lx + r * 0.6, cy + r * 2.4]);
      lastSide = 'r';
    } else if (kind === 'loop') {
      // Cruza por la franja vacía sobre la cabecera y encierra el número
      const rx = b.w * 0.85 + 7;
      const ry = b.h * 0.9 + 8;
      // Franja vacía: el relleno superior de la sección, sobre la cabecera
      const band = cy - Math.max(ry * 3.4, 62);
      goDown(band);
      pts.push([lastSide === 'r' ? cx + 40 : left, band]);
      pts.push([cx - rx * 1.6, band + (cy - band) * 0.45]);
      // Entra por arriba a la izquierda (donde no hay texto) y da la vuelta
      pts.push(...loop(cx, cy, rx, ry, -Math.PI * 0.8, 1.1, 1, 0.08));
      pts.push([left, cy + ry * 3]);
      lastSide = 'l';
    } else if (kind === 'orbit') {
      // En móvil la rueda queda detrás del texto: solo se pasa de largo
      if (!desktop) return;
      const r = b.w / 2 + 24;
      goDown(cy - r * 0.95);
      pts.push([cx - r * 1.02, cy - r * 0.72]);
      // Espiral de 1¾ vueltas: entra arriba a la izquierda y sale abajo a la izquierda
      pts.push(...loop(cx, cy, r, r, -Math.PI * 0.75, 1.75));
      pts.push([left, cy + r * 1.25]);
      lastSide = 'l';
    } else if (kind === 'end') {
      // Cruza en el espacio superior del footer y anuda "Hablemos."
      const footer = el.closest('footer');
      const top = footer ? box(footer).y : b.y - 120;
      const rx = b.w / 2 + 46;
      const ry = b.h / 2 - 2;
      const ky = cy - 4; // algo más arriba para no rozar el subtítulo
      goDown(top + 24);
      pts.push([cx - rx * 1.45, ky - ry * 0.3]);
      // 1½ vueltas: entra por la izquierda y sale por la derecha del título
      pts.push(...loop(cx, ky, rx, ry, Math.PI, 1.5, 1, 0.04));
      pts.push([cx + rx * 1.2, ky + ry * 0.15]);
    }
  });

  // Nunca fuera del documento
  const clamped = pts.map(
    ([x, y]) => [x, Math.min(Math.max(y, 0), height - 4)] as P,
  );
  return smoothPath(clamped);
}

function ScrollThread() {
  const pathname = usePathname();
  const [d, setD] = useState('');
  const [size, setSize] = useState({ w: 0, h: 0 });
  const mainRef = useRef<SVGPathElement>(null);
  const echoRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const tipRef = useRef<SVGGElement>(null);

  // Construye la ruta y la rehace si cambia el tamaño de la página
  useEffect(() => {
    let timer = 0;
    const rebuild = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const w = document.documentElement.clientWidth;
        const h = document.documentElement.scrollHeight;
        const route = buildRoute(w, h, window.innerHeight);
        setSize({ w, h });
        setD(route ?? '');
      }, 120);
    };
    rebuild();
    const ro = new ResizeObserver(rebuild);
    ro.observe(document.body);
    window.addEventListener('resize', rebuild);
    return () => {
      window.clearTimeout(timer);
      ro.disconnect();
      window.removeEventListener('resize', rebuild);
    };
  }, [pathname]);

  // Dibuja el hilo siguiendo el scroll, con inercia
  useEffect(() => {
    const main = mainRef.current;
    const echo = echoRef.current;
    const glow = glowRef.current;
    const tip = tipRef.current;
    if (!d || !main || !echo || !glow || !tip) return undefined;

    const total = main.getTotalLength();
    // Muestreo: para cada tramo, la máxima profundidad alcanzada hasta ahí
    const N = 800;
    const reach: number[] = [];
    let maxY = -Infinity;
    for (let i = 0; i <= N; i += 1) {
      maxY = Math.max(maxY, main.getPointAtLength((i / N) * total).y);
      reach.push(maxY);
    }
    const lengthAtDepth = (y: number) => {
      let lo = 0;
      let hi = N;
      while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (reach[mid] < y) lo = mid + 1;
        else hi = mid;
      }
      return (lo / N) * total;
    };

    main.style.setProperty('stroke-dasharray', `${total}`);
    glow.style.setProperty('stroke-dasharray', `${total}`);

    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cur = calm ? total : 0;
    let lag = cur;
    let raf = 0;

    const target = () =>
      lengthAtDepth(window.scrollY + window.innerHeight * 0.62);

    const paint = () => {
      main.style.strokeDashoffset = `${total - cur}`;
      glow.style.strokeDashoffset = `${total - lag}`;
      // Parallax: el hilo de fondo se desplaza a otra velocidad
      echo.style.transform = `translate3d(0, ${window.scrollY * -0.06}px, 0)`;
      const pt = main.getPointAtLength(Math.max(cur, 0.01));
      tip.style.transform = `translate(${pt.x}px, ${pt.y}px)`;
      tip.style.opacity = cur > 4 && cur < total - 4 ? '1' : '0';
    };

    const tick = () => {
      raf = 0;
      const t = calm ? total : target();
      cur += (t - cur) * 0.09;
      lag += (cur - lag) * 0.06;
      paint();
      if (Math.abs(t - cur) > 0.5 || Math.abs(cur - lag) > 0.5) {
        raf = requestAnimationFrame(tick);
      }
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    // Arranca ya dibujado hasta la posición actual (sin animar desde cero)
    if (!calm) {
      cur = target();
      lag = cur;
    }
    paint();
    window.addEventListener('scroll', kick, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', kick);
    };
  }, [d]);

  if (!d) return null;

  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 z-[5] overflow-visible"
      width={size.w}
      height={size.h}
      viewBox={`0 0 ${size.w} ${size.h}`}
    >
      {/* Hilo de fondo (parallax): más tenue y a otra velocidad */}
      <path
        ref={echoRef}
        d={d}
        fill="none"
        stroke="rgb(var(--c-accent))"
        strokeOpacity={0.07}
        strokeWidth={1}
        strokeDasharray="2 7"
        strokeLinecap="round"
        style={{ willChange: 'transform' }}
      />
      {/* Halo que llega un poco después del hilo */}
      <path
        ref={glowRef}
        d={d}
        fill="none"
        stroke="rgb(var(--c-accent))"
        strokeOpacity={0.14}
        strokeWidth={6}
        strokeLinecap="round"
        style={{ filter: 'blur(4px)' }}
      />
      {/* Hilo principal */}
      <path
        ref={mainRef}
        d={d}
        fill="none"
        stroke="rgb(var(--c-accent))"
        strokeOpacity={0.75}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Punta luminosa */}
      <g ref={tipRef} style={{ opacity: 0, transition: 'opacity 300ms' }}>
        <circle r={9} fill="rgb(var(--c-accent))" opacity={0.15} />
        <circle r={2.6} fill="rgb(var(--c-accent))" />
      </g>
    </svg>
  );
}

export default ScrollThread;
