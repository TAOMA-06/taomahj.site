'use client';

import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { projects } from '@/data/projects';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(useGSAP, Flip, ScrollTrigger);

export default function ProjectCards() {
  const scope = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState(projects[0].id);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.fromTo(
        '.cards-heading',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: scope.current,
            start: 'top 78%',
            once: true
          }
        }
      );
    },
    { scope, dependencies: [reducedMotion] }
  );

  function expandCard(id: string) {
    if (id === activeId) return;
    if (reducedMotion) {
      setActiveId(id);
      return;
    }

    const state = Flip.getState('.project-card', { props: 'borderRadius,backgroundColor' });
    flushSync(() => setActiveId(id));
    Flip.from(state, {
      duration: 0.48,
      ease: 'power3.out',
      absolute: true,
      nested: true
    });
  }

  return (
    <section ref={scope} className="bg-white px-6 py-28 text-ink sm:px-10 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1180px]">
        <div className="cards-heading max-w-3xl">
          <p className="section-kicker">Project Cards</p>
          <h2 className="mt-5 text-[clamp(44px,6vw,88px)] font-semibold leading-[0.95] tracking-[-0.065em]">
            Click once. Let the card breathe.
          </h2>
        </div>

        <div className="mt-14 grid auto-rows-fr gap-4 md:grid-cols-2">
          {projects.map((project) => {
            const isActive = activeId === project.id;

            return (
              <button
                key={project.id}
                type="button"
                data-flip-id={project.id}
                onClick={() => expandCard(project.id)}
                className={`project-card group text-left ${isActive ? 'md:col-span-2' : ''}`}
                aria-expanded={isActive}
              >
                <div className={`grid gap-5 ${isActive ? 'lg:grid-cols-[0.95fr_1.05fr] lg:items-end' : ''}`}>
                  <div className="overflow-hidden rounded-[20px] bg-fog">
                    <img src={project.image} alt="" className="aspect-[16/11] w-full object-cover transition duration-[420ms] ease-apple group-hover:scale-[1.035]" />
                  </div>
                  <div className="flex min-h-[220px] flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-sm font-semibold text-mist">
                        <span>{project.index}</span>
                        <span>{isActive ? 'Expanded' : 'Tap to expand'}</span>
                      </div>
                      <h3 className="mt-5 text-[clamp(32px,4vw,64px)] font-semibold leading-[0.94] tracking-[-0.055em]">
                        {project.title}
                      </h3>
                      <p className="mt-5 max-w-2xl text-lg leading-7 text-graphite/66">
                        {isActive ? project.detail : project.description}
                      </p>
                    </div>
                    <div className="mt-8 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-graphite/62">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
