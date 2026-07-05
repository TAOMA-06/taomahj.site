(function () {
  'use strict';

  var overlay = document.createElement('div');
  overlay.className = 'mim-page-transition';
  document.body.appendChild(overlay);

  function playEnter() {
    overlay.style.transformOrigin = 'top';
    overlay.style.transform = 'scaleY(1)';
    requestAnimationFrame(function () {
      overlay.style.transition = 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
      overlay.style.transform = 'scaleY(0)';
    });
  }

  function playExit(href) {
    overlay.classList.add('active');
    overlay.style.transition = 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)';
    overlay.style.transformOrigin = 'bottom';
    overlay.style.transform = 'scaleY(1)';
    setTimeout(function () {
      window.location.href = href;
    }, 550);
  }

  document.addEventListener('DOMContentLoaded', playEnter);

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[data-mim-transition]');
    if (!link || link.target === '_blank') return;
    var href = link.getAttribute('href');
    if (!href || href.startsWith('mailto:') || href.startsWith('#')) return;
    event.preventDefault();
    playExit(href);
  });
})();
