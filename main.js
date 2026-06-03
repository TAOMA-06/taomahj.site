/* ========================================================
   Personal Website — taomahj
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
    'about.education.major': '自动化 · 人工智能',
    'about.skills.title': '技能',
    'about.interests.title': '兴趣',
    'about.interests.content': '赛车与摄影——在赛道上感受速度与操控的极致，在镜头下捕捉光影与瞬间。用不同的方式探索世界的边界。',
    'contact.title': '联系我',
    'contact.desc': '随时欢迎有趣的交流',
    'contact.github': 'TAOMA-06',
    'contact.qq': '添加 QQ 号',
    'contact.wechatLabel': '微信',
    'contact.wechat': '添加微信号',
    'contact.more': '更多',
    'contact.moreHint': '更多联系方式即将上线',
    'projects.more.title': '更多项目',
    'projects.more.desc': '在 GitHub 上浏览我的全部仓库。',
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
    'about.education.major': 'Automation · Artificial Intelligence',
    'about.skills.title': 'Skills',
    'about.interests.title': 'Interests',
    'about.interests.content': 'Racing & Photography — feeling speed and control on the track, capturing light and moments through the lens. Exploring the world in different ways.',
    'contact.title': 'Get In Touch',
    'contact.desc': 'Always open to interesting conversations',
    'contact.github': 'TAOMA-06',
    'contact.qq': 'Add QQ number',
    'contact.wechatLabel': 'WeChat',
    'contact.wechat': 'Add WeChat ID',
    'contact.more': 'More',
    'contact.moreHint': 'More ways coming soon',
    'projects.more.title': 'More Projects',
    'projects.more.desc': 'Browse all my repositories on GitHub.',
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

// Firefly color palette
const FIREFLY_COLORS = [
  { r: 240, g: 230, b: 140 }, // warm yellow #f0e68c
  { r: 127, g: 255, b: 212 }, // aquamarine #7fffd4
  { r: 255, g: 215, b: 0 },   // gold #ffd700
  { r: 173, g: 255, b: 47 },  // green-yellow #adff2f
];

// Determine particle count based on screen size
function getParticleCount() {
  const isMobile = canvas.width < 768;
  if (isMobile) return 20;
  return 35;
}

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    // Slower drift for firefly feel
    this.vx = (Math.random() - 0.5) * 0.25;
    this.vy = (Math.random() - 0.5) * 0.25;
    this.size = Math.random() * 2 + 1;
    this.baseOpacity = Math.random() * 0.4 + 0.3;
    // Slower, more organic pulse
    this.pulseSpeed = Math.random() * 0.003 + 0.001;
    this.pulseOffset = Math.random() * Math.PI * 2;
    // Random direction change timer
    this.dirChangeTimer = Math.random() * 200;
    this.dirChangeInterval = 150 + Math.random() * 250;
    // Pick a warm firefly color
    this.color = FIREFLY_COLORS[Math.floor(Math.random() * FIREFLY_COLORS.length)];
  }
  update(time) {
    this.x += this.vx;
    this.y += this.vy;

    // Gentle direction changes for organic movement
    this.dirChangeTimer++;
    if (this.dirChangeTimer > this.dirChangeInterval) {
      this.dirChangeTimer = 0;
      this.vx += (Math.random() - 0.5) * 0.15;
      this.vy += (Math.random() - 0.5) * 0.15;
      // Clamp velocity
      const maxV = 0.3;
      this.vx = Math.max(-maxV, Math.min(maxV, this.vx));
      this.vy = Math.max(-maxV, Math.min(maxV, this.vy));
    }

    // Wrap around
    if (this.x < -20) this.x = canvas.width + 20;
    if (this.x > canvas.width + 20) this.x = -20;
    if (this.y < -20) this.y = canvas.height + 20;
    if (this.y > canvas.height + 20) this.y = -20;

    // Breathing glow: slow sine wave with deeper variation
    const pulse = Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.5 + 0.5;
    this.currentOpacity = this.baseOpacity * (0.3 + pulse * 0.7);
    this.currentSize = this.size * (0.8 + pulse * 0.4);
  }
  draw() {
    const { r, g, b } = this.color;
    const glowSize = this.currentSize * 4;

    // Outer soft glow
    const glow = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, glowSize
    );
    glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${this.currentOpacity * 0.6})`);
    glow.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${this.currentOpacity * 0.15})`);
    glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

    ctx.beginPath();
    ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();

    // Bright core
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.currentSize * 0.6, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.currentOpacity})`;
    ctx.fill();
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

console.log('%c🔮 taomahj personal website ready %c| %c✧ %c%c%c',
  'color: #7c6ff7; font-weight: bold;',
  '', 'color: #00cec9;',
  'color: #e4e4ec;', 'font-size: 12px;');
console.log('%cMouse-following spotlight · Particle canvas · Bilingual · Glassmorphism',
  'color: #9898a8; font-size: 11px;');
