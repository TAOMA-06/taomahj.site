# 夜凪食堂 Demo：一小时换皮说明

所有店铺文字、菜单、联系方式、SEO 与图片信息集中在 `data/yonagi.ts`。素材齐全时，一版“像为这家店定制”的预览约需 45–60 分钟，不需要在组件中逐处搜索文案。

## 准备资料

1. 店名、读音、英文名和一句卖点
2. 地址、电话、营业时间、定休日
3. Google Map 与 Instagram 链接
4. S 版 6–8 个代表菜；P 版按分类整理的完整菜单
5. 横向主图、料理图 6 张、空间或店主人像 3 张
6. 预约方式、人数规则、取消规则和过敏说明

## 修改内容配置

打开 `data/yonagi.ts`：

- `identity`：店名、读音、英文名、地区、卖点、长短简介
- `contact`：电话、`tel:`、地址、营业时间、地图和 Instagram
- `sellingPoints`：S 首页三项卖点
- `sMenu`：S 的 6–8 项重点菜单
- `pMenu`：P 的分类菜单；每类包含日文名、英文分类名与菜品
- `space`：P 的空间图片与说明
- `reservation`：P 的预约说明和规则
- `seo.s` / `seo.p`：两档独立标题与描述

电话链接建议使用国际格式，例如 `06-1234-5678` 对应 `tel:+81612345678`。没有 Google 商家页时，可继续使用地址查询链接。

## 替换图片

图片统一放在：

```text
public/assets/yonagi/
  interior.webp   # 店内主图
  grill.webp      # P 炭火主图
  exterior.webp   # 店铺外观
  table.webp      # 小桌与空间细节
  fish.webp       # 以下为六张菜品图
  sashimi.webp
  tuna.webp
  salmon.webp
  tempura.webp
  ricebowl.webp
  og-s.webp       # 1200×630
  og-p.webp       # 1200×630
```

每张图由 `ImageAsset` 描述：

```ts
type ImageAsset = {
  src: string
  alt: string
  width: number
  height: number
  focal?: string
  sourceUrl?: string
  credit?: string
}
```

替换文件后同步修改真实宽高、日文 alt 和焦点位置。正式客户素材通常不需要 `sourceUrl` / `credit`；图库素材则应保留来源。

| 用途 | 建议尺寸 | 目标体积 |
| --- | --- | --- |
| Hero | 长边 1600–2000 px，WebP | 350 KB 内 |
| 菜品 | 长边 800–1000 px，WebP | 每张 180 KB 内 |
| 空间 | 长边 1200–1600 px，WebP | 每张 250 KB 内 |
| OGP | 1200×630，WebP | 300 KB 内 |

不要用一张照片重复充当所有菜品。压图时保留人物、火焰或主要菜品焦点，并确认手机裁切不会切掉主体。

## 主题色

颜色位于 `app/sales/yonagi.css` 开头：

- `--yo-paper`：纸色背景
- `--yo-paper-light`：浅色内容区
- `--yo-ink` / `--yo-night`：墨色与 P 夜色
- `--yo-copper`：炭火铜色 CTA
- `--yo-moss`：备用自然色

通常只改纸色和铜色即可。按钮的文字与背景必须保持足够对比度。

## 45–60 分钟顺序

1. 0–10 分钟：店名、电话、地址、时间、地图与 SNS。
2. 10–25 分钟：S 菜单和 P 分类菜单。
3. 25–45 分钟：压缩并替换图片，补齐 alt、宽高和焦点。
4. 45–55 分钟：主题色、SEO、OGP。
5. 55–60 分钟：检查 390 px 手机宽度、首屏 CTA、电话、地图、图片与构建。

新增客户资料仍应先进入 `data/yonagi.ts`，不要写散在页面组件里。
