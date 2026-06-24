'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { themes } from '@/data/siteContent';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Themes() {
  const scope = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.fromTo(
        '.theme-card',
        { opacity: 0, y: 24, scale: 0.985 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.82,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: scope.current,
            start: 'top 68%',
            once: true
          }
        }
      );
    },
    { scope, dependencies: [reducedMotion] }
  );

  return (
    <section id="themes" ref={scope} className="bg-white px-6 py-28 text-ink sm:px-10 lg:px-16 lg:py-40">
      <div className="mx-auto max-w-[1180px]">
        <div className="max-w-4xl">
          <p className="section-kicker">Themes</p>
          <h2 className="mt-5 text-[clamp(44px,6vw,96px)] font-semibold leading-[1.02] tracking-[-0.065em] lg:leading-[0.94]">
            不是博客列表，而是持续形成判断的脉络。
          </h2>
          <p className="mt-8 max-w-3xl text-xl leading-8 tracking-[-0.02em] text-graphite/64">
            我把作品、实验和笔记放在同一条线索里看：它们回答的不是“做了什么”，而是“为什么这样做值得”。
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-[28px] border border-black/10 bg-black/10 md:grid-cols-3">
          {themes.map((theme, index) => (
            <article key={theme.title} className="theme-card bg-white p-7 md:min-h-[420px] md:p-8">
              <span className="text-sm font-semibold text-mist">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="mt-8 text-[clamp(32px,4vw,54px)] font-semibold leading-[0.96] tracking-[-0.055em]">
                {theme.title}
              </h3>
              <p className="mt-8 text-lg font-semibold leading-7 tracking-[-0.025em] text-graphite">
                {theme.question}
              </p>
              <p className="mt-5 text-base leading-7 text-graphite/62">{theme.stance}</p>
              <p className="mt-10 border-t border-black/10 pt-5 text-xs font-semibold uppercase tracking-[0.14em] text-mist">
                {theme.related}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
