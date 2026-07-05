'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const playExit = (href: string) => {
      overlay.classList.add('mim-page-transition--active');
      gsap.fromTo(
        overlay,
        { scaleY: 0, transformOrigin: 'bottom' },
        {
          scaleY: 1,
          duration: 0.55,
          ease: 'power3.inOut',
          onComplete: () => {
            window.location.href = href;
          }
        }
      );
    };

    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest('a[data-mim-transition]');
      if (!target || !(target instanceof HTMLAnchorElement)) return;
      if (target.target === '_blank' || event.metaKey || event.ctrlKey || event.shiftKey) return;

      const href = target.getAttribute('href');
      if (!href || href.startsWith('mailto:') || href.startsWith('#')) return;

      event.preventDefault();
      playExit(href);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    gsap.fromTo(
      overlay,
      { scaleY: 1, transformOrigin: 'top' },
      { scaleY: 0, duration: 0.65, ease: 'power3.inOut', delay: 0.1 }
    );
  }, []);

  return <div ref={overlayRef} className="mim-page-transition" aria-hidden="true" />;
}
