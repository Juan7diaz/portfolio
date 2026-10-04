import React from 'react';
import getProjects from '@/utils/getProjects';
import { seeded } from '@/lib/ready';
import Section from '@/components/common/Section';
import Reveal from '@/components/ui/Reveal';
import ProjectWheel, { WheelProject } from './ProjectWheel';

// Partículas tipo "galaxia" con semilla fija (sin desajustes de hidratación)
const rnd = seeded(42);
const particles = Array.from({ length: 40 }, () => ({
  left: rnd() * 100,
  top: rnd() * 100,
  size: 2 + rnd() * 4,
  opacity: 0.08 + rnd() * 0.18,
  dur: 4 + rnd() * 6,
  delay: -rnd() * 8,
  drift: -(10 + rnd() * 25),
}));

// "Mar. 2024 - Abr. 2024" -> "Mar–Abr 2024" (solo si ambos meses son del mismo año)
const shortDate = (date: string) => {
  const m = date.match(
    /^([A-Za-zÁÉÍÓÚáéíóúñÑ]+)\.?\s(\d{4})\s*-\s*([A-Za-zÁÉÍÓÚáéíóúñÑ]+)\.?\s(\d{4})$/,
  );
  return m && m[2] === m[4] ? `${m[1]}–${m[3]} ${m[2]}` : date;
};

function Projects() {
  const projects: WheelProject[] = getProjects().map((p) => ({
    slug: p.fileName,
    name: p.name.split(' - ')[0].replace(/\s*\(.*\)/, ''),
    label: p.label,
    role: p.role,
    date: shortDate(p.date),
    summary: p.summary ?? p.resumen,
    tags: p.technologies ?? [],
    github: p.github,
  }));

  return (
    <div className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {particles.map((pt, i) => (
          <span
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className="absolute animate-drift rounded-full bg-accent"
            style={
              {
                left: `${pt.left}%`,
                top: `${pt.top}%`,
                width: pt.size,
                height: pt.size,
                opacity: pt.opacity,
                '--dur': `${pt.dur}s`,
                '--delay': `${pt.delay}s`,
                '--drift': `${pt.drift}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
      <Section id="proyectos" number="02" title="Proyectos">
        <Reveal delay={100}>
          <ProjectWheel projects={projects} />
        </Reveal>
      </Section>
    </div>
  );
}

export default Projects;
