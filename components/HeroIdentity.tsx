'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionFrame from '@/components/mim/SectionFrame';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { HOME_EASE, isMobileHome, scrubImage, splitHeadlineLines } from '@/components/mim/homeMotion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HeroIdentity() {
  const scope = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !scope.current) return;

      const root = scope.current;
      const kicker = root.querySelector('.exhibit-kicker');
      const title = root.querySelector<HTMLElement>('.mim-display');
      const index = root.querySelector('.exhibit-hero__index');
      const body = root.querySelector('.exhibit-hero__copy .mim-body');
      const buttons = root.querySelectorAll('.exhibit-hero__copy .mim-btn');
      const voidEl = root.querySelector('.material-void');
      const voidImg = root.querySelector<HTMLElement>('.material-void img');
      const caption = root.querySelector('.material-void__caption');

      const tl = gsap.timeline({ defaults: { ease: HOME_EASE.out }, delay: 0.12 });

      if (kicker) {
        tl.fromTo(kicker, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55 }, 0);
      }

      if (title) {
        const lines = splitHeadlineLines(title);
        gsap.set(lines, { yPercent: 115 });
        tl.to(lines, { yPercent: 0, duration: 1, stagger: 0.12, ease: HOME_EASE.expo }, 0.18);
      }

      if (index) {
        tl.fromTo(index, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45 }, 0.55);
      }
      if (body) {
        tl.fromTo(body, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6 }, 0.62);
      }
      if (buttons.length) {
        tl.fromTo(
          buttons,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          0.78
        );
      }

      if (voidEl) {
        tl.fromTo(
          voidEl,
          { clipPath: 'inset(8% 8% 8% 8%)', opacity: 0.4 },
          { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 1.15, ease: HOME_EASE.expo },
          0.2
        );
      }
      if (voidImg && !isMobileHome()) {
        tl.fromTo(
          voidImg,
          { scale: 1.12 },
          { scale: 1.02, duration: 1.6, ease: HOME_EASE.soft },
          0.2
        );
        scrubImage(voidImg, voidEl ?? root, { fromScale: 1.02, toScale: 1.1, yPercent: 10 });
      }
      if (caption) {
        tl.fromTo(caption, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.9);
      }
    },
    { scope, dependencies: [reducedMotion] }
  );

  return (
    <SectionFrame id="hero" label="Entrance hall" elevation="ELEV. 00" className="exhibit-hero">
      <div className="exhibit-hero__layout" ref={scope}>
        <div className="exhibit-hero__title">
          <span className="exhibit-kicker">Independent digital practice</span>
          <h1 className="mim-display mt-6">
            tao
            <br />
            mahj
          </h1>
        </div>
        <div className="exhibit-hero__copy">
          <span className="exhibit-hero__index">01 / INTRODUCTION</span>
          <p className="mim-body">把真实问题，做成值得打开的界面。</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#work" className="mim-btn">
              主要展示
            </a>
            <a
              href="https://github.com/TAOMA-06"
              target="_blank"
              rel="noreferrer"
              className="mim-btn"
            >
              GitHub ↗
            </a>
          </div>
        </div>
        <div className="material-void" aria-label="首页主视觉图片占位区域">
          <img src="/assets/exhibition/hero-atrium.png" alt="天光照亮的混凝土中庭" />
          <span className="material-void__caption">atrium / 2026</span>
        </div>
      </div>
    </SectionFrame>
  );
}
