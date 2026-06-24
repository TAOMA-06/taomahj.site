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
            <a className="nav-item" href="#themes">
              Method
            </a>
            <a className="nav-item" href="#featured">
              Work
            </a>
            <a className="nav-item" href="#skills">
              Vocabulary
            </a>
            <a className="nav-item" href="#contact">
              Contact
            </a>
          </div>
        </nav>

        <div className="grid items-end gap-12 pb-14 pt-24 lg:grid-cols-[minmax(0,1fr)_420px] lg:pb-20">
          <div className="max-w-5xl">
            <p className="hero-sequence mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-mist">
              taomahj / AI · Automation · Tools
            </p>
            <h1 className="hero-sequence max-w-6xl text-[clamp(56px,9.6vw,156px)] font-semibold leading-[0.98] tracking-[-0.075em] text-ink lg:leading-[0.92]">
              <span className="block">把工具</span>
              <span className="block">做成</span>
              <span className="block">思考方式。</span>
            </h1>
            <p className="hero-sequence mt-8 max-w-2xl text-[clamp(20px,2.2vw,32px)] font-medium leading-[1.18] tracking-[-0.035em] text-graphite/72">
              我关注 AI 工作流、自动化系统与个人工具如何从“能用”走向“可解释、可长期维护、可形成判断”。
            </p>
            <div className="hero-sequence mt-10 flex flex-wrap items-center gap-4">
              <a href="#themes" className="apple-button">
                阅读我的方法
              </a>
              <a href="#featured" className="text-link">
                查看作品
              </a>
            </div>
          </div>

          <div className="hero-sequence hidden rounded-[28px] border border-black/10 bg-white/70 p-7 shadow-[0_40px_120px_rgba(0,0,0,0.08)] lg:block">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-mist">working notes</p>
            <div className="mt-14 space-y-8">
              {['AI 不是替代判断，而是放大判断的系统。', '自动化的价值在于让复杂过程重新可见。', '个人工具应该轻到能进入日常，稳到能被长期使用。'].map((line, index) => (
                <div key={line} className="border-t border-black/10 pt-5">
                  <span className="text-sm font-semibold text-mist">{String(index + 1).padStart(2, '0')}</span>
                  <p className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.045em] text-graphite">{line}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-sequence flex flex-wrap gap-x-6 gap-y-2 border-t border-black/10 pt-5 text-xs font-medium uppercase tracking-[0.18em] text-mist">
          <span>Next.js</span>
          <span>Automation</span>
          <span>Local-first Tools</span>
          <span>AI Workflow</span>
        </div>
      </div>
    </section>
  );
}
