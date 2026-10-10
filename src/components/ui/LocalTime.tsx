'use client';

import { useEffect, useState } from 'react';

const formatter = new Intl.DateTimeFormat('es-CO', {
  timeZone: 'America/Bogota',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

// Hora de Colombia en vivo (HH:MM:SS). Se pinta en cliente para evitar
// desajustes de hidratación.
function LocalTime({ className = '' }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    // Alinea el tic con el cambio real de segundo
    let interval = 0;
    const timeout = window.setTimeout(
      () => {
        setNow(new Date());
        interval = window.setInterval(() => setNow(new Date()), 1000);
      },
      1000 - (Date.now() % 1000),
    );
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <time
      dateTime={now?.toISOString()}
      className={`tabular-nums ${className}`}
      suppressHydrationWarning
    >
      {now ? formatter.format(now) : '--:--:--'}
    </time>
  );
}

export default LocalTime;
