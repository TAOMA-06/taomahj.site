'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionFrame from '@/components/mim/SectionFrame';
import DraftingMotif from '@/components/mim/DraftingMotifs';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { HOME_EASE, revealLines, revealOnce } from '@/components/mim/homeMotion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function IntroWelcome() {
  const scope = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !scope.current) return;

      const root = scope.current;
      const number = root.querySelector('.exhibit-intro__number');
      const headline = root.querySelector<HTMLElement>('.mim-headline');
      const body = root.querySelector('.mim-body');

      if (number) {
        revealOnce(number, { trigger: root, y: 16, duration: 0.55, start: 'top 82%' });
      }
      if (headline) {
        revealLines(headline, { start: 'top 80%' });
      }
      if (body) {
        gsap.fromTo(
          body,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: HOME_EASE.out,
            scrollTrigger: { trigger: body, start: 'top 88%', once: true }
          }
        );
      }
    },
    { scope, dependencies: [reducedMotion] }
  );

  return (
    <div ref={scope}>
      <SectionFrame label="Statement" elevation="+0.00" className="exhibit-intro">
        <DraftingMotif variant="wave" />
        <DraftingMotif variant="mobius" />
        <span className="exhibit-intro__number">02 / POSITION</span>
        <div>
          <p className="mim-headline">
            先把信息摆清楚，
            <br />
            再让操作少绕路。
          </p>
          <p className="mim-body mt-8 max-w-2xl">
            我做可公开试用的小工具与桌面控制面：数据留在本机，界面少干扰，打开就能继续用。
          </p>
        </div>
      </SectionFrame>
    </div>
  );
}
