'use client';

import { useRef } from 'react';
import { yonagiImages } from '@/data/yonagi';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { AssetImage } from './YonagiShared';
import { useSalesLandingMotion } from './motion/useSalesLandingMotion';

const differences = [
  { label: '网站结构', s: '一页说完店是谁、吃什么、怎么去', p: '故事、空间、预约分段讲清楚' },
  { label: '菜单呈现', s: '六项重点菜，扫一眼就懂', p: '完整分类菜单，点分类就能跳转' },
  { label: '到店转化', s: '电话、地图、邮件都能点', p: '预约规则 + 固定按钮，随时能订席' },
  { label: '语言', s: '日文界面', p: '日文为主，英文要点给外国客' },
  { label: '浏览体验', s: '淡入淡出，不抢信息', p: '滚动带动画面，像翻一本店册' }
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
            虚构的大阪南堀江小餐厅。用同一家店对照 49,800 円与 98,000 円两档官网。
          </p>
          <span>先看 S，再看 P。约 3 分钟。</span>
        </div>
      </section>

      <section className="sales-showcase" aria-label="S与P制作方案">
        <a className="sales-plan sales-plan--s" href="/sales/s/">
          <div className="sales-plan-copy">
            <div className="sales-plan-top">
              <span>PLAN S / SIMPLE</span>
              <strong>49,800円相当</strong>
            </div>
            <h2 className="sales-plan-position">够用的一页</h2>
            <ul>
              <li>一页说完</li>
              <li>六项重点菜</li>
              <li>电话 · 地图 · 邮件</li>
            </ul>
            <span className="sales-plan-link">
              打开 S <b aria-hidden="true">↗</b>
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
            <h2 className="sales-plan-position">完整到店叙事</h2>
            <ul>
              <li>品牌故事</li>
              <li>分类菜单 · 可跳转导航</li>
              <li>预约 · 英文要点</li>
            </ul>
            <span className="sales-plan-link">
              打开 P <b aria-hidden="true">↗</b>
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
