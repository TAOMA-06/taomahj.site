'use client';

import { useRef } from 'react';
import { yonagiImages } from '@/data/yonagi';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { AssetImage } from './YonagiShared';
import { useSalesLandingMotion } from './motion/useSalesLandingMotion';

const differences = [
  { label: '网站结构', s: '正式单页，信息够用', p: '故事、空间、预约完整编排' },
  { label: '菜单呈现', s: '六项重点菜品', p: '四分类完整菜单、饮品三级分组与分类导航' },
  { label: '到店转化', s: '电话、地图、邮件', p: '预约规则、固定 CTA、当日电话' },
  { label: '语言', s: '日文界面', p: '日文主界面＋英文关键要点' },
  { label: '动效体验', s: '简洁淡入，不抢信息', p: '丝滑滚动与叙事级 scroll 编排' }
];

export default function SalesLanding() {
  const scope = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  useSalesLandingMotion(scope, reducedMotion);

  return (
    <main className="sales-landing" lang="zh-CN" ref={scope}>
      <header className="sales-landing-nav">
        <a href="/" aria-label="返回 taomahj 作品集">
          ← taomahj
        </a>
        <span>RESTAURANT WEBSITE / SALES DEMO</span>
        <a href="mailto:taomahj834225@outlook.com">联系制作 ↗</a>
      </header>

      <section className="sales-landing-hero">
        <p>FOR SMALL RESTAURANTS IN JAPAN</p>
        <h1>
          同一家店，
          <br />
          <em>两种交付。</em>
        </h1>
        <div className="sales-hero-note">
          <strong>夜凪食堂 / YONAGI SHOKUDO</strong>
          <p>
            以大阪南堀江的一家虚构小餐厅为例，直观看懂 49,800 円与 98,000 円两档网站的差别。
          </p>
          <span>建议先看 S，再看 P。约 3 分钟。</span>
        </div>
      </section>

      <section className="sales-showcase" aria-label="S与P制作方案">
        <a className="sales-plan sales-plan--s" href="/sales/s/">
          <div className="sales-plan-copy">
            <div className="sales-plan-top">
              <span>PLAN S / SIMPLE</span>
              <strong>49,800円相当</strong>
            </div>
            <div>
              <p>先有一张正式的手机官网门面。</p>
              <h2>
                清楚、干净，
                <br />
                客人马上能来店。
              </h2>
            </div>
            <ul>
              <li>一页完成</li>
              <li>六项菜单</li>
              <li>电话 · 地图 · 邮件</li>
            </ul>
            <span className="sales-plan-link">
              打开 S 展示版 <b aria-hidden="true">↗</b>
            </span>
          </div>
          <div className="sales-plan-media">
            <AssetImage asset={yonagiImages.interior} eager />
            <span>S</span>
          </div>
        </a>

        <a className="sales-plan sales-plan--p" href="/sales/p/">
          <div className="sales-plan-media">
            <AssetImage asset={yonagiImages.grill} eager />
            <span>P</span>
          </div>
          <div className="sales-plan-copy">
            <div className="sales-plan-top">
              <span>PLAN P / PRO</span>
              <strong>98,000円相当</strong>
            </div>
            <div>
              <p>把店的气质，变成预约的理由。</p>
              <h2>
                故事、空间与炭火，
                <br />
                共同完成转化。
              </h2>
            </div>
            <ul>
              <li>品牌叙事</li>
              <li>分类菜单 · 导航下拉</li>
              <li>预约 · 英文要点</li>
            </ul>
            <span className="sales-plan-link">
              打开 P 定制版 <b aria-hidden="true">↗</b>
            </span>
          </div>
        </a>
      </section>

      <section className="sales-difference" aria-labelledby="difference-title">
        <div className="sales-difference-heading">
          <p>WHY THE PRICE CHANGES</p>
          <h2 id="difference-title">
            差价不在“多几个区块”，
            <br />
            而在信息如何变成信任。
          </h2>
        </div>
        <div className="sales-difference-list">
          {differences.map((item, index) => (
            <article key={item.label}>
              <span>0{index + 1}</span>
              <h3>{item.label}</h3>
              <div>
                <small>S SIMPLE</small>
                <p>{item.s}</p>
              </div>
              <div>
                <small>P PRO</small>
                <p>{item.p}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sales-final-cta">
        <p>SMALL RESTAURANT, CLEARER PRESENCE.</p>
        <h2>
          不需要变成大品牌。
          <br />
          只需要让客人更相信你。
        </h2>
        <a href="mailto:taomahj834225@outlook.com">
          讨论你的网站 <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer className="sales-landing-footer">
        <p>夜凪食堂为虚构店铺。本页仅用于展示网站制作方案。</p>
        <p>© 2026 taomahj · Osaka demo</p>
      </footer>
    </main>
  );
}
