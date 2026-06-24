'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { skills } from '@/data/projects';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Skills() {
  const scope = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.fromTo(
        '.skill-pill',
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.48,
          ease: 'power3.out',
          stagger: 0.055,
          scrollTrigger: {
            trigger: scope.current,
            start: 'top 72%',
            once: true
          }
        }
      );
    },
    { scope, dependencies: [reducedMotion] }
  );

  return (
    <section id="skills" ref={scope} className="bg-[#f5f5f7] px-6 py-28 text-ink sm:px-10 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1180px]">
        <p className="section-kicker">Skills</p>
        <h2 className="mt-5 max-w-4xl text-[clamp(44px,6vw,92px)] font-semibold leading-[0.95] tracking-[-0.065em]">
          A practical stack for small, finished things.
        </h2>
        <div className="mt-14 flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span key={skill} className="skill-pill rounded-full bg-white px-5 py-3 text-sm font-semibold tracking-[-0.01em] text-graphite shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
