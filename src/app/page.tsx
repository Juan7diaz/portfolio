import AboutMe from '@/components/AboutMe/AboutMe';
import Certifications from '@/components/Certifications/Certifications';
import Education from '@/components/Education/Education';
import ProfileCard from '@/components/Profile/ProfileCard';
import Projects from '@/components/Project/Projects';
import Skill from '@/components/Skill/Skill';
import SectionLayout from '@/components/common/SectionLayout';

export default function AppPage() {
  return (
    <>
      <ProfileCard />

      <SectionLayout title="Acerca de">
        <AboutMe />
      </SectionLayout>

      <SectionLayout title="Educación">
        <Education />
      </SectionLayout>

      <SectionLayout title="Proyectos">
        <Projects />
      </SectionLayout>

      <SectionLayout title="Habilidades">
        <Skill />
      </SectionLayout>

      <SectionLayout title="Certificaciones">
        <Certifications />
      </SectionLayout>
    </>
  );
}
