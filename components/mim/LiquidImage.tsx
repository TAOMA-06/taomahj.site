'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlassPanel from '@/components/mim/GlassPanel';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

type LiquidImageProps = {
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
  framed?: boolean;
};

export default function LiquidImage({
  src,
  alt,
  className = '',
  aspectClass = 'aspect-[16/10]',
  framed = true
}: LiquidImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const turbulenceRef = useRef<SVGFETurbulenceElement | null>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img || reducedMotion) return;

    const turbulence = document.querySelector('#mim-liquid-filter feTurbulence') as SVGFETurbulenceElement | null;
    const displacement = document.querySelector('#mim-liquid-filter feDisplacementMap') as SVGFEDisplacementMapElement | null;
    turbulenceRef.current = turbulence;
    displacementRef.current = displacement;

    const scrollTween = gsap.fromTo(
      img,
      { scale: 1.04 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top 90%',
          end: 'top 30%',
          scrub: 0.8
        }
      }
    );

    const freqTween = turbulence
      ? gsap.fromTo(
          turbulence,
          { attr: { baseFrequency: 0.018 } },
          {
            attr: { baseFrequency: 0.01 },
            ease: 'none',
            scrollTrigger: {
              trigger: wrap,
              start: 'top 85%',
              end: 'top 25%',
              scrub: 0.8
            }
          }
        )
      : null;

    return () => {
      scrollTween.scrollTrigger?.kill();
      scrollTween.kill();
      freqTween?.scrollTrigger?.kill();
      freqTween?.kill();
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const displacement = displacementRef.current;
    if (!displacement) return;
    displacement.setAttribute('scale', hovered ? '24' : '12');
  }, [hovered, reducedMotion]);

  const imageBlock = (
    <div
      ref={wrapRef}
      className={`mim-liquid-wrap ${reducedMotion ? '' : 'mim-liquid-wrap--filtered'} ${aspectClass} ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={imgRef} src={src} alt={alt} />
    </div>
  );

  if (!framed) return imageBlock;

  return (
    <GlassPanel variant="card" liquid>
      {imageBlock}
    </GlassPanel>
  );
}
