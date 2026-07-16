'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { themes } from '@/data/siteContent';
import SectionFrame from '@/components/mim/SectionFrame';
import DraftingMotif from '@/components/mim/DraftingMotifs';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { HOME_EASE, revealOnce } from '@/components/mim/homeMotion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const labels = ['MAKE', 'ORGANIZE', 'KEEP'];

export default function ApproachSections() {
  const scope = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !scope.current) return;

      const root = scope.current;
      const heading = root.querySelector('.exhibit-heading');
      if (heading) {
        revealOnce(heading.querySelectorAll('.exhibit-heading__note, .exhibit-kicker, .mim-headline'), {
          trigger: heading,
          y: 24,
          duration: 0.7,
          stagger: 0.09,
          start: 'top 82%'
        });
      }

      const panels = root.querySelectorAll<HTMLElement>('.mim-approach-panel');
      panels.forEach((panel, index) => {
        gsap.fromTo(
          panel,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            delay: index * 0.08,
            ease: HOME_EASE.out,
            scrollTrigger: { trigger: panel, start: 'top 88%', once: true }
          }
        );

        const mark = panel.querySelector('.mim-approach-panel__index');
        const h3 = panel.querySelector('h3');
        const p = panel.querySelector('p');
        const label = panel.querySelector('.mim-section-label');

        gsap.fromTo(
          [mark, h3, p, label].filter(Boolean),
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.07,
            ease: HOME_EASE.out,
            scrollTrigger: { trigger: panel, start: 'top 84%', once: true }
          }
        );
      });
    },
    { scope, dependencies: [reducedMotion] }
  );

  return (
    <section id="approach" ref={scope}>
      <SectionFrame label="Programme" elevation="03 / 05" className="exhibit-heading">
        <DraftingMotif variant="beam" />
        <div className="exhibit-heading__note">
          以使用为条件。每个项目是一次结构研究。
        </div>
        <div>
          <p className="exhibit-kicker">Creative direction</p>
          <h2 className="mim-headline mt-5">创作方向</h2>
        </div>
      </SectionFrame>
      <div className="mim-approach-plan">
        {themes.map((theme, index) => (
          <article key={theme.title} className="mim-approach-panel">
            <span className="mim-approach-panel__index">
              0{index + 1} / {labels[index]}
            </span>
            <h3>{theme.title}</h3>
            <p className="mt-7">{theme.question}</p>
            <span className="mim-section-label">{theme.related}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
