import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const EASE = {
  out: 'power3.out',
  soft: 'power2.out',
  expo: 'expo.out',
  inOut: 'power3.inOut'
} as const;

export function isMobileViewport() {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 680px)').matches;
}

export function isFinePointer() {
  return typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

/** S-tier: short once fade-up. Keep total feel under ~0.8s. */
export function simpleReveal(
  elements: gsap.TweenTarget,
  options: {
    y?: number;
    duration?: number;
    stagger?: number;
    start?: string;
    delay?: number;
  } = {}
) {
  const {
    y = 18,
    duration = 0.5,
    stagger = 0.07,
    start = 'top 88%',
    delay = 0
  } = options;

  return gsap.fromTo(
    elements,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease: EASE.out,
      scrollTrigger: {
        trigger: Array.isArray(elements) ? (elements as Element[])[0] : (elements as Element),
        start,
        once: true
      }
    }
  );
}

/** Reveal a group when a shared trigger enters. */
export function simpleRevealGroup(
  trigger: Element,
  elements: gsap.TweenTarget,
  options: { y?: number; duration?: number; stagger?: number; start?: string; delay?: number } = {}
) {
  const { y = 18, duration = 0.5, stagger = 0.07, start = 'top 86%', delay = 0 } = options;

  return gsap.fromTo(
    elements,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease: EASE.out,
      scrollTrigger: { trigger, start, once: true }
    }
  );
}

/** Wrap each character of text nodes for cinematic reveals. */
export function splitChars(el: HTMLElement): HTMLSpanElement[] {
  if (el.dataset.split === 'chars') {
    return Array.from(el.querySelectorAll<HTMLSpanElement>('.yo-char'));
  }

  const text = el.textContent ?? '';
  el.textContent = '';
  el.dataset.split = 'chars';
  el.setAttribute('aria-label', text);

  const chars: HTMLSpanElement[] = [];
  for (const ch of text) {
    const span = document.createElement('span');
    span.className = 'yo-char';
    span.setAttribute('aria-hidden', 'true');
    if (ch === ' ') {
      span.innerHTML = '&nbsp;';
      span.classList.add('yo-char--space');
    } else {
      span.textContent = ch;
    }
    el.appendChild(span);
    chars.push(span);
  }
  return chars;
}

/** Split element into line masks for vertical wipe reveals. */
export function splitLines(el: HTMLElement): HTMLElement[] {
  if (el.dataset.split === 'lines') {
    return Array.from(el.querySelectorAll<HTMLElement>('.yo-line-inner'));
  }

  const html = el.innerHTML;
  const lines = html.split(/<br\s*\/?>/i);
  el.innerHTML = '';
  el.dataset.split = 'lines';

  const inners: HTMLElement[] = [];
  lines.forEach((line, index) => {
    const mask = document.createElement('span');
    mask.className = 'yo-line-mask';
    const inner = document.createElement('span');
    inner.className = 'yo-line-inner';
    inner.innerHTML = line || '&nbsp;';
    mask.appendChild(inner);
    el.appendChild(mask);
    if (index < lines.length - 1) {
      // preserve visual break between masks
    }
    inners.push(inner);
  });
  return inners;
}

export function clipReveal(
  elements: gsap.TweenTarget,
  options: {
    trigger?: Element;
    start?: string;
    duration?: number;
    stagger?: number;
    from?: string;
  } = {}
) {
  const {
    trigger,
    start = 'top 80%',
    duration = 1.05,
    stagger = 0.14,
    from = 'inset(12% 12% 12% 12%)'
  } = options;

  return gsap.fromTo(
    elements,
    { clipPath: from, opacity: 0.55, scale: 1.06 },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      opacity: 1,
      scale: 1,
      duration,
      stagger,
      ease: EASE.expo,
      scrollTrigger: {
        trigger: trigger ?? (Array.isArray(elements) ? (elements as Element[])[0] : (elements as Element)),
        start,
        once: true
      }
    }
  );
}

export function scrubParallax(
  element: gsap.TweenTarget,
  options: {
    trigger: Element;
    yPercent?: number;
    scale?: [number, number];
    start?: string;
    end?: string;
  }
) {
  const { trigger, yPercent = 12, scale, start = 'top bottom', end = 'bottom top' } = options;
  const from: gsap.TweenVars = { yPercent: -yPercent * 0.35 };
  const to: gsap.TweenVars = {
    yPercent,
    ease: 'none',
    scrollTrigger: { trigger, start, end, scrub: true }
  };
  if (scale) {
    from.scale = scale[0];
    to.scale = scale[1];
  }
  return gsap.fromTo(element, from, to);
}

export function onceCascade(
  elements: gsap.TweenTarget,
  options: {
    trigger: Element;
    y?: number;
    duration?: number;
    stagger?: number;
    start?: string;
    delay?: number;
  }
) {
  const { trigger, y = 28, duration = 0.75, stagger = 0.09, start = 'top 82%', delay = 0 } = options;
  return gsap.fromTo(
    elements,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease: EASE.out,
      scrollTrigger: { trigger, start, once: true }
    }
  );
}
