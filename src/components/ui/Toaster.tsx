'use client';

import { useEffect, useRef, useState } from 'react';
import { TOAST_EVENT, ToastDetail } from '@/lib/toast';

interface ToastState {
  id: number;
  message: string;
  leaving: boolean;
}

function Toaster() {
  const [toast, setToast] = useState<ToastState | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const clear = () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = [];
    };
    const onToast = (e: Event) => {
      const { message } = (e as CustomEvent<ToastDetail>).detail;
      clear();
      setToast({ id: Date.now(), message, leaving: false });
      timers.current.push(
        window.setTimeout(
          () => setToast((t) => (t ? { ...t, leaving: true } : t)),
          2200,
        ),
        window.setTimeout(() => setToast(null), 2600),
      );
    };
    window.addEventListener(TOAST_EVENT, onToast);
    return () => {
      clear();
      window.removeEventListener(TOAST_EVENT, onToast);
    };
  }, []);

  return (
    <div aria-live="polite" role="status" className="pointer-events-none">
      {toast && (
        <div
          key={toast.id}
          className={`glass fixed bottom-8 left-1/2 z-[200] flex items-center gap-2.5 rounded-full border border-text-primary/[0.08] px-5 py-2.5 font-mono text-[11px] tracking-[0.06em] text-text-primary shadow-[0_20px_50px_-15px_rgba(0,0,0,0.35)] transition-[opacity,transform] duration-300 ease-smooth ${
            toast.leaving ? 'opacity-0' : 'animate-toast-in'
          }`}
          style={{
            transform: toast.leaving
              ? 'translate(-50%, 10px) scale(0.96)'
              : 'translate(-50%, 0)',
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default Toaster;
