import Image from 'next/image';
import Link from 'next/link';
import { ProjectFrontmatter } from '@/interfaces/ProjectFrontmatter.interface';
import Reveal from '@/components/ui/Reveal';

// "Siguiente proyecto": fila grande con miniatura que se revela al hover
function ProjectFooter({ next }: { next?: ProjectFrontmatter }) {
  if (!next) return <div className="pb-24" />;

  return (
    <Reveal className="mt-24 pb-24">
      <Link
        href={`/project/${encodeURI(next.fileName)}`}
        className="group grid items-center gap-6 border-y border-line py-10 md:grid-cols-[1fr_auto]"
      >
        <span>
          <span className="label flex items-center gap-2 text-accent before:h-px before:w-5 before:bg-accent">
            Siguiente proyecto
          </span>
          <span className="mt-4 block font-serif text-[clamp(32px,5vw,60px)] font-light leading-[1.05] transition-transform duration-700 ease-out-quint group-hover:translate-x-3">
            {next.name.split(' - ')[0]}{' '}
            <span
              aria-hidden
              className="inline-block text-accent transition-transform duration-700 ease-out-quint group-hover:translate-x-2"
            >
              →
            </span>
          </span>
          <span className="mt-3 block font-mono text-[11px] tracking-[0.06em] text-text-tertiary">
            {next.label} · {next.date}
          </span>
        </span>
        <span className="relative hidden aspect-[4/3] w-64 overflow-hidden border border-line md:block">
          <Image
            src={next.coverImage}
            alt=""
            fill
            sizes="256px"
            className="object-cover grayscale transition-[transform,filter] duration-[1.2s] ease-out-quint group-hover:scale-105 group-hover:grayscale-0"
          />
        </span>
      </Link>
    </Reveal>
  );
}

export default ProjectFooter;
