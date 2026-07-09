'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionFrame from '@/components/mim/SectionFrame';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function IntroWelcome() {
  const scope = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.fromTo(
        '.welcome-copy',
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: scope.current, start: 'top 75%', once: true }
        }
      );
    },
    { scope, dependencies: [reducedMotion] }
  );

  return (
    <SectionFrame label="Intro" elevation="+0.00" floorTick className="border-t border-black/10 py-20 md:py-28">
      <div ref={scope} className="grid gap-10 md:grid-cols-[0.55fr_1fr] md:items-start">
        <span className="mim-elevation-label hidden md:block" aria-hidden="true">
          +0.00
        </span>
        <div>
          <p className="welcome-copy text-[clamp(24px,4vw,42px)] font-semibold leading-tight tracking-[-0.03em]">
            让信息可浏览，让流程少摩擦。
          </p>
        </div>
      </div>
    </SectionFrame>
  );
}
