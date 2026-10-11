import type { MetadataRoute } from 'next';
import cv from '@/data/cv.json';
import { siteDescription } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${cv.profile.name} — ${cv.profile.headline}`,
    short_name: 'JDG',
    description: siteDescription,
    start_url: '/',
    display: 'standalone',
    lang: 'es-CO',
    background_color: '#050505',
    theme_color: '#050505',
    icons: [{ src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' }],
  };
}
