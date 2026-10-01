import Image from 'next/image';
import { FiArrowUpRight } from 'react-icons/fi';
import CodeCopyButton from '@/components/ui/CodeCopyButton';

function H1({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 mt-16 text-3xl font-semibold tracking-display text-text-primary md:text-4xl">
      {children}
    </h2>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 mt-14 text-2xl font-semibold tracking-display text-text-primary md:text-[32px] md:leading-tight">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 mt-10 text-xl font-semibold tracking-tight text-text-primary">
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="my-5 text-[17px] leading-[1.65] text-text-secondary md:text-[19px]">
      {children}
    </p>
  );
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="my-5 space-y-3 text-[17px] leading-[1.6] text-text-secondary md:text-[19px]">
      {children}
    </ul>
  );
}

function OL({ children }: { children: React.ReactNode }) {
  return (
    <ol className="my-5 list-decimal space-y-3 pl-5 text-[17px] leading-[1.6] text-text-secondary marker:text-text-tertiary md:text-[19px] [&>li]:pl-1 [&>li]:before:hidden">
      {children}
    </ol>
  );
}

function LI({ children }: { children: React.ReactNode }) {
  return (
    <li className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-text-tertiary">
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
      className="pressable group mb-2 mr-2 inline-flex items-center gap-1 rounded-full border border-hairline bg-white/[0.04] px-3.5 py-1.5 text-[15px] font-medium text-accent hover:border-accent/40 hover:bg-accent/10"
    >
      {children}
      {external && (
        <FiArrowUpRight
          aria-hidden
          className="transition-transform duration-500 ease-spring group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </a>
  );
}

function BLOCKQUOTE({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-10 rounded-3xl border border-white/[0.06] bg-surface px-6 py-2 text-text-secondary md:px-8 md:py-4 [&_li]:my-0 [&_p]:my-3 [&_ul]:my-3">
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
        className="w-full rounded-3xl border border-white/[0.06]"
        width={1200}
        height={800}
      />
      {alt && (
        <span className="mt-3 block text-center text-sm text-text-tertiary">
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
      <code className="rounded-md bg-white/[0.08] px-1.5 py-0.5 font-mono text-[0.88em] text-text-codeInLine">
        {children}
      </code>
    );
  }

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d0e]">
      <span className="flex items-center justify-between border-b border-white/[0.06] py-2 pl-4 pr-2">
        <span className="flex items-center gap-3">
          <span aria-hidden className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </span>
          <span className="font-mono text-xs text-text-tertiary">
            {fileName ?? lang ?? 'código'}
          </span>
        </span>
        <CodeCopyButton code={String(children).replace(/\n$/, '')} />
      </span>
      <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed text-text-code">
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
  return (
    <strong className="font-semibold text-text-primary">{children}</strong>
  );
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
