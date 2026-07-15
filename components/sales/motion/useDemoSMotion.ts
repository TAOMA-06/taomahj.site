'use client';

import type { RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { simpleRevealGroup } from './yoMotion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** S-tier only: short once fade-ups. No Lenis / pin / scrub / split text. */
export function useDemoSMotion(scope: RefObject<HTMLElement | null>, reducedMotion: boolean) {
  useGSAP(
    () => {
      if (reducedMotion || !scope.current) return;

      const root = scope.current;

      const heroCopy = root.querySelector('.s-hero-copy');
      if (heroCopy) {
        const items = heroCopy.querySelectorAll(
          '.s-hero-overline, h1, .s-reading, .s-tagline, .s-hero-intro, .yonagi-actions, .s-email'
        );
        gsap.fromTo(
          items,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.48,
            stagger: 0.06,
            ease: 'power3.out',
            delay: 0.08
          }
        );
      }

      const points = root.querySelector('.s-points');
      if (points) {
        simpleRevealGroup(points, points.querySelectorAll('article'), {
          y: 16,
          duration: 0.48,
          stagger: 0.07,
          start: 'top 90%'
        });
      }

      const menu = root.querySelector('.s-menu');
      if (menu) {
        simpleRevealGroup(menu, menu.querySelectorAll('.s-menu-item'), {
          y: 18,
          duration: 0.5,
          stagger: 0.06,
          start: 'top 84%'
        });
      }

      const access = root.querySelector('.s-access');
      if (access) {
        simpleRevealGroup(access, access.querySelectorAll('.s-access-copy, .s-access-photo'), {
          y: 18,
          duration: 0.5,
          stagger: 0.08,
          start: 'top 86%'
        });
      }

      const social = root.querySelector('.s-social');
      if (social) {
        simpleRevealGroup(social, social.children, {
          y: 14,
          duration: 0.45,
          stagger: 0.06,
          start: 'top 90%'
        });
      }
    },
    { scope, dependencies: [reducedMotion] }
  );
}
