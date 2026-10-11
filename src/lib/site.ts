import cv from '@/data/cv.json';

// URL pública del sitio: NEXT_PUBLIC_SITE_URL (dominio propio) o el dominio
// de producción que expone Vercel; en local, localhost.
const fromEnv =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined);

export const siteUrl = (fromEnv ?? 'http://localhost:3000').replace(/\/$/, '');

export const siteTitle = `${cv.profile.name} | Desarrollador Fullstack .NET y React`;

export const siteDescription =
  'Juan Diaz Guerrero, ingeniero de sistemas y desarrollador fullstack en Santa Marta, Colombia. Proyectos con .NET, SQL Server y React: conoce mi trabajo';

export const keywords = [
  'desarrollador fullstack',
  'desarrollador .NET',
  'desarrollador React',
  'ingeniero de sistemas',
  'desarrollador web Santa Marta',
  'desarrollador fullstack Colombia',
  'ASP.NET Core',
  'SQL Server',
  'portafolio desarrollador',
  cv.profile.name,
];

export const absolute = (path: string) =>
  path.startsWith('http')
    ? path
    : `${siteUrl}${path.startsWith('/') ? '' : '/'}${path}`;
