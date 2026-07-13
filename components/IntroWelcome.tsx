import SectionFrame from '@/components/mim/SectionFrame';

export default function IntroWelcome() {
  return (
    <SectionFrame label="Statement" elevation="+0.00" className="exhibit-intro">
      <span className="exhibit-intro__number">02 / POSITION</span>
      <div>
        <p className="mim-headline">让信息可浏览，<br />让流程少摩擦。</p>
        <p className="mim-body mt-8 max-w-2xl">我将数据、工具与日常场景组织成稳定的数字空间：少一点打扰，多一点清晰与持续使用的理由。</p>
      </div>
    </SectionFrame>
  );
}
