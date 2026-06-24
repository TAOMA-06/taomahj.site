'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const lines = [
  '我喜欢把复杂系统拆成清楚的界面，',
  '让工具在浏览器里安静地完成工作。',
  '关注控制、自动化、AI 工具链，',
  '也关注一个产品是否足够轻、足够耐看。'
];

export default function About() {
  const scope = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.fromTo(
        '.about-line',
        { opacity: 0, y: 28, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.11,
          scrollTrigger: {
            trigger: scope.current,
            start: 'top 70%',
            once: true
          }
        }
      );
    },
    { scope, dependencies: [reducedMotion] }
  );

  return (
    <section id="about" ref={scope} className="bg-white px-6 py-28 text-ink sm:px-10 lg:px-16 lg:py-40">
      <div className="mx-auto grid max-w-[1180px] gap-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div>
          <p className="section-kicker">About</p>
          <div className="mt-8 overflow-hidden rounded-[24px] bg-fog">
            <img src="/assets/avatar.jpg" alt="taomahj portrait" className="aspect-[4/5] w-full object-cover grayscale" />
          </div>
        </div>
        <div>
          <h2 className="text-[clamp(42px,6vw,92px)] font-semibold leading-[0.95] tracking-[-0.065em]">
            Engineering taste, quietly applied.
          </h2>
          <div className="mt-12 space-y-3 text-[clamp(26px,3.3vw,48px)] font-semibold leading-[1.08] tracking-[-0.055em] text-graphite">
            {lines.map((line) => (
              <div key={line} className="overflow-hidden">
                <span className="about-line block">{line}</span>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-2xl text-lg leading-8 text-graphite/64">
            这里不是把所有东西都摆满，而是把能代表思考方式的作品放在最前面：它们应该清楚、有节奏，也能直接被使用。
          </p>
        </div>
      </div>
    </section>
  );
}
