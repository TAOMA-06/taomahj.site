import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HOME_EASE = {
  out: 'power3.out',
  expo: 'expo.out',
  soft: 'power2.out',
  inOut: 'power3.inOut'
} as const;

export function isMobileHome() {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 760px)').matches;
}

/** Once fade-up when element enters viewport. */
export function revealOnce(
  elements: gsap.TweenTarget,
  options: {
    trigger?: Element | string;
    y?: number;
    duration?: number;
    stagger?: number;
    delay?: number;
    start?: string;
  } = {}
) {
  const {
    trigger,
    y = 32,
    duration = 0.75,
    stagger = 0.08,
    delay = 0,
    start = 'top 84%'
  } = options;

  const first = gsap.utils.toArray(elements)[0] as Element | undefined;

  return gsap.fromTo(
    elements,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease: HOME_EASE.out,
      scrollTrigger: {
        trigger: (trigger as Element) ?? first,
        start,
        once: true
      }
    }
  );
}

/** Line mask reveal for headlines that contain <br>. */
export function splitHeadlineLines(el: HTMLElement): HTMLElement[] {
  if (el.dataset.split === 'lines') {
    return Array.from(el.querySelectorAll<HTMLElement>('.mim-line-inner'));
  }

  const parts = el.innerHTML.split(/<br\s*\/?>/i);
  el.innerHTML = '';
  el.dataset.split = 'lines';

  const inners: HTMLElement[] = [];
  parts.forEach((part) => {
    const mask = document.createElement('span');
    mask.className = 'mim-line-mask';
    const inner = document.createElement('span');
    inner.className = 'mim-line-inner';
    inner.innerHTML = part || '&nbsp;';
    mask.appendChild(inner);
    el.appendChild(mask);
    inners.push(inner);
  });
  return inners;
}

export function revealLines(
  el: HTMLElement,
  options: { start?: string; duration?: number; stagger?: number } = {}
) {
  const { start = 'top 82%', duration = 0.9, stagger = 0.1 } = options;
  const lines = splitHeadlineLines(el);
  return gsap.fromTo(
    lines,
    { yPercent: 110 },
    {
      yPercent: 0,
      duration,
      stagger,
      ease: HOME_EASE.expo,
      scrollTrigger: { trigger: el, start, once: true }
    }
  );
}

export function scrubImage(
  img: Element,
  trigger: Element,
  options: { fromScale?: number; toScale?: number; yPercent?: number } = {}
) {
  const { fromScale = 1.08, toScale = 1, yPercent = 8 } = options;
  return gsap.fromTo(
    img,
    { scale: fromScale, yPercent: -yPercent * 0.4 },
    {
      scale: toScale,
      yPercent,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.7
      }
    }
  );
}

/** t: 0 = slot/boxed, 1 = full viewport. Applies fixed geometry onto voidEl. */
export function applyHeroVoidFrame(
  voidEl: HTMLElement,
  slotEl: HTMLElement,
  t: number,
  extras?: {
    caption?: HTMLElement | null;
  }
) {
  const slot = slotEl.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const clamped = gsap.utils.clamp(0, 1, t);

  gsap.set(voidEl, {
    position: 'fixed',
    top: gsap.utils.interpolate(slot.top, 0, clamped),
    left: gsap.utils.interpolate(slot.left, 0, clamped),
    width: gsap.utils.interpolate(slot.width, vw, clamped),
    height: gsap.utils.interpolate(slot.height, vh, clamped),
    x: 0,
    y: 0,
    margin: 0,
    zIndex: 5
  });

  voidEl.classList.toggle('is-expanded', clamped > 0.12);

  if (extras?.caption) {
    gsap.set(extras.caption, { opacity: gsap.utils.clamp(0, 1, 1 - clamped * 1.35) });
  }
}

/**
 * Scrub hero void from full-bleed (progress 0) back to the measured slot (progress 1).
 * Call after the enter morph has reached full-bleed.
 */
export function scrubHeroVoidExpand(
  voidEl: HTMLElement,
  slotEl: HTMLElement,
  options: {
    trigger?: Element | string;
    start?: string;
    end?: string;
    scrub?: number;
    caption?: HTMLElement | null;
  } = {}
) {
  const {
    trigger = '#hero',
    start = 'top top',
    end = 'bottom top',
    scrub = 0.7,
    caption = null
  } = options;

  const paint = (scrollProgress: number) => {
    applyHeroVoidFrame(voidEl, slotEl, 1 - scrollProgress, { caption });
  };

  return ScrollTrigger.create({
    trigger,
    start,
    end,
    scrub,
    invalidateOnRefresh: true,
    onUpdate: (self) => paint(self.progress),
    onRefresh: (self) => paint(self.progress)
  });
}
