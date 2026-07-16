'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Marquee from '@/components/mim/Marquee';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { HOME_EASE } from '@/components/mim/homeMotion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ManifestoMarquee() {
  const scope = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !scope.current) return;

      gsap.fromTo(
        scope.current,
        { opacity: 0, scaleY: 0.85, transformOrigin: 'center center' },
        {
          opacity: 1,
          scaleY: 1,
          duration: 0.7,
          ease: HOME_EASE.out,
          scrollTrigger: { trigger: scope.current, start: 'top 92%', once: true }
        }
      );
    },
    { scope, dependencies: [reducedMotion] }
  );

  return (
    <section className="mim-manifesto" aria-label="创作关键词" ref={scope}>
      <Marquee text="实用工具 · 信息组织 · 克制界面 · 本地优先 · " />
    </section>
  );
}
