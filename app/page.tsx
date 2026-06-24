import Contact from '@/components/Contact';
import FeaturedProjects from '@/components/FeaturedProjects';
import Hero from '@/components/Hero';
import ProjectCards from '@/components/ProjectCards';
import Skills from '@/components/Skills';
import Themes from '@/components/Themes';

export default function Home() {
  return (
    <main>
      <Hero />
      <Themes />
      <FeaturedProjects />
      <ProjectCards />
      <Skills />
      <Contact />
    </main>
  );
}
