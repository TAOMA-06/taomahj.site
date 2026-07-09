import Marquee from '@/components/mim/Marquee';
import GlassPanel from '@/components/mim/GlassPanel';

export default function ManifestoMarquee() {
  return (
    <section className="border-t border-black/10 py-12 md:py-16">
      <GlassPanel variant="strip" className="py-6">
        <Marquee text="数字工具 · 界面设计 · 本地优先 ·" className="mb-6" />
        <Marquee text="数字工具 · 界面设计 · 本地优先 ·" reverse />
      </GlassPanel>
    </section>
  );
}
