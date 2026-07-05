'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionFrame from '@/components/mim/SectionFrame';
import SectionLabel from '@/components/mim/SectionLabel';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const notes = [
  'AI 不是替代判断，而是放大判断的系统。',
  '自动化的价值在于让复杂过程重新可见。',
  '个人工具应该轻到能进入日常，稳到能被长期使用。'
];

export default function StudioStory() {
  const scope = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.utils.toArray<HTMLElement>('.story-note').forEach((note) => {
        gsap.fromTo(
          note,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: note, start: 'top 82%', once: true }
          }
        );
      });
    },
    { scope, dependencies: [reducedMotion] }
  );

  return (
    <SectionFrame label="Studio" sectionCut floorTick className="border-t border-black/10 py-24 md:py-36">
      <div ref={scope}>
        <SectionLabel>The studio</SectionLabel>
        <h2 className="mim-headline mt-6 max-w-3xl">Scroll to explore more</h2>
        <div className="mt-16 space-y-12">
          {notes.map((note, index) => (
            <div key={note} className="story-note border-t border-black/10 pt-8">
              <span className="mim-section-label">{String(index + 1).padStart(2, '0')}</span>
              <p className="mt-4 max-w-3xl text-[clamp(24px,4vw,40px)] font-semibold leading-tight tracking-[-0.04em]">
                {note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
