/* ========================================================
   Pixel Art Converter — taomahj
   Pure client-side image → pixel art with era palettes
   ======================================================== */

// ==================== i18n ====================
const i18n = {
  zh: {
    'nav.projects': '项目',
    'nav.knowledge': '知识库',
    'nav.about': '关于',
    'nav.contact': '联系',
    'title': '🎨 像素画转换器',
    'desc': '上传图片并转换为像素画风格 — 无水印，纯本地处理。',
    'upload.drag': '拖拽图片到此处',
    'upload.or': '或点击浏览文件',
    'controls.pixelSize': '像素大小',
    'controls.palette': '调色板',
    'controls.dither': '抖动',
    'controls.contrast': '对比度',
    'controls.brightness': '亮度',
    'controls.download': '下载 PNG',
    'controls.reset': '重置',
    'palette.none': '全彩',
    'palette.nes': 'NES (54色)',
    'palette.gameboy': 'Game Boy (4色)',
    'palette.pico8': 'PICO-8 (16色)',
    'palette.c64': 'C64 (16色)',
    'palette.grayscale': '灰度',
    'dither.none': '无',
    'dither.bayer': 'Bayer 有序',
    'dither.floyd': 'Floyd-Steinberg',
    'preview.original': '原图',
    'preview.pixel': '像素画',
    'footer': '用好奇心构建',
  },
  en: {
    'nav.projects': 'Projects',
    'nav.knowledge': 'Knowledge',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'title': '🎨 Pixel Art Converter',
    'desc': 'Upload an image and convert it to pixel art — no watermark, fully client-side.',
    'upload.drag': 'Drag & drop an image here',
    'upload.or': 'or click to browse',
    'controls.pixelSize': 'Pixel Size',
    'controls.palette': 'Palette',
    'controls.dither': 'Dithering',
    'controls.contrast': 'Contrast',
    'controls.brightness': 'Brightness',
    'controls.download': 'Download PNG',
    'controls.reset': 'Reset',
    'palette.none': 'Full Color',
    'palette.nes': 'NES (54 colors)',
    'palette.gameboy': 'Game Boy (4 colors)',
    'palette.pico8': 'PICO-8 (16 colors)',
    'palette.c64': 'C64 (16 colors)',
    'palette.grayscale': 'Grayscale',
    'dither.none': 'None',
    'dither.bayer': 'Bayer Ordered',
    'dither.floyd': 'Floyd-Steinberg',
    'preview.original': 'Original',
    'preview.pixel': 'Pixel Art',
    'footer': 'Built with curiosity',
  }
};

let currentLang = localStorage.getItem('lang') || 'zh';

function switchLang(lang) {
  if (lang === currentLang) return;
  currentLang = lang;
  localStorage.setItem('lang', lang);
  applyLang();
  updateLangToggle();
}

function applyLang() {
  const dict = i18n[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      if (el.tagName === 'OPTION') {
        el.textContent = dict[key];
      } else {
        el.textContent = dict[key];
      }
    }
  });
  document.documentElement.lang = currentLang;
}

function updateLangToggle() {
  const toggle = document.getElementById('langToggle');
  toggle.classList.toggle('lang-zh-active', currentLang === 'zh');
  toggle.classList.toggle('lang-en-active', currentLang === 'en');
}

document.getElementById('langToggle').addEventListener('click', () => {
  switchLang(currentLang === 'zh' ? 'en' : 'zh');
});

applyLang();
updateLangToggle();

// ==================== Spotlight Cursor ====================
const spotlight = document.querySelector('.spotlight');
document.addEventListener('mousemove', (e) => {
  document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
  document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
});
if ('ontouchstart' in window) {
  spotlight.style.display = 'none';
}

// ==================== Nav scroll state ====================
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ==================== Palette Definitions ====================
const PALETTES = {
  none: null,
  nes: [
    [124,124,124],[0,0,252],[0,0,188],[68,40,188],
    [148,0,132],[168,0,32],[168,16,0],[136,20,0],
    [80,48,0],[0,120,0],[0,104,0],[0,88,0],
    [0,64,88],[0,0,0],[0,0,0],[0,0,0],
    [188,188,188],[0,120,248],[0,88,248],[104,68,252],
    [216,0,204],[228,0,88],[248,56,0],[228,92,16],
    [172,124,0],[0,184,0],[0,168,0],[0,168,68],
    [0,136,136],[0,0,0],[0,0,0],[0,0,0],
    [248,248,248],[60,188,252],[104,136,252],[152,120,248],
    [248,120,248],[248,88,152],[248,120,88],[252,160,68],
    [248,184,0],[184,248,24],[88,216,84],[88,248,152],
    [0,232,216],[120,120,120],[0,0,0],[0,0,0],
    [252,252,252],[164,228,252],[184,184,248],[216,184,248],
    [248,184,248],[248,164,192],[240,208,176],[252,224,168],
    [248,216,120],[216,248,120],[184,248,184],[184,248,216],
    [0,252,252],[248,216,248],[0,0,0],[0,0,0]
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
    [128,128,128],[160,160,160],[192,192,192],[224,224,224],
    [255,255,255]
  ]
};

// ==================== Bayer Dither Matrix (8x8) ====================
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

// ==================== State ====================
let originalImage = null;
let originalWidth = 0;
let originalHeight = 0;

const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
const controls = document.getElementById('controls');
const previewArea = document.getElementById('previewArea');
const originalCanvas = document.getElementById('originalCanvas');
const pixelCanvas = document.getElementById('pixelCanvas');

const pixelSizeInput = document.getElementById('pixelSize');
const paletteInput = document.getElementById('palette');
const ditherInput = document.getElementById('dither');
const contrastInput = document.getElementById('contrast');
const brightnessInput = document.getElementById('brightness');

const pixelSizeVal = document.getElementById('pixelSizeVal');
const contrastVal = document.getElementById('contrastVal');
const brightnessVal = document.getElementById('brightnessVal');

// ==================== Upload Handling ====================
uploadZone.addEventListener('click', () => fileInput.click());

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
  const files = e.dataTransfer.files;
  if (files.length > 0) handleFile(files[0]);
});

fileInput.addEventListener('change', (e) => {
  if (e.target.files.length > 0) handleFile(e.target.files[0]);
});

function handleFile(file) {
  if (!file.type.startsWith('image/')) {
    alert(currentLang === 'zh' ? '请上传图片文件' : 'Please upload an image file');
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      originalImage = img;
      originalWidth = img.naturalWidth;
      originalHeight = img.naturalHeight;
      showPreview();
      renderPixelArt();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function showPreview() {
  controls.style.display = 'grid';
  previewArea.style.display = 'grid';

  // Draw original
  const oCtx = originalCanvas.getContext('2d');
  const maxPreview = 400;
  let ow = originalWidth, oh = originalHeight;
  if (ow > maxPreview || oh > maxPreview) {
    const scale = Math.min(maxPreview / ow, maxPreview / oh);
    ow = Math.round(ow * scale);
    oh = Math.round(oh * scale);
  }
  originalCanvas.width = ow;
  originalCanvas.height = oh;
  oCtx.drawImage(originalImage, 0, 0, ow, oh);
}

// ==================== Pixel Art Rendering ====================
function renderPixelArt() {
  if (!originalImage) return;

  const pixelSize = parseInt(pixelSizeInput.value);
  const paletteName = paletteInput.value;
  const ditherMode = ditherInput.value;
  const contrast = parseFloat(contrastInput.value);
  const brightness = parseFloat(brightnessInput.value);
  const palette = PALETTES[paletteName];

  // Calculate output dimensions
  const maxDim = 800;
  let srcW = originalWidth, srcH = originalHeight;
  if (srcW > maxDim || srcH > maxDim) {
    const scale = Math.min(maxDim / srcW, maxDim / srcH);
    srcW = Math.round(srcW * scale);
    srcH = Math.round(srcH * scale);
  }

  // Ensure dimensions are multiples of pixelSize
  srcW = Math.floor(srcW / pixelSize) * pixelSize;
  srcH = Math.floor(srcH / pixelSize) * pixelSize;

  // Source canvas (downscaled original)
  const srcCanvas = document.createElement('canvas');
  srcCanvas.width = srcW;
  srcCanvas.height = srcH;
  const srcCtx = srcCanvas.getContext('2d');
  srcCtx.drawImage(originalImage, 0, 0, srcW, srcH);
  const srcData = srcCtx.getImageData(0, 0, srcW, srcH);
  const srcPixels = srcData.data;

  // Output canvas
  const outW = Math.floor(srcW / pixelSize);
  const outH = Math.floor(srcH / pixelSize);
  pixelCanvas.width = outW * pixelSize;
  pixelCanvas.height = outH * pixelSize;
  const pCtx = pixelCanvas.getContext('2d');
  const pData = pCtx.createImageData(pixelCanvas.width, pixelCanvas.height);
  const pPixels = pData.data;

  // Process each pixel block
  for (let y = 0; y < outH; y++) {
    for (let x = 0; x < outW; x++) {
      // Average color in block
      let r = 0, g = 0, b = 0, a = 0;
      let count = 0;
      for (let py = 0; py < pixelSize; py++) {
        for (let px = 0; px < pixelSize; px++) {
          const sx = x * pixelSize + px;
          const sy = y * pixelSize + py;
          const idx = (sy * srcW + sx) * 4;
          r += srcPixels[idx];
          g += srcPixels[idx + 1];
          b += srcPixels[idx + 2];
          a += srcPixels[idx + 3];
          count++;
        }
      }
      r = r / count;
      g = g / count;
      b = b / count;
      a = a / count;

      // Apply brightness and contrast
      r = applyBrightnessContrast(r, brightness, contrast);
      g = applyBrightnessContrast(g, brightness, contrast);
      b = applyBrightnessContrast(b, brightness, contrast);

      // Apply palette
      let finalR = r, finalG = g, finalB = b;
      if (palette) {
        if (ditherMode === 'bayer') {
          const threshold = (BAYER_8[y % 8][x % 8] / 64) - 0.5;
          finalR = Math.min(255, Math.max(0, r + threshold * 64));
          finalG = Math.min(255, Math.max(0, g + threshold * 64));
          finalB = Math.min(255, Math.max(0, b + threshold * 64));
        }
        const nearest = findNearestColor(finalR, finalG, finalB, palette);
        finalR = nearest[0];
        finalG = nearest[1];
        finalB = nearest[2];
      }

      // Fill block in output
      for (let py = 0; py < pixelSize; py++) {
        for (let px = 0; px < pixelSize; px++) {
          const px_x = x * pixelSize + px;
          const px_y = y * pixelSize + py;
          const idx = (px_y * pixelCanvas.width + px_x) * 4;
          pPixels[idx] = finalR;
          pPixels[idx + 1] = finalG;
          pPixels[idx + 2] = finalB;
          pPixels[idx + 3] = a;
        }
      }
    }
  }

  // Apply Floyd-Steinberg dithering after palette quantization
  if (palette && ditherMode === 'floyd') {
    applyFloydSteinberg(pPixels, pixelCanvas.width, pixelCanvas.height, palette);
  }

  pCtx.putImageData(pData, 0, 0);
}

function applyBrightnessContrast(val, brightness, contrast) {
  val = val * brightness;
  val = ((val / 255 - 0.5) * contrast + 0.5) * 255;
  return Math.min(255, Math.max(0, val));
}

function findNearestColor(r, g, b, palette) {
  let minDist = Infinity;
  let nearest = palette[0];
  for (const color of palette) {
    const dr = r - color[0];
    const dg = g - color[1];
    const db = b - color[2];
    const dist = dr * dr + dg * dg + db * db;
    if (dist < minDist) {
      minDist = dist;
      nearest = color;
    }
  }
  return nearest;
}

function applyFloydSteinberg(pixels, width, height, palette) {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const oldR = pixels[idx];
      const oldG = pixels[idx + 1];
      const oldB = pixels[idx + 2];

      const nearest = findNearestColor(oldR, oldG, oldB, palette);
      pixels[idx] = nearest[0];
      pixels[idx + 1] = nearest[1];
      pixels[idx + 2] = nearest[2];

      const errR = oldR - nearest[0];
      const errG = oldG - nearest[1];
      const errB = oldB - nearest[2];

      // Distribute error
      distributeError(pixels, width, height, x + 1, y, errR, errG, errB, 7 / 16);
      distributeError(pixels, width, height, x - 1, y + 1, errR, errG, errB, 3 / 16);
      distributeError(pixels, width, height, x, y + 1, errR, errG, errB, 5 / 16);
      distributeError(pixels, width, height, x + 1, y + 1, errR, errG, errB, 1 / 16);
    }
  }
}

function distributeError(pixels, width, height, x, y, er, eg, eb, factor) {
  if (x < 0 || x >= width || y < 0 || y >= height) return;
  const idx = (y * width + x) * 4;
  pixels[idx] = Math.min(255, Math.max(0, pixels[idx] + er * factor));
  pixels[idx + 1] = Math.min(255, Math.max(0, pixels[idx + 1] + eg * factor));
  pixels[idx + 2] = Math.min(255, Math.max(0, pixels[idx + 2] + eb * factor));
}

// ==================== Control Events ====================
pixelSizeInput.addEventListener('input', () => {
  pixelSizeVal.textContent = pixelSizeInput.value + 'px';
  renderPixelArt();
});

paletteInput.addEventListener('change', renderPixelArt);
ditherInput.addEventListener('change', renderPixelArt);

contrastInput.addEventListener('input', () => {
  contrastVal.textContent = contrastInput.value;
  renderPixelArt();
});

brightnessInput.addEventListener('input', () => {
  brightnessVal.textContent = brightnessInput.value;
  renderPixelArt();
});

// ==================== Download ====================
document.getElementById('downloadBtn').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'pixel-art-' + Date.now() + '.png';
  link.href = pixelCanvas.toDataURL('image/png');
  link.click();
});

// ==================== Reset ====================
document.getElementById('resetBtn').addEventListener('click', () => {
  pixelSizeInput.value = 16;
  pixelSizeVal.textContent = '16px';
  paletteInput.value = 'none';
  ditherInput.value = 'none';
  contrastInput.value = 1;
  contrastVal.textContent = '1.0';
  brightnessInput.value = 1;
  brightnessVal.textContent = '1.0';
  originalImage = null;
  controls.style.display = 'none';
  previewArea.style.display = 'none';
  fileInput.value = '';
});

// ==================== Security ====================
if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
  const noop = () => {};
  console.log = noop;
  console.info = noop;
  console.warn = noop;
  console.debug = noop;
}

if (window.top !== window.self) {
  window.top.location = window.self.location;
}
