'use client';

import { useEffect, useRef, useState } from 'react';
import { copyToClipboard, haptic, toast } from '@/lib/toast';

// Copia el correo: el texto cambia a "Copiado ✓" y aparece un aviso
function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleCopy = async () => {
    if (!(await copyToClipboard(email))) {
      window.location.href = `mailto:${email}`;
      return;
    }
    haptic();
    setCopied(true);
    toast('Correo copiado');
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copiar el correo ${email}`}
      className={`pill relative overflow-hidden ${copied ? '!border-accent !bg-accent-soft !text-text-primary' : ''}`}
    >
      {/* Ambas etiquetas comparten espacio para que el botón no cambie de ancho */}
      <span className="grid">
        <span
          className={`col-start-1 row-start-1 transition-[opacity,transform] duration-300 ease-out-quint ${
            copied ? '-translate-y-3 opacity-0' : ''
          }`}
        >
          Copiar correo
        </span>
        <span
          aria-hidden={!copied}
          className={`col-start-1 row-start-1 transition-[opacity,transform] duration-300 ease-out-quint ${
            copied ? '' : 'translate-y-3 opacity-0'
          }`}
        >
          Copiado <span className="text-accent">✓</span>
        </span>
      </span>
    </button>
  );
}

export default CopyEmailButton;
