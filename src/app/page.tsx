import Hero from '@/components/home/Hero';
import Experience from '@/components/home/Experience';
import Projects from '@/components/home/Projects';
import Skills from '@/components/home/Skills';
import JsonLd from '@/components/common/JsonLd';
import cv from '@/data/cv.json';
import { absolute, siteDescription, siteUrl } from '@/lib/site';

const [work] = cv.experience;
const [edu] = cv.education;

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: cv.profile.name,
      description: siteDescription,
      inLanguage: 'es-CO',
      publisher: { '@id': `${siteUrl}/#person` },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${siteUrl}/#profile`,
      url: siteUrl,
      name: `${cv.profile.name} — ${cv.profile.headline}`,
      inLanguage: 'es-CO',
      isPartOf: { '@id': `${siteUrl}/#website` },
      mainEntity: { '@id': `${siteUrl}/#person` },
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: cv.profile.name,
      url: siteUrl,
      image: absolute(cv.profile.avatarLink),
      email: `mailto:${cv.contact.email.value}`,
      jobTitle: cv.profile.headline,
      description: siteDescription,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Santa Marta',
        addressRegion: 'Magdalena',
        addressCountry: 'CO',
      },
      worksFor: work && {
        '@type': 'Organization',
        name: work.company,
        url: work.url,
      },
      alumniOf: edu && {
        '@type': 'CollegeOrUniversity',
        name: edu.instituteName,
      },
      hasCredential: edu && {
        '@type': 'EducationalOccupationalCredential',
        name: edu.degree,
        credentialCategory: 'degree',
      },
      knowsAbout: cv.skillGroups.flatMap((g) => g.items),
      knowsLanguage: 'es',
      sameAs: [cv.contact.linkedin.value, cv.contact.github.value],
    },
  ],
};

export default function AppPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Hero />
      <Experience />
      <Projects />
      <Skills />
    </>
  );
}
