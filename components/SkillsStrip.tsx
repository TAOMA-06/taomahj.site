'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionFrame from '@/components/mim/SectionFrame';
import { vocabularyGroups } from '@/data/siteContent';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { HOME_EASE, revealOnce } from '@/components/mim/homeMotion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function SkillsStrip() {
  const scope = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !scope.current) return;

      const root = scope.current;
      revealOnce(root.querySelectorAll('.exhibit-kicker, .mim-headline'), {
        trigger: root,
        y: 22,
        duration: 0.65,
        stagger: 0.08,
        start: 'top 84%'
      });

      root.querySelectorAll<HTMLElement>('.exhibit-stack__group').forEach((group, i) => {
        gsap.fromTo(
          group,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            delay: i * 0.06,
            ease: HOME_EASE.out,
            scrollTrigger: { trigger: group, start: 'top 90%', once: true }
          }
        );

        const cells = group.querySelectorAll('.mim-skills-room__cell');
        gsap.fromTo(
          cells,
          { opacity: 0, y: 10, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            stagger: 0.035,
            ease: HOME_EASE.out,
            scrollTrigger: { trigger: group, start: 'top 86%', once: true }
          }
        );
      });
    },
    { scope, dependencies: [reducedMotion] }
  );

  return (
    <div ref={scope}>
      <SectionFrame id="stack" label="Material schedule" elevation="04 / 05" className="exhibit-stack">
        <p className="exhibit-kicker">Tools &amp; systems</p>
        <h2 className="mim-headline mt-5">技术与工具</h2>
        <div className="exhibit-stack__grid">
          {vocabularyGroups.map((group, index) => (
            <section key={group.label} className="exhibit-stack__group">
              <h3>
                0{index + 1} / {group.label}
              </h3>
              <div className="mim-skills-room">
                {group.items.map((item) => (
                  <span key={item} className="mim-skills-room__cell">
                    {item}
                  </span>
                ))}
              </div>
            </section>
          ))}
        </div>
      </SectionFrame>
    </div>
  );
}
