'use client';

import { useEffect, useRef, useState } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';
import { copyToClipboard, haptic, toast } from '@/lib/toast';
import { btnSecondary } from '@/lib/styles';

// Copia el correo con un cambio de icono animado + notificación
function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleCopy = async () => {
    const ok = await copyToClipboard(email);
    if (!ok) {
      window.location.href = `mailto:${email}`;
      return;
    }
    haptic();
    setCopied(true);
    toast('Correo copiado al portapapeles');
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`${btnSecondary} min-w-[176px]`}
      aria-label={`Copiar el correo ${email}`}
    >
      <span className="relative h-4 w-4">
        <FiCopy
          aria-hidden
          className={`absolute inset-0 transition-all duration-300 ease-spring ${
            copied ? 'rotate-[-30deg] scale-50 opacity-0' : 'opacity-100'
          }`}
        />
        <FiCheck
          aria-hidden
          strokeWidth={3}
          className={`absolute inset-0 text-success transition-all duration-500 ease-spring ${
            copied
              ? 'scale-100 opacity-100'
              : 'rotate-[30deg] scale-50 opacity-0'
          }`}
        />
      </span>
      <span className="transition-colors duration-300">
        {copied ? 'Copiado' : 'Copiar correo'}
      </span>
    </button>
  );
}

export default CopyEmailButton;
