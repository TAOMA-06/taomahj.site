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
            我喜欢做两类东西：一种能帮人更快理解信息，一种能让日常的小流程少一点摩擦。
          </p>
          <p className="welcome-copy mim-body mt-6 max-w-3xl">
            所以这个网站不想把自己包装得很满。它更像一张工作台：放着几个完成度不同的项目、正在形成的偏好，以及我会继续打磨的方向。
          </p>
        </div>
      </div>
    </SectionFrame>
  );
}
