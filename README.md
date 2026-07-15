# taomahj.site

个人数字作品展厅，以及面向日本小微餐饮店的官网销售样板。

## 本地运行

```bash
npm install
npm run dev
```

开发服务器默认地址为 `http://localhost:3000`。

开发缓存使用 `.next-dev/`，生产构建使用 `.next/`。因此可以在开发服务运行时执行 `npm run build`，两者不会互相覆盖 chunk。

## 销售 Demo 路径

- `/sales/`：S / P 销售对比入口
- `/sales/s/`：S Simple 展示版（49,800 円相当）
- `/sales/p/`：P Pro 定制版（98,000 円相当）

店铺资料、菜单、预约与 SEO 文案集中在 `data/yonagi.ts`。两套页面共用 `components/sales/` 中的店头、信息行和页脚组件，视觉样式集中在 `app/sales/yonagi.css`。

## 构建

```bash
npm run typecheck
npm run build
```

项目使用 Next.js 静态导出。构建产物位于 `out/`，同时会保留原有静态作品目录。

## 部署

### Vercel

导入 Git 仓库即可。Build Command 使用 `npm run build`，其余保持自动检测。

### Cloudflare Pages

- Build command：`npm run build`
- Build output directory：`out`
- Node.js：20 或更新版本

## 换皮与销售

- [一小时换皮说明](docs/REPLACE.md)
- [S / P 销售话术](docs/SALES.md)
- [图片来源与原创替换提示词](docs/ASSETS.md)

> 夜凪食堂为虚构店铺。电话、地址与账号仅用于公开制作 Demo，不代表真实营业信息。
