import Image from 'next/image';
import cv from '@/data/cv.json';
import getAllFiles from '@/utils/getAllFiles';
import Section from '@/components/common/Section';
import Reveal from '@/components/ui/Reveal';
import ScrollText from '@/components/ui/ScrollText';
import SpotlightCard from '@/components/ui/SpotlightCard';
import CountUp from '@/components/ui/CountUp';
import LocalTime from '@/components/ui/LocalTime';

const card =
  'h-full rounded-[28px] border border-white/[0.06] bg-surface p-6 transition-colors duration-500 hover:bg-surface-raised md:p-7';

function About() {
  const stats = [
    { value: getAllFiles('projects').length, label: 'Proyectos publicados' },
    { value: cv.skill.length, label: 'Tecnologías en mi stack' },
    { value: cv.certification.length, label: 'Certificaciones' },
  ];
  const [edu] = cv.education;

  return (
    <Section id="sobre-mi" eyebrow="Sobre mí">
      <ScrollText
        text={cv.about.summary}
        className="text-[26px] font-semibold leading-[1.25] tracking-display text-text-primary md:text-[40px] md:leading-[1.18]"
      />

      <div className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4">
        {edu && (
          <Reveal className="col-span-2 md:row-span-2">
            <SpotlightCard
              className={`${card} flex flex-col justify-between gap-10`}
            >
              <div className="flex items-center gap-4">
                <Image
                  src={edu.linkImg}
                  alt={`Logo de la ${edu.instituteName}`}
                  width={96}
                  height={96}
                  className="h-12 w-12 rounded-2xl bg-white object-contain p-1"
                />
                <p className="text-sm text-text-tertiary">
                  {edu.startDate} — {edu.endDate}
                </p>
              </div>
              <div>
                <p className="text-2xl font-semibold tracking-display text-text-primary md:text-4xl">
                  {edu.degree}
                </p>
                <p className="mt-2 text-text-secondary md:text-lg">
                  {edu.instituteName}
                </p>
              </div>
            </SpotlightCard>
          </Reveal>
        )}

        {stats.map((s, i) => (
          <Reveal key={s.label} delay={(i + 1) * 90}>
            <SpotlightCard
              className={`${card} flex flex-col justify-between gap-10`}
            >
              <p className="text-gradient text-[56px] font-semibold leading-none tracking-tightest">
                <CountUp value={s.value} />
              </p>
              <p className="text-[15px] leading-snug text-text-secondary">
                {s.label}
              </p>
            </SpotlightCard>
          </Reveal>
        ))}

        <Reveal delay={(stats.length + 1) * 90}>
          <SpotlightCard
            className={`${card} flex flex-col justify-between gap-10`}
          >
            <p className="text-[40px] font-semibold leading-none tracking-tightest text-text-primary">
              <LocalTime />
            </p>
            <p className="text-[15px] leading-snug text-text-secondary">
              Hora local en {cv.profile.location.split(',')[0]}
            </p>
          </SpotlightCard>
        </Reveal>
      </div>
    </Section>
  );
}

export default About;
