/* ========================================================
   Perler Bead Art Converter — taomahj
   Pure client-side: image → pixel grid → rounded beads
   ======================================================== */

// ==================== Palettes ====================
const PALETTES = {
  none: null,
  nes: [
    [124,124,124],[0,0,252],[0,0,188],[68,40,188],[148,0,132],[168,0,32],
    [168,16,0],[136,20,0],[80,48,0],[0,120,0],[0,104,8],[0,88,32],
    [0,64,88],[0,0,0],[0,0,0],[0,0,0],[188,188,188],[0,120,248],
    [0,88,248],[104,68,252],[216,0,204],[228,0,88],[248,56,0],[228,92,16],
    [172,124,0],[0,184,0],[0,168,68],[0,168,132],[0,136,136],[0,0,0],
    [0,0,0],[0,0,0],[248,248,248],[60,188,252],[104,136,252],[152,120,248],
    [248,120,248],[248,88,152],[248,120,88],[252,160,68],[248,184,0],
    [184,248,24],[88,216,84],[88,248,152],[0,232,216],[120,120,120],
    [0,0,0],[0,0,0],[252,252,252],[168,228,252],[196,212,252],[212,200,252],
    [252,196,252],[252,196,212],[252,188,176],[252,216,168],[252,228,160],
    [224,252,160],[168,240,188],[176,252,204],[156,252,240],[196,196,196]
  ],
  gameboy: [
    [15,56,15],[48,98,48],[139,172,15],[155,188,15]
  ],
  pico8: [
    [0,0,0],[29,43,83],[126,37,83],[0,135,81],
    [171,82,54],[95,87,79],[194,195,199],[255,241,232],
    [255,0,77],[255,163,0],[255,236,39],[0,228,54],
    [41,173,255],[131,118,156],[255,119,168],[255,204,170]
  ],
  c64: [
    [0,0,0],[255,255,255],[136,0,0],[170,255,238],
    [204,68,204],[0,204,85],[0,0,170],[238,238,119],
    [221,136,85],[102,68,0],[255,119,119],[51,51,51],
    [119,119,119],[170,255,102],[0,136,255],[187,187,187]
  ],
  grayscale: [
    [0,0,0],[32,32,32],[64,64,64],[96,96,96],
    [128,128,128],[160,160,160],[192,192,192],[224,224,224],[255,255,255]
  ]
};

const BAYER_8 = [
  [0,48,12,60,3,51,15,63],
  [32,16,44,28,35,19,47,31],
  [8,56,4,52,11,59,7,55],
  [40,24,36,20,43,27,39,23],
  [2,50,14,62,1,49,13,61],
  [34,18,46,30,33,17,45,29],
  [10,58,6,54,9,57,5,53],
  [42,26,38,22,41,25,37,21]
];

// ==================== i18n ====================
const i18n = {
  zh: {
    title: '拼豆工坊',
    subtitle: '把任意图片转换成拼豆（Perler Beads）风格 — 圆润珠子、网格间隙、塑料光泽',
    'upload.drag': '拖拽图片到此处，或点击上传',
    'upload.hint': '支持 JPG、PNG、WebP · 纯本地处理，无水印',
    'preview.original': '原图',
    'preview.result': '拼豆效果',
    'control.grid': '网格大小',
    'control.bead': '珠子大小',
    'control.gap': '间隙',
    'control.roundness': '圆角',
    'control.palette': '调色板',
    'control.dither': '抖动',
    'control.shading': '3D 立体感（高光+阴影）',
    'control.gridline': '显示网格线',
    'control.count': '显示颜色统计',
    'palette.none': '全彩（不限色）',
    'palette.nes': 'NES（54色）',
    'palette.gameboy': 'Game Boy（4色）',
    'palette.pico8': 'PICO-8（16色）',
    'palette.c64': 'C64（16色）',
    'palette.grayscale': '灰度（9色）',
    'dither.none': '无',
    'dither.bayer': 'Bayer 有序',
    'dither.floyd': 'Floyd-Steinberg',
    'action.download': '下载 PNG',
    'action.reset': '重新上传',
    'stats.title': '颜色统计',
    footer: '纯本地处理，图片不会上传到任何服务器'
  },
  en: {
    title: 'Perler Bead Studio',
    subtitle: 'Convert any image to Perler Bead style — rounded beads, grid gaps, plastic shine',
    'upload.drag': 'Drag image here or click to upload',
    'upload.hint': 'JPG, PNG, WebP supported · Pure client-side, no watermark',
    'preview.original': 'Original',
    'preview.result': 'Perler Bead',
    'control.grid': 'Grid Size',
    'control.bead': 'Bead Size',
    'control.gap': 'Gap',
    'control.roundness': 'Roundness',
    'control.palette': 'Palette',
    'control.dither': 'Dither',
    'control.shading': '3D shading (highlight + shadow)',
    'control.gridline': 'Show grid lines',
    'control.count': 'Show color stats',
    'palette.none': 'Full Color',
    'palette.nes': 'NES (54 colors)',
    'palette.gameboy': 'Game Boy (4 colors)',
    'palette.pico8': 'PICO-8 (16 colors)',
    'palette.c64': 'C64 (16 colors)',
    'palette.grayscale': 'Grayscale (9 shades)',
    'dither.none': 'None',
    'dither.bayer': 'Bayer Ordered',
    'dither.floyd': 'Floyd-Steinberg',
    'action.download': 'Download PNG',
    'action.reset': 'Upload New',
    'stats.title': 'Color Statistics',
    footer: 'Pure client-side processing — images never leave your device'
  }
};

let currentLang = localStorage.getItem('lang') || 'zh';

function applyLang() {
  const dict = i18n[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  document.documentElement.lang = currentLang;
}
applyLang();

// ==================== DOM refs ====================
const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
const editor = document.getElementById('editor');
const originalCanvas = document.getElementById('originalCanvas');
const outputCanvas = document.getElementById('outputCanvas');
const downloadBtn = document.getElementById('downloadBtn');
const resetBtn = document.getElementById('resetBtn');
const colorStats = document.getElementById('colorStats');
const statsGrid = document.getElementById('statsGrid');

const gridSizeInput = document.getElementById('gridSize');
const beadSizeInput = document.getElementById('beadSize');
const gapSizeInput = document.getElementById('gapSize');
const roundnessInput = document.getElementById('roundness');
const paletteInput = document.getElementById('palette');
const ditherInput = document.getElementById('dither');
const shadingInput = document.getElementById('shading');
const showGridInput = document.getElementById('showGrid');
const showCountInput = document.getElementById('showCount');

let originalImage = null;
let currentPixels = null;

// ==================== Upload ====================
uploadZone.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => {
  if (e.target.files[0]) loadFile(e.target.files[0]);
});

uploadZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadZone.classList.add('dragover');
});
uploadZone.addEventListener('dragleave', () => {
  uploadZone.classList.remove('dragover');
});
uploadZone.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadZone.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) loadFile(file);
});

function loadFile(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      originalImage = img;
      renderOriginal();
      processImage();
      uploadZone.style.display = 'none';
      editor.style.display = 'block';
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function renderOriginal() {
  const ctx = originalCanvas.getContext('2d');
  const maxW = 500;
  const scale = Math.min(1, maxW / originalImage.width);
  originalCanvas.width = originalImage.width * scale;
  originalCanvas.height = originalImage.height * scale;
  ctx.drawImage(originalImage, 0, 0, originalCanvas.width, originalCanvas.height);
}

// ==================== Core Processing ====================
function processImage() {
  if (!originalImage) return;

  const gridW = parseInt(gridSizeInput.value);
  const beadSize = parseInt(beadSizeInput.value);
  const gap = parseInt(gapSizeInput.value);
  const roundness = parseInt(roundnessInput.value) / 100;
  const paletteKey = paletteInput.value;
  const ditherKey = ditherInput.value;
  const shading = shadingInput.checked;
  const showGrid = showGridInput.checked;

  // Compute grid dimensions preserving aspect ratio
  const aspect = originalImage.width / originalImage.height;
  let gw = gridW;
  let gh = Math.round(gridW / aspect);
  if (gh > 120) { gh = 120; gw = Math.round(gh * aspect); }

  // Offscreen canvas for pixel data
  const off = document.createElement('canvas');
  off.width = gw;
  off.height = gh;
  const offCtx = off.getContext('2d');
  offCtx.drawImage(originalImage, 0, 0, gw, gh);
  const imgData = offCtx.getImageData(0, 0, gw, gh);
  const pixels = imgData.data;

  // Apply dithering + palette
  const palette = PALETTES[paletteKey];
  const outPixels = new Uint8ClampedArray(pixels.length);

  for (let y = 0; y < gh; y++) {
    for (let x = 0; x < gw; x++) {
      const i = (y * gw + x) * 4;
      let r = pixels[i], g = pixels[i+1], b = pixels[i+2];

      if (ditherKey === 'bayer' && palette) {
        const threshold = (BAYER_8[y % 8][x % 8] / 64) - 0.5;
        r = Math.min(255, Math.max(0, r + threshold * 48));
        g = Math.min(255, Math.max(0, g + threshold * 48));
        b = Math.min(255, Math.max(0, b + threshold * 48));
      }

      if (palette) {
        const c = findNearestColor(r, g, b, palette);
        outPixels[i] = c[0];
        outPixels[i+1] = c[1];
        outPixels[i+2] = c[2];
      } else {
        outPixels[i] = r;
        outPixels[i+1] = g;
        outPixels[i+2] = b;
      }
      outPixels[i+3] = 255;
    }
  }

  if (ditherKey === 'floyd' && palette) {
    applyFloydSteinberg(outPixels, gw, gh, palette);
  }

  currentPixels = { data: outPixels, width: gw, height: gh };

  // Render beads
  const outW = gw * (beadSize + gap) + gap;
  const outH = gh * (beadSize + gap) + gap;
  outputCanvas.width = outW;
  outputCanvas.height = outH;
  const ctx = outputCanvas.getContext('2d');

  // Background (pegboard)
  ctx.fillStyle = '#1a1a24';
  ctx.fillRect(0, 0, outW, outH);

  // Grid lines
  if (showGrid && gap > 0) {
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= gw; x++) {
      const px = gap + x * (beadSize + gap) - gap / 2;
      ctx.beginPath();
      ctx.moveTo(px, 0);
      ctx.lineTo(px, outH);
      ctx.stroke();
    }
    for (let y = 0; y <= gh; y++) {
      const py = gap + y * (beadSize + gap) - gap / 2;
      ctx.beginPath();
      ctx.moveTo(0, py);
      ctx.lineTo(outW, py);
      ctx.stroke();
    }
  }

  // Draw beads
  const radius = (beadSize * roundness) / 2;

  for (let y = 0; y < gh; y++) {
    for (let x = 0; x < gw; x++) {
      const i = (y * gw + x) * 4;
      const r = outPixels[i], g = outPixels[i+1], b = outPixels[i+2];
      const bx = gap + x * (beadSize + gap);
      const by = gap + y * (beadSize + gap);

      // Shadow
      if (shading) {
        ctx.fillStyle = 'rgba(0,0,0,0.35)';
        roundRect(ctx, bx + 2, by + 2, beadSize, beadSize, radius);
        ctx.fill();
      }

      // Base bead
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      roundRect(ctx, bx, by, beadSize, beadSize, radius);
      ctx.fill();

      if (shading) {
        // Top-left highlight
        const grad = ctx.createLinearGradient(bx, by, bx + beadSize * 0.6, by + beadSize * 0.6);
        grad.addColorStop(0, 'rgba(255,255,255,0.35)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grad;
        roundRect(ctx, bx + 1, by + 1, beadSize - 2, beadSize - 2, Math.max(0, radius - 1));
        ctx.fill();

        // Bottom-right edge light
        const grad2 = ctx.createLinearGradient(bx + beadSize, by + beadSize, bx, by);
        grad2.addColorStop(0, 'rgba(255,255,255,0.12)');
        grad2.addColorStop(0.5, 'rgba(255,255,255,0)');
        ctx.fillStyle = grad2;
        roundRect(ctx, bx, by, beadSize, beadSize, radius);
        ctx.fill();

        // Bottom shadow
        const grad3 = ctx.createLinearGradient(bx, by + beadSize * 0.7, bx, by + beadSize);
        grad3.addColorStop(0, 'rgba(0,0,0,0)');
        grad3.addColorStop(1, 'rgba(0,0,0,0.25)');
        ctx.fillStyle = grad3;
        roundRect(ctx, bx, by, beadSize, beadSize, radius);
        ctx.fill();
      }
    }
  }

  // Color stats
  if (showCountInput.checked) {
    updateStats(outPixels, gw, gh);
  }
}

function roundRect(ctx, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.lineTo(x + w - rr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
  ctx.lineTo(x + w, y + h - rr);
  ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
  ctx.lineTo(x + rr, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - rr);
  ctx.lineTo(x, y + rr);
  ctx.quadraticCurveTo(x, y, x + rr, y);
  ctx.closePath();
}

function findNearestColor(r, g, b, palette) {
  let best = palette[0];
  let bestDist = Infinity;
  for (const c of palette) {
    const dr = r - c[0], dg = g - c[1], db = b - c[2];
    const dist = dr * dr + dg * dg + db * db;
    if (dist < bestDist) { bestDist = dist; best = c; }
  }
  return best;
}

function applyFloydSteinberg(pixels, w, h, palette) {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const oldR = pixels[i], oldG = pixels[i+1], oldB = pixels[i+2];
      const nearest = findNearestColor(oldR, oldG, oldB, palette);
      const errR = oldR - nearest[0];
      const errG = oldG - nearest[1];
      const errB = oldB - nearest[2];
      pixels[i] = nearest[0];
      pixels[i+1] = nearest[1];
      pixels[i+2] = nearest[2];

      const distribute = (dx, dy, factor) => {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || nx >= w || ny < 0 || ny >= h) return;
        const ni = (ny * w + nx) * 4;
        pixels[ni] = Math.min(255, Math.max(0, pixels[ni] + errR * factor));
        pixels[ni+1] = Math.min(255, Math.max(0, pixels[ni+1] + errG * factor));
        pixels[ni+2] = Math.min(255, Math.max(0, pixels[ni+2] + errB * factor));
      };
      distribute(1, 0, 7/16);
      distribute(-1, 1, 3/16);
      distribute(0, 1, 5/16);
      distribute(1, 1, 1/16);
    }
  }
}

function updateStats(pixels, w, h) {
  const counts = {};
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const key = `${pixels[i]},${pixels[i+1]},${pixels[i+2]}`;
      counts[key] = (counts[key] || 0) + 1;
    }
  }

  const sorted = Object.entries(counts)
    .map(([k, c]) => ({ rgb: k.split(',').map(Number), count: c }))
    .sort((a, b) => b.count - a.count);

  statsGrid.innerHTML = sorted.map(s => {
    const hex = '#' + s.rgb.map(v => v.toString(16).padStart(2, '0')).join('');
    return `
      <div class="stat-item">
        <div class="stat-swatch" style="background:${hex}"></div>
        <div class="stat-info">
          <span class="stat-hex">${hex}</span>
          <span class="stat-count">${s.count} beads</span>
        </div>
      </div>
    `;
  }).join('');

  colorStats.style.display = 'block';
}

// ==================== Event Listeners ====================
[
  gridSizeInput, beadSizeInput, gapSizeInput, roundnessInput,
  paletteInput, ditherInput, shadingInput, showGridInput
].forEach(el => {
  el.addEventListener('input', () => {
    updateLabels();
    processImage();
  });
});

showCountInput.addEventListener('change', () => {
  if (showCountInput.checked && currentPixels) {
    updateStats(currentPixels.data, currentPixels.width, currentPixels.height);
  } else {
    colorStats.style.display = 'none';
  }
});

function updateLabels() {
  document.getElementById('gridSizeVal').textContent = gridSizeInput.value;
  document.getElementById('beadSizeVal').textContent = beadSizeInput.value + 'px';
  document.getElementById('gapSizeVal').textContent = gapSizeInput.value + 'px';
  document.getElementById('roundnessVal').textContent = (roundnessInput.value / 100).toFixed(2);
}

resetBtn.addEventListener('click', () => {
  uploadZone.style.display = 'block';
  editor.style.display = 'none';
  fileInput.value = '';
  originalImage = null;
  currentPixels = null;
  colorStats.style.display = 'none';
});

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'perler-bead-art.png';
  link.href = outputCanvas.toDataURL('image/png');
  link.click();
});

updateLabels();
