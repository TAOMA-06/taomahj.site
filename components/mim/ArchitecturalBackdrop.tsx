'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

type MarkVariant = 'line' | 'block' | 'corner-bracket' | 'crosshair' | 'dimension-tick';

type MarkSpec = {
  variant?: MarkVariant;
  left: string;
  top: string;
  width: number | string;
  height: number | string;
  radius?: string;
  depth?: number;
  section?: string;
};

const MARKS: MarkSpec[] = [
  { left: '5%', top: '14%', width: 320, height: 320, radius: '50%', depth: 0.08, section: 'hero' },
  { variant: 'block', left: '82%', top: '12%', width: 220, height: 340, section: 'hero' },
  { left: '76%', top: '68%', width: 380, height: 180, section: 'work' },
  { left: '10%', top: '70%', width: 200, height: 200, section: 'work' },
  { variant: 'crosshair', left: '48%', top: '38%', width: 80, height: 80, depth: 0.06, section: 'approach-crosshair' },
  { variant: 'block', left: '58%', top: '82%', width: 160, height: 260, depth: 0.05, section: 'work' },
  { variant: 'line', left: '0', top: '30%', width: '32%', height: 2, section: 'approach' },
  { variant: 'line', left: '64%', top: '48%', width: '30%', height: 2, section: 'work' },
  { variant: 'line', left: '20%', top: '0', width: 2, height: '46%', section: 'hero' },
  { variant: 'line', left: '92%', top: '42%', width: 2, height: '38%', section: 'contact' },
  { variant: 'line', left: '40%', top: '88%', width: '24%', height: 2, section: 'work' },
  { left: '88%', top: '52%', width: 140, height: 140, radius: '50%', depth: 0.04, section: 'approach' },
  { variant: 'block', left: '28%', top: '22%', width: 100, height: 400, depth: 0.07, section: 'hero' },
  { left: '62%', top: '28%', width: 420, height: 60, depth: 0.03, section: 'hero' },
  { variant: 'corner-bracket', left: '4%', top: '6%', width: 40, height: 40, section: 'hero-corner' },
  { variant: 'corner-bracket', left: '96%', top: '6%', width: 40, height: 40, section: 'hero-corner' },
  { variant: 'corner-bracket', left: '4%', top: '92%', width: 40, height: 40, section: 'work-corner' },
  { variant: 'corner-bracket', left: '96%', top: '92%', width: 40, height: 40, section: 'work-corner' },
  { variant: 'dimension-tick', left: '50%', top: '3%', width: 20, height: 2, section: 'hero' },
  { variant: 'dimension-tick', left: '3%', top: '50%', width: 2, height: 20, section: 'hero' },
  { variant: 'dimension-tick', left: '97%', top: '60%', width: 2, height: 20, section: 'work' }
];

function formatSize(value: number | string) {
  return typeof value === 'number' ? `${value}px` : value;
}

function markClassName(variant?: MarkVariant) {
  const classes = ['mim-geo-mark'];
  if (variant === 'line') classes.push('mim-geo-mark--line');
  if (variant === 'block') classes.push('mim-geo-mark--block');
  if (variant === 'corner-bracket') classes.push('mim-geo-mark--corner-bracket');
  if (variant === 'crosshair') classes.push('mim-geo-mark--crosshair');
  if (variant === 'dimension-tick') classes.push('mim-geo-mark--dimension-tick');
  return classes.join(' ');
}

export default function ArchitecturalBackdrop() {
  const layerRef = useRef<HTMLDivElement>(null);
  const geometricRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const layer = layerRef.current;
    const geometric = geometricRef.current;
    if (!layer || !geometric) return;

    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const movingMarks = Array.from(geometric.querySelectorAll<HTMLElement>('[data-depth]'));

    let pointerX = 0;
    let pointerY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = 0;

    const onPointerMove = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const animateParallax = () => {
      currentX += (pointerX - currentX) * 0.04;
      currentY += (pointerY - currentY) * 0.04;

      movingMarks.forEach((mark) => {
        const depth = Number(mark.dataset.depth);
        const x = currentX * depth * 140;
        const y = currentY * depth * 140;
        mark.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      });

      rafId = requestAnimationFrame(animateParallax);
    };

    if (!reducedMotion && finePointer) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      rafId = requestAnimationFrame(animateParallax);
    }

    let scrollTween: gsap.core.Tween | null = null;
    const scrollTriggers: ScrollTrigger[] = [];

    if (!reducedMotion) {
      scrollTween = gsap.to(layer, {
        y: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2
        }
      });
      if (scrollTween.scrollTrigger) scrollTriggers.push(scrollTween.scrollTrigger);

      movingMarks.forEach((mark, index) => {
        const depth = Number(mark.dataset.depth) || 0.05;
        const markTween = gsap.to(mark, {
          y: index % 2 === 0 ? -80 * depth * 10 : 60 * depth * 10,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5
          }
        });
        if (markTween.scrollTrigger) scrollTriggers.push(markTween.scrollTrigger);
      });
    }

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(rafId);
      scrollTween?.kill();
      scrollTriggers.forEach((trigger) => trigger.kill());
    };
  }, [reducedMotion]);

  return (
    <div ref={layerRef} className="mim-arch-layer" data-active-section="hero" aria-hidden="true">
      <div className="mim-arch-grid mim-arch-grid--strong" />
      <div ref={geometricRef} className="mim-arch-geometric">
        {MARKS.map((mark, index) => {
          const isParallax = mark.depth !== undefined && mark.variant !== 'line' && mark.variant !== 'dimension-tick';

          return (
            <div
              key={`${mark.left}-${mark.top}-${index}`}
              className={markClassName(mark.variant)}
              data-depth={isParallax ? String(mark.depth) : undefined}
              data-section={mark.section}
              style={{
                left: mark.left,
                top: mark.top,
                width: formatSize(mark.width),
                height: formatSize(mark.height),
                borderRadius: mark.radius ?? (mark.variant === 'line' || mark.variant === 'dimension-tick' ? '0' : '36px')
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
