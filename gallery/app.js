/* =====================================================
   Gallery App — taomahj.site/wallpapers
   ===================================================== */

// ─── i18n ────────────────────────────────────────────────
const i18n = {
  zh: {
    'page.title': '壁纸图库 — taomahj',
    'nav.back': '← 返回',
    'hero.badge': '高清壁纸',
    'hero.title': '壁纸图库',
    'hero.subtitle': '个人收藏 · 原图下载 · 不限制大小',
    'hero.desc': '所有壁纸均为原图直出，无压缩、无水印。点击下载即可获取原始文件。',
    'empty': '图库暂空。用 scripts/add-wallpaper.py 添加壁纸。',
    'footer': '壁纸图库',
    'count.zero': '暂无壁纸',
    'count.n': '{n} 张壁纸',
    'download': '下载',
    'download.original': '下载原图',
    'load.fail': '加载失败',
  },
  en: {
    'page.title': 'Wallpaper Gallery — taomahj',
    'nav.back': '← Back',
    'hero.badge': 'HD Wallpapers',
    'hero.title': 'Wallpaper Gallery',
    'hero.subtitle': 'Personal Collection · Original Download · No Size Limit',
    'hero.desc': 'All wallpapers are original quality, uncompressed and watermark-free. Click to download the original file.',
    'empty': 'Gallery is empty. Use scripts/add-wallpaper.py to add wallpapers.',
    'footer': 'Wallpaper Gallery',
    'count.zero': 'No wallpapers yet',
    'count.n': '{n} wallpapers',
    'download': 'Download',
    'download.original': 'Download Original',
    'load.fail': 'Load failed',
  }
};

let currentLang = localStorage.getItem('lang') || 'zh';

function applyLang() {
  const dict = i18n[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.placeholder = dict[key];
  });
  // Update title
  const titleEl = document.querySelector('title[data-i18n]');
  if (titleEl && dict[titleEl.getAttribute('data-i18n')]) {
    document.title = dict[titleEl.getAttribute('data-i18n')];
  }
  document.documentElement.lang = currentLang;
}

function updateLangToggle() {
  const toggle = document.getElementById('langToggle');
  if (!toggle) return;
  toggle.classList.toggle('lang-zh-active', currentLang === 'zh');
  toggle.classList.toggle('lang-en-active', currentLang === 'en');
}

function switchLang() {
  currentLang = currentLang === 'zh' ? 'en' : 'zh';
  localStorage.setItem('lang', currentLang);
  applyLang();
  updateLangToggle();
  // Re-render gallery text
  render();
}

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('langToggle');
  if (toggle) toggle.addEventListener('click', switchLang);
  applyLang();
  updateLangToggle();
});

function t(key, vars) {
  const dict = i18n[currentLang];
  let s = dict[key] || i18n['zh'][key] || key;
  if (vars) {
    Object.keys(vars).forEach(k => {
      s = s.replace('{' + k + '}', vars[k]);
    });
  }
  return s;
}

// ─── Original Gallery Code ───────────────────────────────


(function () {
  'use strict';

  const grid = document.getElementById('galleryGrid');
  const countEl = document.getElementById('galleryCount');
  const emptyEl = document.getElementById('galleryEmpty');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxInfo = document.getElementById('lightboxInfo');
  const body = document.body;

  let images = [];
  let currentIndex = -1;

  // ─── Fetch manifest ────────────────────────────────────

  async function loadGallery() {
    try {
      const res = await fetch('manifest.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      images = data.images || [];
      render();
    } catch (err) {
      console.error('Failed to load gallery:', err);
      grid.innerHTML = '';
      emptyEl.style.display = 'block';
      countEl.textContent = t('load.fail');
    }
  }

  // ─── Render ────────────────────────────────────────────

  function formatSize(bytes) {
    if (!bytes || bytes === 0) return '';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  function render() {
    if (images.length === 0) {
      grid.innerHTML = '';
      emptyEl.style.display = 'block';
      countEl.textContent = t('count.zero');
      return;
    }

    emptyEl.style.display = 'none';
    countEl.textContent = t('count.n', {n: images.length});

    grid.innerHTML = images.map((img, i) => {
      const sizeStr = formatSize(img.size);
      const res = img.resolution || '';
      const thumb = img.thumbnail || img.filename;
      const thumbPath = img.thumbnail ? `thumbnails/${thumb}` : `images/${thumb}`;
      const imgPath = `images/${img.filename}`;

      return `
        <div class="wallpaper-card" data-index="${i}">
          <div class="card-image-wrap">
            <img src="${thumbPath}" alt="${img.title}" loading="lazy">
            ${res ? `<span class="card-resolution">${res}</span>` : ''}
          </div>
          <div class="card-body">
            <div style="min-width:0;flex:1;">
              <div class="card-title" title="${img.title}">${img.title}</div>
              ${sizeStr ? `<div class="card-meta">${sizeStr}</div>` : ''}
            </div>
            <a href="${imgPath}" download="${img.filename}" class="btn-download" onclick="event.stopPropagation()" title="${t('download.original')}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              ${t('download')}
            </a>
          </div>
        </div>`;
    }).join('');

    // Click → lightbox
    grid.querySelectorAll('.wallpaper-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.index);
        openLightbox(idx);
      });
    });
  }

  // ─── Lightbox ──────────────────────────────────────────

  function openLightbox(index) {
    if (index < 0 || index >= images.length) return;
    currentIndex = index;
    const img = images[index];
    lightboxImg.src = `images/${img.filename}`;
    lightboxInfo.innerHTML = `
      <span class="title">${img.title}</span>
      <span class="meta">${img.resolution || ''}${img.size ? ' · ' + formatSize(img.size) : ''}</span>
      <a href="images/${img.filename}" download="${img.filename}" class="btn-download" style="margin-left:8px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        ${t('download.original')}
      </a>
    `;
    lightbox.classList.add('open');
    body.style.overflow = 'hidden';
    updateNavButtons();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    body.style.overflow = '';
    currentIndex = -1;
  }

  function prevImage() {
    if (images.length === 0) return;
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    const img = images[currentIndex];
    lightboxImg.src = `images/${img.filename}`;
    lightboxInfo.querySelector('.title').textContent = img.title;
    lightboxInfo.querySelector('.meta').textContent =
      `${img.resolution || ''}${img.size ? ' · ' + formatSize(img.size) : ''}`;
    const dl = lightboxInfo.querySelector('a');
    if (dl) { dl.href = `images/${img.filename}`; dl.download = img.filename; }
    updateNavButtons();
  }

  function nextImage() {
    if (images.length === 0) return;
    currentIndex = (currentIndex + 1) % images.length;
    const img = images[currentIndex];
    lightboxImg.src = `images/${img.filename}`;
    lightboxInfo.querySelector('.title').textContent = img.title;
    lightboxInfo.querySelector('.meta').textContent =
      `${img.resolution || ''}${img.size ? ' · ' + formatSize(img.size) : ''}`;
    const dl = lightboxInfo.querySelector('a');
    if (dl) { dl.href = `images/${img.filename}`; dl.download = img.filename; }
    updateNavButtons();
  }

  function updateNavButtons() {
    document.getElementById('lightboxPrev').style.display = images.length > 1 ? 'flex' : 'none';
    document.getElementById('lightboxNext').style.display = images.length > 1 ? 'flex' : 'none';
  }

  // ─── Event bindings ────────────────────────────────────

  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('lightboxPrev').addEventListener('click', prevImage);
  document.getElementById('lightboxNext').addEventListener('click', nextImage);

  // Click outside image → close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  });

  // ─── Init ──────────────────────────────────────────────

  loadGallery();

})();
