/* ============================================================
   taomahj — Geometric Decorations
   Swiss International Style × Modern Architecture
   Architectural geometric shapes with subtle animations
   ============================================================ */

(function initGeometricBackground() {
  const container = document.querySelector('.bg-geometric');
  if (!container) return;

  // Helper to create element
  function createEl(type, styles) {
    const el = document.createElement(type);
    el.style.cssText = styles;
    return el;
  }

  // === CIRCLES ===
  const circles = [
    { x: '8%', y: '12%', size: 240, opacity: 0.08, anim: 'float', dur: '28s' },
    { x: '88%', y: '18%', size: 160, opacity: 0.06, anim: 'float-slow', dur: '35s' },
    { x: '85%', y: '78%', size: 180, opacity: 0.07, anim: 'float', dur: '32s' },
    { x: '12%', y: '65%', size: 100, opacity: 0.05, anim: 'breathe', dur: '20s' },
    { x: '50%', y: '45%', size: 300, opacity: 0.03, anim: 'none', dur: null },
    { x: '92%', y: '55%', size: 80, opacity: 0.04, anim: 'drift', dur: '40s' },
  ];

  circles.forEach(c => {
    const el = createEl('div', `
      left: ${c.x}; top: ${c.y};
      width: ${c.size}px; height: ${c.size}px;
      opacity: ${c.opacity};
      transform: translate(-50%, -50%);
      animation: ${c.anim || 'none'} ${c.dur || '0s'} ease-in-out infinite;
    `);
    el.className = 'geo-circle';
    container.appendChild(el);
  });

  // === SQUARES ===
  const squares = [
    { x: '5%', y: '45%', size: 80, opacity: 0.06, anim: 'rotate-slow', dur: '80s', rotate: true },
    { x: '92%', y: '35%', size: 60, opacity: 0.05, anim: 'float', dur: '30s' },
    { x: '45%', y: '88%', size: 120, opacity: 0.04, anim: 'rotate-reverse', dur: '100s', rotate: true },
    { x: '70%', y: '60%', size: 40, opacity: 0.06, anim: 'drift', dur: '25s' },
    { x: '25%', y: '25%', size: 50, opacity: 0.04, anim: 'float-slow', dur: '45s' },
  ];

  squares.forEach(s => {
    const el = createEl('div', `
      left: ${s.x}; top: ${s.y};
      width: ${s.size}px; height: ${s.size}px;
      opacity: ${s.opacity};
      transform: translate(-50%, -50%) ${s.rotate ? 'rotate(45deg)' : ''};
      animation: ${s.anim} ${s.dur} ease-in-out infinite;
    `);
    el.className = 'geo-square';
    container.appendChild(el);
  });

  // === TRIANGLES ===
  const triangles = [
    { x: '75%', y: '22%', size: 70, opacity: 0.06, anim: 'rotate-slow', dur: '90s' },
    { x: '18%', y: '75%', size: 55, opacity: 0.05, anim: 'float', dur: '35s' },
    { x: '88%', y: '70%', size: 45, opacity: 0.04, anim: 'rotate-reverse', dur: '70s' },
    { x: '55%', y: '15%', size: 40, opacity: 0.05, anim: 'drift', dur: '50s' },
  ];

  triangles.forEach(t => {
    const el = createEl('div', `
      left: ${t.x}; top: ${t.y};
      width: 0; height: 0;
      border-left: ${t.size / 2}px solid transparent;
      border-right: ${t.size / 2}px solid transparent;
      border-bottom: ${t.size}px solid var(--border-light);
      opacity: ${t.opacity};
      animation: ${t.anim} ${t.dur} ease-in-out infinite;
    `);
    el.className = 'geo-triangle';
    container.appendChild(el);
  });

  // === ARCHES ===
  const arches = [
    { x: '60%', y: '40%', width: 140, height: 70, opacity: 0.06, anim: 'none' },
    { x: '30%', y: '85%', width: 100, height: 50, opacity: 0.05, anim: 'float-slow', dur: '40s' },
  ];

  arches.forEach(a => {
    const el = createEl('div', `
      left: ${a.x}; top: ${a.y};
      width: ${a.width}px; height: ${a.height}px;
      border: 1px solid var(--border-light);
      border-bottom: none;
      border-radius: ${a.width / 2}px ${a.width / 2}px 0 0;
      opacity: ${a.opacity};
      transform: translate(-50%, -50%);
      animation: ${a.anim || 'none'} ${a.dur || '0s'} ease-in-out infinite;
    `);
    el.className = 'geo-arch';
    container.appendChild(el);
  });

  // === FRAMES ===
  const frames = [
    { x: '82%', y: '25%', size: 110, opacity: 0.05, anim: 'float', dur: '38s' },
    { x: '15%', y: '35%', size: 90, opacity: 0.04, anim: 'rotate-slow', dur: '120s' },
    { x: '68%', y: '82%', size: 70, opacity: 0.04, anim: 'breathe', dur: '30s' },
  ];

  frames.forEach(f => {
    const el = createEl('div', `
      left: ${f.x}; top: ${f.y};
      width: ${f.size}px; height: ${f.size}px;
      border: 1px solid var(--border-medium);
      opacity: ${f.opacity};
      transform: translate(-50%, -50%);
      animation: ${f.anim} ${f.dur} ease-in-out infinite;
    `);
    el.className = 'geo-frame';
    container.appendChild(el);
  });

  // === HORIZONTAL LINES ===
  const hLines = [
    { x: '0%', y: '20%', width: '28%', opacity: 0.2, anim: 'none' },
    { x: '72%', y: '45%', width: '22%', opacity: 0.15, anim: 'none' },
    { x: '10%', y: '72%', width: '18%', opacity: 0.18, anim: 'none' },
    { x: '60%', y: '88%', width: '30%', opacity: 0.12, anim: 'none' },
    { x: '0%', y: '55%', width: '12%', opacity: 0.15, anim: 'none' },
  ];

  hLines.forEach(l => {
    const el = createEl('div', `
      left: ${l.x}; top: ${l.y};
      width: ${l.width}; height: 1px;
      background: var(--border-light);
      opacity: ${l.opacity};
    `);
    el.className = 'geo-line';
    container.appendChild(el);
  });

  // === VERTICAL LINES ===
  const vLines = [
    { x: '18%', y: '0%', height: '35%', opacity: 0.2, anim: 'none' },
    { x: '85%', y: '40%', height: '40%', opacity: 0.15, anim: 'none' },
    { x: '5%', y: '60%', height: '35%', opacity: 0.12, anim: 'none' },
    { x: '95%', y: '0%', height: '25%', opacity: 0.18, anim: 'none' },
  ];

  vLines.forEach(l => {
    const el = createEl('div', `
      left: ${l.x}; top: ${l.y};
      width: 1px; height: ${l.height};
      background: var(--border-light);
      opacity: ${l.opacity};
    `);
    el.className = 'geo-vline';
    container.appendChild(el);
  });

  // === DASHED LINES ===
  const dashedLines = [
    { x: '25%', y: '30%', width: '15%', opacity: 0.15, anim: 'none' },
    { x: '75%', y: '65%', width: '12%', opacity: 0.12, anim: 'none' },
  ];

  dashedLines.forEach(l => {
    const el = createEl('div', `
      left: ${l.x}; top: ${l.y};
      width: ${l.width}; height: 0;
      border-top: 1px dashed var(--border-light);
      opacity: ${l.opacity};
    `);
    el.className = 'geo-dashed';
    container.appendChild(el);
  });

  // === STRUCTURAL GRID OVERLAY ===
  const gridOverlay = createEl('div', `
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(var(--border-light) 1px, transparent 1px),
      linear-gradient(90deg, var(--border-light) 1px, transparent 1px);
    background-size: 120px 120px;
    opacity: 0.04;
    pointer-events: none;
  `);
  container.appendChild(gridOverlay);

})();

// Mouse parallax effect
(function initMouseParallax() {
  const geos = document.querySelectorAll('.bg-geometric > *:not(.geo-line):not(.geo-vline):not(.geo-dashed)');
  if (geos.length === 0) return;

  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;
  const factor = 0.02;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animate() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    geos.forEach((geo, i) => {
      const speed = 0.3 + (i % 5) * 0.15;
      const x = currentX * speed * factor * 100;
      const y = currentY * speed * factor * 100;
      const baseTransform = geo.style.transform.split('translate')[0] || '';
      geo.style.transform = `${baseTransform} translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });

    requestAnimationFrame(animate);
  }

  animate();
})();

// Scroll parallax
(function initScrollParallax() {
  const geos = document.querySelectorAll('.bg-geometric > *');
  if (geos.length === 0) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        geos.forEach((geo, i) => {
          const speed = 0.05 + (i * 0.01);
          const baseTransform = geo.style.transform.split('translate')[0] || '';
          const match = geo.style.transform.match(/translate\([^)]+\)$/);
          const translatePart = match ? match[0] : 'translate(-50%, -50%)';

          geo.style.transform = baseTransform + translatePart;
        });

        ticking = false;
      });
      ticking = true;
    }
  });
})();
