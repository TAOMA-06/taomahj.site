import SmoothScrollProvider from '@/components/mim/SmoothScrollProvider';
import PageTransition from '@/components/mim/PageTransition';
import HomeScrollProgress from '@/components/mim/HomeScrollProgress';
import SiteNav from '@/components/SiteNav';
import HeroIdentity from '@/components/HeroIdentity';
import IntroWelcome from '@/components/IntroWelcome';
import ManifestoMarquee from '@/components/ManifestoMarquee';
import ApproachSections from '@/components/ApproachSections';
import WorkShowcase from '@/components/WorkShowcase';
import SkillsStrip from '@/components/SkillsStrip';
import ContactFooter from '@/components/ContactFooter';

export default function HomeShell() {
  return (
    <SmoothScrollProvider>
      <PageTransition />
      <HomeScrollProgress />
      <SiteNav />
      <main className="mim-main-content">
        <HeroIdentity />
        <IntroWelcome />
        <ManifestoMarquee />
        <ApproachSections />
        <WorkShowcase />
        <SkillsStrip />
        <ContactFooter />
      </main>
    </SmoothScrollProvider>
  );
}
