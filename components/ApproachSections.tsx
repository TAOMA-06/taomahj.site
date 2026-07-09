'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionLabel from '@/components/mim/SectionLabel';
import { themes } from '@/data/siteContent';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const labels = ['MAKE', 'ORGANIZE', 'KEEP'];
const drawingIndex = ['A', 'B', 'C'];

export default function ApproachSections() {
  const scope = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.utils.toArray<HTMLElement>('.approach-panel').forEach((panel) => {
        gsap.fromTo(
          panel,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: panel, start: 'top 85%', once: true }
          }
        );
      });
    },
    { scope, dependencies: [reducedMotion] }
  );

  return (
    <section id="approach" ref={scope} className="mim-floor-tick border-t border-black/10 bg-cream">
      <div className="mim-section py-20 md:py-28">
        <SectionLabel>关于</SectionLabel>
        <h2 className="mim-headline mt-6 max-w-3xl">创作方向</h2>
      </div>

      <div className="mim-section mim-approach-plan border-t border-black/10 pb-20 md:grid-cols-3 md:pb-28">
        {themes.map((theme, index) => (
          <article key={theme.title} className="approach-panel mim-approach-panel mim-glass is-active">
            <span className="mim-approach-panel__index" aria-hidden="true">
              {drawingIndex[index]}
            </span>
            <p className="mim-section-label">
              {drawingIndex[index]} · {labels[index]}
            </p>
            <h3 className="mt-5 text-[clamp(28px,4vw,44px)] font-semibold leading-tight tracking-[-0.04em]">{theme.title}</h3>
            <p className="mt-6 text-lg font-semibold leading-relaxed tracking-[-0.02em]">{theme.question}</p>
            <p className="mt-8 border-t border-black/10 pt-4 text-xs font-semibold uppercase tracking-[0.14em] text-mist">
              {theme.related}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
