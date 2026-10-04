'use client';

import { useEffect, useState } from 'react';
import {
  isSoundEnabled,
  play,
  setSoundEnabled,
  SOUND_EVENT,
  unlock,
} from '@/lib/sound';

// Altavoz con ondas: se apagan y aparece una barra al silenciar
function SoundToggle() {
  const [on, setOn] = useState(true);

  useEffect(() => {
    setOn(isSoundEnabled());
    const sync = (e: Event) => setOn((e as CustomEvent<boolean>).detail);
    window.addEventListener(SOUND_EVENT, sync);
    return () => window.removeEventListener(SOUND_EVENT, sync);
  }, []);

  const toggle = () => {
    const next = !on;
    setSoundEnabled(next);
    if (next) {
      unlock();
      play('soundOn', 3);
    }
  };

  const wave = (delay: number) => ({
    transition: `opacity 300ms ease ${delay}ms, transform 400ms cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
    opacity: on ? 1 : 0,
    transform: on ? 'none' : 'translateX(-3px) scale(0.6)',
    transformBox: 'fill-box' as const,
    transformOrigin: 'left center',
  });

  return (
    <button
      type="button"
      onClick={toggle}
      data-sound="custom"
      aria-pressed={on}
      aria-label={on ? 'Silenciar sonidos' : 'Activar sonidos'}
      title={on ? 'Silenciar sonidos' : 'Activar sonidos'}
      className="group flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-text-secondary transition-[color,background-color,transform] duration-300 hover:bg-text-primary/[0.07] hover:text-text-primary active:scale-90"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="h-4 w-4 fill-none stroke-current"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" className="fill-current" />
        <path d="M15.5 9.2a4 4 0 0 1 0 5.6" style={wave(0)} />
        <path d="M18.2 6.6a7.6 7.6 0 0 1 0 10.8" style={wave(60)} />
        <path
          d="M16 9.5l5 5M21 9.5l-5 5"
          style={{
            transition: 'opacity 250ms ease',
            opacity: on ? 0 : 1,
          }}
        />
      </svg>
    </button>
  );
}

export default SoundToggle;
