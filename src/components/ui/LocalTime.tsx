'use client';

import { useEffect, useState } from 'react';

const formatter = new Intl.DateTimeFormat('es-CO', {
  timeZone: 'America/Bogota',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
});

// Hora local en vivo (se renderiza en cliente para evitar desajustes de hidratación)
function LocalTime() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) {
    return (
      <span className="inline-block h-[1em] w-24 animate-pulse rounded-md bg-white/10 align-middle" />
    );
  }

  const parts = formatter.formatToParts(now);
  const hour = parts.find((p) => p.type === 'hour')?.value;
  const minute = parts.find((p) => p.type === 'minute')?.value;
  const period = parts
    .filter((p) => p.type === 'dayPeriod')
    .map((p) => p.value)
    .join('');

  return (
    <time dateTime={now.toISOString()} className="tabular-nums">
      {hour}
      <span className="animate-pulse">:</span>
      {minute}
      <span className="ml-1.5 text-[0.4em] font-medium tracking-normal text-text-tertiary">
        {period}
      </span>
    </time>
  );
}

export default LocalTime;
