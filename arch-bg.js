/* ============================================================
   Abstract Geometric Background — Canvas-driven particle grid
   Floating nodes, connecting lines, subtle parallax
   Theme-aware colors
   ============================================================ */

(function initArchBg() {
  const canvas = document.getElementById('arch-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, DPR;
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;
  let time = 0;

  // Get current theme color
  function getThemeColor() {
    const style = getComputedStyle(document.documentElement);
    const primary = style.getPropertyValue('--primary').trim() || '#0891b2';
    return primary;
  }

  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  const config = {
    nodeCount: 60,
    connectionDistance: 120,
    nodeBaseRadius: 1.5,
    animSpeed: 0.0005,
    parallaxStrength: 0.02,
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
    initNodes();
  }

  resize();
  window.addEventListener('resize', resize);

  document.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / W - 0.5) * 2;
    targetMouseY = (e.clientY / H - 0.5) * 2;
  });

  // Floating nodes
  let nodes = [];
  function initNodes() {
    nodes = [];
    for (let i = 0; i < config.nodeCount; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + config.nodeBaseRadius,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.002 + 0.001,
      });
    }
  }
  initNodes();

  function drawConnections(primaryColor) {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < config.connectionDistance) {
          const opacity = (1 - dist / config.connectionDistance) * 0.15;
          ctx.strokeStyle = hexToRgba(primaryColor, opacity);
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function drawNodes(primaryColor) {
    nodes.forEach(node => {
      const pulse = Math.sin(time * node.pulseSpeed + node.phase) * 0.5 + 0.5;
      const radius = node.radius + pulse * 1;

      ctx.fillStyle = hexToRgba(primaryColor, 0.2 + pulse * 0.15);
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Glow
      ctx.fillStyle = hexToRgba(primaryColor, 0.05);
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius * 4, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function updateNodes() {
    const parallaxX = mouseX * config.parallaxStrength * 50;
    const parallaxY = mouseY * config.parallaxStrength * 50;

    nodes.forEach(node => {
      node.x += node.vx + parallaxX * 0.01;
      node.y += node.vy + parallaxY * 0.01;

      // Wrap around
      if (node.x < -10) node.x = W + 10;
      if (node.x > W + 10) node.x = -10;
      if (node.y < -10) node.y = H + 10;
      if (node.y > H + 10) node.y = -10;
    });
  }

  function drawGrid(primaryColor) {
    const gridSize = 60;
    ctx.strokeStyle = hexToRgba(primaryColor, 0.03);
    ctx.lineWidth = 0.5;

    for (let x = 0; x < W; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }

    for (let y = 0; y < H; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
  }

  function animate() {
    time += 16;
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    const primaryColor = getThemeColor();

    ctx.clearRect(0, 0, W, H);

    drawGrid(primaryColor);
    updateNodes();
    drawConnections(primaryColor);
    drawNodes(primaryColor);

    requestAnimationFrame(animate);
  }

  animate();
})();
