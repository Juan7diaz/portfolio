import React from 'react';
import cv from '@/data/cv.json';
import Section from '@/components/common/Section';
import Reveal from '@/components/ui/Reveal';
import MatchIcon, {
  brandColors,
  MatcherKey,
} from '@/components/common/MatchIcon';

function Skills() {
  return (
    <Section
      id="habilidades"
      eyebrow="Habilidades"
      title="Mi caja de herramientas."
      description="Las tecnologías con las que diseño, construyo y despliego productos todos los días."
    >
      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {cv.skill.map((skill, i) => {
          const brand = brandColors[skill.name as MatcherKey] ?? '#f5f5f7';
          return (
            <Reveal as="li" key={skill.name} delay={(i % 6) * 50}>
              <div
                className="group flex aspect-square cursor-default flex-col items-center justify-center gap-3 rounded-3xl border border-white/[0.06] bg-surface transition-[background-color,border-color,transform] duration-500 ease-out-expo hover:border-white/[0.12] hover:bg-surface-raised active:scale-95"
                style={{ '--brand': brand } as React.CSSProperties}
              >
                <MatchIcon
                  name={skill.name as MatcherKey}
                  className="h-8 w-8 text-text-secondary transition-[color,transform,filter] duration-500 ease-spring group-hover:-translate-y-1 group-hover:scale-110 group-hover:text-[color:var(--brand)] group-hover:drop-shadow-[0_6px_18px_var(--brand)]"
                />
                <span className="px-2 text-center text-xs font-medium text-text-tertiary transition-colors duration-500 group-hover:text-text-primary">
                  {skill.label}
                </span>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}

export default Skills;
