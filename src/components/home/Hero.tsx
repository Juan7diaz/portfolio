import Image from 'next/image';
import Link from 'next/link';
import { FiDownload, FiMapPin } from 'react-icons/fi';
import { FaGraduationCap } from 'react-icons/fa';
import { IoChevronForward } from 'react-icons/io5';
import cv from '@/data/cv.json';
import Reveal from '@/components/ui/Reveal';
import SocialLinks from '@/components/ui/SocialLinks';
import { btnPrimary, btnSecondary, container } from '@/lib/styles';

function Hero() {
  const { profile, education, contact } = cv;

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-[calc(var(--nav-height)+48px)]"
    >
      {/* Luz ambiental que respira lentamente */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[8%] top-[14%] h-[420px] w-[420px] animate-float rounded-full bg-accent/25 blur-[120px] sm:left-[22%]" />
        <div className="absolute right-[6%] top-[28%] h-[380px] w-[380px] animate-float rounded-full bg-[#bf5af2]/20 blur-[120px] [animation-delay:-7s] sm:right-[20%]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage:
              'radial-gradient(ellipse 60% 50% at 50% 40%, #000 30%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 60% 50% at 50% 40%, #000 30%, transparent 100%)',
          }}
        />
      </div>

      <div className={`${container} flex flex-col items-center text-center`}>
        <Reveal>
          <div className="group relative h-28 w-28 transition-transform duration-700 ease-spring hover:scale-105">
            <div className="absolute -inset-[3px] animate-[spin_8s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,#5ac8fa,#2997ff,#bf5af2,#5ac8fa)] opacity-80 blur-[1px] transition-opacity duration-500 group-hover:opacity-100" />
            <Image
              src={profile.avatarLink}
              alt={`Foto de ${profile.name}`}
              priority
              width={224}
              height={224}
              className="relative h-28 w-28 rounded-full border-[3px] border-black object-cover"
            />
            {profile.openToWork && (
              <span
                className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black"
                aria-hidden
              >
                <span className="h-3 w-3 rounded-full bg-success" />
              </span>
            )}
          </div>
        </Reveal>

        {profile.openToWork && (
          <Reveal delay={80} className="mt-7">
            <span className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-hairline bg-white/[0.04] py-1.5 pl-3 pr-3.5 text-xs font-medium text-text-secondary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-success opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-success" />
              </span>
              Disponible para nuevas oportunidades
              <span
                aria-hidden
                className="absolute inset-0 animate-shine bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
              />
            </span>
          </Reveal>
        )}

        <h1 className="mt-6 text-[44px] font-semibold leading-[1.04] tracking-tightest sm:text-7xl md:text-[88px]">
          <Reveal delay={160} as="span" className="block text-text-primary">
            {profile.name}
          </Reveal>
          <Reveal delay={240} as="span" className="block pb-2">
            <span className="text-gradient animate-gradient-pan">
              {profile.headline}.
            </span>
          </Reveal>
        </h1>

        <Reveal delay={320}>
          <p className="mx-auto mt-4 max-w-2xl text-xl font-medium leading-snug tracking-tight text-text-secondary md:text-2xl">
            {profile.tagline}
          </p>
        </Reveal>

        <Reveal delay={400}>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-text-tertiary">
            <li className="flex items-center gap-1.5">
              <FiMapPin aria-hidden />
              {profile.location}
            </li>
            {education.length > 0 && (
              <li className="flex items-center gap-1.5">
                <FaGraduationCap aria-hidden />
                {education[0].instituteName}
              </li>
            )}
          </ul>
        </Reveal>

        <Reveal delay={480}>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <Link href="#proyectos" className={btnPrimary}>
              Ver proyectos
              <IoChevronForward
                aria-hidden
                className="transition-transform duration-500 ease-spring group-hover:translate-x-0.5"
              />
            </Link>
            <a href={contact.cv.value} download className={btnSecondary}>
              <FiDownload
                aria-hidden
                className="transition-transform duration-500 ease-spring group-hover:translate-y-[2px]"
              />
              Descargar CV
            </a>
          </div>
        </Reveal>

        <Reveal delay={560} className="mt-8">
          <SocialLinks />
        </Reveal>
      </div>

      {/* Indicador de scroll */}
      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 [@media(min-height:760px)]:block"
      >
        <div className="flex h-9 w-[22px] justify-center rounded-full border border-white/20 pt-2">
          <span className="h-1.5 w-1 animate-scroll-hint rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
