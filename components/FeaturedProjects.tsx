'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { projects } from '@/data/projects';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function FeaturedProjects() {
  const scope = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        const images = gsap.utils.toArray<HTMLElement>('.story-image');
        const copyBlocks = gsap.utils.toArray<HTMLElement>('.story-copy');

        gsap.set(images, { opacity: 0, scale: 0.94, y: 24 });
        gsap.set(copyBlocks, { opacity: 0, y: 20 });
        gsap.set(images[0], { opacity: 1, scale: 1, y: 0 });
        gsap.set(copyBlocks[0], { opacity: 1, y: 0 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: scope.current,
            start: 'top top',
            end: `+=${projects.length * 620}`,
            scrub: 0.85,
            pin: pin.current,
            anticipatePin: 1
          }
        });

        projects.slice(1).forEach((_, index) => {
          const previous = index;
          const current = index + 1;
          const at = index + 0.9;

          timeline
            .to(images[previous], { opacity: 0, scale: 1.04, y: -20, duration: 0.55, ease: 'power3.out' }, at)
            .to(copyBlocks[previous], { opacity: 0, y: -18, duration: 0.45, ease: 'power3.out' }, at)
            .fromTo(
              images[current],
              { opacity: 0, scale: 0.94, y: 26 },
              { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'expo.out' },
              at + 0.16
            )
            .to(copyBlocks[current], { opacity: 1, y: 0, duration: 0.58, ease: 'power3.out' }, at + 0.2);
        });
      });

      return () => mm.revert();
    },
    { scope, dependencies: [reducedMotion] }
  );

  return (
    <section id="featured" ref={scope} className="bg-[#f5f5f7] text-ink">
      <div className="mx-auto px-6 py-24 sm:px-10 md:hidden">
        <p className="section-kicker">Featured Projects</p>
        <div className="mt-10 space-y-14">
          {projects.map((project) => (
            <article key={project.id}>
              <a href={project.href} className="block overflow-hidden rounded-[28px] bg-white">
                <img src={project.image} alt={`${project.title} screenshot`} className="aspect-[1.08/1] w-full object-cover" />
              </a>
              <span className="mt-6 block text-sm font-semibold text-mist">{project.index}</span>
              <h2 className="mt-3 text-[46px] font-semibold leading-[0.92] tracking-[-0.06em]">{project.title}</h2>
              <p className="mt-5 text-lg leading-7 text-graphite/66">{project.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div ref={pin} className="mx-auto hidden min-h-screen max-w-[1440px] gap-10 px-6 py-24 sm:px-10 md:grid md:grid-cols-[1.1fr_0.9fr] md:items-center lg:px-16">
        <div className="relative aspect-[1.06/1] overflow-hidden rounded-[32px] bg-white shadow-[0_50px_120px_rgba(0,0,0,0.10)]">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.href}
              className="story-image absolute inset-0 block opacity-0"
              aria-label={`Open ${project.title}`}
            >
              <img src={project.image} alt={`${project.title} screenshot`} className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/28 to-transparent p-7 text-white">
                <span className="text-sm font-medium">{project.index}</span>
              </div>
            </a>
          ))}
        </div>

        <div className="relative min-h-[360px]">
          <p className="section-kicker">Featured Projects</p>
          <div className="mt-10 md:absolute md:inset-x-0">
            {projects.map((project) => (
              <article key={project.id} className="story-copy mb-12 md:absolute md:inset-x-0 md:mb-0 md:opacity-0">
                <span className="text-sm font-semibold text-mist">{project.index}</span>
                <h2 className="mt-5 text-[clamp(48px,7vw,104px)] font-semibold leading-[0.88] tracking-[-0.07em]">
                  {project.title}
                </h2>
                <p className="mt-7 max-w-xl text-xl leading-8 tracking-[-0.02em] text-graphite/66">{project.description}</p>
                <a href={project.href} className="mt-8 inline-flex text-[15px] font-semibold text-graphite">
                  查看项目
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
