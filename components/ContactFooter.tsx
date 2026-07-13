import SectionFrame from '@/components/mim/SectionFrame';

export default function ContactFooter() {
  return (
    <SectionFrame id="contact" label="Exit" elevation="05 / 05" as="footer" className="exhibit-contact">
      <div className="exhibit-contact__inside">
        <div>
          <p className="mim-section-label">Contact / appointment</p>
          <h2 className="mim-headline mt-6">下一次对话，<br />从这里开始。</h2>
          <a href="mailto:taomahj834225@outlook.com" className="mim-btn mt-10">发送邮件</a>
        </div>
        <div className="exhibit-contact__meta">
          <span>taomahj 是一个专注数字工具与界面结构的独立实践。</span>
          <a href="https://github.com/TAOMA-06" target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
        <div className="exhibit-contact__foot"><span>taomahj / 2026</span><span>Shanghai / CN</span></div>
      </div>
    </SectionFrame>
  );
}
