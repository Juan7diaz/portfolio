import React from 'react';
import TitleSection from './TitleSection';

function SectionLayout({
  children,
  title,
}: Readonly<{
  children: React.ReactNode;
  title?: string;
}>) {
  return (
    <section className="px-5 pt-3">
      {Boolean(title) && <TitleSection title={title!} />}
      {children}
    </section>
  );
}

export default SectionLayout;
