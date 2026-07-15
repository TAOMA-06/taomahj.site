'use client';

import { useEffect, useRef, useState } from 'react';
import { yonagi, yonagiImages } from '@/data/yonagi';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { AssetImage, DemoRibbon, InfoRows, YonagiFooter, YonagiHeader } from './YonagiShared';
import { useDemoSMotion } from './motion/useDemoSMotion';

export default function DemoS() {
  const scope = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  useDemoSMotion(scope, reducedMotion);

  const dishes = yonagi.sMenu.filter((item) => item.image && item.id);
  const [activeId, setActiveId] = useState(dishes[0]?.id ?? 'yaki');
  const activeDish = dishes.find((item) => item.id === activeId) ?? dishes[0];

  const selectDish = (id: string, scrollDetail = true) => {
    setActiveId(id);
    if (!scrollDetail) return;
    requestAnimationFrame(() => {
      detailRef.current?.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'nearest'
      });
    });
  };

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      const match = hash.match(/^dish-(.+)$/);
      if (!match?.[1]) return;
      if (dishes.some((dish) => dish.id === match[1])) {
        selectDish(match[1], true);
      }
    };
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <div className="yonagi yonagi-s" id="top" lang="ja" ref={scope}>
      <DemoRibbon plan="S" />
      <YonagiHeader variant="s" />
      <main>
        <section className="s-hero" aria-labelledby="s-hero-title">
          <div className="s-hero-media">
            <AssetImage asset={yonagiImages.interior} eager />
            <p className="s-hero-caption">MINAMIHORIE · OSAKA</p>
          </div>
          <div className="s-hero-copy">
            <div className="s-hero-overline">
              <span>十二席の季節料理店</span>
              <span>{yonagi.identity.openDays}</span>
            </div>
            <h1 id="s-hero-title">{yonagi.identity.name}</h1>
            <p className="s-reading">
              {yonagi.identity.reading} / {yonagi.identity.english}
            </p>
            <p className="s-tagline">{yonagi.identity.tagline}</p>
            <p className="s-hero-intro">{yonagi.identity.shortIntro}</p>
            <div className="yonagi-actions">
              <a className="yonagi-button yonagi-button--dark" href={yonagi.contact.phoneHref}>
                電話する <span aria-hidden="true">↗</span>
              </a>
              <a
                className="yonagi-button yonagi-button--line"
                href={yonagi.contact.mapHref}
                target="_blank"
                rel="noreferrer"
              >
                地図を開く <span aria-hidden="true">↗</span>
              </a>
            </div>
            <a className="s-email" href={yonagi.contact.emailHref}>
              メール&nbsp; {yonagi.contact.email} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className="s-points" aria-label="夜凪食堂の特徴">
          <div className="yonagi-shell s-points-track">
            {yonagi.sellingPoints.map((point) => (
              <article key={point.number}>
                <span>{point.number}</span>
                <div>
                  <h2>{point.title}</h2>
                  <p>{point.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="s-menu yonagi-shell" id="menu" aria-labelledby="s-menu-title">
          <div className="yonagi-section-heading">
            <div>
              <p>SEASONAL MENU</p>
              <h2 id="s-menu-title">今夜のおすすめ</h2>
            </div>
            <p>
              仕入れにより内容が変わります。
              <br />
              表示価格は税込です。
            </p>
          </div>

          <nav className="s-menu-sub" aria-label="おすすめ料理一覧">
            {dishes.map((item, index) => (
              <button
                type="button"
                key={item.id}
                className={item.id === activeId ? 'is-active' : undefined}
                onClick={() => selectDish(item.id!)}
              >
                <span>0{index + 1}</span>
                {item.name}
              </button>
            ))}
          </nav>

          {activeDish?.image && (
            <aside className="s-menu-detail" ref={detailRef} aria-live="polite">
              <div className="s-menu-detail-photo">
                <AssetImage asset={activeDish.image} />
              </div>
              <div className="s-menu-detail-copy">
                <p className="yonagi-eyebrow">SELECTED DISH</p>
                <h3>{activeDish.name}</h3>
                <p className="s-menu-detail-price">{activeDish.price}</p>
                <p className="s-menu-detail-note">{activeDish.note}</p>
                <a className="yonagi-button yonagi-button--dark" href={yonagi.contact.phoneHref}>
                  この料理について聞く <span aria-hidden="true">↗</span>
                </a>
              </div>
            </aside>
          )}

          <div className="s-menu-grid">
            {dishes.map((item, index) => (
              <button
                type="button"
                className={`s-menu-item s-menu-item--${index + 1}${item.id === activeId ? ' is-active' : ''}`}
                key={item.id}
                id={`dish-${item.id}`}
                aria-pressed={item.id === activeId}
                onClick={() => selectDish(item.id!)}
              >
                <div className="s-menu-photo">
                  <AssetImage asset={item.image!} />
                </div>
                <div className="s-menu-meta">
                  <span>0{index + 1}</span>
                  <h3>{item.name}</h3>
                  <p>{item.price}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="s-access" id="access" aria-labelledby="s-access-title">
          <div className="yonagi-shell s-access-grid">
            <div className="s-access-copy">
              <p className="yonagi-eyebrow">VISIT YONAGI</p>
              <h2 id="s-access-title">
                南堀江の路地で、
                <br />
                お待ちしています。
              </h2>
              <InfoRows />
              <div className="yonagi-actions">
                <a
                  className="yonagi-button yonagi-button--cream"
                  href={yonagi.contact.mapHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  Google Mapで見る <span aria-hidden="true">↗</span>
                </a>
                <a className="yonagi-button yonagi-button--line-light" href={yonagi.contact.phoneHref}>
                  電話で確認する <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
            <a
              className="s-access-photo"
              href={yonagi.contact.mapHref}
              target="_blank"
              rel="noreferrer"
              aria-label="Google Mapで夜凪食堂の住所を検索"
            >
              <AssetImage asset={yonagiImages.exterior} />
              <span>
                <small>OSAKA · MINAMIHORIE</small>
                <strong>地図を開く ↗</strong>
              </span>
            </a>
          </div>
        </section>

        <section className="s-social yonagi-shell" id="contact">
          <div>
            <p className="yonagi-eyebrow">CONTACT</p>
            <h2>
              お問い合わせは、
              <br />
              メールで。
            </h2>
          </div>
          <a href={yonagi.contact.emailHref}>
            {yonagi.contact.email} <span aria-hidden="true">↗</span>
          </a>
        </section>
      </main>
      <YonagiFooter />
    </div>
  );
}
