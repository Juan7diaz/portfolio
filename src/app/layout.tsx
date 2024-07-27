import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/common/Footer';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Logo from '@/components/common/Logo';
import { Analytics } from "@vercel/analytics/react"


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Juan Diaz',
  description: 'Juan Diaz personal website',
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} relative flex flex-col items-center bg-background sm:mt-5`}
      >
        <main className="w-full max-w-[800px] space-y-10">{children}</main>
        <div className="fixed -bottom-4 -right-20 -z-10 p-4">
          <Logo color="#588ffb1a" />
        </div>
        <Footer />
        <SpeedInsights />
        <Analytics/>
      </body>
    </html>
  );
}
