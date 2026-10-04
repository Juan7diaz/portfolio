'use client';

import { useState } from 'react';
import { copyToClipboard, haptic } from '@/lib/toast';

function CodeCopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!(await copyToClipboard(code))) return;
    haptic();
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Código copiado' : 'Copiar código'}
      className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-text-tertiary transition-colors duration-300 hover:bg-text-primary/[0.06] hover:text-text-primary active:scale-95"
    >
      {copied ? (
        <>
          Copiado <span className="text-accent">✓</span>
        </>
      ) : (
        'Copiar'
      )}
    </button>
  );
}

export default CodeCopyButton;
