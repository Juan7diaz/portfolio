// Fechas al estilo de LinkedIn: "sept. 2024", "1 año 8 meses"
const MONTHS = [
  'ene.',
  'feb.',
  'mar.',
  'abr.',
  'may.',
  'jun.',
  'jul.',
  'ago.',
  'sept.',
  'oct.',
  'nov.',
  'dic.',
];

const CURRENT = ['presente', 'actualidad'];

export const isCurrent = (date: string) =>
  CURRENT.includes(date.trim().toLowerCase());

// "2024-09" -> { year: 2024, month: 8 }; "2024" -> enero; "Presente" -> hoy
const parse = (date: string, now = new Date()) => {
  if (isCurrent(date))
    return { year: now.getFullYear(), month: now.getMonth() };
  const [y, m] = date.split('-').map(Number);
  return { year: y, month: m ? m - 1 : 0 };
};

export const formatMonth = (date: string) => {
  if (isCurrent(date)) return 'actualidad';
  const { year, month } = parse(date);
  return date.includes('-') ? `${MONTHS[month]} ${year}` : String(year);
};

// Meses contados de forma inclusiva, como LinkedIn
export const duration = (start: string, end: string, now = new Date()) => {
  const a = parse(start, now);
  const b = parse(end, now);
  const total = (b.year - a.year) * 12 + (b.month - a.month) + 1;
  const years = Math.floor(total / 12);
  const months = total % 12;
  const parts = [];
  if (years) parts.push(`${years} ${years === 1 ? 'año' : 'años'}`);
  if (months) parts.push(`${months} ${months === 1 ? 'mes' : 'meses'}`);
  return parts.join(' ');
};

export const startYear = (date: string) => parse(date).year;
