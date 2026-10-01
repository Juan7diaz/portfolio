'use client';

import { useEffect, useRef, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
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
          className={`glass fixed bottom-8 left-1/2 z-[100] flex items-center gap-2.5 rounded-full border border-hairline py-2.5 pl-2.5 pr-5 text-sm font-medium text-text-primary shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] transition-[opacity,transform,filter] duration-300 ease-apple ${
            toast.leaving ? 'opacity-0 blur-[4px]' : 'animate-toast-in'
          }`}
          style={{
            transform: toast.leaving
              ? 'translate(-50%, 10px) scale(0.94)'
              : 'translate(-50%, 0)',
          }}
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success text-black">
            <FiCheck size={14} strokeWidth={3} />
          </span>
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default Toaster;
