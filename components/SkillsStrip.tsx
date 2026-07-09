import SectionFrame from '@/components/mim/SectionFrame';
import SectionLabel from '@/components/mim/SectionLabel';
import { vocabularyGroups } from '@/data/siteContent';

export default function SkillsStrip() {
  return (
    <SectionFrame id="stack" label="Stack" floorTick className="border-t border-black/10 py-20 md:py-28">
      <SectionLabel>技术</SectionLabel>
      <h2 className="mim-headline mt-6 max-w-3xl">技术与工具</h2>
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
