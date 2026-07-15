'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  clipReveal,
  EASE,
  isFinePointer,
  isMobileViewport,
  onceCascade,
  scrubParallax,
  splitChars,
  splitLines
} from './yoMotion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** P-tier cinematic motion. Do not reuse on S. */
export function useDemoPMotion(
  scope: React.RefObject<HTMLElement | null>,
  reducedMotion: boolean
) {
  useGSAP(
    () => {
      if (reducedMotion || !scope.current) return;

      const root = scope.current;
      const mobile = isMobileViewport();
      const fine = isFinePointer();

      // —— Progress bar ——
      const progress = root.querySelector<HTMLElement>('.p-scroll-progress span');
      if (progress) {
        gsap.to(progress, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3
          }
        });
      }

      // —— Hero entrance ——
      const hero = root.querySelector('.p-hero');
      if (hero) {
        const kicker = hero.querySelector('.p-hero-kicker');
        const title = hero.querySelector<HTMLElement>('#p-hero-title');
        const titleSmall = title?.querySelector('small');
        const tagline = hero.querySelector('.p-hero-tagline');
        const en = hero.querySelector('.p-hero-en');
        const actions = hero.querySelector('.yonagi-actions');
        const meta = hero.querySelector('.p-hero-meta');
        const scrollHint = hero.querySelector('.p-scroll');
        const mediaImg = hero.querySelector<HTMLElement>('.p-hero-media img');

        const tl = gsap.timeline({ defaults: { ease: EASE.out } });

        if (mediaImg) {
          gsap.set(mediaImg, { scale: 1.12 });
          tl.to(mediaImg, { scale: 1.02, duration: 2.2, ease: EASE.soft }, 0);
        }

        if (kicker) {
          tl.fromTo(kicker, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.15);
        }

        if (titleSmall) {
          tl.fromTo(titleSmall, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.35);
        }

        if (title) {
          // Split only the main name text node (not the small reading)
          const nameNode = Array.from(title.childNodes).find(
            (n) => n.nodeType === Node.TEXT_NODE && (n.textContent ?? '').trim()
          );
          if (nameNode && nameNode.textContent) {
            const wrap = document.createElement('span');
            wrap.className = 'p-hero-name';
            wrap.textContent = nameNode.textContent;
            title.replaceChild(wrap, nameNode);
            const chars = splitChars(wrap);
            gsap.set(chars, { opacity: 0, yPercent: 110, rotateX: -40 });
            tl.to(
              chars,
              {
                opacity: 1,
                yPercent: 0,
                rotateX: 0,
                duration: 0.85,
                stagger: 0.035,
                ease: EASE.expo
              },
              0.45
            );
          }
        }

        if (tagline) {
          tl.fromTo(tagline, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.35');
        }
        if (en) {
          tl.fromTo(en, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55 }, '-=0.4');
        }
        if (actions) {
          tl.fromTo(
            actions.querySelectorAll('a'),
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 },
            '-=0.25'
          );
        }
        if (meta) {
          tl.fromTo(meta, { opacity: 0 }, { opacity: 0.9, duration: 0.7 }, '-=0.2');
        }
        if (scrollHint) {
          tl.fromTo(scrollHint, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.15');
          gsap.to(scrollHint, {
            y: 6,
            duration: 1.4,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: 1.2
          });
        }

        if (mediaImg && !mobile) {
          scrubParallax(mediaImg, {
            trigger: hero,
            yPercent: 14,
            scale: [1.02, 1.12],
            start: 'top top',
            end: 'bottom top'
          });
        }
      }

      // —— Story ——
      const story = root.querySelector('.p-story');
      if (story) {
        const mark = story.querySelector('.p-section-mark');
        const lead = story.querySelector('.p-story-lead');
        const h2 = story.querySelector<HTMLElement>('#p-story-title');
        const body = story.querySelector('.p-story-body');
        const note = story.querySelector('.p-english-note');
        const figures = story.querySelectorAll('.p-story-photos figure');

        if (mark) {
          onceCascade(mark, { trigger: story, y: 12, duration: 0.55, start: 'top 78%' });
        }
        if (lead) {
          gsap.fromTo(
            lead,
            { opacity: 0, x: -28 },
            {
              opacity: 1,
              x: 0,
              duration: 0.85,
              ease: EASE.out,
              scrollTrigger: { trigger: story, start: 'top 72%', once: true }
            }
          );
        }
        if (h2) {
          const lines = splitLines(h2);
          gsap.fromTo(
            lines,
            { yPercent: 105 },
            {
              yPercent: 0,
              duration: 0.9,
              stagger: 0.1,
              ease: EASE.expo,
              scrollTrigger: { trigger: h2, start: 'top 82%', once: true }
            }
          );
        }
        if (body || note) {
          onceCascade([body, note].filter(Boolean) as Element[], {
            trigger: story,
            y: 24,
            duration: 0.7,
            stagger: 0.12,
            start: 'top 68%'
          });
        }
        if (figures.length) {
          clipReveal(
            Array.from(figures).map((f) => f.querySelector('img')).filter(Boolean) as Element[],
            {
              trigger: story.querySelector('.p-story-photos') ?? story,
              start: 'top 75%',
              stagger: 0.18,
              from: 'inset(18% 8% 18% 8%)'
            }
          );
          if (!mobile) {
            figures.forEach((fig, i) => {
              const img = fig.querySelector('img');
              if (!img) return;
              scrubParallax(img, {
                trigger: fig,
                yPercent: i === 0 ? 10 : -8,
                start: 'top bottom',
                end: 'bottom top'
              });
            });
          }
        }
      }

      // —— Menu ——
      const menu = root.querySelector('.p-menu');
      if (menu) {
        const heading = menu.querySelector('.p-menu-heading');
        if (heading) {
          onceCascade(heading.querySelectorAll('.p-section-mark, h2, p'), {
            trigger: heading,
            y: 22,
            duration: 0.7,
            stagger: 0.08,
            start: 'top 82%'
          });
        }

        const highlights = menu.querySelectorAll('.p-menu-highlight > div');
        highlights.forEach((wrap, i) => {
          const img = wrap.querySelector('img');
          if (!img) return;
          gsap.fromTo(
            img,
            { scale: 1.14, opacity: 0.7 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.1,
              ease: EASE.out,
              delay: i * 0.06,
              scrollTrigger: { trigger: wrap, start: 'top 88%', once: true }
            }
          );
          if (!mobile) {
            gsap.to(img, {
              yPercent: i === 1 ? -8 : 10,
              ease: 'none',
              scrollTrigger: {
                trigger: wrap,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
              }
            });
          }
        });

        menu.querySelectorAll('.p-menu-category').forEach((cat) => {
          onceCascade(cat.querySelectorAll('header, .p-menu-list > div'), {
            trigger: cat,
            y: 18,
            duration: 0.55,
            stagger: 0.045,
            start: 'top 86%'
          });
        });
      }

      // —— Space ——
      const space = root.querySelector('.p-space');
      if (space) {
        onceCascade(space.querySelectorAll('.p-section-mark, .p-space-heading h2, .p-space-heading > p'), {
          trigger: space,
          y: 20,
          duration: 0.65,
          stagger: 0.08,
          start: 'top 80%'
        });

        space.querySelectorAll('.p-space-card').forEach((card, i) => {
          const img = card.querySelector('img');
          const cap = card.querySelector('figcaption');
          if (img) {
            clipReveal(img, {
              trigger: card,
              start: 'top 85%',
              duration: 1,
              from: i % 2 === 0 ? 'inset(10% 10% 10% 10%)' : 'inset(16% 4% 16% 4%)'
            });
            if (!mobile) {
              scrubParallax(img, {
                trigger: card,
                yPercent: 8,
                scale: [1.05, 1],
                start: 'top bottom',
                end: 'bottom top'
              });
            }
          }
          if (cap) {
            gsap.fromTo(
              cap,
              { opacity: 0, x: -16 },
              {
                opacity: 1,
                x: 0,
                duration: 0.65,
                ease: EASE.out,
                scrollTrigger: { trigger: card, start: 'top 70%', once: true }
              }
            );
          }
        });
      }

      // —— Reservation ——
      const reservation = root.querySelector('.p-reservation');
      if (reservation) {
        onceCascade(
          reservation.querySelectorAll(
            '.p-section-mark, .p-reservation-label, #p-reservation-title, .p-reservation-copy, .p-english-note, .p-reservation-actions, .p-demo-form-note'
          ),
          {
            trigger: reservation,
            y: 24,
            duration: 0.65,
            stagger: 0.07,
            start: 'top 78%'
          }
        );
        onceCascade(reservation.querySelectorAll('.p-rules h3, .p-rules li'), {
          trigger: reservation.querySelector('.p-rules') ?? reservation,
          y: 16,
          duration: 0.5,
          stagger: 0.06,
          start: 'top 82%'
        });
      }

      // —— Access + footer ——
      const access = root.querySelector('.p-access');
      if (access) {
        onceCascade(
          access.querySelectorAll(
            '.p-section-mark, .p-access-heading > *, .yonagi-info-rows > div, .p-map'
          ),
          {
            trigger: access,
            y: 18,
            duration: 0.55,
            stagger: 0.05,
            start: 'top 82%'
          }
        );
      }

      const footer = root.querySelector('.yonagi-footer');
      if (footer) {
        onceCascade(footer.children, {
          trigger: footer,
          y: 14,
          duration: 0.5,
          stagger: 0.05,
          start: 'top 92%'
        });
      }

      // —— Section mark flash ——
      root.querySelectorAll('.p-section-mark span').forEach((num) => {
        gsap.fromTo(
          num,
          { opacity: 0.2 },
          {
            opacity: 1,
            duration: 0.4,
            yoyo: true,
            repeat: 1,
            ease: 'power1.inOut',
            scrollTrigger: {
              trigger: num.closest('.p-section-mark') ?? num,
              start: 'top 85%',
              once: true
            }
          }
        );
      });

      // —— Magnetic copper buttons (desktop) ——
      if (fine && !mobile) {
        const cleanups: Array<() => void> = [];
        root.querySelectorAll<HTMLElement>('.yonagi-button--copper').forEach((btn) => {
          const onMove = (e: MouseEvent) => {
            const r = btn.getBoundingClientRect();
            const x = e.clientX - r.left - r.width / 2;
            const y = e.clientY - r.top - r.height / 2;
            gsap.to(btn, { x: x * 0.22, y: y * 0.22, duration: 0.3, ease: 'power2.out' });
          };
          const onLeave = () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: EASE.out });
          };
          btn.addEventListener('mousemove', onMove);
          btn.addEventListener('mouseleave', onLeave);
          cleanups.push(() => {
            btn.removeEventListener('mousemove', onMove);
            btn.removeEventListener('mouseleave', onLeave);
          });
        });
        return () => cleanups.forEach((fn) => fn());
      }
    },
    { scope, dependencies: [reducedMotion] }
  );
}
