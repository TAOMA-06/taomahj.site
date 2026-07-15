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
            <h2 className="sales-plan-position">
              经济简单型网页设计
            </h2>
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
            <h2 className="sales-plan-position">
              深度定制
            </h2>
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

      <section className="sales-difference" aria-label="S与P方案对照">
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
    </main>
  );
}
