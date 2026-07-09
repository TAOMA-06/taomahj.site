'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import LiquidImage from '@/components/mim/LiquidImage';
import SectionFrame from '@/components/mim/SectionFrame';
import SectionLabel from '@/components/mim/SectionLabel';
import { projects } from '@/data/projects';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function WorkShowcase() {
  const scope = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.utils.toArray<HTMLElement>('.work-item').forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 85%', once: true }
          }
        );
      });
    },
    { scope, dependencies: [reducedMotion] }
  );

  return (
    <SectionFrame id="work" label="Work" floorTick className="border-t border-black/10 py-24 md:py-36">
      <div ref={scope}>
        <SectionLabel>作品</SectionLabel>
        <h2 className="mim-headline mt-6 max-w-3xl">精选项目</h2>

        <div className="mt-16 space-y-20">
          {projects.map((project, index) => (
              <a
                key={project.id}
                href={project.href}
                data-mim-transition
                className="work-item mim-work-card mim-work-card-glass group block border border-[var(--mim-arch-frame)] p-6 md:p-8"
              >
                <div className="mb-6 flex items-baseline justify-between gap-4">
                  <span className="mim-work-callout">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-mist">{project.tags[0]}</span>
                </div>
                <h3 className="text-[clamp(36px,6vw,72px)] font-semibold leading-none tracking-[-0.05em]">{project.title}</h3>
                <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-mist md:text-lg">{project.detail}</p>
                <div className="mt-10 overflow-hidden">
                  <LiquidImage src={project.image} alt={project.title} />
                </div>
                <span className="mt-6 inline-flex text-xs font-bold uppercase tracking-[0.16em] opacity-0 transition-opacity group-hover:opacity-100">
                  查看项目 →
                </span>
              </a>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
