import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/common/Footer';

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
        className={`${inter.className} flex flex-col items-center bg-background sm:mt-5`}
      >
        <main className="w-full max-w-[780px] space-y-10">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
