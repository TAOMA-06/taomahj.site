import { themes } from '@/data/siteContent';
import SectionFrame from '@/components/mim/SectionFrame';

const labels = ['MAKE', 'ORGANIZE', 'KEEP'];

export default function ApproachSections() {
  return (
    <section id="approach">
      <SectionFrame label="Programme" elevation="03 / 05" className="exhibit-heading">
        <div className="exhibit-heading__note">以功能为基底，把每个项目视为一次关于使用、信息与克制的空间研究。</div>
        <div>
          <p className="exhibit-kicker">Creative direction</p>
          <h2 className="mim-headline mt-5">创作方向</h2>
        </div>
      </SectionFrame>
      <div className="mim-approach-plan">
        {themes.map((theme, index) => (
          <article key={theme.title} className="mim-approach-panel">
            <span className="mim-approach-panel__index">0{index + 1} / {labels[index]}</span>
            <h3>{theme.title}</h3>
            <p className="mt-7">{theme.question}</p>
            <span className="mim-section-label">{theme.related}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
