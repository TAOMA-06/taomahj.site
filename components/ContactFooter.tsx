import GlassPanel from '@/components/mim/GlassPanel';
import SectionFrame from '@/components/mim/SectionFrame';

export default function ContactFooter() {
  return (
    <SectionFrame id="contact" label="Contact" floorTick as="footer" className="border-t border-black/10 py-24 md:py-32">
      <GlassPanel variant="strip" className="mim-footer-glass mim-contact-baseline py-12 md:py-16">
        <p className="mim-section-label">联系</p>
        <h2 className="mim-headline mt-6 max-w-4xl">欢迎联系</h2>
        <a href="mailto:taomahj834225@outlook.com" className="mim-btn mt-10">
          发送邮件
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
