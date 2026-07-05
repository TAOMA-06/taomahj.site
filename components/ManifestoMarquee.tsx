import Marquee from '@/components/mim/Marquee';
import GlassPanel from '@/components/mim/GlassPanel';
import SectionLabel from '@/components/mim/SectionLabel';

export default function ManifestoMarquee() {
  return (
    <section className="border-t border-black/10 py-20 md:py-28">
      <div className="mim-section pb-12">
        <SectionLabel>Studio belief</SectionLabel>
        <h2 className="mim-headline mt-6 max-w-4xl">把工具做成思考方式。</h2>
      </div>
      <GlassPanel variant="strip" className="py-6">
        <Marquee text="查看作品 · See work ·" className="mb-6" />
        <Marquee text="查看作品 · See work ·" reverse />
      </GlassPanel>
    </section>
  );
}
