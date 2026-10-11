// Fechas al estilo de LinkedIn: "sept. 2024", "actualidad"
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

export const startYear = (date: string) => parse(date).year;
