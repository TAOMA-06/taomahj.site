import SectionFrame from '@/components/mim/SectionFrame';

export default function HeroIdentity() {
  return (
    <SectionFrame id="hero" label="Entrance hall" elevation="ELEV. 00" className="exhibit-hero">
      <div className="exhibit-hero__layout">
        <div className="exhibit-hero__title">
          <span className="exhibit-kicker">Independent digital practice</span>
          <h1 className="mim-display mt-6">tao<br />mahj</h1>
        </div>
        <div className="exhibit-hero__copy">
          <span className="exhibit-hero__index">01 / INTRODUCTION</span>
          <p className="mim-body">把真实问题，做成值得打开的界面。</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#work" className="mim-btn">进入展厅</a>
            <a href="https://github.com/TAOMA-06" target="_blank" rel="noreferrer" className="mim-btn">GitHub ↗</a>
          </div>
        </div>
        <div className="material-void" aria-label="首页主视觉图片占位区域">
          <img src="/assets/exhibition/hero-atrium.png" alt="天光照亮的混凝土中庭" />
          <span className="material-void__caption">atrium / 2026</span>
        </div>
      </div>
    </SectionFrame>
  );
}
