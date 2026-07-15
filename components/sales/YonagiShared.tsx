'use client';

import { type CSSProperties, useEffect, useId, useState } from 'react';
import { type ImageAsset, type NavItem, yonagi } from '@/data/yonagi';
import { useYonagiLenis } from './PSmoothScroll';

export function AssetImage({
  asset,
  eager = false,
  className
}: {
  asset: ImageAsset;
  eager?: boolean;
  className?: string;
}) {
  return (
    <img
      className={className}
      src={asset.src}
      alt={asset.alt}
      width={asset.width}
      height={asset.height}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
      style={asset.focal ? ({ objectPosition: asset.focal } as CSSProperties) : undefined}
    />
  );
}

function scrollToHref(href: string, lenis: ReturnType<typeof useYonagiLenis>) {
  if (!href.startsWith('#')) return;
  const el = document.querySelector(href);
  if (!(el instanceof HTMLElement)) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: href.startsWith('#menu-') ? -88 : -24, duration: 1.05 });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: href.startsWith('#dish-') ? 'nearest' : 'start' });
  }
}

function activateDishHash(href: string) {
  if (!href.startsWith('#dish-')) return;
  const next = href.slice(1);
  if (window.location.hash === `#${next}`) {
    window.dispatchEvent(new Event('hashchange'));
  } else {
    window.location.hash = next;
  }
}

function NavLinks({
  items,
  onNavigate,
  mobile = false
}: {
  items: NavItem[];
  onNavigate?: () => void;
  mobile?: boolean;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const lenis = useYonagiLenis();

  return (
    <>
      {items.map((item) => {
        const hasChildren = Boolean(item.children?.length);
        const isOpen = openId === item.href;

        if (!hasChildren) {
          return (
            <a
              key={item.href + item.label}
              href={item.href}
              onClick={(event) => {
                if (!item.href.startsWith('#')) {
                  onNavigate?.();
                  return;
                }
                event.preventDefault();
                onNavigate?.();
                scrollToHref(item.href, lenis);
              }}
            >
              {item.label}
            </a>
          );
        }

        if (mobile) {
          return (
            <div
              key={item.href + item.label}
              className={`yonagi-nav-group ${isOpen ? 'is-open' : ''}`}
            >
              <div className="yonagi-nav-group-row">
                <a
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate?.();
                    scrollToHref(item.href, lenis);
                  }}
                >
                  {item.label}
                </a>
                <button
                  type="button"
                  className="yonagi-nav-toggle"
                  aria-expanded={isOpen}
                  aria-controls={`sub-${item.href.replace('#', '')}`}
                  onClick={() => setOpenId(isOpen ? null : item.href)}
                >
                  <span className="visually-hidden">{item.label}の下層メニュー</span>
                  <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>
              </div>
              <div
                id={`sub-${item.href.replace('#', '')}`}
                className="yonagi-nav-sub"
                hidden={!isOpen}
              >
                {item.children!.map((child) => (
                  <a
                    key={child.href + child.label}
                    href={child.href}
                    onClick={(event) => {
                      event.preventDefault();
                      setOpenId(null);
                      onNavigate?.();
                      activateDishHash(child.href);
                      scrollToHref(child.href, lenis);
                    }}
                  >
                    {child.label}
                  </a>
                ))}
              </div>
            </div>
          );
        }

        return (
          <div
            key={item.href + item.label}
            className={`yonagi-nav-item yonagi-nav-item--has-sub${isOpen ? ' is-open' : ''}`}
            onMouseLeave={() => setOpenId(null)}
          >
            <a
              href={item.href}
              aria-expanded={isOpen}
              onClick={(event) => {
                event.preventDefault();
                setOpenId(isOpen ? null : item.href);
                scrollToHref(item.href, lenis);
              }}
            >
              {item.label}
              <span className="yonagi-nav-caret" aria-hidden="true">
                ▾
              </span>
            </a>
            <div className="yonagi-nav-dropdown" role="list">
              {item.children!.map((child) => (
                <a
                  key={child.href + child.label}
                  href={child.href}
                  role="listitem"
                  onClick={(event) => {
                    event.preventDefault();
                    setOpenId(null);
                    onNavigate?.();
                    activateDishHash(child.href);
                    scrollToHref(child.href, lenis);
                  }}
                >
                  {child.label}
                </a>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}

export function YonagiHeader({ variant }: { variant: 's' | 'p' }) {
  const isPro = variant === 'p';
  const items = isPro ? yonagi.nav.p : yonagi.nav.s;
  const [menuOpen, setMenuOpen] = useState(false);
  const panelId = useId();
  const lenis = useYonagiLenis();

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`yonagi-header yonagi-header--${variant}${menuOpen ? ' is-menu-open' : ''}`}>
      <a className="yonagi-brand" href="#top" aria-label="夜凪食堂 トップへ" onClick={closeMenu}>
        <strong>{yonagi.identity.name}</strong>
        <small>{yonagi.identity.reading}</small>
      </a>

      <nav className="yonagi-nav-desktop" aria-label="店内ナビゲーション">
        <NavLinks items={items} />
      </nav>

      <div className="yonagi-header-end">
        <a
          className="yonagi-header-cta"
          href={isPro ? '#reservation' : yonagi.contact.mapHref}
          target={isPro ? undefined : '_blank'}
          rel={isPro ? undefined : 'noreferrer'}
          onClick={(event) => {
            closeMenu();
            if (!isPro) return;
            event.preventDefault();
            scrollToHref('#reservation', lenis);
          }}
        >
          {isPro ? '席を予約する' : '地図を開く'} <span aria-hidden="true">↗</span>
        </a>
        <button
          type="button"
          className="yonagi-menu-button"
          aria-expanded={menuOpen}
          aria-controls={panelId}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="visually-hidden">{menuOpen ? 'メニューを閉じる' : 'メニューを開く'}</span>
          <span aria-hidden="true">{menuOpen ? '閉じる' : 'メニュー'}</span>
        </button>
      </div>

      <div
        id={panelId}
        className="yonagi-nav-panel"
        hidden={!menuOpen}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="モバイルナビゲーション">
          <NavLinks items={items} mobile onNavigate={closeMenu} />
        </nav>
      </div>
    </header>
  );
}

export function InfoRows({ bilingual = false }: { bilingual?: boolean }) {
  return (
    <dl className="yonagi-info-rows">
      <div>
        <dt>
          住所 {bilingual && <small>ADDRESS</small>}
        </dt>
        <dd>{yonagi.contact.address}</dd>
      </div>
      <div>
        <dt>
          営業時間 {bilingual && <small>HOURS</small>}
        </dt>
        <dd>{yonagi.contact.hours}</dd>
      </div>
      <div>
        <dt>
          定休日 {bilingual && <small>CLOSED</small>}
        </dt>
        <dd>{yonagi.contact.closed}</dd>
      </div>
      <div>
        <dt>
          電話 {bilingual && <small>TELEPHONE</small>}
        </dt>
        <dd>
          <a href={yonagi.contact.phoneHref}>{yonagi.contact.phoneDisplay}</a>
        </dd>
      </div>
    </dl>
  );
}

export function YonagiFooter({ pro = false }: { pro?: boolean }) {
  return (
    <footer className={`yonagi-footer ${pro ? 'yonagi-footer--pro' : ''}`}>
      <div className="yonagi-footer-brand">
        <strong>{yonagi.identity.name}</strong>
        <span>{yonagi.identity.english}</span>
      </div>
      <div className="yonagi-footer-links">
        <a href={yonagi.contact.mapHref} target="_blank" rel="noreferrer">
          Google Map ↗
        </a>
        <a href={yonagi.contact.emailHref}>メール ↗</a>
        <a href="/sales/">S / P 比較へ</a>
      </div>
      <p>© 2026 Yonagi Shokudo</p>
      <p className="yonagi-demo-note">これは制作デモです。実在する店舗ではありません。</p>
      {pro && <p className="yonagi-site-note">SITE NOTE — Portfolio demonstration by taomahj.</p>}
    </footer>
  );
}

export function DemoRibbon({ plan }: { plan: 'S' | 'P' }) {
  return (
    <div className="yonagi-demo-ribbon" role="note">
      制作デモ <span>PLAN {plan}</span>
    </div>
  );
}
