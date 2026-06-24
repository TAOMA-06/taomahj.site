'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { vocabularyGroups } from '@/data/siteContent';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Skills() {
  const scope = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.fromTo(
        '.skill-pill',
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.48,
          ease: 'power3.out',
          stagger: 0.055,
          scrollTrigger: {
            trigger: scope.current,
            start: 'top 72%',
            once: true
          }
        }
      );
    },
    { scope, dependencies: [reducedMotion] }
  );

  return (
    <section id="skills" ref={scope} className="bg-[#f5f5f7] px-6 py-28 text-ink sm:px-10 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1180px]">
        <p className="section-kicker">Working Vocabulary</p>
        <h2 className="mt-5 max-w-4xl text-[clamp(44px,6vw,92px)] font-semibold leading-[0.95] tracking-[-0.065em]">
          技术栈不是标签，而是我组织问题的词汇。
        </h2>
        <div className="mt-14 grid gap-px overflow-hidden rounded-[28px] border border-black/10 bg-black/10 md:grid-cols-2">
          {vocabularyGroups.map((group) => (
            <section key={group.label} className="bg-white p-7 md:p-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-mist">{group.label}</h3>
              <div className="mt-7 flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <span key={item} className="skill-pill rounded-full bg-[#f5f5f7] px-5 py-3 text-sm font-semibold tracking-[-0.01em] text-graphite shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]">
                    {item}
                  </span>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
