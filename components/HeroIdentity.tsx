'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import DisplayType from '@/components/mim/DisplayType';
import SectionFrame from '@/components/mim/SectionFrame';
import SectionLabel from '@/components/mim/SectionLabel';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(useGSAP);

export default function HeroIdentity() {
  const scope = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.fromTo('.hero-line', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' });
    },
    { scope, dependencies: [reducedMotion] }
  );

  return (
    <SectionFrame
      id="hero"
      label="Hero"
      elevation="LEVEL 01"
      showGrid
      floorPlate
      floorTick
      className="flex min-h-screen flex-col justify-center pb-20 pt-32 md:justify-end md:pb-24"
    >
      <svg className="mim-hero-axis" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="8" fill="none" stroke="currentColor" strokeWidth="1" />
        <line x1="60" y1="10" x2="60" y2="110" stroke="currentColor" strokeWidth="1" />
        <line x1="10" y1="60" x2="110" y2="60" stroke="currentColor" strokeWidth="1" />
      </svg>
      <div ref={scope}>
        <SectionLabel className="hero-line">数字工具 · 界面设计</SectionLabel>
        <DisplayType className="hero-line mim-hero-shadow mt-8">
          <span className="block">taomahj</span>
        </DisplayType>
        <div className="hero-line mt-8 max-w-4xl">
          <p className="text-[clamp(24px,4vw,44px)] font-semibold leading-tight tracking-[-0.03em]">
            把真实问题，做成值得打开的界面。
          </p>
        </div>
        <div className="hero-line mt-10 flex flex-wrap items-center gap-4 md:gap-6">
          <a href="#work" className="mim-btn">
            浏览作品
          </a>
          <a href="https://github.com/TAOMA-06" target="_blank" rel="noreferrer" className="text-xs font-bold uppercase tracking-[0.16em] text-mist transition-opacity hover:opacity-70">
            GitHub
          </a>
        </div>
      </div>
    </SectionFrame>
  );
}
