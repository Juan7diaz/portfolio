'use client';

import { useState } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';
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
      className="pressable flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs text-text-tertiary hover:bg-white/10 hover:text-text-primary"
    >
      {copied ? (
        <FiCheck aria-hidden className="text-success" />
      ) : (
        <FiCopy aria-hidden />
      )}
      {copied ? 'Copiado' : 'Copiar'}
    </button>
  );
}

export default CodeCopyButton;
