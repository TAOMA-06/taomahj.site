/* ============================================================
   Architectural Background — Canvas-driven generative architecture
   Perspective grid, floating geometric planes, subtle parallax
   ============================================================ */

(function initArchBg() {
  const canvas = document.getElementById('arch-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, DPR;
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;
  let scrollY = 0;
  let time = 0;

  const config = {
    horizonRatio: 0.55,
    gridDensity: 24,
    vanishingPointShift: 0.15,
    planeCount: 5,
    lineColor: 'rgba(0, 47, 167, 0.06)',
    accentLineColor: 'rgba(0, 47, 167, 0.10)',
    planeColor: 'rgba(0, 47, 167, 0.025)',
    planeStroke: 'rgba(0, 47, 167, 0.06)',
    animSpeed: 0.0003,
    parallaxStrength: 0.03,
  };

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth;
    H = canvas.parentElement ? canvas.parentElement.offsetHeight : window.innerHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  resize();
  window.addEventListener('resize', resize);

  document.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / W - 0.5) * 2;
    targetMouseY = (e.clientY / H - 0.5) * 2;
  });

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  });

  // Perspective grid lines
  function drawPerspectiveGrid(vpX, vpY) {
    const horizonY = vpY;
    const bottomY = H + 100;
    const topY = -100;

    ctx.strokeStyle = config.lineColor;
    ctx.lineWidth = 1;

    // Vertical-ish lines radiating from vanishing point
    const spread = W * 1.5;
    const step = spread / config.gridDensity;
    for (let i = -config.gridDensity / 2; i <= config.gridDensity / 2; i++) {
      const xBase = vpX + i * step;
      ctx.beginPath();
      ctx.moveTo(xBase, bottomY);
      ctx.lineTo(vpX + i * step * 0.02, horizonY);
      ctx.stroke();
    }

    // Horizontal receding lines
    const hLines = 12;
    for (let i = 1; i <= hLines; i++) {
      const t = i / hLines;
      const y = horizonY + (bottomY - horizonY) * (t * t);
      const widthAtY = spread * t;
      ctx.beginPath();
      ctx.moveTo(vpX - widthAtY / 2, y);
      ctx.lineTo(vpX + widthAtY / 2, y);
      ctx.stroke();
    }

    // Horizon accent line
    ctx.strokeStyle = config.accentLineColor;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, horizonY);
    ctx.lineTo(W, horizonY);
    ctx.stroke();
  }

  // Floating geometric planes (abstract building blocks)
  const planes = [];
  for (let i = 0; i < config.planeCount; i++) {
    planes.push({
      x: Math.random() * 0.8 + 0.1,
      y: Math.random() * 0.6 + 0.2,
      w: Math.random() * 120 + 60,
      h: Math.random() * 160 + 80,
      depth: Math.random() * 0.5 + 0.5,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.0002 + 0.0001,
      opacity: Math.random() * 0.03 + 0.02,
    });
  }

  function drawPlanes(vpX, vpY) {
    planes.forEach((p, idx) => {
      const floatY = Math.sin(time * p.speed + p.phase) * 15;
      const parallaxX = mouseX * config.parallaxStrength * p.depth * 100;
      const parallaxY = mouseY * config.parallaxStrength * p.depth * 60 + floatY;

      const px = p.x * W + parallaxX - p.w / 2;
      const py = p.y * H + parallaxY - p.h / 2;

      // Draw wireframe box (architectural sketch style)
      ctx.strokeStyle = config.planeStroke;
      ctx.fillStyle = config.planeColor;
      ctx.lineWidth = 1;

      // Front face
      ctx.fillRect(px, py, p.w, p.h);
      ctx.strokeRect(px, py, p.w, p.h);

      // Side face (pseudo-3D)
      const depth = 20 * p.depth;
      ctx.beginPath();
      ctx.moveTo(px + p.w, py);
      ctx.lineTo(px + p.w + depth, py - depth * 0.6);
      ctx.lineTo(px + p.w + depth, py + p.h - depth * 0.6);
      ctx.lineTo(px + p.w, py + p.h);
      ctx.closePath();
      ctx.fillStyle = `rgba(0, 47, 167, ${p.opacity * 0.5})`;
      ctx.fill();
      ctx.stroke();

      // Top face
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px + depth, py - depth * 0.6);
      ctx.lineTo(px + p.w + depth, py - depth * 0.6);
      ctx.lineTo(px + p.w, py);
      ctx.closePath();
      ctx.fillStyle = `rgba(0, 47, 167, ${p.opacity * 0.3})`;
      ctx.fill();
      ctx.stroke();

      // Corner accent lines
      ctx.strokeStyle = config.accentLineColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px + p.w + depth, py - depth * 0.6);
      ctx.stroke();
    });
  }

  // Section divider lines (architectural "floor slabs")
  function drawFloorSlabs() {
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((sec, i) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top > H || rect.bottom < 0) return;

      const y = rect.top + rect.height;
      const progress = Math.max(0, Math.min(1, 1 - rect.top / H));

      ctx.strokeStyle = `rgba(0, 47, 167, ${0.04 * progress})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W * progress, y);
      ctx.stroke();

      // Small section marker
      if (progress > 0.3) {
        ctx.fillStyle = `rgba(0, 47, 167, ${0.08 * progress})`;
        ctx.fillRect(W * progress - 40, y - 3, 40, 3);
      }
    });
  }

  function animate() {
    time += 16;
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    ctx.clearRect(0, 0, W, H);

    const vpX = W * (0.5 + mouseX * config.vanishingPointShift);
    const vpY = H * config.horizonRatio + mouseY * 20;

    drawPerspectiveGrid(vpX, vpY);
    drawPlanes(vpX, vpY);
    drawFloorSlabs();

    requestAnimationFrame(animate);
  }

  animate();
})();
