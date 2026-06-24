import About from '@/components/About';
import Contact from '@/components/Contact';
import FeaturedProjects from '@/components/FeaturedProjects';
import Hero from '@/components/Hero';
import ProjectCards from '@/components/ProjectCards';
import Skills from '@/components/Skills';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <FeaturedProjects />
      <ProjectCards />
      <Skills />
      <Contact />
    </main>
  );
}
