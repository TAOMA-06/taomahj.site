/* ========================================================
   Perler Bead Widget — taomahj
   Floating mini perler bead converter in bottom-right corner.
   Drop an image → instant perler preview. Click to open full studio.
   Self-contained, no dependencies. Append to any page.
   ======================================================== */

(function() {
  'use strict';

  // Avoid double-init
  if (document.getElementById('perler-widget')) return;

  const WIDGET_ID = 'perler-widget';
  const PALETTES = {
    none: null,
    nes: [[124,124,124],[0,0,252],[0,0,188],[68,40,188],[148,0,132],[168,0,32],[168,16,0],[136,20,0],[80,48,0],[0,120,0],[0,104,8],[0,88,32],[0,64,88],[0,0,0],[0,0,0],[0,0,0],[188,188,188],[0,120,248],[0,88,248],[104,68,252],[216,0,204],[228,0,88],[248,56,0],[228,92,16],[172,124,0],[0,184,0],[0,168,68],[0,168,132],[0,136,136],[0,0,0],[0,0,0],[0,0,0],[248,248,248],[60,188,252],[104,136,252],[152,120,248],[248,120,248],[248,88,152],[248,120,88],[252,160,68],[248,184,0],[184,248,24],[88,216,84],[88,248,152],[0,232,216],[120,120,120],[0,0,0],[0,0,0],[252,252,252],[168,228,252],[196,212,252],[212,200,252],[252,196,252],[252,196,212],[252,188,176],[252,216,168],[252,228,160],[224,252,160],[168,240,188],[176,252,204],[156,252,240],[196,196,196]],
    gameboy: [[15,56,15],[48,98,48],[139,172,15],[155,188,15]],
    pico8: [[0,0,0],[29,43,83],[126,37,83],[0,135,81],[171,82,54],[95,87,79],[194,195,199],[255,241,232],[255,0,77],[255,163,0],[255,236,39],[0,228,54],[41,173,255],[131,118,156],[255,119,168],[255,204,170]],
    grayscale: [[0,0,0],[32,32,32],[64,64,64],[96,96,96],[128,128,128],[160,160,160],[192,192,192],[224,224,224],[255,255,255]]
  };

  // ---- CSS ----
  const style = document.createElement('style');
  style.textContent = `
    #perler-widget {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      font-family: 'Inter', 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif;
    }
    .pw-btn {
      width: 56px; height: 56px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      background: linear-gradient(135deg, #ec4899 0%, #f97316 100%);
      color: #fff;
      font-size: 24px;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 20px rgba(236,72,153,0.4);
      transition: transform .2s, box-shadow .2s;
      position: relative;
    }
    .pw-btn:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(236,72,153,0.55); }
    .pw-panel {
      position: absolute;
      bottom: 68px;
      right: 0;
      width: 320px;
      max-height: 520px;
      background: rgba(8,8,16,0.97);
      border: 1px solid rgba(236,72,153,0.25);
      border-radius: 16px;
      backdrop-filter: blur(20px);
      box-shadow: 0 20px 60px rgba(0,0,0,0.6);
      overflow: hidden;
      display: none;
      flex-direction: column;
    }
    .pw-panel.open { display: flex; }
    .pw-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 16px;
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    .pw-title { font-size: 14px; font-weight: 600; color: #f5f5f7; }
    .pw-close {
      background: none; border: none; color: #a1a1aa;
      font-size: 18px; cursor: pointer; line-height: 1;
    }
    .pw-close:hover { color: #fff; }
    .pw-body { padding: 16px; overflow-y: auto; }
    .pw-drop {
      border: 2px dashed rgba(236,72,153,0.3);
      border-radius: 12px;
      padding: 24px 16px;
      text-align: center;
      cursor: pointer;
      transition: all .2s;
      color: #a1a1aa;
      font-size: 13px;
    }
    .pw-drop:hover, .pw-drop.dragover {
      border-color: #ec4899;
      background: rgba(236,72,153,0.06);
    }
    .pw-drop-icon { font-size: 28px; margin-bottom: 8px; display: block; }
    .pw-preview-wrap {
      display: none;
      flex-direction: column;
      gap: 12px;
    }
    .pw-preview-wrap.show { display: flex; }
    .pw-canvas-box {
      background: rgba(255,255,255,0.03);
      border-radius: 10px;
      padding: 8px;
      text-align: center;
    }
    .pw-canvas-box canvas {
      max-width: 100%;
      border-radius: 6px;
      display: block;
      margin: 0 auto;
    }
    .pw-canvas-label {
      font-size: 11px;
      color: #6b6b7b;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .pw-row {
      display: flex; gap: 8px; align-items: center;
      margin-bottom: 10px;
    }
    .pw-row label {
      font-size: 12px;
      color: #a1a1aa;
      min-width: 60px;
    }
    .pw-row input[type="range"] {
      flex: 1;
      -webkit-appearance: none;
      height: 4px;
      border-radius: 2px;
      background: rgba(255,255,255,0.08);
      outline: none;
    }
    .pw-row input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 14px; height: 14px;
      border-radius: 50%;
      background: #ec4899;
      cursor: pointer;
    }
    .pw-row select {
      flex: 1;
      padding: 6px 10px;
      border-radius: 6px;
      border: 1px solid rgba(255,255,255,0.08);
      background: rgba(8,8,16,0.8);
      color: #f5f5f7;
      font-size: 12px;
      outline: none;
    }
    .pw-val {
      font-size: 11px;
      color: #ec4899;
      min-width: 32px;
      text-align: right;
      font-family: monospace;
    }
    .pw-actions {
      display: flex; gap: 8px; margin-top: 4px;
    }
    .pw-actions button {
      flex: 1;
      padding: 8px 0;
      border-radius: 8px;
      border: none;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
    }
    .pw-dl {
      background: linear-gradient(135deg, #ec4899 0%, #f97316 100%);
      color: #fff;
    }
    .pw-reset {
      background: transparent;
      color: #a1a1aa;
      border: 1px solid rgba(255,255,255,0.1) !important;
    }
    .pw-reset:hover { border-color: #ec4899 !important; color: #fff; }
    .pw-full {
      text-align: center;
      margin-top: 6px;
    }
    .pw-full a {
      font-size: 12px;
      color: #ec4899;
      text-decoration: none;
    }
    .pw-full a:hover { text-decoration: underline; }
    .pw-badge {
      position: absolute;
      top: -4px; right: -4px;
      width: 14px; height: 14px;
      background: #f97316;
      border-radius: 50%;
      border: 2px solid #080810;
      display: none;
    }
    .pw-badge.show { display: block; }
  `;
  document.head.appendChild(style);

  // ---- DOM ----
  const widget = document.createElement('div');
  widget.id = WIDGET_ID;
  widget.innerHTML = `
    <button class="pw-btn" id="pwToggle" title="Perler Bead">
      🧩
      <span class="pw-badge" id="pwBadge"></span>
    </button>
    <div class="pw-panel" id="pwPanel">
      <div class="pw-header">
        <span class="pw-title">🧩 拼豆工坊</span>
        <button class="pw-close" id="pwClose">&times;</button>
      </div>
      <div class="pw-body">
        <div class="pw-drop" id="pwDrop">
          <span class="pw-drop-icon">📎</span>
          <div>拖拽图片或点击上传</div>
        </div>
        <input type="file" id="pwFile" accept="image/*" hidden>
        <div class="pw-preview-wrap" id="pwPreview">
          <div class="pw-canvas-box">
            <div class="pw-canvas-label">拼豆效果</div>
            <canvas id="pwCanvas"></canvas>
          </div>
          <div class="pw-row">
            <label>网格</label>
            <input type="range" id="pwGrid" min="20" max="100" value="50">
            <span class="pw-val" id="pwGridVal">50</span>
          </div>
          <div class="pw-row">
            <label>珠子</label>
            <input type="range" id="pwBead" min="6" max="20" value="10">
            <span class="pw-val" id="pwBeadVal">10</span>
          </div>
          <div class="pw-row">
            <label>间隙</label>
            <input type="range" id="pwGap" min="0" max="6" value="2">
            <span class="pw-val" id="pwGapVal">2</span>
          </div>
          <div class="pw-row">
            <label>调色板</label>
            <select id="pwPal">
              <option value="none">全彩</option>
              <option value="nes">NES</option>
              <option value="gameboy">Game Boy</option>
              <option value="pico8">PICO-8</option>
              <option value="grayscale">灰度</option>
            </select>
          </div>
          <div class="pw-actions">
            <button class="pw-dl" id="pwDl">⬇️ 下载</button>
            <button class="pw-reset" id="pwReset">🔄 重置</button>
          </div>
          <div class="pw-full">
            <a href="perler/index.html" target="_blank">打开完整版 →</a>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(widget);

  // ---- Refs ----
  const toggle = document.getElementById('pwToggle');
  const panel = document.getElementById('pwPanel');
  const closeBtn = document.getElementById('pwClose');
  const drop = document.getElementById('pwDrop');
  const fileInput = document.getElementById('pwFile');
  const previewWrap = document.getElementById('pwPreview');
  const canvas = document.getElementById('pwCanvas');
  const ctx = canvas.getContext('2d');
  const badge = document.getElementById('pwBadge');

  const gridIn = document.getElementById('pwGrid');
  const beadIn = document.getElementById('pwBead');
  const gapIn = document.getElementById('pwGap');
  const palIn = document.getElementById('pwPal');
  const dlBtn = document.getElementById('pwDl');
  const resetBtn = document.getElementById('pwReset');

  let originalImage = null;
  let isOpen = false;

  // ---- Toggle ----
  toggle.addEventListener('click', () => {
    isOpen = !isOpen;
    panel.classList.toggle('open', isOpen);
    badge.classList.remove('show');
  });
  closeBtn.addEventListener('click', () => {
    isOpen = false;
    panel.classList.remove('open');
  });
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (isOpen && !widget.contains(e.target)) {
      isOpen = false;
      panel.classList.remove('open');
    }
  });

  // ---- Upload ----
  drop.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (e) => {
    if (e.target.files[0]) loadFile(e.target.files[0]);
  });
  drop.addEventListener('dragover', (e) => { e.preventDefault(); drop.classList.add('dragover'); });
  drop.addEventListener('dragleave', () => drop.classList.remove('dragover'));
  drop.addEventListener('drop', (e) => {
    e.preventDefault();
    drop.classList.remove('dragover');
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith('image/')) loadFile(f);
  });

  function loadFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        originalImage = img;
        drop.style.display = 'none';
        previewWrap.classList.add('show');
        badge.classList.add('show');
        render();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // ---- Render ----
  function render() {
    if (!originalImage) return;
    const gridW = +gridIn.value;
    const beadSize = +beadIn.value;
    const gap = +gapIn.value;
    const paletteKey = palIn.value;
    const palette = PALETTES[paletteKey];

    const aspect = originalImage.width / originalImage.height;
    let gw = gridW;
    let gh = Math.round(gridW / aspect);
    if (gh > 100) { gh = 100; gw = Math.round(gh * aspect); }

    const off = document.createElement('canvas');
    off.width = gw; off.height = gh;
    const offCtx = off.getContext('2d');
    offCtx.drawImage(originalImage, 0, 0, gw, gh);
    const d = offCtx.getImageData(0, 0, gw, gh).data;
    const out = new Uint8ClampedArray(d.length);

    for (let y = 0; y < gh; y++) {
      for (let x = 0; x < gw; x++) {
        const i = (y * gw + x) * 4;
        let r = d[i], g = d[i+1], b = d[i+2];
        if (palette) {
          const c = nearest(r, g, b, palette);
          out[i] = c[0]; out[i+1] = c[1]; out[i+2] = c[2];
        } else {
          out[i] = r; out[i+1] = g; out[i+2] = b;
        }
        out[i+3] = 255;
      }
    }

    const outW = gw * (beadSize + gap) + gap;
    const outH = gh * (beadSize + gap) + gap;
    canvas.width = outW;
    canvas.height = outH;

    ctx.fillStyle = '#1a1a24';
    ctx.fillRect(0, 0, outW, outH);

    const r = beadSize * 0.35;

    for (let y = 0; y < gh; y++) {
      for (let x = 0; x < gw; x++) {
        const i = (y * gw + x) * 4;
        const rc = out[i], gc = out[i+1], bc = out[i+2];
        const bx = gap + x * (beadSize + gap);
        const by = gap + y * (beadSize + gap);

        // shadow
        ctx.fillStyle = 'rgba(0,0,0,0.35)';
        roundRect(ctx, bx+1, by+1, beadSize, beadSize, r);
        ctx.fill();

        // base
        ctx.fillStyle = `rgb(${rc},${gc},${bc})`;
        roundRect(ctx, bx, by, beadSize, beadSize, r);
        ctx.fill();

        // highlight
        const grad = ctx.createLinearGradient(bx, by, bx+beadSize*0.6, by+beadSize*0.6);
        grad.addColorStop(0, 'rgba(255,255,255,0.3)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grad;
        roundRect(ctx, bx+1, by+1, beadSize-2, beadSize-2, Math.max(0, r-1));
        ctx.fill();
      }
    }
  }

  function roundRect(ctx, x, y, w, h, rad) {
    const rr = Math.min(rad, w/2, h/2);
    ctx.beginPath();
    ctx.moveTo(x+rr, y);
    ctx.lineTo(x+w-rr, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+rr);
    ctx.lineTo(x+w, y+h-rr);
    ctx.quadraticCurveTo(x+w, y+h, x+w-rr, y+h);
    ctx.lineTo(x+rr, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-rr);
    ctx.lineTo(x, y+rr);
    ctx.quadraticCurveTo(x, y, x+rr, y);
    ctx.closePath();
  }

  function nearest(r, g, b, pal) {
    let best = pal[0], bestD = Infinity;
    for (const c of pal) {
      const dr = r-c[0], dg = g-c[1], db = b-c[2];
      const d = dr*dr + dg*dg + db*db;
      if (d < bestD) { bestD = d; best = c; }
    }
    return best;
  }

  // ---- Controls ----
  [gridIn, beadIn, gapIn, palIn].forEach(el => {
    el.addEventListener('input', () => {
      document.getElementById('pwGridVal').textContent = gridIn.value;
      document.getElementById('pwBeadVal').textContent = beadIn.value;
      document.getElementById('pwGapVal').textContent = gapIn.value;
      render();
    });
  });

  resetBtn.addEventListener('click', () => {
    originalImage = null;
    drop.style.display = '';
    previewWrap.classList.remove('show');
    fileInput.value = '';
  });

  dlBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'perler-bead.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });

})();
