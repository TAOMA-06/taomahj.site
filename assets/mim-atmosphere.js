/* ============================================================
   mim-atmosphere.js — architectural + light layers for subpages
   ============================================================ */

(function initMimAtmosphere() {
  if (document.querySelector('.mim-arch-layer')) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  const marks = [
    { left: '6%', top: '16%', width: 280, height: 280, radius: '50%', depth: 0.07 },
    { variant: 'block', left: '80%', top: '14%', width: 180, height: 300, depth: 0.06 },
    { left: '74%', top: '70%', width: 340, height: 160, depth: 0.05 },
    { left: '12%', top: '72%', width: 180, height: 180, depth: 0.04 },
    { variant: 'line', left: '0', top: '32%', width: '30%', height: 2 },
    { variant: 'line', left: '66%', top: '50%', width: '28%', height: 2 },
    { variant: 'line', left: '22%', top: '0', width: 2, height: '42%' },
    { variant: 'line', left: '90%', top: '44%', width: 2, height: '36%' },
    { left: '50%', top: '40%', width: 240, height: 240, radius: '50%', depth: 0.03 },
    { variant: 'block', left: '30%', top: '20%', width: 90, height: 360, depth: 0.05 },
    { variant: 'corner-bracket', left: '4%', top: '6%', width: 36, height: 36 },
    { variant: 'corner-bracket', left: '96%', top: '94%', width: 36, height: 36 }
  ];

  function markClassName(variant) {
    return ['mim-geo-mark', variant === 'line' ? 'mim-geo-mark--line' : '', variant === 'block' ? 'mim-geo-mark--block' : '', variant === 'corner-bracket' ? 'mim-geo-mark--corner-bracket' : '']
      .filter(Boolean)
      .join(' ');
  }

  const archLayer = document.createElement('div');
  archLayer.className = 'mim-arch-layer';
  archLayer.setAttribute('aria-hidden', 'true');

  const grid = document.createElement('div');
  grid.className = 'mim-arch-grid';
  archLayer.appendChild(grid);

  const geometric = document.createElement('div');
  geometric.className = 'mim-arch-geometric';

  marks.forEach((mark) => {
    const el = document.createElement('div');
    const isLine = mark.variant === 'line';
    const isBracket = mark.variant === 'corner-bracket';
    el.className = markClassName(mark.variant);
    Object.assign(el.style, {
      left: mark.left,
      top: mark.top,
      width: typeof mark.width === 'number' ? `${mark.width}px` : mark.width,
      height: typeof mark.height === 'number' ? `${mark.height}px` : mark.height,
      borderRadius: mark.radius || (isLine || isBracket ? '0' : '36px')
    });
    if (!isLine && !isBracket && mark.depth !== undefined) {
      el.dataset.depth = String(mark.depth);
    }
    geometric.appendChild(el);
  });

  archLayer.appendChild(geometric);

  const lightLayer = document.createElement('div');
  lightLayer.className = 'mim-light-layer';
  lightLayer.setAttribute('aria-hidden', 'true');

  const ambient = document.createElement('div');
  ambient.className = 'mim-light-ambient';
  lightLayer.appendChild(ambient);

  if (!reducedMotion && finePointer) {
    const spotlight = document.createElement('div');
    spotlight.className = 'mim-light-spotlight';
    lightLayer.appendChild(spotlight);

    document.addEventListener(
      'pointermove',
      (event) => {
        lightLayer.style.setProperty('--mim-spot-x', `${event.clientX}px`);
        lightLayer.style.setProperty('--mim-spot-y', `${event.clientY}px`);
      },
      { passive: true }
    );
  }

  const progressBar = document.createElement('div');
  progressBar.className = 'mim-arch-scroll-progress';
  progressBar.setAttribute('aria-hidden', 'true');

  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  document.body.insertBefore(progressBar, document.body.firstChild);
  document.body.insertBefore(lightLayer, document.body.firstChild);
  document.body.insertBefore(archLayer, document.body.firstChild);

  document.querySelectorAll('.mim-work-hero.mim-section-frame').forEach((hero) => {
    if (hero.querySelector('.mim-section-frame__border')) return;
    const border = document.createElement('div');
    border.className = 'mim-section-frame__border';
    border.setAttribute('aria-hidden', 'true');
    const label = document.createElement('div');
    label.className = 'mim-section-frame__label';
    label.textContent = 'Work · Level 01';
    label.setAttribute('aria-hidden', 'true');
    hero.appendChild(border);
    hero.appendChild(label);
  });

  if (reducedMotion || !finePointer) return;

  const movingMarks = Array.from(geometric.querySelectorAll('[data-depth]'));
  let pointerX = 0;
  let pointerY = 0;
  let currentX = 0;
  let currentY = 0;

  document.addEventListener(
    'pointermove',
    (event) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
    },
    { passive: true }
  );

  function frame() {
    currentX += (pointerX - currentX) * 0.04;
    currentY += (pointerY - currentY) * 0.04;

    movingMarks.forEach((mark) => {
      const depth = Number(mark.dataset.depth);
      const x = currentX * depth * 120;
      const y = currentY * depth * 120;
      mark.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
})();
