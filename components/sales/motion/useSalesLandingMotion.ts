'use client';

import type { RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isFinePointer, onceCascade, simpleRevealGroup } from './yoMotion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Landing: medium motion. P plan card gets tilt; S card stays simple. */
export function useSalesLandingMotion(
  scope: RefObject<HTMLElement | null>,
  reducedMotion: boolean
) {
  useGSAP(
    () => {
      if (reducedMotion || !scope.current) return;

      const root = scope.current;

      const hero = root.querySelector('.sales-landing-hero');
      if (hero) {
        gsap.fromTo(
          hero.querySelectorAll(':scope > p, h1, .sales-hero-note'),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: 'power3.out',
            delay: 0.05
          }
        );
      }

      const showcase = root.querySelector('.sales-showcase');
      if (showcase) {
        simpleRevealGroup(showcase, showcase.querySelectorAll('.sales-plan'), {
          y: 24,
          duration: 0.6,
          stagger: 0.12,
          start: 'top 88%'
        });
      }

      const diff = root.querySelector('.sales-difference');
      if (diff) {
        onceCascade(diff.querySelectorAll('.sales-difference-list article'), {
          trigger: diff,
          y: 18,
          duration: 0.5,
          stagger: 0.07,
          start: 'top 80%'
        });
      }

      // P card: light 3D tilt. S card: only image scale via CSS.
      if (isFinePointer()) {
        const pCard = root.querySelector<HTMLElement>('.sales-plan--p');
        if (pCard) {
          const media = pCard.querySelector<HTMLElement>('.sales-plan-media img');
          const onMove = (event: MouseEvent) => {
            const rect = pCard.getBoundingClientRect();
            const px = (event.clientX - rect.left) / rect.width - 0.5;
            const py = (event.clientY - rect.top) / rect.height - 0.5;
            gsap.to(pCard, {
              rotateY: px * 4.5,
              rotateX: -py * 3.5,
              transformPerspective: 900,
              duration: 0.35,
              ease: 'power2.out'
            });
            if (media) {
              gsap.to(media, {
                xPercent: px * 4,
                yPercent: py * 4,
                scale: 1.04,
                duration: 0.4,
                ease: 'power2.out'
              });
            }
          };
          const onLeave = () => {
            gsap.to(pCard, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power3.out' });
            if (media) {
              gsap.to(media, { xPercent: 0, yPercent: 0, scale: 1, duration: 0.5, ease: 'power3.out' });
            }
          };
          pCard.addEventListener('mousemove', onMove);
          pCard.addEventListener('mouseleave', onLeave);
          return () => {
            pCard.removeEventListener('mousemove', onMove);
            pCard.removeEventListener('mouseleave', onLeave);
          };
        }
      }
    },
    { scope, dependencies: [reducedMotion] }
  );
}
