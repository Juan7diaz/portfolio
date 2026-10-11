'use client';

import { useEffect, useState } from 'react';
import { duration } from '@/lib/dates';

// Se recalcula en el navegador para que "actualidad" no quede congelado
// en la fecha del último build
function Duration({ start, end }: { start: string; end: string }) {
  const [text, setText] = useState(() => duration(start, end));
  useEffect(() => setText(duration(start, end)), [start, end]);
  return <span suppressHydrationWarning>{text}</span>;
}

export default Duration;
