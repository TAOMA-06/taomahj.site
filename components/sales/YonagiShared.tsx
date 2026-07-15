import type { CSSProperties } from 'react';
import { type ImageAsset, yonagi } from '@/data/yonagi';

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

export function YonagiHeader({ variant }: { variant: 's' | 'p' }) {
  const isPro = variant === 'p';
  return (
    <header className={`yonagi-header yonagi-header--${variant}`}>
      <a className="yonagi-brand" href="#top" aria-label="夜凪食堂 トップへ">
        <strong>{yonagi.identity.name}</strong>
        <small>{yonagi.identity.reading}</small>
      </a>
      <nav aria-label="店内ナビゲーション">
        {isPro && <a href="#story">お店の話</a>}
        <a href="#menu">お品書き</a>
        {isPro && <a href="#space">空間</a>}
        <a href={isPro ? '#reservation' : '#access'}>{isPro ? 'ご予約' : '店舗情報'}</a>
      </nav>
      <a
        className="yonagi-header-cta"
        href={isPro ? '#reservation' : yonagi.contact.mapHref}
        target={isPro ? undefined : '_blank'}
        rel={isPro ? undefined : 'noreferrer'}
      >
        {isPro ? '席を予約する' : '地図を開く'} <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}

export function InfoRows({ bilingual = false }: { bilingual?: boolean }) {
  return (
    <dl className="yonagi-info-rows">
      <div><dt>住所 {bilingual && <small>ADDRESS</small>}</dt><dd>{yonagi.contact.address}</dd></div>
      <div><dt>営業時間 {bilingual && <small>HOURS</small>}</dt><dd>{yonagi.contact.hours}</dd></div>
      <div><dt>定休日 {bilingual && <small>CLOSED</small>}</dt><dd>{yonagi.contact.closed}</dd></div>
      <div><dt>電話 {bilingual && <small>TELEPHONE</small>}</dt><dd><a href={yonagi.contact.phoneHref}>{yonagi.contact.phoneDisplay}</a></dd></div>
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
        <a href={yonagi.contact.mapHref} target="_blank" rel="noreferrer">Google Map ↗</a>
        <a href={yonagi.contact.instagramHref} target="_blank" rel="noreferrer">Instagram ↗</a>
        <a href="/sales/">S / P 比較へ</a>
      </div>
      <p>© 2026 Yonagi Shokudo</p>
      <p className="yonagi-demo-note">これは制作デモです。実在する店舗ではありません。</p>
      {pro && <p className="yonagi-site-note">SITE NOTE — Portfolio demonstration by taomahj.</p>}
    </footer>
  );
}

export function DemoRibbon({ plan }: { plan: 'S' | 'P' }) {
  return <div className="yonagi-demo-ribbon" role="note">制作デモ <span>PLAN {plan}</span></div>;
}
