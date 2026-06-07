/* ============================================================
   Architectural Animations — Scroll-driven effects
   Parallax, section reveals, 3D transforms, building-like transitions
   ============================================================ */

(function initArchAnimations() {
  'use strict';

  // ===== 1. Smooth scroll with eased lerp (building elevator feel) =====
  let scrollTarget = 0;
  let scrollCurrent = 0;
  let isScrolling = false;
  const scrollEase = 0.08;

  // Only apply smooth scroll on desktop
  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  // ===== 2. Parallax layers =====
  function initParallax() {
    const parallaxEls = document.querySelectorAll('[data-parallax]');
    if (!parallaxEls.length) return;

    let ticking = false;

    function updateParallax() {
      const scrollY = window.scrollY;
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.1;
        const offset = scrollY * speed;
        el.style.transform = `translateY(${offset}px)`;
      });
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  // ===== 3. Section "floor" entrance animation =====
  function initFloorReveal() {
    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('floor-active');

          // Stagger child reveals
          const children = entry.target.querySelectorAll('.reveal');
          children.forEach((child, i) => {
            setTimeout(() => {
              child.classList.add('revealed');
            }, i * 100);
          });

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    sections.forEach(sec => observer.observe(sec));
  }

  // ===== 4. 3D card tilt on hover (architectural blueprint feel) =====
  function initCardTilt() {
    if (isTouch) return; // Skip on mobile

    const cards = document.querySelectorAll('.project-card, .about-card, .contact-card');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        const rotateX = y * -8;
        const rotateY = x * 8;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        card.style.transition = 'transform 0.1s ease-out';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
        card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      });
    });
  }

  // ===== 5. Nav scroll behavior — "elevator floor indicator" =====
  function initNavElevator() {
    const nav = document.getElementById('nav');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;

      // Hide/show nav based on scroll direction
      if (currentScroll > lastScroll && currentScroll > 200) {
        nav.style.transform = 'translateY(-100%)';
      } else {
        nav.style.transform = 'translateY(0)';
      }
      lastScroll = currentScroll;

      // Update active section indicator
      sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom > 100) {
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + sec.id);
          });
        }
      });
    }, { passive: true });

    // Add floor indicator to nav
    const floorIndicator = document.createElement('div');
    floorIndicator.className = 'nav-floor-indicator';
    nav.appendChild(floorIndicator);
  }

  // ===== 6. Hero text character-by-character reveal =====
  function initHeroTextReveal() {
    const heroName = document.querySelector('.hero-name');
    if (!heroName) return;

    const text = heroName.textContent;
    heroName.innerHTML = '';

    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      span.style.transition = `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.04}s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.04}s`;
      heroName.appendChild(span);

      setTimeout(() => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
      }, 300 + i * 40);
    });
  }

  // ===== 7. Scroll progress bar (building height indicator) =====
  function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = progress + '%';
    }, { passive: true });
  }

  // ===== 8. Section number counter animation =====
  function initSectionNumberCount() {
    const numbers = document.querySelectorAll('.section-number');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    numbers.forEach(num => {
      num.style.opacity = '0';
      num.style.transform = 'translateY(30px)';
      num.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
      observer.observe(num);
    });
  }

  // ===== 9. Blueprint grid overlay on hover for project cards =====
  function initBlueprintOverlay() {
    if (isTouch) return;

    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
      const overlay = document.createElement('div');
      overlay.className = 'blueprint-overlay';
      overlay.innerHTML = `
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="bp-grid-${Math.random().toString(36).substr(2, 9)}" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,47,167,0.15)" stroke-width="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bp-grid)" />
        </svg>
      `;
      card.appendChild(overlay);
    });
  }

  // ===== 10. Magnetic button effect =====
  function initMagneticButtons() {
    if (isTouch) return;

    const buttons = document.querySelectorAll('.btn, .nav-links a');

    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }

  // ===== Initialize all =====
  document.addEventListener('DOMContentLoaded', () => {
    initParallax();
    initFloorReveal();
    initCardTilt();
    initNavElevator();
    initHeroTextReveal();
    initScrollProgress();
    initSectionNumberCount();
    initBlueprintOverlay();
    initMagneticButtons();
  });
})();
