import Image from 'next/image';
import Link from 'next/link';
import { IoChevronForward } from 'react-icons/io5';
import cv from '@/data/cv.json';
import { ProjectFrontmatter } from '@/interfaces/ProjectFrontmatter.interface';
import Reveal from '@/components/ui/Reveal';
import SpotlightCard from '@/components/ui/SpotlightCard';
import SocialLinks from '@/components/ui/SocialLinks';
import { btnPrimary } from '@/lib/styles';

function ProjectFooter({ next }: { next?: ProjectFrontmatter }) {
  return (
    <footer className="mt-24 space-y-5 pb-24">
      {next && (
        <Reveal>
          <SpotlightCard className="group overflow-hidden rounded-[28px] border border-white/[0.06] bg-surface transition-[transform,background-color] duration-700 ease-out-expo hover:-translate-y-1 hover:bg-surface-raised">
            <Link
              href={`/project/${encodeURI(next.fileName)}`}
              className="relative z-[3] flex items-center gap-5 p-5 md:p-6"
            >
              <span className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-2xl bg-surface-raised md:w-40">
                <Image
                  src={next.coverImage}
                  alt=""
                  fill
                  sizes="160px"
                  className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="eyebrow block text-xs">
                  Siguiente proyecto
                </span>
                <span className="mt-1 block text-lg font-semibold leading-tight tracking-tight text-text-primary md:text-2xl">
                  {next.name}
                </span>
              </span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-text-secondary transition-all duration-500 ease-spring group-hover:translate-x-1 group-hover:bg-accent group-hover:text-white">
                <IoChevronForward aria-hidden />
              </span>
            </Link>
          </SpotlightCard>
        </Reveal>
      )}

      <Reveal delay={100}>
        <div className="flex flex-col items-center rounded-[28px] border border-white/[0.06] bg-surface px-6 py-12 text-center">
          <Image
            src={cv.profile.avatarLink}
            alt={`Foto de ${cv.profile.name}`}
            width={144}
            height={144}
            className="h-[72px] w-[72px] rounded-full object-cover"
          />
          <p className="mt-4 text-2xl font-semibold tracking-tight text-text-primary">
            {cv.profile.name}
          </p>
          <p className="mt-1 text-text-secondary">{cv.profile.description}</p>
          <div className="mt-7 flex flex-col items-center gap-5 sm:flex-row">
            <Link href="/#contacto" className={btnPrimary}>
              Hablemos
              <IoChevronForward
                aria-hidden
                className="transition-transform duration-500 ease-spring group-hover:translate-x-0.5"
              />
            </Link>
            <SocialLinks />
          </div>
        </div>
      </Reveal>
    </footer>
  );
}

export default ProjectFooter;
