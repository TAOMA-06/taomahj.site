'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionFrame from '@/components/mim/SectionFrame';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { HOME_EASE, revealLines, revealOnce } from '@/components/mim/homeMotion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ContactFooter() {
  const scope = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !scope.current) return;

      const root = scope.current;
      const label = root.querySelector('.mim-section-label');
      const headline = root.querySelector<HTMLElement>('.mim-headline');
      const btn = root.querySelector('.mim-btn');
      const meta = root.querySelectorAll('.exhibit-contact__meta > *');
      const foot = root.querySelector('.exhibit-contact__foot');

      if (label) {
        revealOnce(label, { trigger: root, y: 14, duration: 0.5, start: 'top 80%' });
      }
      if (headline) {
        revealLines(headline, { start: 'top 82%' });
      }
      if (btn) {
        gsap.fromTo(
          btn,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: HOME_EASE.out,
            scrollTrigger: { trigger: btn, start: 'top 92%', once: true }
          }
        );
      }
      if (meta.length) {
        revealOnce(meta, { trigger: root, y: 18, duration: 0.55, stagger: 0.08, start: 'top 78%' });
      }
      if (foot) {
        gsap.fromTo(
          foot,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            scrollTrigger: { trigger: foot, start: 'top 96%', once: true }
          }
        );
      }
    },
    { scope, dependencies: [reducedMotion] }
  );

  return (
    <div ref={scope}>
      <SectionFrame id="contact" label="Exit" elevation="05 / 05" as="footer" className="exhibit-contact">
        <div className="exhibit-contact__inside">
          <div>
            <p className="mim-section-label">Contact / appointment</p>
            <h2 className="mim-headline mt-6">
              下一次对话，
              <br />
              从这里开始。
            </h2>
            <a href="mailto:taomahj834225@outlook.com" className="mim-btn mt-10">
              发送邮件
            </a>
          </div>
          <div className="exhibit-contact__meta">
            <span>taomahj 是一个专注数字工具与界面结构的独立实践。</span>
            <a href="https://github.com/TAOMA-06" target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </div>
          <div className="exhibit-contact__foot">
            <span>taomahj / 2026</span>
            <span>Shanghai / CN</span>
          </div>
        </div>
      </SectionFrame>
    </div>
  );
}
