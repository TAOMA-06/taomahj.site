'use client';

import { useRef } from 'react';
import { yonagi, yonagiImages } from '@/data/yonagi';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { AssetImage, DemoRibbon, InfoRows, YonagiFooter, YonagiHeader } from './YonagiShared';
import { useDemoSMotion } from './motion/useDemoSMotion';

export default function DemoS() {
  const scope = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  useDemoSMotion(scope, reducedMotion);

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
          <div className="s-menu-grid">
            {yonagi.sMenu.map(
              (item, index) =>
                item.image && (
                  <article className={`s-menu-item s-menu-item--${index + 1}`} key={item.name}>
                    <div className="s-menu-photo">
                      <AssetImage asset={item.image} />
                    </div>
                    <div className="s-menu-meta">
                      <span>0{index + 1}</span>
                      <h3>{item.name}</h3>
                      <p>{item.price}</p>
                    </div>
                  </article>
                )
            )}
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

        <section className="s-social yonagi-shell">
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
