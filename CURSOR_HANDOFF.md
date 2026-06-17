# taomahj.site 代码库交接文档 → Cursor

> **给接手的 AI 看**：这是 taomahj.site 个人网站的完整代码库交接文档。包含项目结构、技术栈、开发约定、常见坑、部署流程。请通读后再动工。

---

## 1. 项目概览

| 项 | 值 |
|---|-----|
| **本地路径** | `/Users/taoma/Documents/networks/` |
| **GitHub** | `TAOMA-06/taomahj.site`（main 分支） |
| **线上地址** | `https://taomahj.site` |
| **部署方式** | Cloudflare Pages，`git push origin main` 后自动部署（1-2min） |
| **DNS/CDN** | 腾讯云 DNS → Cloudflare |
| **技术栈** | **纯静态**：HTML + CSS + JS + D3.js v7（CDN），零框架、零构建步骤 |

---

## 2. 文件结构

```
networks/
├── index.html              # 主页（372行）— 包含所有 HTML 结构
├── style.css               # 主样式（928行）— shadcn/ui 变量系统 + 全站样式
├── main.js                 # 主脚本（720行）— i18n / 主题切换 / 知识图谱 D3 / 展开卡片
├── arch-bg.js              # Canvas 粒子背景（169行）— rAF 循环、鼠标视差、主题感知
├── arch-animations.js      # 滚动动画引擎（246行）— 3D卡片倾斜、视差、IntersectionObserver
│
├── mixflow/                # 鸡尾酒配方浏览器
│   ├── index.html          # SPA 入口
│   ├── app.js              # 核心逻辑（805行 ~20KB）
│   ├── style.css           # 样式（986行）
│   ├── recipes.json        # 数据文件（896KB，TheCocktailDB 全量导出）
│   ├── mocktails.json      # 无酒精配方
│   ├── test.html / debug.html  # 调试用
│
├── perler/                 # 图片转拼豆风格
│   ├── index.html          # SPA 入口
│   ├── app.js              # Canvas 图像处理（477行）
│   ├── style.css           # 样式（390行）
│   ├── widget.js           # 浮动小工具 IIFE — 注入到主页
│
├── chiwu/                  # 持物记录产品页（单文件HTML，1996行/75KB）
│   ├── index.html          # Apple-style 产品展示页
│   ├── icon.png
│   └── chiwu-android.apk   # Android 安装包
│
├── gallery/                # 壁纸图库
│   ├── index.html          # manifest 驱动的图片库
│   ├── app.js              # 图库逻辑 + lightbox（266行）
│   ├── style.css           # 样式（263行）
│   ├── manifest.json       # 图片元数据（文件名、分辨率、尺寸、日期）
│   ├── images/             # 原图（4张）
│   └── thumbnails/         # 400px缩略图
│
├── assets/
│   ├── projects/           # 项目封面图（640×400，Pillow 生成）
│   └── favicon-*.png       # 各子项目图标
│
├── scripts/
│   ├── add-wallpaper.py    # 添加壁纸 CLI（复制+缩略图+更新 manifest）
│   └── security.js         # 安全脚本（console 覆写等）
│
└── CURSOR_HANDOFF.md       # 本文件
```

---

## 3. 设计系统（Swiss International Style × Modern Architecture）

### 3.1 CSS 变量（定义在 style.css `:root`）

| 变量 | 值 | 用途 |
|------|-----|------|
| `--bg-base` | `#fafafa` | 全局浅色背景 |
| `--bg-surface` | `#ffffff` | 卡片背景 |
| `--bg-elevated` | `#f5f5f5` | 悬浮层背景 |
| `--border-light` | `#e8e8e8` | 细边框 |
| `--border-medium` | `#d0d0d0` | 中边框 |
| `--border-strong` | `#1a1a1a` | 强边框（建筑黑） |
| `--text-primary` | `#1a1a1a` | 主文字 |
| `--text-secondary` | `#4a4a4a` | 次文字 |
| `--accent` | `#c9382a` | 强调色（建筑师红） |
| `--radius-sm` | `2px` | 最小圆角 |

### 3.2 主题色（5 种）

| 主题 | 强调色 | 风格 |
|------|--------|------|
| Classic | `#c9382a` | 经典建筑师红 |
| Bauhaus | `#0047ab` | 包豪斯蓝 |
| Modern | `#1a1a1a` | 现代黑 |
| Warm | `#c17f4e` | 温暖木色 |
| Concrete | `#6b6b6b` | 混凝土灰 |

### 3.3 设计特点

- **瑞士国际主义**：Helvetica 风格字体、大胆排版、几何网格
- **现代建筑感**：结构边框、建筑阴影、材质纹理
- **亮色基调**：`#fafafa` 米白背景
- **克制动效**：功能性、快速、精确

### 3.4 背景系统

**几何元素**（在 `arch-bg.js` 中动态生成）：
- 圆形（Circles）：6 个，缓慢浮动
- 方形（Squares）：5 个，旋转 + 浮动
- 三角形（Triangles）：4 个，旋转 + 浮动
- 拱形（Arches）：2 个，建筑感
- 框架（Frames）：3 个，呼吸效果
- 水平线（Lines）：5 条
- 垂直线（VLines）：4 条
- 虚线（Dashed）：2 条
- 结构网格叠加层

**动效类型**：
| 动画 | 效果 |
|------|------|
| `float` | 缓慢上下浮动 |
| `float-slow` | 更慢的浮动 |
| `rotate-slow` | 极慢旋转 |
| `rotate-reverse` | 反向旋转 |
| `breathe` | 脉冲呼吸 |
| `drift` | 不规则漂移 |
| 鼠标视差 | 鼠标跟随移动 |

**CSS 动画定义**（在 `style.css`）：
```css
@keyframes float, float-slow, rotate-slow, rotate-reverse
@keyframes breathe, drift, pulse-subtle
```

---

## 4. 主页结构（index.html）

### 4.1 布局
- **顶部导航栏**：固定顶部，含 Logo、导航链接、语言切换
- **全宽布局**：单栏垂直流，每区块占满内容宽度
- **右下角浮动控制面板**：主题切换按钮

### 4.2 内容区块
1. **Hero** — 全屏开场，大标题 + tagline + CTA 按钮 + 滚动指示器
2. **Projects** — 项目卡片网格（MixFlow / Perler / 持物记录 / Gallery）
3. **Knowledge Graph** — D3.js 力导向 SVG 图
4. **About** — 头像/社交 + 教育背景 + 技能 + 兴趣
5. **Contact** — 社交链接卡片
6. **Footer**

### 4.3 视觉效果
- Canvas 粒子背景（`arch-bg.js`）— 40 个节点 + 连线，缓慢漂移，鼠标视差
- 微妙网格纹理背景
- 滚动进度条（顶部 2px）
- 入场动画（IntersectionObserver 触发）
- 移动端：底部导航抽屉

### 4.4 响应式断点

| 断点 | 屏幕宽度 | 布局 |
|------|----------|------|
| Mobile | < 640px | 单列垂直流 |
| Tablet | 640px - 1024px | 双列网格 |
| Desktop | 1024px - 1440px | 三列网格（主布局） |
| Wide | > 1440px | 三列 + 两侧留白 |

---

## 5. 主要 JS 逻辑（main.js）

### 5.1 主题切换（行 1-90）
- `applyTheme(theme)` — 设置 `data-theme` 属性 + localStorage
- 8 色预设，支持随机主题
- 联动 sidebar 显示 + light orbs 颜色

### 5.2 i18n（行 92-222）
- 中英双语，`data-i18n` 属性驱动
- 翻译字典 `const i18n`，key 命名：`section.field`
- 语言存储于 `localStorage('lang')`

### 5.3 项目展开（行 224-350）
- "更多项目" 按钮 → 展开隐藏卡片
- 使用双 `requestAnimationFrame` 保证 CSS Grid 动画平滑
- 自动折叠回调（3s 不活跃后收起）

### 5.4 知识图谱（行 350-720）
- D3.js v7 力导向布局
- 约 40 个节点（Core Agents / Skills / Projects 等），约 50 条链接
- 支持缩放、拖拽、tooltip 悬停
- 节点发光滤镜 + 箭头标记 + 链接虚线样式
- 编辑节点/链接：直接修改 `nodes[]` 和 `links[]` 数组

---

## 6. 扩展页面约定

### 6.1 子页面模板（每个子项目独立目录）
每个扩展页遵循纯静态模式，3 个核心文件：

1. `index.html` — 页面结构
2. `style.css` — 样式（引用父站 CSS 变量系统）
3. `app.js` — 逻辑（IIFE 包装 `(function() { ... })();`）

### 6.2 CSP（Content Security Policy）**——最重要**
每个扩展页必须有自己的 CSP `<meta>` 标签（CSP 不继承）。

**标准模板**（适用于大多数扩展页）：
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none';">
```

**特例**：
- 单文件页面（全部 JS 内联如 chiwu）：`script-src 'self' 'unsafe-inline'`
- Canvas 生成图片下载：`img-src` 加 `blob:`
- 需要外部图片（如 MixFlow 调酒图片）：`img-src` 加 `https://`
- **永远不要加 `upgrade-insecure-requests`**——会破坏 localhost HTTP 测试
- **Safari CSP 比 Chrome 更严格** — 在 Chrome 能跑但在 Safari 不行，先查 CSP

### 6.3 导航集成
添加新扩展到主页的 checklist：
1. `index.html` → `.nav-links` 添加 `<a class="nav-xxx">`
2. `index.html` → `.content-grid` 添加 `<a class="project-card">`
3. `main.js` → i18n 字典 `zh` 和 `en` 各加 `nav.xxx` 和 `projects.xxx.title/desc`
4. `style.css` → 添加 `.nav-xxx` 样式 + 移动端隐藏规则
5. 推送部署：`git add -A && git commit -m "..." && git push origin main`

---

## 7. 部署工作流

### 7.1 本地测试
```bash
cd /Users/taoma/Documents/networks
python3 -m http.server 8080
# 浏览器打开 http://localhost:8080
```

### 7.2 部署到生产
```bash
cd /Users/taoma/Documents/networks
git add -A && git commit -m "feat: description" && git push origin main
```
Cloudflare Pages 自动部署，1-2 分钟后 `https://taomahj.site` 生效。

### 7.3 推送失败
GitHub push 可能超时（网络延迟 ~28s）。commit 已保存本地，稍后重试 push 即可。**不要重新 commit。**

### 7.4 缓存问题
Cloudflare Pages 可能缓存 HTML。如果改动没立即生效：
- 用户端：`Cmd+Shift+R` 硬刷新
- 或加查询参数绕过缓存：`https://taomahj.site/?v=2`

---

## 8. 常见坑 & 修复

### 8.1 大文件写入截断（#1杀手）
`write_file` / `execute_code` 写入 >15KB 文件时可能静默截断（工具报告成功但文件不完整），导致页面空白。

**验证**：
```bash
tail -5 mixflow/app.js       # 应结尾于 })();
python3 -c "js=open('mixflow/app.js').read(); print('OK' if js.count('{')==js.count('}') else 'TRUNCATED')"
node --check mixflow/app.js  # 语法检查
```

**修复**：`git checkout HEAD -- mixflow/app.js` 恢复后分段修改。

### 8.2 知识图谱不显示
**症状**：Knowledge 区空白，无 SVG。
**原因**：D3.js CDN 的 `integrity` (SRI) 哈希失效（静默失败）。
**修复**：去掉 `<script>` 的 `integrity` 属性，或改用 jsdelivr 固定版本。

### 8.3 扩展页面空白
**症状**：页面加载但无内容。
**原因排行**：
1. **CSP 阻止内联脚本**（`script-src 'self'` 不含 `'unsafe-inline'`）
2. **JS 引用不存在的 DOM 元素**（删了 `<div id="xxx">` 但 JS 里还有 `getElementById('xxx').textContent = ...`，抛 TypeError 毒化整个脚本块）
3. **`onerror` / `onclick` 属性**被 CSP `script-src 'self'` 拦截 → 改用 `addEventListener`

**检测**：
```bash
# 检查是否有 orphaned DOM 引用
grep -oP "getElementById\('([^']+)'\)" ext/index.html | while read line; do
  id=$(echo "$line" | grep -oP "'([^']+)'" | tr -d "'")
  grep -q "id=\"$id\"" ext/index.html || echo "ORPHAN: $line"
done
```

### 8.4 删除扩展页
用户说"删掉 X"时的标准操作（不删文件目录，只移除引用）：
1. `index.html`：删除导航链接 + 项目卡片
2. `main.js`：删除 `zh` 和 `en` 字典中的对应 i18n key
3. `style.css`：删除对应 CSS 规则 + 移动端隐藏规则
4. **不要删除**扩展目录本身（除非明确要求）

### 8.5 sed 批量替换导致 CSS 注释/内容损坏
- 避免 `sed -e 's/A/B/g' -e 's/C/D/g'` 模式化批量操作（重叠匹配产生 Frankenstein 字符串）
- 用 `patch` 工具做精准替换
- 改名含子串陷阱（如 "持物"→"持物记录"）：用三遍临时标记法

---

## 9. 子项目特殊说明

### 9.1 MixFlow（鸡尾酒）
- **数据源**：`recipes.json` (~900KB)，TheCocktailDB API 全量 JSON 导出
- **功能**：搜索、分类过滤、收藏（localStorage）、随机推荐、详情弹窗、分享
- **图片来源**：`https://www.thecocktaildb.com/images/...` (CSP 需允许)
- **移动端 FAB**：底部悬浮按钮替代桌面导航

### 9.2 Perler（拼豆）
- **核心**：Canvas 图像处理 → 像素化 → 圆形珠子渲染
- **CSP 关键**：`img-src` 必须含 `blob:` (Canvas 导出下载)
- **Widget**：`widget.js` 是 IIFE，自动注入 CSS + 创建浮动面板，主页加载

### 9.3 持物记录（chiwu）
- **类型**：Apple-style 产品介绍页（单文件 HTML，1996行）
- **内容**：iOS 截图 mockup + watchOS 开发中公告 + Android APK 状态
- **颜色主题**：Blue × White，深色背景 (`#0a0a0a`)
- **CSP**：需要 `script-src 'self' 'unsafe-inline'`（内联 CSS/JS 都在 HTML 内）

### 9.4 Gallery（壁纸图库）
- **驱动方式**：`manifest.json` 存图片元数据，JS 读取后动态渲染卡片
- **lightbox**：点击卡片弹出大图预览
- **添加图片**：`scripts/add-wallpaper.py` 自动复制原图 + 生成缩略图 + 更新 manifest
- **i18n**：支持中英双语

---

## 10. 提交规范

历史提交风格（最近）：
```
feat: description
fix: description
redesign: description
update: description
```

单次提交通常是自包含的功能单元。保持 commit message 英文，简洁描述改动。

---

## 11. 快速参考

| 需求 | 命令/路径 |
|------|----------|
| 本地预览 | `python3 -m http.server 8080` |
| 部署上线 | `git add -A && git commit -m "msg" && git push origin main` |
| 验证线上 | `curl -sI https://taomahj.site/ \| grep cf-cache-status` |
| 生成项目封面 | Pillow Python 脚本（见 skill），输出到 `assets/projects/` |
| 添加壁纸 | `python3 scripts/add-wallpaper.py <image-path>` |
| JS 完整性检查 | `node --check <file>` + brace count |
| 查 CSS 文件编辑冲突 | `grep -c "old_string" style.css` → >1 不要用 `replace_all` |

---

**最后更新**：2026-06-13
**维护者**：taomahj
**交给**：Cursor AI
