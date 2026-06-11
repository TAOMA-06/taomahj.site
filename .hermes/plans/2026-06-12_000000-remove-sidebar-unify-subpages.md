# Remove Sidebar Theme Panel & Unify Subpage Design Plan

> **For Hermes:** Execute sequentially yourself — all tasks tightly coupled within same files.

**Goal:** Remove the left sidebar theme configuration panel from the main site, convert the layout to a full-width top-nav design, and redesign all 5 sub-project pages (MixFlow, Perler, 持物记录, Gallery, Bounce) to match the main site's shadcn/ui aesthetic with light theme, cyan primary color, rounded cards, and consistent design language.

**Architecture:** Convert main site from `sidebar(260px) + main` to `full-width top-nav` layout. Each subpage gets a complete CSS rewrite using the main site's design tokens (`--background: #fafafa`, `--primary: #0891b2`, `--card: #ffffff`, `--radius: 0.75rem`). Shared nav component pattern across all pages.

**Tech Stack:** HTML5, CSS3 (CSS Variables), Vanilla JS, D3.js (main site only), Canvas (arch-bg.js, perler, bounce)

---

## Design Change 对照表 (Before → After)

| Element | Before (Current) | After (Planned) |
|---------|-----------------|-----------------|
| **Main Layout** | Sidebar 260px + Main content margin-left | Full-width, top nav only |
| **Main Background** | `#fafafa` with sidebar | `#fafafa` full width |
| **Nav** | Top nav + sidebar hamburger | Top nav only, no sidebar toggle |
| **Theme Switcher** | 8-color sidebar panel | Removed entirely |
| **Subpage: MixFlow** | Dark theme `#0D0D0D`, blue `#002FA7`, zero radius | Light `#fafafa`, cyan `#0891b2`, radius 12px |
| **Subpage: Perler** | Dark `#050508`, pink accents, zero radius | Light `#fafafa`, cyan `#0891b2`, radius 12px |
| **Subpage: 持物记录** | Dark `#0a0a0a`, blue `#002FA7`, zero radius | Light `#fafafa`, cyan `#0891b2`, radius 12px |
| **Subpage: Gallery** | Dark `#0a0a0a`, blue `#002FA7`, radius 16px | Light `#fafafa`, cyan `#0891b2`, radius 12px |
| **Subpage: Bounce** | Dark `#050508`, blue `#002FA7`, radius 12px | Keep dark (game), but sync accent to cyan `#0891b2` |
| **Cards (all subpages)** | Dark translucent bg | White `#ffffff`, light border `#e4e4e7` |
| **Buttons** | Zero radius, dark fills | Radius 6px, cyan fills |
| **Typography** | Various fonts | Inter + Noto Sans SC unified |

---

## Preserved Features Checklist

| Feature | Main Site | MixFlow | Perler | 持物记录 | Gallery | Bounce |
|---------|-----------|---------|--------|----------|---------|--------|
| i18n / bilingual | ✅ Keep | ✅ Keep | ✅ Keep | ✅ Keep | ✅ Keep | N/A |
| Light orbs background | ✅ Keep | ❌ Remove (subpage) | ❌ | ❌ | ❌ | ❌ |
| Canvas arch-bg | ✅ Keep | ❌ | ❌ | ❌ | ❌ | ❌ |
| D3.js knowledge graph | ✅ Keep | N/A | N/A | N/A | N/A | N/A |
| Scroll progress | ✅ Keep | ❌ | ❌ | ❌ | ❌ | ❌ |
| Reveal animations | ✅ Keep | ✅ Add | ✅ Add | ✅ Add | ✅ Add | N/A |
| Theme localStorage | ✅ Keep (hidden, default cyan) | ✅ Read + apply | ✅ Read + apply | ✅ Read + apply | ✅ Read + apply | ✅ Read + apply |
| Mobile responsive | ✅ Keep | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Task 1: Remove Sidebar from Main Site (`index.html`)

**Objective:** Remove the entire sidebar `<aside>` element and its overlay, keep only the top navigation.

**Files:**
- Modify: `index.html:42-130` (remove sidebar block)
- Modify: `index.html:36` (remove sidebar overlay div)
- Modify: `index.html:138-144` (remove mobile menu button from top-nav)

**Step 1: Remove sidebar HTML**

Delete lines 42-130 (the entire `<aside class="sidebar">` block).

**Step 2: Remove sidebar overlay**

Delete line 36 (`<div class="sidebar-overlay" id="sidebarOverlay"></div>`).

**Step 3: Remove mobile menu button from top-nav**

Delete the mobile hamburger button (lines ~138-144):
```html
<button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Open menu">...</button>
```

**Step 4: Verification**

Open `index.html` in browser. Confirm:
- No sidebar visible
- No hamburger menu button
- Top nav still works
- Content spans full width

**Step 5: Commit**

```bash
git add index.html
git commit -m "refactor: remove sidebar theme panel from main site"
```

---

## Task 2: Update Main Site CSS for Full-Width Layout (`style.css`)

**Objective:** Remove sidebar-related CSS, convert `.main-content` to full-width, adjust layout variables.

**Files:**
- Modify: `style.css` — remove sidebar section (~lines 272-503)
- Modify: `style.css` — update `.main-content` to remove `margin-left`
- Modify: `style.css` — update `.top-nav` to full width
- Modify: `style.css` — update responsive breakpoints

**Step 1: Remove all sidebar CSS rules**

Delete these selectors and their declarations:
- `.sidebar` (lines ~272-289)
- `.sidebar-header`
- `.sidebar-menu-btn`, `.mobile-menu-btn`
- `.sidebar-title`
- `.sidebar-content`
- `.sidebar-group` and all variants
- `.sidebar-group-label`, `.sidebar-group-value`
- `.sidebar-color-dot`, `.sidebar-value-icon`, `.sidebar-font-preview`
- `.sidebar-chevron`
- `.theme-color-grid`
- `.theme-color-btn`
- `.sidebar-footer`
- `.sidebar-preset`
- `.sidebar-btn`, `.sidebar-btn-secondary`, `.sidebar-btn-primary`
- `.sidebar-overlay`

**Step 2: Update `.main-content`**

Change from:
```css
.main-content {
  margin-left: var(--sidebar-width);
  flex: 1;
  ...
}
```
To:
```css
.main-content {
  flex: 1;
  min-height: 100vh;
  background: var(--background);
  display: flex;
  flex-direction: column;
}
```

**Step 3: Update `.top-nav` background**

The top-nav currently has `background: rgba(250, 250, 250, 0.92)`. Keep this — it works for full-width.

**Step 4: Update responsive breakpoints**

Remove the mobile sidebar drawer styles from `@media (max-width: 768px)`:
```css
/* REMOVE these rules from the 768px breakpoint: */
.sidebar { transform: translateX(-100%); }
.sidebar.open { transform: translateX(0); }
.mobile-menu-btn { display: flex; }
.main-content { margin-left: 0; }
```

The 768px breakpoint should now only contain:
- `.content-grid` → `grid-template-columns: 1fr`
- `.top-nav-links` → hide or collapse
- Card padding adjustments

**Step 5: Remove `--sidebar-width` and sidebar CSS variables**

From `:root`, remove:
```css
--sidebar-background: #18181b;
--sidebar-foreground: #fafafa;
--sidebar-primary: #0891b2;
--sidebar-primary-foreground: #ffffff;
--sidebar-accent: #27272a;
--sidebar-accent-foreground: #fafafa;
--sidebar-border: #27272a;
--sidebar-ring: #0891b2;
--sidebar-width: 260px;
```

Keep `--sidebar-width: 0px` or just remove references to it.

**Step 6: Verification**

```bash
grep -n "sidebar" style.css | wc -l
```
Expected: 0 (or only in comments)

**Step 7: Commit**

```bash
git add style.css
git commit -m "refactor: remove sidebar CSS, convert to full-width layout"
```

---

## Task 3: Update Main Site JS — Remove Sidebar Logic (`main.js`)

**Objective:** Remove sidebar open/close functions and mobile menu event listeners. Keep theme system (apply on load, but no UI).

**Files:**
- Modify: `main.js:67-90` (sidebar toggle code)

**Step 1: Remove sidebar DOM references and functions**

Delete:
```javascript
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');

function openSidebar() { ... }
function closeSidebar() { ... }

mobileMenuBtn?.addEventListener('click', openSidebar);
sidebarCloseBtn?.addEventListener('click', closeSidebar);
sidebarOverlay?.addEventListener('click', closeSidebar);
```

**Step 2: Keep theme system intact**

Keep `applyTheme()`, `randomTheme()`, `updateLightOrbs()`, theme button listeners, and `shuffleTheme` listener. The theme will still be read from `localStorage` on load and applied, but there will be no visible UI to change it.

**Step 3: Verification**

```bash
grep -n "sidebar" main.js | wc -l
```
Expected: 0

**Step 4: Commit**

```bash
git add main.js
git commit -m "refactor: remove sidebar JS logic, keep theme system"
```

---

## Task 4: Create Shared Subpage CSS Template (`assets/subpage-theme.css`)

**Objective:** Create a shared CSS file that all subpages can link to for consistent shadcn/ui theming. This avoids duplicating the same CSS variables and base styles across 5 files.

**Files:**
- Create: `assets/subpage-theme.css`

**Step 1: Write the shared theme CSS**

```css
/* ============================================================
   taomahj Subpage Shared Theme — shadcn/ui Design System
   Light theme, cyan primary, rounded cards
   Link this in all subpage <head>:
   <link rel="stylesheet" href="../assets/subpage-theme.css">
   ============================================================ */

/* ---------- CSS Variables ---------- */
:root {
  --background: #fafafa;
  --foreground: #18181b;
  --card: #ffffff;
  --card-foreground: #18181b;
  --popover: #ffffff;
  --popover-foreground: #18181b;
  --primary: #0891b2;
  --primary-foreground: #ffffff;
  --secondary: #f4f4f5;
  --secondary-foreground: #18181b;
  --muted: #f4f4f5;
  --muted-foreground: #71717a;
  --accent: #0891b2;
  --accent-foreground: #ffffff;
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  --border: #e4e4e7;
  --input: #e4e4e7;
  --ring: #0891b2;
  --radius: 0.75rem;
  --radius-lg: 1rem;
  --radius-md: 0.375rem;
  --radius-sm: 0.25rem;

  --font-sans: 'Inter', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', monospace;

  --nav-height: 64px;
  --gap: 1.5rem;
  --margin-x: clamp(16px, 3vw, 48px);

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-fast: 200ms;
  --dur-med: 300ms;
  --dur-slow: 400ms;
}

/* Theme variants — read from localStorage by JS */
[data-theme="zinc"]    { --primary: #18181b; --accent: #18181b; --ring: #18181b; }
[data-theme="red"]     { --primary: #dc2626; --accent: #dc2626; --ring: #dc2626; }
[data-theme="rose"]    { --primary: #e11d48; --accent: #e11d48; --ring: #e11d48; }
[data-theme="orange"]  { --primary: #ea580c; --accent: #ea580c; --ring: #ea580c; }
[data-theme="green"]   { --primary: #16a34a; --accent: #16a34a; --ring: #16a34a; }
[data-theme="blue"]    { --primary: #2563eb; --accent: #2563eb; --ring: #2563eb; }
[data-theme="cyan"]    { --primary: #0891b2; --accent: #0891b2; --ring: #0891b2; }
[data-theme="violet"]  { --primary: #7c3aed; --accent: #7c3aed; --ring: #7c3aed; }

/* ---------- Reset ---------- */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; scroll-behavior: smooth; }
body {
  font-family: var(--font-sans);
  color: var(--foreground);
  background: var(--background);
  line-height: 1.7;
  letter-spacing: -0.01em;
  overflow-x: hidden;
  min-height: 100vh;
}
::selection { background: var(--primary); color: var(--primary-foreground); }
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 0; }
a { color: var(--primary); text-decoration: none; transition: color var(--dur-fast) var(--ease-out); }
a:hover { color: var(--foreground); }

/* ---------- Navigation ---------- */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  height: var(--nav-height);
  background: rgba(250, 250, 250, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}
.nav-inner {
  max-width: 1200px; margin: 0 auto; padding: 0 var(--margin-x);
  height: 100%; display: flex; align-items: center; justify-content: space-between;
}
.nav-logo {
  font-size: 18px; font-weight: 700; color: var(--foreground);
  text-decoration: none; letter-spacing: 0.04em;
}
.nav-logo:hover { color: var(--primary); }
.nav-links { display: flex; align-items: center; gap: 1.5rem; }
.nav-links a {
  font-size: 13px; font-weight: 500; color: var(--muted-foreground);
  text-decoration: none; transition: color var(--dur-fast) var(--ease-out);
  position: relative;
}
.nav-links a:hover { color: var(--foreground); }
.nav-links a::after {
  content: ''; position: absolute; bottom: -4px; left: 0;
  width: 0; height: 1.5px; background: var(--primary);
  transition: width var(--dur-med) var(--ease-out);
}
.nav-links a:hover::after { width: 100%; }

/* Language toggle */
.lang-toggle {
  font-size: 12px; font-weight: 600; letter-spacing: 0.06em;
  color: var(--muted-foreground); background: none;
  border: 1px solid var(--border); padding: 0.25rem 0.5rem;
  cursor: pointer; transition: all var(--dur-fast) var(--ease-out);
  border-radius: var(--radius-sm); font-family: var(--font-sans);
}
.lang-toggle:hover { border-color: var(--primary); color: var(--primary); }

/* ---------- Buttons ---------- */
.btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.625rem 1.25rem; font-size: 13px; font-weight: 500;
  border-radius: var(--radius-md); cursor: pointer;
  transition: all var(--dur-fast) var(--ease-out);
  font-family: var(--font-sans); border: 1px solid transparent;
  text-decoration: none;
}
.btn-primary {
  background: var(--primary); color: var(--primary-foreground);
  border-color: var(--primary);
}
.btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
.btn-outline {
  background: transparent; color: var(--foreground);
  border-color: var(--border);
}
.btn-outline:hover { border-color: var(--primary); color: var(--primary); }

/* ---------- Cards ---------- */
.card {
  background: var(--card); border: 1px solid var(--border);
  border-radius: var(--radius-lg); overflow: hidden;
  transition: all var(--dur-med) var(--ease-out);
}
.card:hover { border-color: var(--primary); box-shadow: 0 4px 20px rgba(0,0,0,0.06); }

/* ---------- Badges ---------- */
.badge {
  display: inline-flex; align-items: center;
  padding: 0.25rem 0.625rem; font-size: 11px; font-weight: 500;
  background: var(--secondary); color: var(--secondary-foreground);
  border-radius: 9999px; border: 1px solid var(--border);
}

/* ---------- Reveal Animation ---------- */
.reveal {
  opacity: 0; transform: translateY(20px);
  transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
}
.reveal.visible { opacity: 1; transform: translateY(0); }

/* ---------- Responsive ---------- */
@media (max-width: 768px) {
  .nav-links { display: none; }
  .nav-inner { padding: 0 16px; }
}
```

**Step 2: Verification**

```bash
ls -la assets/subpage-theme.css
```

**Step 3: Commit**

```bash
git add assets/subpage-theme.css
git commit -m "feat: create shared subpage theme CSS"
```

---

## Task 5: Redesign MixFlow Subpage

**Objective:** Rewrite `mixflow/style.css` and update `mixflow/index.html` to match main site light theme.

**Files:**
- Modify: `mixflow/index.html` — link shared CSS, update nav structure
- Rewrite: `mixflow/style.css` — import shared vars, override app-specific styles

**Step 1: Update `mixflow/index.html` head**

Replace the `<link rel="stylesheet" href="style.css">` with:
```html
<link rel="stylesheet" href="../assets/subpage-theme.css">
<link rel="stylesheet" href="style.css">
```

**Step 2: Update `mixflow/index.html` nav**

Replace the nav block with:
```html
<nav class="nav">
  <div class="nav-inner">
    <a href="../index.html" class="nav-logo">← taomahj</a>
    <div class="nav-links">
      <button class="lang-toggle" id="langToggle" aria-label="Switch language">
        <span class="lang-zh">中</span><span class="lang-divider">/</span><span class="lang-en">EN</span>
      </button>
      <button class="nav-btn active" data-tab="cocktails" data-i18n="nav.cocktails">Cocktails</button>
      <button class="nav-btn" data-tab="mocktails" data-i18n="nav.mocktails">Mocktails</button>
      <button class="nav-btn" id="favBtn">★ <span data-i18n="nav.favorites">Favorites</span> <span id="favCount">0</span></button>
    </div>
  </div>
</nav>
```

**Step 3: Rewrite `mixflow/style.css`**

The new `style.css` should:
- Import/assume `subpage-theme.css` is loaded first
- Override only MixFlow-specific styles
- Change dark backgrounds to light
- Change blue `#002FA7` to `var(--primary)` (`#0891b2`)
- Change zero radius to `var(--radius)` (12px)
- Keep all app functionality (search, cards, modal, FAB, etc.)

Key overrides:
```css
/* MixFlow overrides on top of subpage-theme.css */
body { background: var(--background); color: var(--foreground); }

/* Spotlight — change to light theme glow */
.spotlight {
  background: radial-gradient(
    var(--spotlight-size) circle at var(--mouse-x, 50vw) var(--mouse-y, 50vh),
    rgba(8, 145, 178, 0.04),
    rgba(8, 145, 178, 0.01) 40%,
    transparent 65%
  );
}

/* Nav — already styled by subpage-theme.css, just adjust */
.nav { background: rgba(250, 250, 250, 0.92); }

/* Cards */
.cocktail-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
.cocktail-card:hover {
  border-color: var(--primary);
  box-shadow: 0 8px 30px rgba(0,0,0,0.08);
}

/* Search bar */
.search-bar-wrapper {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
.search-bar-wrapper:focus-within {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(8, 145, 178, 0.1);
}

/* Modal */
.modal-overlay {
  background: rgba(0, 0, 0, 0.4);
}
.modal {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

/* Action buttons */
.action-btn {
  background: var(--secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--muted-foreground);
}
.action-btn:hover {
  background: var(--muted);
  color: var(--foreground);
}

/* Category badge */
.card-category {
  background: rgba(8, 145, 178, 0.1);
  color: var(--primary);
}

/* Loading spinner */
.loading-spinner {
  border-color: var(--border);
  border-top-color: var(--primary);
}

/* Sort dropdown */
.sort-dropdown {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}

/* Mobile FAB */
.mobile-fab {
  background: var(--primary);
  color: var(--primary-foreground);
  border-radius: 50%;
  box-shadow: 0 4px 20px rgba(8, 145, 178, 0.3);
}

/* Keep all layout, grid, and functional CSS */
```

**Step 4: Add theme sync JS to `mixflow/index.html`**

Add before closing `</body>`:
```html
<script>
  // Sync theme from main site localStorage
  (function() {
    const theme = localStorage.getItem('theme') || 'cyan';
    document.documentElement.setAttribute('data-theme', theme);
  })();
</script>
```

**Step 5: Verification**

Open `mixflow/index.html` in browser. Confirm:
- Light background `#fafafa`
- Cyan accents `#0891b2`
- Rounded cards (12px)
- Nav matches main site
- All app features work (search, cards, modal, favorites)

**Step 6: Commit**

```bash
git add mixflow/
git commit -m "feat: redesign MixFlow with light shadcn/ui theme"
```

---

## Task 6: Redesign Perler Subpage

**Objective:** Rewrite `perler/style.css` and update `perler/index.html` to match main site light theme.

**Files:**
- Modify: `perler/index.html` — link shared CSS
- Rewrite: `perler/style.css` — light theme overrides

**Step 1: Update `perler/index.html` head**

```html
<link rel="stylesheet" href="../assets/subpage-theme.css">
<link rel="stylesheet" href="style.css">
```

**Step 2: Update nav**

```html
<nav class="nav">
  <div class="nav-inner">
    <a href="../index.html" class="nav-logo">taomahj</a>
    <div class="nav-links">
      <a href="../index.html#projects">Projects</a>
      <a href="../index.html#about">About</a>
      <a href="../index.html#contact">Contact</a>
    </div>
  </div>
</nav>
```

**Step 3: Rewrite `perler/style.css`**

Key changes from dark to light:
```css
/* Perler overrides */
body { background: var(--background); color: var(--foreground); }

/* Upload zone */
.upload-zone {
  border: 2px dashed var(--border);
  background: var(--card);
  border-radius: var(--radius);
}
.upload-zone:hover, .upload-zone.dragover {
  border-color: var(--primary);
  background: var(--muted);
  box-shadow: 0 0 40px rgba(8, 145, 178, 0.08);
}

/* Preview boxes */
.preview-box {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

/* Control groups */
.control-group {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}

/* Range slider */
.range-wrap input[type="range"] {
  background: var(--border);
}
.range-wrap input[type="range"]::-webkit-slider-thumb {
  background: var(--primary);
  box-shadow: 0 0 10px rgba(8, 145, 178, 0.3);
}

/* Buttons */
.btn-primary {
  background: var(--primary);
  color: var(--primary-foreground);
  box-shadow: 0 4px 20px rgba(8, 145, 178, 0.2);
}
.btn-outline {
  border: 1px solid var(--border);
  color: var(--foreground);
}

/* Select dropdowns */
.control-group select {
  background: var(--card);
  border: 1px solid var(--border);
  color: var(--foreground);
}

/* Color stats */
.color-stats {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

/* Footer */
.footer {
  border-top: 1px solid var(--border);
  color: var(--muted-foreground);
}
```

**Step 4: Add theme sync JS**

Same as Task 5.

**Step 5: Verification**

- Light theme
- Cyan accents
- Upload zone works
- Canvas rendering works
- Controls work

**Step 6: Commit**

```bash
git add perler/
git commit -m "feat: redesign Perler with light shadcn/ui theme"
```

---

## Task 7: Redesign 持物记录 (Chiwu) Subpage

**Objective:** Update `chiwu/index.html` — it's a single-file with inline styles. Extract to external CSS or rewrite inline styles.

**Files:**
- Modify: `chiwu/index.html` — link shared CSS, rewrite inline styles

**Step 1: Add shared CSS link in `<head>`**

```html
<link rel="stylesheet" href="../assets/subpage-theme.css">
```

**Step 2: Rewrite inline `<style>` block**

The current `chiwu/index.html` has a massive inline `<style>` block (~1900 lines). Replace it with:

```css
<style>
  /* Chiwu overrides on top of subpage-theme.css */
  body { background: var(--background); color: var(--foreground); }
  
  .nav { background: rgba(250, 250, 250, 0.92); }
  .nav-logo { color: var(--foreground); }
  .nav-links a { color: var(--muted-foreground); }
  .nav-links a:hover { color: var(--foreground); background: var(--muted); }
  .nav-cta {
    background: var(--primary) !important;
    color: var(--primary-foreground) !important;
    border-radius: var(--radius-md) !important;
  }
  
  /* Hero */
  .hero {
    background:
      radial-gradient(ellipse 80% 60% at 50% 30%, rgba(8,145,178,0.08) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 80% 60%, rgba(8,145,178,0.04) 0%, transparent 50%),
      var(--background);
  }
  .hero h1 {
    background: linear-gradient(180deg, var(--foreground) 0%, var(--muted-foreground) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .hero h2, .hero-sub { color: var(--muted-foreground); }
  .hero-badge {
    background: rgba(8, 145, 178, 0.08);
    border: 1px solid rgba(8, 145, 178, 0.15);
    color: var(--primary);
    border-radius: var(--radius-md);
  }
  
  /* Buttons */
  .btn-primary {
    background: var(--primary);
    color: var(--primary-foreground);
    border-radius: var(--radius-md);
  }
  .btn-secondary {
    border: 1px solid var(--border);
    color: var(--foreground);
    border-radius: var(--radius-md);
  }
  
  /* Feature tiles */
  .feature-tile {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
  }
  .feature-tile:hover {
    border-color: var(--primary);
  }
  
  /* Phone mockup */
  .hero-phone {
    border-radius: var(--radius-lg);
    border: 3px solid var(--border);
  }
  
  /* Section headings */
  .section-label { color: var(--primary); }
  .section-heading { color: var(--foreground); }
  .section-body { color: var(--muted-foreground); }
  
  /* Keep all phone UI styles (they simulate an app, not the website) */
  /* ... preserve .phone-*, .phone-screen, .phone-card-grid etc. ... */
</style>
```

**Note:** The phone mockup CSS (`.phone-screen`, `.phone-real-card`, etc.) should be preserved as-is because it simulates the actual iOS app UI, not the website theme. Only change the page-level styles (hero, nav, sections, feature tiles).

**Step 3: Add theme sync JS**

Same pattern.

**Step 4: Verification**

- Page background is light
- Nav matches main site
- Hero section has cyan gradient glow
- Feature tiles are white cards with borders
- Phone mockup still looks like an iPhone

**Step 5: Commit**

```bash
git add chiwu/
git commit -m "feat: redesign 持物记录 with light shadcn/ui theme"
```

---

## Task 8: Redesign Gallery Subpage

**Objective:** Rewrite `gallery/style.css` and update `gallery/index.html`.

**Files:**
- Modify: `gallery/index.html` — link shared CSS
- Rewrite: `gallery/style.css` — light theme

**Step 1: Update `gallery/index.html` head**

```html
<link rel="stylesheet" href="../assets/subpage-theme.css">
<link rel="stylesheet" href="style.css">
```

**Step 2: Update nav**

```html
<nav class="nav">
  <div class="nav-inner">
    <a href="../index.html" class="nav-logo">taomahj<span style="color:var(--primary);">.</span>site</a>
    <div class="nav-links">
      <a href="../index.html" data-i18n="nav.back">← 返回</a>
      <button class="lang-toggle" id="langToggle" aria-label="Switch language">
        <span class="lang-zh">中</span><span class="lang-divider">/</span><span class="lang-en">EN</span>
      </button>
    </div>
  </div>
</nav>
```

**Step 3: Rewrite `gallery/style.css`**

```css
/* Gallery overrides */
body { background: var(--background); color: var(--foreground); }

/* Hero */
.hero {
  background:
    radial-gradient(ellipse 60% 50% at 50% 30%, rgba(8,145,178,0.06) 0%, transparent 60%),
    var(--background);
}
.hero h1 { color: var(--foreground); }
.hero h2, .hero-sub { color: var(--muted-foreground); }
.hero-badge {
  background: rgba(8, 145, 178, 0.08);
  border: 1px solid rgba(8, 145, 178, 0.15);
  color: var(--primary);
}

/* Gallery grid */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--gap);
}

/* Wallpaper cards */
.wallpaper-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
.wallpaper-card:hover {
  border-color: var(--primary);
  box-shadow: 0 12px 40px rgba(0,0,0,0.08);
}

/* Download button */
.btn-download {
  background: var(--primary);
  color: var(--primary-foreground);
  border-radius: var(--radius-md);
}
.btn-download:hover {
  opacity: 0.9;
  box-shadow: 0 4px 16px rgba(8, 145, 178, 0.2);
}

/* Lightbox */
.lightbox { background: rgba(0,0,0,0.92); }
.lightbox-close, .lightbox-prev, .lightbox-next {
  background: rgba(255,255,255,0.08);
  color: #fff;
}

/* Footer */
.page-footer {
  border-top: 1px solid var(--border);
  color: var(--muted-foreground);
}

/* Empty state */
.gallery-empty { color: var(--muted-foreground); }
.gallery-empty code {
  background: var(--muted);
  color: var(--foreground);
}
```

**Step 4: Add theme sync JS**

Same pattern.

**Step 5: Verification**

- Light background
- Cyan accents
- Cards have rounded corners and light borders
- Hover effects work
- Lightbox still dark (appropriate for image viewing)

**Step 6: Commit**

```bash
git add gallery/
git commit -m "feat: redesign Gallery with light shadcn/ui theme"
```

---

## Task 9: Redesign Bounce Ball Subpage

**Objective:** Update `bounce/index.html` — keep dark theme (it's a game) but sync accent color to cyan.

**Files:**
- Modify: `bounce/index.html` — add theme sync, update accent colors

**Step 1: Add theme sync JS**

Add in `<head>` or before `</body>`:
```html
<script>
  (function() {
    const theme = localStorage.getItem('theme') || 'cyan';
    document.documentElement.setAttribute('data-theme', theme);
  })();
</script>
```

**Step 2: Update inline CSS accent colors**

In the `<style>` block, replace all `#002FA7` with `var(--primary)` and all `#4A6ACC` with a lighter variant. Since Bounce uses inline styles, we need to add CSS variables support.

Add at the top of the `<style>` block:
```css
:root {
  --primary: #0891b2;
  --primary-light: #22d3ee;
}
[data-theme="zinc"] { --primary: #18181b; --primary-light: #52525b; }
[data-theme="red"] { --primary: #dc2626; --primary-light: #f87171; }
/* ... etc for all 8 themes ... */
```

Then replace:
- `#002FA7` → `var(--primary)`
- `#4A6ACC` → `var(--primary-light)`
- `rgba(0,47,167,0.x)` → use `var(--primary)` with opacity (may need to keep static for complex cases)

For the gradient:
```css
.btn-primary {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
}
```

**Step 3: Keep dark background**

The game should keep `background: #050508` and `color: #f5f5f7` — dark theme is appropriate for games.

**Step 4: Verification**

- Game still works
- Accent color changes with theme
- Level cards, buttons, HUD use the synced primary color
- Dark background preserved

**Step 5: Commit**

```bash
git add bounce/
git commit -m "feat: sync Bounce Ball accent colors with theme system"
```

---

## Task 10: Cross-Page Theme Synchronization

**Objective:** Ensure all subpages read the theme from `localStorage` and apply it on load.

**Files:**
- Modify: `mixflow/index.html` — add theme sync
- Modify: `perler/index.html` — add theme sync
- Modify: `chiwu/index.html` — add theme sync
- Modify: `gallery/index.html` — add theme sync
- Modify: `bounce/index.html` — add theme sync

**Step 1: Add theme sync script to each subpage**

Add this script tag in the `<head>` of each subpage (before any stylesheets that use CSS variables):

```html
<script>
  (function() {
    const theme = localStorage.getItem('theme') || 'cyan';
    document.documentElement.setAttribute('data-theme', theme);
  })();
</script>
```

**Step 2: Verification**

1. Open main site, switch theme to "红色"
2. Navigate to MixFlow — confirm red accents
3. Navigate to Perler — confirm red accents
4. Navigate to Gallery — confirm red accents
5. Navigate to Bounce — confirm red accents
6. Navigate to 持物记录 — confirm red accents

**Step 3: Commit**

```bash
git add mixflow/index.html perler/index.html chiwu/index.html gallery/index.html bounce/index.html
git commit -m "feat: add cross-page theme synchronization"
```

---

## Task 11: Final Verification & Responsive Testing

**Objective:** Test all pages at multiple breakpoints and ensure consistency.

**Step 1: Start local server**

```bash
cd /Users/taoma/Documents/networks
python3 -m http.server 8080
```

**Step 2: Verify each page**

| Page | URL | Checks |
|------|-----|--------|
| Main | `http://localhost:8080/` | No sidebar, full width, top nav, all cards, i18n, D3 graph |
| MixFlow | `http://localhost:8080/mixflow/` | Light theme, cyan accents, search, cards, modal, mobile FAB |
| Perler | `http://localhost:8080/perler/` | Light theme, upload zone, canvas, controls, download |
| 持物记录 | `http://localhost:8080/chiwu/` | Light theme, hero, features, phone mockup |
| Gallery | `http://localhost:8080/gallery/` | Light theme, grid, cards, lightbox |
| Bounce | `http://localhost:8080/bounce/` | Dark theme, synced accent, game works |

**Step 3: Responsive checks**

Test at:
- Desktop (1200px+)
- Tablet (768px)
- Mobile (375px)

Confirm:
- Nav collapses appropriately
- Grids become single column
- No horizontal scroll
- Touch targets are adequate (min 44px)

**Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: responsive adjustments and cross-browser fixes"
```

---

## Task 12: Deploy

**Objective:** Push all changes to production.

**Step 1: Final git status**

```bash
git status
git log --oneline -5
```

**Step 2: Push to origin**

```bash
git push origin main
```

**Step 3: Verify deployment**

```bash
curl -sI https://taomahj.site | head -5
curl -s https://taomahj.site | grep -o 'top-nav\|content-grid' | sort | uniq -c
```

---

## Risks & Tradeoffs

| Risk | Mitigation |
|------|-----------|
| MixFlow/Perler dark→light may hurt readability | Test all text contrast ratios, ensure WCAG AA |
| Bounce Ball dark theme inconsistency | Documented as intentional — games benefit from dark backgrounds |
| Shared CSS file caching | Use cache-busting query param if needed (`?v=2`) |
| Theme sync script fails if localStorage empty | Default to `cyan` theme |
| Phone mockup in 持物记录 looks odd on light bg | Keep phone UI styles separate from page styles |

## Open Questions

1. Should the main site keep a minimal theme toggle somewhere (e.g., in top-nav footer) or remove it completely?
2. Should Bounce Ball also go light theme, or is dark acceptable for a game?
3. Should we add the shared `subpage-theme.css` to a CDN or keep it relative?

---

**Plan complete and saved.** Ready to execute sequentially — all tasks are tightly coupled within the same file sets. Shall I proceed?
