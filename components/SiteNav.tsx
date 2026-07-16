'use client';

import { useEffect, useId, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { HOME_EASE } from '@/components/mim/homeMotion';
import { featuredProjects } from '@/data/projects';
import { useSmoothScroll } from '@/components/mim/SmoothScrollProvider';

gsap.registerPlugin(ScrollTrigger);

type NavLink = {
  href: string;
  label: string;
  external?: boolean;
};

const primaryLinks: NavLink[] = [
  { href: '#approach', label: '关于' },
  { href: '#contact', label: '联系' }
];

const workLinks: NavLink[] = [
  { href: '#work', label: '全部作品' },
  ...featuredProjects.map((p) => ({
    href: `#work-${p.id}`,
    label: p.title
  }))
];

export default function SiteNav() {
  const navRef = useRef<HTMLElement>(null);
  const worksRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { lenis } = useSmoothScroll();
  const [worksOpen, setWorksOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuId = useId();
  const worksOpenRef = useRef(worksOpen);
  const mobileOpenRef = useRef(mobileOpen);
  worksOpenRef.current = worksOpen;
  mobileOpenRef.current = mobileOpen;

  // Entrance + scroll hide/show — mount once (do not depend on menu open state)
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || reducedMotion) return;

    gsap.fromTo(
      nav,
      { yPercent: -100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.7, ease: HOME_EASE.out, delay: 0.05 }
    );

    let lastY = window.scrollY || 0;
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        if (worksOpenRef.current || mobileOpenRef.current) {
          lastY = self.scroll();
          return;
        }
        const y = self.scroll();
        if (y > lastY + 4 && y > 120) {
          gsap.to(nav, { yPercent: -100, duration: 0.35, ease: HOME_EASE.inOut, overwrite: 'auto' });
        } else if (y < lastY - 4) {
          gsap.to(nav, { yPercent: 0, duration: 0.4, ease: HOME_EASE.out, overwrite: 'auto' });
        }
        lastY = y;
      }
    });

    return () => {
      st.kill();
    };
  }, [reducedMotion]);

  // Keep nav visible while a menu is open (no entrance replay)
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || reducedMotion) return;
    if (!worksOpen && !mobileOpen) return;
    gsap.to(nav, { yPercent: 0, opacity: 1, duration: 0.28, ease: HOME_EASE.out, overwrite: 'auto' });
  }, [worksOpen, mobileOpen, reducedMotion]);

  useEffect(() => {
    if (!worksOpen && !mobileOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setWorksOpen(false);
        setMobileOpen(false);
      }
    };

    const onPointer = (event: MouseEvent) => {
      const target = event.target as Node;
      if (worksRef.current && !worksRef.current.contains(target)) {
        setWorksOpen(false);
      }
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onPointer);
    };
  }, [worksOpen, mobileOpen]);

  const scrollToHash = (href: string) => {
    if (!href.startsWith('#')) return;
    const el = document.querySelector(href);
    if (!el) return;

    setWorksOpen(false);
    setMobileOpen(false);

    if (lenis) {
      lenis.scrollTo(el as HTMLElement, { offset: -72, duration: 1.05 });
      return;
    }

    el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  };

  const onNavClick = (event: ReactMouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return;
    event.preventDefault();
    scrollToHash(href);
  };

  return (
    <nav className="mim-nav" aria-label="主导航" ref={navRef}>
      <div className="mim-nav__inside">
        <a
          href="#hero"
          className="mim-nav__brand"
          onClick={(e) => onNavClick(e, '#hero')}
        >
          taomahj
        </a>

        <div className="mim-nav__links">
          <div
            className={`mim-nav__dropdown${worksOpen ? ' is-open' : ''}`}
            ref={worksRef}
          >
            <button
              type="button"
              className="mim-nav__link mim-nav__dropdown-trigger"
              aria-expanded={worksOpen}
              aria-controls={menuId}
              onClick={() => setWorksOpen((v) => !v)}
            >
              作品
              <span className="mim-nav__caret" aria-hidden="true" />
            </button>
            <div id={menuId} className="mim-nav__menu" role="menu" hidden={!worksOpen}>
              <p className="mim-nav__menu-kicker">看作品</p>
              {workLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  role="menuitem"
                  className="mim-nav__menu-item"
                  onClick={(e) => onNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/sales/"
                role="menuitem"
                className="mim-nav__menu-item mim-nav__menu-item--muted"
              >
                夜凪食堂 / 销售样板
              </a>
            </div>
          </div>

          {primaryLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="mim-nav__link"
              onClick={(e) => onNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}

          <a href="#stack" className="mim-nav__link" onClick={(e) => onNavClick(e, '#stack')}>
            技术
          </a>
        </div>

        <div className="mim-nav__actions">
          <a
            href="https://github.com/TAOMA-06"
            target="_blank"
            rel="noreferrer"
            className="mim-nav__link mim-nav__link--out"
          >
            GitHub
          </a>
          <button
            type="button"
            className="mim-nav__burger"
            aria-expanded={mobileOpen}
            aria-controls="mim-mobile-panel"
            aria-label={mobileOpen ? '关闭菜单' : '打开菜单'}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="mim-mobile-panel"
        className={`mim-nav__mobile${mobileOpen ? ' is-open' : ''}`}
        hidden={!mobileOpen}
      >
        <p className="mim-nav__menu-kicker">导航</p>
        <a href="#work" onClick={(e) => onNavClick(e, '#work')}>
          作品
        </a>
        {featuredProjects.map((p) => (
          <a
            key={p.id}
            href={`#work-${p.id}`}
            onClick={(e) => onNavClick(e, `#work-${p.id}`)}
          >
            {p.title}
          </a>
        ))}
        <a href="#approach" onClick={(e) => onNavClick(e, '#approach')}>
          关于
        </a>
        <a href="#stack" onClick={(e) => onNavClick(e, '#stack')}>
          技术
        </a>
        <a href="#contact" onClick={(e) => onNavClick(e, '#contact')}>
          联系
        </a>
        <a href="/sales/">夜凪食堂</a>
      </div>
    </nav>
  );
}
