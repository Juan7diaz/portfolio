import React from 'react';
import Reveal from '@/components/ui/Reveal';
import { container } from '@/lib/styles';

interface SectionProps {
  id: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = '',
}: SectionProps) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className={container}>
        {(eyebrow || title) && (
          <header className="mb-12 md:mb-16">
            {eyebrow && (
              <Reveal>
                <p className="eyebrow">{eyebrow}</p>
              </Reveal>
            )}
            {title && (
              <Reveal delay={60}>
                <h2 className="mt-3 text-[40px] font-semibold leading-[1.05] tracking-tightest text-text-primary md:text-[64px]">
                  {title}
                </h2>
              </Reveal>
            )}
            {description && (
              <Reveal delay={120}>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl">
                  {description}
                </p>
              </Reveal>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

export default Section;
