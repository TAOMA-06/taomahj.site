import SmoothScrollProvider from '@/components/mim/SmoothScrollProvider';
import ArchitecturalBackdrop from '@/components/mim/ArchitecturalBackdrop';
import ArchScrollProgress from '@/components/mim/ArchScrollProgress';
import ArchScrollSync from '@/components/mim/ArchScrollSync';
import LightAtmosphere from '@/components/mim/LightAtmosphere';
import LiquidFilter from '@/components/mim/LiquidFilter';
import PageTransition from '@/components/mim/PageTransition';
import SiteNav from '@/components/SiteNav';
import HeroIdentity from '@/components/HeroIdentity';
import IntroWelcome from '@/components/IntroWelcome';
import ApproachSections from '@/components/ApproachSections';
import WorkShowcase from '@/components/WorkShowcase';
import SkillsStrip from '@/components/SkillsStrip';
import ContactFooter from '@/components/ContactFooter';

export default function HomeShell() {
  return (
    <SmoothScrollProvider>
      <LiquidFilter />
      <ArchitecturalBackdrop />
      <LightAtmosphere />
      <ArchScrollProgress />
      <ArchScrollSync />
      <PageTransition />
      <SiteNav />
      <main className="mim-main-content bg-cream text-ink">
        <HeroIdentity />
        <IntroWelcome />
        <ApproachSections />
        <WorkShowcase />
        <SkillsStrip />
        <ContactFooter />
      </main>
    </SmoothScrollProvider>
  );
}
