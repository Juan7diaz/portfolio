import React from 'react';
import Reveal from '@/components/ui/Reveal';
import { container } from '@/lib/styles';

interface SectionProps {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

// Sección con cabecera numerada: "01  Experiencia ————"
function Section({
  id,
  number,
  title,
  children,
  className = '',
}: SectionProps) {
  return (
    <section id={id} className={`${container} py-14 md:py-20 ${className}`}>
      <Reveal className="group/head mb-10 flex items-baseline gap-3.5">
        <span
          data-thread="loop"
          className="font-mono text-[11px] tracking-[0.1em] text-accent"
        >
          {number}
        </span>
        <h2 className="font-serif text-[clamp(28px,3.5vw,40px)] font-normal leading-none">
          {title}
        </h2>
        {/* La línea se dibuja de izquierda a derecha al aparecer */}
        <span
          aria-hidden
          className="ml-5 h-px flex-1 origin-left scale-x-0 bg-line transition-transform delay-200 duration-[1.2s] ease-out-quint group-data-[visible=true]/head:scale-x-100"
        />
      </Reveal>
      {children}
    </section>
  );
}

export default Section;
