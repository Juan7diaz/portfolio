import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, JetBrains_Mono, Outfit } from 'next/font/google';
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import Navbar from '@/components/layout/Navbar';
import Contact from '@/components/layout/Contact';
import Preloader from '@/components/layout/Preloader';
import Cursor from '@/components/layout/Cursor';
import SoundManager from '@/components/layout/SoundManager';
// import ScrollThread from '@/components/layout/ScrollThread';
import Toaster from '@/components/ui/Toaster';
import cv from '@/data/cv.json';

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-serif',
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-mono',
});
const sans = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-sans',
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${cv.profile.name} — ${cv.profile.headline}`,
    template: `%s — ${cv.profile.name}`,
  },
  description: cv.profile.description,
  openGraph: {
    title: cv.profile.name,
    description: cv.profile.description,
    images: [cv.profile.bannerLink],
    locale: 'es_CO',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#050505' },
    { media: '(prefers-color-scheme: light)', color: '#f4f1ec' },
  ],
};

// Se ejecuta antes del primer pintado:
// 1) aplica el tema guardado (o el del sistema) para evitar parpadeos;
// 2) si ya se vio el preloader en esta sesión (o se prefiere menos
//    movimiento) se omite y el hero arranca directo.
const bootScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('jdg-theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}d.setAttribute('data-theme',t);}catch(e){}try{if(sessionStorage.getItem('jdg-preloaded')||matchMedia('(prefers-reduced-motion: reduce)').matches){d.setAttribute('data-preloaded','');d.setAttribute('data-ready','');}}catch(e){d.setAttribute('data-preloaded','');d.setAttribute('data-ready','');}})();`;

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-theme="dark"
      className={`${serif.variable} ${mono.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* eslint-disable-next-line react/no-danger */}
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="relative min-h-screen">
        <noscript>
          <style>
            {
              '.preloader{display:none!important}.await-ready{animation-play-state:running!important}.reveal{opacity:1!important;transform:none!important}'
            }
          </style>
        </noscript>
        <Preloader />
        <a
          href="#contenido"
          className="fixed left-4 top-4 z-[150] -translate-y-24 rounded-full bg-accent px-4 py-2 font-mono text-[11px] text-background transition-transform focus:translate-y-0"
        >
          Saltar al contenido
        </a>
        <Navbar />
        <main id="contenido">{children}</main>
        <Contact />
        {/* <ScrollThread /> */}
        <Cursor />
        <SoundManager />
        <Toaster />
        <div aria-hidden className="grain" />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
