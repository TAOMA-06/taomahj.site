'use client';

import { useEffect, useRef, useState } from 'react';
import { type MenuCategory, type MenuItem, yonagi } from '@/data/yonagi';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useYonagiLenis } from './PSmoothScroll';

function itemKey(categoryId: string, name: string) {
  return `${categoryId}::${name}`;
}

function MenuRow({
  item,
  open,
  onToggle
}: {
  item: MenuItem;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`p-menu-row${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="p-menu-row-trigger"
        aria-expanded={open}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onToggle();
        }}
      >
        <span>
          <b>{item.name}</b>
          {item.english && (
            <small lang="en">{item.english}</small>
          )}
        </span>
        <strong>{item.price}</strong>
        <span className="p-menu-row-caret" aria-hidden="true">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="p-menu-row-panel">
          <div className="p-menu-row-panel-inner">
            {item.note ? <p>{item.note}</p> : <p>仕入れと季節により、内容が変わる場合があります。</p>}
            <a
              href="#reservation"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              ご予約の相談へ ↓
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PMenuInteractive() {
  const reducedMotion = usePrefersReducedMotion();
  const lenis = useYonagiLenis();
  const [activeCategory, setActiveCategory] = useState(yonagi.pMenu[0]?.id ?? 'omakase');
  const [openKey, setOpenKey] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -88, duration: reducedMotion ? 0 : 1.05 });
    } else {
      el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const sections = yonagi.pMenu
      .map((category) => document.getElementById(`menu-${category.id}`))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (!top?.target.id) return;
        setActiveCategory(top.target.id.replace(/^menu-/, ''));
      },
      { rootMargin: '-28% 0px -55% 0px', threshold: [0.12, 0.35, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const link = navRef.current?.querySelector<HTMLElement>(`[data-cat="${activeCategory}"]`);
    if (!link || !navRef.current) return;
    const track = navRef.current.querySelector('.p-menu-sub-track');
    if (!(track instanceof HTMLElement)) return;
    const left = link.offsetLeft - track.clientWidth / 2 + link.clientWidth / 2;
    track.scrollTo({ left: Math.max(0, left), behavior: reducedMotion ? 'auto' : 'smooth' });
  }, [activeCategory, reducedMotion]);

  const toggleItem = (categoryId: string, name: string) => {
    const key = itemKey(categoryId, name);
    setOpenKey((current) => (current === key ? null : key));
  };

  const renderItems = (category: MenuCategory, items: MenuItem[]) =>
    items.map((item) => {
      const key = itemKey(category.id, item.name);
      return (
        <MenuRow
          key={key}
          item={item}
          open={openKey === key}
          onToggle={() => toggleItem(category.id, item.name)}
        />
      );
    });

  return (
    <>
      <nav className="p-menu-sub" aria-label="お品書きカテゴリー" ref={navRef}>
        <div className="p-menu-sub-track">
          {yonagi.pMenu.map((category) => (
            <a
              key={category.id}
              href={`#menu-${category.id}`}
              data-cat={category.id}
              className={category.id === activeCategory ? 'is-active' : undefined}
              onClick={(event) => {
                event.preventDefault();
                setActiveCategory(category.id);
                scrollToId(`menu-${category.id}`);
              }}
            >
              <small>{category.english}</small>
              {category.name}
            </a>
          ))}
        </div>
      </nav>

      <div className="yonagi-pro-shell p-menu-categories">
        {yonagi.pMenu.map((category) => (
          <section
            className="p-menu-category"
            key={category.id}
            id={`menu-${category.id}`}
            aria-labelledby={`cat-${category.id}`}
          >
            <header>
              <span>{category.english}</span>
              <h3 id={`cat-${category.id}`}>{category.name}</h3>
              {category.note && <p>{category.note}</p>}
            </header>
            <div className="p-menu-list">
              {category.groups
                ? category.groups.map((group) => (
                    <div
                      className="p-menu-group"
                      key={group.id}
                      id={`menu-${category.id}-${group.id}`}
                    >
                      <div className="p-menu-group-title">
                        <strong>{group.name}</strong>
                        {group.english && <span>{group.english}</span>}
                      </div>
                      {renderItems(category, group.items)}
                    </div>
                  ))
                : renderItems(category, category.items ?? [])}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
