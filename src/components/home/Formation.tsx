import Image from 'next/image';
import { FiArrowUpRight } from 'react-icons/fi';
import cv from '@/data/cv.json';
import Section from '@/components/common/Section';
import Reveal from '@/components/ui/Reveal';

const group =
  'overflow-hidden rounded-[28px] border border-white/[0.06] bg-surface';
const row = 'flex items-center gap-4 px-5 py-4 md:px-6 md:py-5';
const separator =
  'relative after:absolute after:bottom-0 after:left-[84px] after:right-0 after:h-px after:bg-hairline last:after:hidden md:after:left-[88px]';

function Logo({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={96}
      height={96}
      className="h-11 w-11 shrink-0 rounded-xl bg-white object-contain"
    />
  );
}

function Formation() {
  return (
    <Section
      id="formacion"
      eyebrow="Formación"
      title="Aprendiendo siempre."
      description="Base académica sólida y formación continua para estar al día con el ecosistema."
    >
      <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-start md:gap-6">
        <Reveal className="md:sticky md:top-[calc(var(--nav-height)+32px)]">
          <h3 className="mb-3 px-1 text-sm font-medium text-text-tertiary">
            Educación
          </h3>
          <ul className={group}>
            {cv.education.map((e) => (
              <li
                key={e.instituteName + e.degree}
                className={`${row} ${separator}`}
              >
                <Logo src={e.linkImg} alt={`Logo de la ${e.instituteName}`} />
                <div className="min-w-0">
                  <p className="font-medium text-text-primary">{e.degree}</p>
                  <p className="text-sm text-text-secondary">
                    {e.instituteName}
                  </p>
                  <p className="mt-0.5 text-sm text-text-tertiary">
                    {e.startDate} — {e.endDate}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        {cv.certification.length > 0 && (
          <Reveal delay={120}>
            <h3 className="mb-3 px-1 text-sm font-medium text-text-tertiary">
              Certificaciones
            </h3>
            <ul className={group}>
              {cv.certification.map((c) => (
                <li key={c.credentialId} className={separator}>
                  <a
                    href={c.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${row} group transition-colors duration-300 hover:bg-white/[0.04] active:bg-white/[0.07]`}
                  >
                    <Logo src={c.logoSrc} alt={`Logo de ${c.issuer}`} />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium leading-snug text-text-primary">
                        {c.title}
                      </p>
                      <p className="mt-0.5 text-sm text-text-tertiary">
                        {c.issuer} · {c.issueDate}
                      </p>
                    </div>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-text-tertiary transition-all duration-500 ease-spring group-hover:bg-accent/15 group-hover:text-accent">
                      <FiArrowUpRight
                        aria-hidden
                        className="transition-transform duration-500 ease-spring group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                      <span className="sr-only">
                        Ver credencial (se abre en una pestaña nueva)
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </Section>
  );
}

export default Formation;
