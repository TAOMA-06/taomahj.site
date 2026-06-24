'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const scope = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
      timeline.fromTo(
        '.hero-sequence',
        { opacity: 0, y: 32, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.05,
          stagger: 0.16
        }
      );
    },
    { scope, dependencies: [reducedMotion] }
  );

  return (
    <section ref={scope} className="relative min-h-screen overflow-hidden bg-fog text-ink">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col justify-between px-6 py-7 sm:px-10 lg:px-16">
        <nav className="flex items-center justify-between text-[13px] font-medium tracking-[-0.01em] text-graphite/75">
          <a href="#" aria-label="taomahj home" className="font-semibold text-graphite">
            taomahj
          </a>
          <div className="hidden items-center gap-8 sm:flex">
            <a className="nav-item" href="#about">
              About
            </a>
            <a className="nav-item" href="#featured">
              Work
            </a>
            <a className="nav-item" href="#skills">
              Skills
            </a>
            <a className="nav-item" href="#contact">
              Contact
            </a>
          </div>
        </nav>

        <div className="grid items-end gap-12 pb-14 pt-24 lg:grid-cols-[minmax(0,1fr)_420px] lg:pb-20">
          <div className="max-w-5xl">
            <p className="hero-sequence mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-mist">
              Portfolio / 2026
            </p>
            <h1 className="hero-sequence max-w-6xl text-[clamp(64px,12vw,180px)] font-semibold leading-[0.84] tracking-[-0.075em] text-ink">
              Calm tools.
              <br />
              Clear systems.
            </h1>
            <p className="hero-sequence mt-8 max-w-2xl text-[clamp(20px,2.2vw,32px)] font-medium leading-[1.18] tracking-[-0.035em] text-graphite/72">
              我是 taomahj，自动化专业本科生。把 Web 应用、AI 工作流和硬件思维，做成可以直接打开体验的作品。
            </p>
            <div className="hero-sequence mt-10 flex flex-wrap items-center gap-4">
              <a href="#featured" className="apple-button">
                查看主打项目
              </a>
              <a href="mailto:taomahj834225@outlook.com" className="text-link">
                联系我
              </a>
            </div>
          </div>

          <div className="hero-sequence hidden rounded-[28px] border border-black/10 bg-white/70 p-4 shadow-[0_40px_120px_rgba(0,0,0,0.08)] lg:block">
            <img
              src="/assets/projects/mixflow.jpg"
              alt="MixFlow project preview"
              className="aspect-[4/3] w-full rounded-[20px] object-cover"
            />
            <div className="flex items-center justify-between px-2 pb-1 pt-4 text-sm text-graphite/70">
              <span>Featured work</span>
              <span>01 / MixFlow</span>
            </div>
          </div>
        </div>

        <div className="hero-sequence flex flex-wrap gap-x-6 gap-y-2 border-t border-black/10 pt-5 text-xs font-medium uppercase tracking-[0.18em] text-mist">
          <span>Next.js</span>
          <span>GSAP</span>
          <span>Local-first</span>
          <span>AI Workflow</span>
        </div>
      </div>
    </section>
  );
}
