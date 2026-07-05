import SectionFrame from '@/components/mim/SectionFrame';
import SectionLabel from '@/components/mim/SectionLabel';
import { vocabularyGroups } from '@/data/siteContent';

export default function SkillsStrip() {
  return (
    <SectionFrame id="stack" label="Stack" floorTick className="border-t border-black/10 py-20 md:py-28">
      <SectionLabel>Stack</SectionLabel>
      <h2 className="mim-headline mt-6 max-w-3xl">我常用的工具和技术。</h2>
      <p className="mim-body mt-6 max-w-3xl">
        我会按问题选择工具：先把体验和数据结构想清楚，再决定它应该是网页、脚本、自动化流程，还是一个更完整的产品原型。
      </p>
      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {vocabularyGroups.map((group) => (
          <div key={group.label} className="border-t border-black/10 pt-6">
            <h3 className="mim-section-label">{group.label}</h3>
            <div className="mim-skills-room mt-4">
              {group.items.map((item) => (
                <span key={item} className="mim-skills-room__cell">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionFrame>
  );
}
