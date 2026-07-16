'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionFrame from '@/components/mim/SectionFrame';
import { archiveProjects, featuredProjects } from '@/data/projects';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { HOME_EASE, isMobileHome, revealOnce } from '@/components/mim/homeMotion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const exhibitionImages: Record<string, { src: string; alt: string }> = {
  bubble: { src: '/assets/exhibition/perler-materials.png', alt: '混凝土与彩色骨料材料样本' },
  'grok-build': { src: '/assets/exhibition/mixflow-bar.png', alt: '暗色石材酒吧空间' },
  'yt-captions': { src: '/assets/exhibition/gallery-room.png', alt: '光影中的极简展厅' }
};

export default function WorkShowcase() {
  const scope = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !scope.current) return;

      const root = scope.current;
      const top = root.querySelector('.exhibit-work__top');
      if (top) {
        revealOnce(top.querySelectorAll('.exhibit-kicker, .mim-headline, p'), {
          trigger: top,
          y: 24,
          duration: 0.7,
          stagger: 0.09,
          start: 'top 86%'
        });
      }

      const mobile = isMobileHome();

      gsap.utils.toArray<HTMLElement>('.exhibit-work-card').forEach((card, index) => {
        const img = card.querySelector('img');
        const specimen = card.querySelector('.project-specimen');
        const meta = card.querySelectorAll(
          '.exhibit-work-card__index, .exhibit-work-card__status, h3, .exhibit-work-card__en, p, .exhibit-work-card__tags, .exhibit-work-card__cta'
        );

        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: Math.min(index * 0.05, 0.15),
            ease: HOME_EASE.out,
            scrollTrigger: { trigger: card, start: 'top 88%', once: true }
          }
        );

        gsap.fromTo(
          meta,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.05,
            ease: HOME_EASE.out,
            scrollTrigger: { trigger: card, start: 'top 84%', once: true }
          }
        );

        if (specimen) {
          gsap.fromTo(
            specimen,
            { clipPath: 'inset(8% 8% 8% 8%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 0.95,
              ease: HOME_EASE.expo,
              scrollTrigger: { trigger: card, start: 'top 86%', once: true }
            }
          );
        }

        if (img && !mobile) {
          gsap.fromTo(
            img,
            { scale: 1.1 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                end: 'top 30%',
                scrub: 0.7
              }
            }
          );
        }
      });

      const archive = root.querySelector('.exhibit-work-archive');
      if (archive) {
        revealOnce(archive.querySelectorAll('.exhibit-work-archive__label, a'), {
          trigger: archive,
          y: 16,
          duration: 0.55,
          stagger: 0.04,
          start: 'top 90%'
        });
      }
    },
    { scope, dependencies: [reducedMotion] }
  );

  return (
    <SectionFrame id="work" label="Exhibits" elevation="LEVEL 01" className="exhibit-work">
      <div ref={scope}>
        <div className="exhibit-work__top">
          <div>
            <p className="exhibit-kicker">Selected work</p>
            <h2 className="mim-headline mt-5">三件展品</h2>
          </div>
          <p>
            公开于 GitHub 的三条主线：拼豆、本机 Agent、双语字幕。
          </p>
        </div>

        <div className="exhibit-work-list">
          {featuredProjects.map((project, index) => {
            const visual = exhibitionImages[project.id];
            return (
              <article
                key={project.id}
                id={`work-${project.id}`}
                className="exhibit-work-card"
              >
                <span className="exhibit-work-card__index">
                  {String(index + 1).padStart(2, '0')} /{' '}
                  {String(featuredProjects.length).padStart(2, '0')}
                </span>

                <div className="exhibit-work-card__body">
                  <span className="exhibit-work-card__status">{project.status}</span>
                  <h3>{project.title}</h3>
                  {project.englishTitle ? (
                    <span className="exhibit-work-card__en">{project.englishTitle}</span>
                  ) : null}
                  <p>{project.detail}</p>
                  <ul className="exhibit-work-card__tags" aria-label="标签">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <div className="exhibit-work-card__cta">
                    <a
                      href={project.github ?? project.href}
                      target="_blank"
                      rel="noreferrer"
                      data-mim-transition
                      className="mim-btn"
                    >
                      在 GitHub 查看 ↗
                    </a>
                  </div>
                </div>

                <a
                  href={project.github ?? project.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`project-specimen project-specimen--${project.id}`}
                  aria-label={`${project.title} on GitHub`}
                >
                  <img src={visual.src} alt={visual.alt} />
                  <span className="project-specimen__label">material study / 2026</span>
                </a>
              </article>
            );
          })}
        </div>

        <div className="exhibit-work-archive">
          <p className="exhibit-work-archive__label">其他展品 / archive</p>
          <div className="exhibit-work-archive__links">
            {archiveProjects.map((project) => (
              <a key={project.id} href={project.href}>
                {project.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
