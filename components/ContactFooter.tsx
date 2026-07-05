import GlassPanel from '@/components/mim/GlassPanel';
import SectionFrame from '@/components/mim/SectionFrame';

export default function ContactFooter() {
  return (
    <SectionFrame id="contact" label="Contact" floorTick as="footer" className="border-t border-black/10 py-24 md:py-32">
      <GlassPanel variant="strip" className="mim-footer-glass mim-contact-baseline py-12 md:py-16">
        <p className="mim-section-label">Contact</p>
        <h2 className="mim-headline mt-6 max-w-4xl">如果你看完以后想聊聊作品、工具或新的想法。</h2>
        <p className="mim-body mt-6 max-w-2xl">
          可以直接写信给我，也可以从 GitHub 看更多细节。我很乐意听到真实的反馈。
        </p>
        <a href="mailto:taomahj834225@outlook.com" className="mim-btn mt-10">
          写信给我
        </a>
        <div className="mt-20 flex flex-wrap justify-between gap-4 border-t border-black/10 pt-6 text-sm text-mist">
          <span>taomahj / 2026</span>
          <a href="https://github.com/TAOMA-06" target="_blank" rel="noreferrer" className="font-semibold text-ink hover:opacity-70">
            GitHub
          </a>
        </div>
      </GlassPanel>
    </SectionFrame>
  );
}
