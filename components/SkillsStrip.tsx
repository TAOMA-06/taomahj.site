import SectionFrame from '@/components/mim/SectionFrame';
import { vocabularyGroups } from '@/data/siteContent';

export default function SkillsStrip() {
  return (
    <SectionFrame id="stack" label="Material schedule" elevation="04 / 05" className="exhibit-stack">
      <p className="exhibit-kicker">Tools &amp; systems</p>
      <h2 className="mim-headline mt-5">技术与工具</h2>
      <div className="exhibit-stack__grid">
        {vocabularyGroups.map((group, index) => (
          <section key={group.label} className="exhibit-stack__group">
            <h3>0{index + 1} / {group.label}</h3>
            <div className="mim-skills-room">
              {group.items.map((item) => <span key={item} className="mim-skills-room__cell">{item}</span>)}
            </div>
          </section>
        ))}
      </div>
    </SectionFrame>
  );
}
