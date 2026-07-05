'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function LightAtmosphere() {
  const layerRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const layer = layerRef.current;
    const beam = beamRef.current;
    if (!layer) return;

    const finePointer = window.matchMedia('(pointer: fine)').matches;

    const onPointerMove = (event: PointerEvent) => {
      layer.style.setProperty('--mim-spot-x', `${event.clientX}px`);
      layer.style.setProperty('--mim-spot-y', `${event.clientY}px`);
    };

    if (!reducedMotion && finePointer) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
    }

    let beamTween: gsap.core.Tween | null = null;
    if (!reducedMotion && beam) {
      beamTween = gsap.fromTo(
        beam,
        { x: '-40vw', rotate: -18 },
        {
          x: '140vw',
          rotate: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: '40% top',
            scrub: 0.6
          }
        }
      );
    }

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      beamTween?.scrollTrigger?.kill();
      beamTween?.kill();
    };
  }, [reducedMotion]);

  return (
    <div ref={layerRef} className="mim-light-layer" aria-hidden="true">
      <div className="mim-light-ambient" />
      {!reducedMotion && <div className="mim-light-spotlight" />}
      <div ref={beamRef} className="mim-light-beam" />
    </div>
  );
}
