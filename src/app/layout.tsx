import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Toaster from '@/components/ui/Toaster';
import cv from '@/data/cv.json';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
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
  themeColor: '#000000',
  colorScheme: 'dark',
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen font-sans">
        <noscript>
          <style>
            {
              '.reveal{opacity:1!important;transform:none!important;filter:none!important}'
            }
          </style>
        </noscript>
        <a
          href="#contenido"
          className="fixed left-4 top-3 z-[60] -translate-y-20 rounded-full bg-accent-strong px-4 py-2 text-sm text-white transition-transform focus:translate-y-0"
        >
          Saltar al contenido
        </a>
        <Navbar />
        <main id="contenido">{children}</main>
        <Footer />
        <Toaster />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
