import Image from 'next/image';
import CodeCopyButton from '@/components/ui/CodeCopyButton';

function H1({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 mt-16 font-serif text-[clamp(30px,3.6vw,40px)] font-normal leading-tight">
      {children}
    </h2>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 mt-14 flex items-baseline gap-3 font-serif text-[clamp(26px,3vw,34px)] font-normal leading-tight before:h-px before:w-5 before:shrink-0 before:translate-y-[-0.3em] before:bg-accent">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 mt-10 font-serif text-[22px] font-normal">
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="my-5 text-[15.5px] font-light leading-[1.85] text-text-secondary md:text-[16.5px]">
      {children}
    </p>
  );
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="my-6 space-y-3 text-[15.5px] font-light leading-[1.75] text-text-secondary md:text-[16.5px]">
      {children}
    </ul>
  );
}

function OL({ children }: { children: React.ReactNode }) {
  return (
    <ol className="my-6 list-decimal space-y-3 pl-5 text-[15.5px] font-light leading-[1.75] text-text-secondary marker:font-mono marker:text-[11px] marker:text-accent md:text-[16.5px] [&>li]:pl-1 [&>li]:before:hidden">
      {children}
    </ol>
  );
}

function LI({ children }: { children: React.ReactNode }) {
  return (
    <li className="relative pl-6 before:absolute before:left-0 before:top-[14px] before:h-px before:w-3 before:bg-accent">
      {children}
    </li>
  );
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href?.startsWith('http');
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="pill group mb-2 mr-2 !font-light"
    >
      {children}
      {external && (
        <span
          aria-hidden
          className="transition-transform duration-500 ease-spring group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        >
          ↗
        </span>
      )}
    </a>
  );
}

function BLOCKQUOTE({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-10 border-l border-accent bg-surface px-6 py-2 md:px-8 md:py-4 [&_li]:my-0 [&_p]:my-3 [&_ul]:my-3">
      {children}
    </blockquote>
  );
}

function IMG({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="my-10 block">
      <Image
        src={src}
        alt={alt}
        className="w-full border border-line"
        width={1200}
        height={800}
      />
      {alt && (
        <span className="mt-3 block font-mono text-[10px] tracking-[0.06em] text-text-tertiary">
          {alt}
        </span>
      )}
    </span>
  );
}

function Code({
  className,
  children,
  node,
}: {
  children: React.ReactNode;
  className?: string;
  node: any;
}) {
  const isInline = typeof children === 'string' && !children.includes('\n');
  const match = /language-(\w+)/.exec(className || '');
  const lang = match ? match[1] : null;
  const meta = node?.data?.meta || null;
  const fileNameMatch = (meta as string)?.match(/filename="(.+)"/);
  const fileName = fileNameMatch ? fileNameMatch[1] : null;

  if (isInline) {
    return (
      <code className="bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.85em] text-text-codeInLine">
        {children}
      </code>
    );
  }

  return (
    <div className="my-8 border border-line bg-surface-dark">
      <div className="flex items-center justify-between border-b border-line py-2 pl-4 pr-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-tertiary">
          {fileName ?? lang ?? 'código'}
        </span>
        <CodeCopyButton code={String(children).replace(/\n$/, '')} />
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-text-code">
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
}

// El bloque de código ya dibuja su propio <pre>
function PRE({ children }: { children: React.ReactNode }) {
  return children;
}

function STRONG({ children }: { children: React.ReactNode }) {
  return <strong className="font-medium text-text-primary">{children}</strong>;
}

const MarkdownComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  p: P,
  ul: UL,
  ol: OL,
  li: LI,
  a: A,
  blockquote: BLOCKQUOTE,
  code: Code,
  pre: PRE,
  img: IMG,
  strong: STRONG,
};

export default MarkdownComponents;
