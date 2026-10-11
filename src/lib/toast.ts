export const TOAST_EVENT = 'portfolio:toast';

export interface ToastDetail {
  message: string;
}

// Muestra una notificación breve en la parte inferior de la pantalla
export function toast(message: string) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent<ToastDetail>(TOAST_EVENT, { detail: { message } }),
  );
}

// Pequeña vibración en dispositivos que la soportan (feedback háptico)
export function haptic(ms = 12) {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(ms);
  }
}

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
