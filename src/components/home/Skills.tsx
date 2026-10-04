import cv from '@/data/cv.json';
import Section from '@/components/common/Section';
import Reveal from '@/components/ui/Reveal';
import CertScroller, { Cert } from './CertScroller';

function Skills() {
  const certs: Cert[] = cv.certification.map((c) => ({
    title: c.title.replace(/\s*\(.*\)\s*/, ' ').trim(),
    issuer: c.issuer,
    year: c.issueDate.match(/\d{4}/)?.[0] ?? c.issueDate,
    url: c.credentialUrl,
  }));

  return (
    <Section id="skills" number="03" title="Skills & Certs">
      <div className="grid gap-3 md:grid-cols-3">
        {cv.skillGroups.map((g, i) => (
          <Reveal key={g.title} delay={(i + 1) * 80}>
            <div className="group relative h-full border border-line bg-surface p-6 transition-[border-color,transform] duration-300 hover:-translate-y-px hover:border-line-strong">
              <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out-quint group-hover:scale-x-100" />
              <h3 className="mb-3.5 border-b border-line pb-2.5 font-mono text-[9px] uppercase tracking-[0.14em] text-accent">
                {g.title}
              </h3>
              <ul className="flex flex-col gap-1.5">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="group/item flex cursor-default items-center font-mono text-[12px] text-text-secondary transition-colors duration-200 hover:text-text-primary"
                  >
                    <span className="mr-0 h-px w-0 bg-accent transition-all duration-300 ease-out-quint group-hover/item:mr-2 group-hover/item:w-2.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={120}>
        <CertScroller certs={certs} />
      </Reveal>
    </Section>
  );
}

export default Skills;
