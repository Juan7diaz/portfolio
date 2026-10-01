import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiArrowDown, FiDownload } from 'react-icons/fi';
import cv from '@/data/cv.json';
import { btnLight, container } from '@/lib/styles';

const WORD_DELAY = 55;
const START = 200;

// Cada palabra sube desde una máscara, en cascada
function Words({
  text,
  from,
  className = '',
}: {
  text: string;
  from: number;
  className?: string;
}) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <React.Fragment key={`${word}-${from + i}`}>
          <span className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-bottom">
            <span
              className={`inline-block animate-word-up ${className}`}
              style={{ animationDelay: `${START + (from + i) * WORD_DELAY}ms` }}
            >
              {word}
            </span>
          </span>{' '}
        </React.Fragment>
      ))}
    </>
  );
}

function Hero() {
  const { profile, education, contact } = cv;
  const firstName = profile.name.split(' ')[0];
  const [edu] = education;

  const intro = `Hola, soy ${firstName}`;
  const line = 'Construyo interfaces';
  const muted = 'que se sienten tan bien como se ven.';
  const introCount = intro.split(' ').length;
  const lineStart = introCount + 1;
  const mutedStart = lineStart + line.split(' ').length;
  const totalWords = mutedStart + muted.split(' ').length;
  const after = START + totalWords * WORD_DELAY;

  const specs = [
    { label: 'Enfoque', value: profile.focus },
    { label: 'Actualmente', value: profile.currently },
    { label: 'Ubicación', value: profile.location.replace(', Magdalena', '') },
    edu && { label: 'Formación', value: `${edu.degree}, ${edu.instituteName}` },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <section
      id="inicio"
      className="flex min-h-[100svh] flex-col pb-10 pt-[calc(var(--nav-height)+24px)] md:pt-[calc(var(--nav-height)+40px)]"
    >
      <div className={`${container} flex flex-1 flex-col`}>
        <div
          className="flex animate-fade-in items-center justify-between gap-4 border-b border-hairline pb-4 text-[13px] text-text-tertiary"
          style={{ animationDelay: '100ms' }}
        >
          <span>
            <span className="text-text-secondary">{profile.headline}</span>
            <span className="hidden sm:inline">
              {' '}
              — Portafolio {new Date().getFullYear()}
            </span>
          </span>
          {profile.openToWork && (
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-success opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-success" />
              </span>
              Disponible para trabajar
            </span>
          )}
        </div>

        <h1 className="mt-auto pt-12 text-[44px] font-semibold leading-[1.02] tracking-tightest text-text-primary sm:text-[68px] md:pt-16 lg:text-[88px]">
          <Words text={intro} from={0} />
          {/* Foto incrustada en el titular: se expande al pasar el cursor */}
          <span className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-bottom">
            <span
              className="inline-block animate-word-up"
              style={{ animationDelay: `${START + introCount * WORD_DELAY}ms` }}
            >
              <span className="group relative inline-block h-[0.78em] w-[1.45em] translate-y-[0.06em] overflow-hidden rounded-full bg-surface align-baseline transition-[width] duration-700 ease-spring hover:w-[2.3em]">
                <Image
                  src={profile.avatarLink}
                  alt={`Foto de ${profile.name}`}
                  fill
                  priority
                  sizes="240px"
                  className="object-cover object-[50%_30%] transition-transform duration-700 ease-out-expo group-hover:scale-110"
                />
              </span>
            </span>
          </span>{' '}
          <br className="hidden sm:block" />
          <Words text={line} from={lineStart} />
          <Words text={muted} from={mutedStart} className="text-[#86868b]" />
        </h1>

        <div
          className="mt-10 flex animate-fade-in flex-wrap items-center gap-x-6 gap-y-4"
          style={{ animationDelay: `${after}ms` }}
        >
          <Link href="#proyectos" className={btnLight}>
            Ver proyectos
            <FiArrowDown
              aria-hidden
              className="transition-transform duration-500 ease-spring group-hover:translate-y-0.5"
            />
          </Link>
          <a
            href={contact.cv.value}
            download
            className="group inline-flex items-center gap-2 text-[15px] font-medium text-text-secondary transition-colors duration-300 hover:text-text-primary"
          >
            <FiDownload
              aria-hidden
              className="transition-transform duration-500 ease-spring group-hover:translate-y-0.5"
            />
            <span className="bg-gradient-to-r from-current to-current bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out-expo group-hover:bg-[length:100%_1px]">
              Descargar CV
            </span>
          </a>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-hairline pt-6 md:mt-14 md:grid-cols-4">
          {specs.map((s, i) => (
            <div
              key={s.label}
              className="animate-fade-in"
              style={{ animationDelay: `${after + 150 + i * 90}ms` }}
            >
              <dt className="text-xs text-text-tertiary">{s.label}</dt>
              <dd className="mt-1 text-[15px] leading-snug text-text-primary">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default Hero;
