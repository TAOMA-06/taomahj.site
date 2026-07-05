'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  { id: 'hero', selector: '#hero' },
  { id: 'approach', selector: '#approach' },
  { id: 'work', selector: '#work' },
  { id: 'contact', selector: '#contact' }
] as const;

const SECTION_MARKS: Record<string, string[]> = {
  hero: ['hero', 'corner'],
  approach: ['approach', 'crosshair'],
  work: ['work', 'corner'],
  contact: ['contact']
};

export function useArchScrollSync() {
  useEffect(() => {
    const layer = document.querySelector<HTMLElement>('.mim-arch-layer');
    const grid = document.querySelector<HTMLElement>('.mim-arch-grid');
    if (!layer) return;

    const triggers: ScrollTrigger[] = [];

    const setActiveSection = (sectionId: string) => {
      layer.dataset.activeSection = sectionId;

      const marks = layer.querySelectorAll<HTMLElement>('.mim-geo-mark');
      const activeTags = SECTION_MARKS[sectionId] ?? [];

      marks.forEach((mark) => {
        const tag = mark.dataset.section ?? '';
        const isActive = activeTags.some((t) => tag.includes(t));
        mark.classList.toggle('is-active', isActive);
      });

      if (grid) {
        grid.classList.toggle('mim-arch-grid--strong', sectionId === 'hero');
        grid.classList.toggle('mim-arch-grid--work', sectionId === 'work');
      }
    };

    SECTIONS.forEach(({ id, selector }) => {
      const el = document.querySelector(selector);
      if (!el) return;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id)
      });
      triggers.push(trigger);
    });

    setActiveSection('hero');

    return () => {
      triggers.forEach((t) => t.kill());
      delete layer.dataset.activeSection;
    };
  }, []);
}
