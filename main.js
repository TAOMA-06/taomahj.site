/* ========================================================
   Personal Website — tao.ma
   Spotlight Cursor · Particles · i18n · Scroll Animations
   ======================================================== */

// ==================== i18n ====================

const i18n = {
  zh: {
    'nav.projects': '项目',
    'nav.about': '关于',
    'nav.contact': '联系',
    'hero.tagline': '数学 × 电路 × 自动化 × 代码',
    'hero.sub': '探索硬件与软件交汇地带的本科生',
    'hero.viewWork': '查看作品',
    'hero.getInTouch': '联系我',
    'hero.scroll': '向下滚动',
    'projects.title': '项目',
    'projects.desc': '做过和正在探索的事情',
    'projects.p1.title': 'Hermes AI Agent',
    'projects.p1.desc': '本地 AI 助手系统——自定义人格、记忆、技能与多模型编排，运行于 macOS。',
    'projects.p2.title': '模型 Abliteration',
    'projects.p2.desc': '消除 LLM 拒绝机制——基于 Ollama 与 llama.cpp 的自定义模型手术流水线。',
    'projects.p3.title': 'Python 自动化',
    'projects.p3.desc': '通过实战脚本学习 Python：DNS 自动化、文件处理与 API 集成。',
    'about.title': '关于',
    'about.desc': '我的背景、技能与驱动力',
    'about.education.title': '教育背景',
    'about.education.school': '本科生',
    'about.education.major': '数学 · 电子工程 · 自动化',
    'about.skills.title': '技能',
    'about.interests.title': '兴趣',
    'about.interests.content': '探索硬件与软件的边界——从电路设计到智能系统。热衷于构建能在真实世界中运行的东西。',
    'contact.title': '联系我',
    'contact.desc': '随时欢迎有趣的交流',
    'contact.github': 'TAOMA-06',
    'contact.more': '更多',
    'contact.moreHint': '更多联系方式即将上线',
    'footer.built': '用好奇心构建',
  },
  en: {
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'hero.tagline': 'Mathematics × Circuits × Automation × Code',
    'hero.sub': 'Undergraduate exploring the intersection of hardware and software',
    'hero.viewWork': 'View My Work',
    'hero.getInTouch': 'Get In Touch',
    'hero.scroll': 'Scroll down',
    'projects.title': 'Projects',
    'projects.desc': 'Things I\'ve built and explored',
    'projects.p1.title': 'Hermes AI Agent',
    'projects.p1.desc': 'Local AI agent with custom personalities, memory, skills & multi-model orchestration on macOS.',
    'projects.p2.title': 'Model Abliteration',
    'projects.p2.desc': 'Abliterating LLM refusal mechanisms — custom model surgery pipeline with Ollama & llama.cpp.',
    'projects.p3.title': 'Python Automation',
    'projects.p3.desc': 'Learning Python through real-world scripts: DNS automation, file processing & API integrations.',
    'about.title': 'About',
    'about.desc': 'Background, skills, and what drives me',
    'about.education.title': 'Education',
    'about.education.school': 'Undergraduate Student',
    'about.education.major': 'Mathematics · Electrical Engineering · Automation',
    'about.skills.title': 'Skills',
    'about.interests.title': 'Interests',
    'about.interests.content': 'Exploring the boundary between hardware and software — from circuit design to intelligent systems. Passionate about building things that work in the real world.',
    'contact.title': 'Get In Touch',
    'contact.desc': 'Always open to interesting conversations',
    'contact.github': 'TAOMA-06',
    'contact.more': 'More',
    'contact.moreHint': 'More ways coming soon',
    'footer.built': 'Built with curiosity',
  }
};

let currentLang = localStorage.getItem('lang') || 'zh';

function switchLang(lang) {
  if (lang === currentLang) return;

  document.body.classList.add('lang-switching');
  setTimeout(() => {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    applyLang();
    updateLangToggle();
    document.body.classList.remove('lang-switching');
  }, 200);
}

function applyLang() {
  const dict = i18n[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
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

// Init
applyLang();
updateLangToggle();

// ==================== Spotlight Cursor ====================

const spotlight = document.querySelector('.spotlight');

document.addEventListener('mousemove', (e) => {
  document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
  document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
});

// Card-local glow effect
document.querySelectorAll('.glass-card, .project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--card-mouse-x', `${x}%`);
    card.style.setProperty('--card-mouse-y', `${y}%`);
  });
  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--card-mouse-x', '50%');
    card.style.setProperty('--card-mouse-y', '50%');
  });
});

// Hide spotlight on touch devices
if ('ontouchstart' in window) {
  spotlight.style.display = 'none';
}

// ==================== Particle Canvas Background ====================

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

let particles = [];
let animationId;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Determine particle count based on screen size
function getParticleCount() {
  const area = canvas.width * canvas.height;
  const isMobile = canvas.width < 768;
  if (isMobile) return 40;
  if (area < 1000000) return 60;
  return 80;
}

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.size = Math.random() * 1.5 + 0.5;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.pulseSpeed = Math.random() * 0.02 + 0.005;
    this.pulseOffset = Math.random() * Math.PI * 2;
  }
  update(time) {
    this.x += this.vx;
    this.y += this.vy;
    // Wrap around
    if (this.x < -10) this.x = canvas.width + 10;
    if (this.x > canvas.width + 10) this.x = -10;
    if (this.y < -10) this.y = canvas.height + 10;
    if (this.y > canvas.height + 10) this.y = -10;
    // Pulsing opacity
    const pulse = Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.3 + 0.7;
    this.currentOpacity = this.opacity * pulse;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(124, 111, 247, ${this.currentOpacity})`;
    ctx.fill();
  }
}

// Connection lines between nearby particles
function drawConnections() {
  const maxDist = 150;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) {
        const opacity = (1 - dist / maxDist) * 0.12;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(124, 111, 247, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function initParticles() {
  particles = [];
  const count = getParticleCount();
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

function animateParticles(time) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update(time);
    p.draw();
  });
  drawConnections();
  animationId = requestAnimationFrame(animateParticles);
}

initParticles();
animationId = requestAnimationFrame(animateParticles);

// Re-init on resize (debounced)
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    resizeCanvas();
    initParticles();
  }, 300);
});

// ==================== Scroll Effects ====================

// Nav scroll state
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Scroll reveal animation
const revealElements = document.querySelectorAll(
  '.section-container, .hero-content, .project-card, .about-card, .contact-card'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal', 'visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ==================== Contact Link Placeholder ====================

// These are interfaces — update href when ready
// GitHub: update href in HTML or set here
// Social: update href in HTML or set here

console.log('%c🔮 tao.ma personal website ready %c| %c✧ %c%c%c',
  'color: #7c6ff7; font-weight: bold;',
  '', 'color: #00cec9;',
  'color: #e4e4ec;', 'font-size: 12px;');
console.log('%cMouse-following spotlight · Particle canvas · Bilingual · Glassmorphism',
  'color: #9898a8; font-size: 11px;');
