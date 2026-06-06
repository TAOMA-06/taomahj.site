/* =====================================================
   Gallery App — taomahj.site/wallpapers
   ===================================================== */

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
      countEl.textContent = '加载失败';
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
      countEl.textContent = '暂无壁纸';
      return;
    }

    emptyEl.style.display = 'none';
    countEl.textContent = `${images.length} 张壁纸`;

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
            <a href="${imgPath}" download="${img.filename}" class="btn-download" onclick="event.stopPropagation()" title="下载原图">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              下载
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
        下载原图
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
