'use client';

import { useEffect } from 'react';
import { play, setSuspended, unlock } from '@/lib/sound';

const CLICKABLE = 'a, button, [role="button"]';
const HOVERABLE = 'nav a, nav button, .pill, [data-sound-hover]';

// Sonidos por delegación: un "tap" al hacer clic en cualquier enlace o botón
// y un tic muy suave al pasar el ratón sobre la navegación y las píldoras.
// Los elementos con data-sound="custom" reproducen su propio sonido.
function SoundManager() {
  useEffect(() => {
    let lastHovered: Element | null = null;

    const onGesture = () => unlock();

    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.(CLICKABLE);
      if (!el || el.closest('[data-sound="custom"]')) return;
      play('tap');
    };

    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const el = (e.target as Element | null)?.closest?.(HOVERABLE) ?? null;
      if (el && el !== lastHovered) play('hover');
      lastHovered = el;
    };

    const onVisibility = () => setSuspended(document.hidden);

    window.addEventListener('pointerdown', onGesture, { capture: true });
    window.addEventListener('keydown', onGesture, { capture: true });
    document.addEventListener('click', onClick);
    document.addEventListener('pointerover', onOver);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('pointerdown', onGesture, { capture: true });
      window.removeEventListener('keydown', onGesture, { capture: true });
      document.removeEventListener('click', onClick);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return null;
}

export default SoundManager;
