import cv from '@/data/cv.json';
import Section from '@/components/common/Section';
import Reveal from '@/components/ui/Reveal';

function Experience() {
  return (
    <Section id="experiencia" number="01" title="Experiencia">
      <ol className="border-t border-line">
        {cv.experience.map((e, i) => (
          <Reveal
            as="li"
            key={`${e.role}-${e.startDate}`}
            delay={(i + 1) * 80}
            className="group relative grid gap-1.5 border-b border-line py-7 transition-[padding] duration-500 ease-out-quint md:grid-cols-[180px_1fr] md:gap-8 md:hover:pl-3"
          >
            <p className="pt-1 font-mono text-[11px] tracking-[0.04em] text-text-tertiary transition-colors duration-300 group-hover:text-text-secondary">
              {e.startDate} — {e.endDate}
            </p>
            <div>
              <h3 className="mb-1 font-serif text-[22px] font-normal leading-tight md:text-[24px]">
                {e.role}
              </h3>
              <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.06em] text-accent">
                {e.url ? (
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-1.5"
                  >
                    <span className="link-draw">{e.company}</span>
                    <span className="normal-case text-text-tertiary">
                      · {e.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </span>
                    <span
                      aria-hidden
                      className="transition-transform duration-500 ease-spring group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                    >
                      ↗
                    </span>
                  </a>
                ) : (
                  e.company
                )}
              </p>
              <p className="max-w-2xl text-[13.5px] font-light leading-[1.7] text-text-secondary">
                {e.description}
              </p>

              {e.highlights?.length > 0 && (
                <ul className="mt-5 max-w-2xl space-y-2.5">
                  {e.highlights.map((h) => {
                    // "Título: detalle" -> el título se resalta
                    const cut = h.indexOf(': ');
                    const titled = cut > 0 && cut < 80;
                    return (
                      <li
                        key={h}
                        className="relative pl-6 text-[13.5px] font-light leading-[24px] text-text-secondary before:absolute before:left-0 before:top-0 before:font-mono before:text-[11px] before:leading-[24px] before:text-accent before:content-['—']"
                      >
                        {titled ? (
                          <>
                            <span className="font-normal text-text-primary">
                              {h.slice(0, cut)}:
                            </span>
                            {h.slice(cut + 1)}
                          </>
                        ) : (
                          h
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}

              {e.stack?.length > 0 && (
                <ul
                  className="mt-6 flex flex-wrap gap-1.5"
                  aria-label="Tecnologías"
                >
                  {e.stack.map((t) => (
                    <li
                      key={t}
                      className="cursor-default border border-line px-2.5 py-1 font-mono text-[9px] tracking-[0.04em] text-text-secondary transition-colors duration-200 hover:border-accent hover:text-text-primary"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

export default Experience;
