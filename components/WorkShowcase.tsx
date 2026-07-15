'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionFrame from '@/components/mim/SectionFrame';
import { projects } from '@/data/projects';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const exhibitionImages: Record<string, { src: string; alt: string }> = {
  mixflow: { src: '/assets/exhibition/mixflow-bar.png', alt: '暗色石材酒吧空间' },
  perler: { src: '/assets/exhibition/perler-materials.png', alt: '混凝土与彩色骨料材料样本' },
  chiwu: { src: '/assets/exhibition/chiwu-archive.png', alt: '嵌入式混凝土陈列墙' },
  gallery: { src: '/assets/exhibition/gallery-room.png', alt: '光影中的极简展厅' },
  yonagi: { src: '/assets/yonagi/counter.webp', alt: '夜凪食堂深色吧台空间网站样板' }
};

export default function WorkShowcase() {
  const scope = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.utils.toArray<HTMLElement>('.exhibit-work-card').forEach((card) => {
        const img = card.querySelector('img');
        gsap.fromTo(
          card,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true }
          }
        );
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.06 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                end: 'top 40%',
                scrub: 0.6
              }
            }
          );
        }
      });
    },
    { scope, dependencies: [reducedMotion] }
  );

  return (
    <SectionFrame id="work" label="Exhibits" elevation="LEVEL 01" className="exhibit-work">
      <div ref={scope}>
        <div className="exhibit-work__top">
          <div>
            <p className="exhibit-kicker">Selected work</p>
            <h2 className="mim-headline mt-5">精选项目</h2>
          </div>
          <p>每一件展品保持独立的工具逻辑，并共享同一套可浏览、可停留的展厅秩序。</p>
        </div>
        <div className="exhibit-work-list">
          {projects.map((project, index) => (
            <a key={project.id} href={project.href} data-mim-transition className="exhibit-work-card">
              <span className="exhibit-work-card__index">
                {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </span>
              <div>
                <h3>{project.title}</h3>
                <p>{project.detail}</p>
              </div>
              <div className={`project-specimen project-specimen--${project.id}`}>
                <img src={exhibitionImages[project.id].src} alt={exhibitionImages[project.id].alt} />
                <span className="project-specimen__label">material study / 2026</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
