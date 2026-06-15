/* ============================================================
   taomahj — Quiet architectural background marks
   ============================================================ */

(function initArchitecturalMarks() {
  const container = document.querySelector('.bg-geometric');
  if (!container) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const marks = [
    { cls: 'geo-mark', left: '6%', top: '18%', width: 180, height: 180, radius: '50%' },
    { cls: 'geo-mark is-block', left: '78%', top: '16%', width: 150, height: 210 },
    { cls: 'geo-mark', left: '72%', top: '72%', width: 260, height: 130 },
    { cls: 'geo-mark', left: '14%', top: '74%', width: 120, height: 120 },
    { cls: 'geo-mark is-line', left: '0', top: '34%', width: '28%', height: 1 },
    { cls: 'geo-mark is-line', left: '68%', top: '52%', width: '26%', height: 1 },
    { cls: 'geo-mark is-line', left: '24%', top: '0', width: 1, height: '44%' },
    { cls: 'geo-mark is-line', left: '90%', top: '46%', width: 1, height: '34%' },
  ];

  marks.forEach((mark, index) => {
    const el = document.createElement('div');
    el.className = mark.cls;
    Object.assign(el.style, {
      left: mark.left,
      top: mark.top,
      width: typeof mark.width === 'number' ? `${mark.width}px` : mark.width,
      height: typeof mark.height === 'number' ? `${mark.height}px` : mark.height,
      borderRadius: mark.radius || '0',
      transform: 'translate(-50%, -50%)',
    });

    if (!reduceMotion && !mark.cls.includes('is-line')) {
      el.style.transition = 'transform 900ms cubic-bezier(0.16, 1, 0.3, 1)';
      el.dataset.depth = String(0.08 + index * 0.015);
    }

    container.appendChild(el);
  });

  if (reduceMotion) return;

  const movingMarks = Array.from(container.querySelectorAll('[data-depth]'));
  let pointerX = 0;
  let pointerY = 0;
  let currentX = 0;
  let currentY = 0;

  document.addEventListener('pointermove', (event) => {
    pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
    pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

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
