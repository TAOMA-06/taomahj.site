'use client';

import { useRef } from 'react';
import { yonagi, yonagiImages } from '@/data/yonagi';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { AssetImage, DemoRibbon, InfoRows, YonagiFooter, YonagiHeader } from './YonagiShared';
import PMenuInteractive from './PMenuInteractive';
import PSmoothScroll from './PSmoothScroll';
import { useDemoPMotion } from './motion/useDemoPMotion';

function SectionMark({ number, children }: { number: string; children: string }) {
  return (
    <div className="p-section-mark">
      <span>{number}</span>
      <p>{children}</p>
    </div>
  );
}

export default function DemoP() {
  const scope = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  useDemoPMotion(scope, reducedMotion);

  return (
    <PSmoothScroll>
      <div className="yonagi yonagi-p" id="top" lang="ja" ref={scope}>
        <div className="p-scroll-progress" aria-hidden="true">
          <span />
        </div>
        <DemoRibbon plan="P" />
        <YonagiHeader variant="p" />
        <main>
          <section className="p-hero" aria-labelledby="p-hero-title">
            <div className="p-hero-media">
              <AssetImage asset={yonagiImages.grill} eager />
            </div>
            <div className="p-hero-shade" />
            <div className="p-hero-content">
              <p className="p-hero-kicker">SEASONAL CHARCOAL KITCHEN · OSAKA</p>
              <h1 id="p-hero-title">
                <small>{yonagi.identity.reading}</small>
                {yonagi.identity.name}
              </h1>
              <p className="p-hero-tagline">{yonagi.identity.tagline}</p>
              <p className="p-hero-en" lang="en">
                Seasonal grilling, served across a quiet twelve-seat counter.
              </p>
              <div className="yonagi-actions">
                <a className="yonagi-button yonagi-button--copper" href="#reservation">
                  ご予約はこちら <span aria-hidden="true">↓</span>
                </a>
                <a className="yonagi-button yonagi-button--glass" href={yonagi.contact.phoneHref}>
                  当日の空席を聞く <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
            <div className="p-hero-meta">
              <span>{yonagi.contact.hours}</span>
              <span>{yonagi.identity.area}</span>
            </div>
            <a className="p-scroll" href="#story">
              SCROLL TO STORY <span aria-hidden="true">↓</span>
            </a>
          </section>

          <section className="p-story yonagi-pro-shell" id="story" aria-labelledby="p-story-title">
            <SectionMark number="01">OUR STORY</SectionMark>
            <div className="p-story-copy">
              <p className="p-story-lead">
                After sunset,
                <br />
                the city grows quiet.
              </p>
              <h2 id="p-story-title">
                夜が凪ぐころ、
                <br />
                季節をひと皿ずつ。
              </h2>
              <p className="p-story-body">{yonagi.identity.longIntro}</p>
              <p className="p-english-note" lang="en">
                {yonagi.identity.englishIntro}
              </p>
            </div>
            <div className="p-story-photos">
              <figure>
                <AssetImage asset={yonagiImages.exterior} />
                <figcaption>路地に残る、小さな灯り。</figcaption>
              </figure>
              <figure>
                <AssetImage asset={yonagiImages.table} />
                <figcaption>時間を急がない、二人の席。</figcaption>
              </figure>
            </div>
          </section>

          <section className="p-menu" id="menu" aria-labelledby="p-menu-title">
            <div className="yonagi-pro-shell p-menu-heading">
              <SectionMark number="02">MENU</SectionMark>
              <div>
                <h2 id="p-menu-title">
                  炭と出汁、
                  <br />
                  今夜のお品書き。
                </h2>
                <p>
                  一品からおまかせまで。
                  <br />
                  季節と仕入れに合わせてご用意します。
                </p>
              </div>
            </div>
            <div className="p-menu-highlight yonagi-pro-shell" aria-label="料理の写真">
              {yonagi.menuHighlights.map((image, index) => (
                <div key={image.src} className={`p-menu-highlight-${index + 1}`}>
                  <AssetImage asset={image} />
                </div>
              ))}
            </div>
            <PMenuInteractive />
            <p className="p-menu-note">
              ※ 食材の仕入れにより内容・価格が変わる場合がございます。表示価格は税込です。
            </p>
          </section>

          <section className="p-space yonagi-pro-shell" id="space" aria-labelledby="p-space-title">
            <SectionMark number="03">SPACE</SectionMark>
            <div className="p-space-heading">
              <h2 id="p-space-title">
                火のそばに、
                <br />
                十二の席。
              </h2>
              <p>COUNTER 8 · TABLE 4</p>
            </div>
            <div className="p-space-grid">
              {yonagi.space.map((space, index) => (
                <figure className={`p-space-card p-space-card--${index + 1}`} key={space.title}>
                  <AssetImage asset={space.image} />
                  <figcaption>
                    <span>{space.english}</span>
                    <div>
                      <h3>{space.title}</h3>
                      <p>{space.text}</p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="p-reservation" id="reservation" aria-labelledby="p-reservation-title">
            <div className="yonagi-pro-shell p-reservation-grid">
              <SectionMark number="04">RESERVATION</SectionMark>
              <div className="p-reservation-main">
                <p className="p-reservation-label">お席のご案内</p>
                <h2 id="p-reservation-title">
                  今夜の席を、
                  <br />
                  ご用意します。
                </h2>
                <p className="p-reservation-copy">{yonagi.reservation.intro}</p>
                <p className="p-english-note" lang="en">
                  {yonagi.reservation.english}
                </p>
                <div className="p-reservation-actions">
                  <a className="yonagi-button yonagi-button--copper" href={yonagi.contact.phoneHref}>
                    電話で予約する <span aria-hidden="true">↗</span>
                  </a>
                  <span>受付 15:00–22:00</span>
                </div>
                <p className="p-demo-form-note">
                  DEMO NOTE — この制作デモでは、予約導線は電話発信まで体験できます。
                </p>
              </div>
              <aside className="p-rules">
                <h3>
                  ご予約について <small>BEFORE YOUR VISIT</small>
                </h3>
                <ol>
                  {yonagi.reservation.rules.map((rule, index) => (
                    <li key={rule}>
                      <span>0{index + 1}</span>
                      <p>{rule}</p>
                    </li>
                  ))}
                </ol>
              </aside>
            </div>
          </section>

          <section className="p-access yonagi-pro-shell" id="access" aria-labelledby="p-access-title">
            <SectionMark number="05">ACCESS</SectionMark>
            <div className="p-access-heading">
              <p>OSAKA · MINAMIHORIE</p>
              <h2 id="p-access-title">夜凪食堂</h2>
              <p lang="en">A quiet seasonal kitchen, just beyond the lights of Shinsaibashi.</p>
            </div>
            <div className="p-access-details">
              <InfoRows bilingual />
              <a
                className="p-map"
                href={yonagi.contact.mapHref}
                target="_blank"
                rel="noreferrer"
              >
                <span>Google Map</span>
                <strong>地図を開く ↗</strong>
              </a>
            </div>
          </section>
        </main>

        <div className="p-mobile-bar" aria-label="固定予約メニュー">
          <a href="#reservation">予約する</a>
          <a href={yonagi.contact.phoneHref}>電話する</a>
        </div>
        <YonagiFooter pro />
      </div>
    </PSmoothScroll>
  );
}
