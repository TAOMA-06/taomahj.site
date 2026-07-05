import SectionLabel from '@/components/mim/SectionLabel';
import { themes } from '@/data/siteContent';

const labels = ['MAKE', 'ORGANIZE', 'KEEP'];
const drawingIndex = ['A', 'B', 'C'];

export default function ApproachSections() {
  return (
    <section id="approach" className="mim-floor-tick border-t border-black/10 bg-cream">
      <div className="mim-section py-20 md:py-28">
        <SectionLabel>About</SectionLabel>
        <div className="mt-6 grid gap-8 md:grid-cols-[0.85fr_1fr] md:items-end">
          <h2 className="mim-headline max-w-3xl">我现在主要在做这些事情。</h2>
          <p className="mim-body max-w-2xl md:justify-self-end">
            比起把自己写成一串标签，我更想让你知道我会被什么问题吸引，以及我会怎样把它做出来。
          </p>
        </div>
      </div>

      <div className="mim-section mim-approach-plan border-t border-black/10 pb-20 md:grid-cols-3 md:pb-28">
        {themes.map((theme, index) => (
          <article key={theme.title} className="mim-approach-panel mim-glass is-active">
            <span className="mim-approach-panel__index" aria-hidden="true">
              {drawingIndex[index]}
            </span>
            <p className="mim-section-label">
              {drawingIndex[index]} · {labels[index]}
            </p>
            <h3 className="mt-5 text-[clamp(28px,4vw,44px)] font-semibold leading-tight tracking-[-0.04em]">{theme.title}</h3>
            <p className="mt-6 text-lg font-semibold leading-relaxed tracking-[-0.02em]">{theme.question}</p>
            <p className="mt-4 text-base font-medium leading-relaxed text-mist">{theme.stance}</p>
            <p className="mt-8 border-t border-black/10 pt-4 text-xs font-semibold uppercase tracking-[0.14em] text-mist">
              {theme.related}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
