/* ========================================================
   Security Hardening Module — taomahj.site
   Shared across all pages. Include as first script in <body>.
   ======================================================== */

(function () {
  'use strict';

  const isDev = window.location.hostname === 'localhost' ||
                window.location.hostname === '127.0.0.1' ||
                window.location.hostname === '';

  /* ─── 1. Console lockdown (production only) ─── */
  if (!isDev) {
    const noop = () => {};
    const methods = [
      'log', 'info', 'warn', 'debug', 'error', 'table', 'trace',
      'group', 'groupEnd', 'groupCollapsed', 'time', 'timeEnd',
      'timeLog', 'count', 'countReset', 'assert', 'clear',
      'dir', 'dirxml'
    ];
    methods.forEach(m => {
      if (typeof console[m] === 'function') {
        console[m] = noop;
      }
    });
  }

  /* ─── 2. Frame-busting / click-jacking protection ─── */
  if (window.top !== window.self) {
    try {
      window.top.location = window.self.location;
    } catch (e) {
      document.body.style.display = 'none';
      document.documentElement.innerHTML = '';
    }
  }

  /* ─── 3. Image protection ─── */
  function protectImages() {
    // Prevent right-click on images
    document.addEventListener('contextmenu', (e) => {
      if (e.target.tagName === 'IMG' || e.target.closest('img')) {
        e.preventDefault();
      }
    });

    // Prevent drag on images
    document.addEventListener('dragstart', (e) => {
      if (e.target.tagName === 'IMG' || e.target.closest('img')) {
        e.preventDefault();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', protectImages);
  } else {
    protectImages();
  }

  /* ─── 4. Utility: HTML escape ─── */
  window.SecurityUtils = {
    /**
     * Escape HTML special characters to prevent XSS.
     * @param {string} str
     * @returns {string}
     */
    escapeHtml(str) {
      if (str == null) return '';
      const div = document.createElement('div');
      div.textContent = String(str);
      return div.innerHTML;
    },

    /**
     * Escape attribute values.
     * @param {string} str
     * @returns {string}
     */
    escapeAttr(str) {
      if (str == null) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    },

    /**
     * Validate a URL is same-origin or a safe protocol.
     * @param {string} url
     * @returns {boolean}
     */
    isSafeUrl(url) {
      if (!url) return false;
      try {
        const parsed = new URL(url, window.location.href);
        // Allow same-origin, mailto, tel, and https external links
        if (parsed.origin === window.location.origin) return true;
        if (['mailto:', 'tel:', 'https:'].includes(parsed.protocol)) return true;
        return false;
      } catch {
        return false;
      }
    }
  };

  /* ─── 5. Optional: DevTools detection (commented by default) ─── */
  /*
  (function detectDevTools() {
    const threshold = 160;
    const check = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      if (widthThreshold || heightThreshold) {
        document.body.innerHTML = '';
      }
    };
    window.addEventListener('resize', check);
    setInterval(check, 1000);
  })();
  */

})();
