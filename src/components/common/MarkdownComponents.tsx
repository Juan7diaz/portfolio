import Image from 'next/image';
import TitleSection from './TitleSection';
import CustomLink from './CustomLink';

function H1({ children }: { children: React.ReactNode }) {
  return <TitleSection title={children as string} />;
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2 mt-10 text-xl leading-7 text-text-primary md:leading-10">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="my-5 text-xl leading-7 text-text-primary md:leading-10">
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="my-2 leading-7 text-text-secondary md:leading-10">
      {children}
    </p>
  );
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="my-2 list-outside list-disc pl-5 leading-7 text-text-secondary md:leading-10">
      {children}
    </ul>
  );
}

function OL({ children }: { children: React.ReactNode }) {
  return (
    <ol className="my-2 list-inside list-decimal leading-7 text-text-secondary md:leading-10">
      {children}
    </ol>
  );
}

function LI({ children }: { children: React.ReactNode }) {
  return <li className="mb-1 pl-5 -indent-5 md:mb-0">{children}</li>;
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return <CustomLink text={children as string} url={href} />;
}

function BLOCKQUOTE({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-9 border-l-4 border-primary-base pl-4 italic">
      {children}
    </blockquote>
  );
}

function IMG({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="my-4 block">
      <span className="flex flex-col items-center justify-center">
        <Image
          src={src}
          alt={alt}
          className="rounded-lg shadow-lg"
          width={600}
          height={600}
        />
        <span className="mt-2 text-sm italic text-text-tertiary">{alt}</span>
      </span>
    </span>
  );
}

function Code({
  className,
  children,
  node,
}: {
  children: React.ReactNode;
  // eslint-disable-next-line react/require-default-props
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
      <code className="rounded bg-[#2c303a] px-1 py-0.5 font-mono text-sm text-text-codeInLine">
        {children}
      </code>
    );
  }

  return (
    <div className="relative mb-4 mt-10">
      {fileName && (
        <div className="absolute -top-6 inline-block">
          <div className="flex items-center">
            <span className="rounded-t-lg border-x border-t border-primary-base/40 bg-[#1a1f24] px-3 py-1 text-xs text-text-code">
              📁 {fileName}
            </span>
          </div>
        </div>
      )}
      <pre className="overflow-x-auto rounded-lg rounded-tl-none border-[1px] border-primary-base/40 bg-[#1a1f24] p-4 text-text-code shadow-sm">
        <code className={className}>{children}</code>
      </pre>
      <span className="mt-1 block text-xs italic text-text-tertiary">
        lang: {lang}
      </span>
    </div>
  );
}

function STRONG({ children }: { children: React.ReactNode }) {
  return (
    <strong className="font-semibold text-primary-base">{children}</strong>
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
  img: IMG,
  strong: STRONG,
};

export default MarkdownComponents;
