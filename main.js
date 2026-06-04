/* ========================================================
   Personal Website — taomahj
   Spotlight Cursor · Particles · i18n · Scroll Animations
   ======================================================== */

// ==================== i18n ====================

const i18n = {
  zh: {
    'nav.projects': '项目',
    'nav.knowledge': '知识库',
    'nav.about': '关于',
    'nav.contact': '联系',
    'nav.mixflow': 'MixFlow',
    'nav.pixel': 'Pixel',
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
    'projects.mixflow.title': '🍸 MixFlow',
    'projects.mixflow.desc': 'AI 鸡尾酒配方浏览器 — 发现、搜索并收藏你喜欢的饮品。',
    'projects.pixel.title': '🎨 Pixel Art',
    'projects.pixel.desc': '图片转像素画工具 — 支持 NES/Game Boy/PICO-8 等复古调色板，纯本地处理无水印。',
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
    'knowledge.title': '知识图谱',
    'knowledge.desc': '我的 Hermes AI 生态系统 — 技能、智能体、记忆与工作流',
    'footer.built': '用好奇心构建',
  },
  en: {
    'nav.projects': 'Projects',
    'nav.knowledge': 'Knowledge',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.mixflow': 'MixFlow',
    'nav.pixel': 'Pixel',
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
    'projects.mixflow.title': '🍸 MixFlow',
    'projects.mixflow.desc': 'AI-powered cocktail recipe browser — discover, search & save your favorite drinks.',
    'projects.pixel.title': '🎨 Pixel Art',
    'projects.pixel.desc': 'Image-to-pixel-art converter — supports NES/Game Boy/PICO-8 retro palettes, fully client-side with no watermark.',
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
    'knowledge.title': 'Knowledge Graph',
    'knowledge.desc': 'My Hermes AI ecosystem — skills, agents, memory & workflows',
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

// ==================== Security Hardening ====================

// Disable console logging in production
if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
  // Override console methods to prevent info leakage
  const noop = () => {};
  console.log = noop;
  console.info = noop;
  console.warn = noop;
  console.debug = noop;
}

// Prevent clickjacking: ensure we're not in an iframe
if (window.top !== window.self) {
  window.top.location = window.self.location;
}

// Disable right-click on avatar to prevent easy image theft
document.querySelector('.avatar')?.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

// ==================== Contact Link Placeholder ====================

// These are interfaces — update href when ready
// GitHub: update href in HTML or set here
// Social: update href in HTML or set here

// ==================== Knowledge Graph (D3 Force-Directed) ====================

(function initKnowledgeGraph() {
  const container = document.getElementById('knowledge-graph');
  if (!container || typeof d3 === 'undefined') return;

  // Check if section is visible before initializing
  const section = document.getElementById('knowledge');
  let initialized = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !initialized) {
        initialized = true;
        renderGraph();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(section);

  function renderGraph() {
    const rect = container.getBoundingClientRect();
    const W = rect.width || container.offsetWidth || 800;
    const H = 600;

    // === NODES ===
    const nodes = [
      { id:"hermes-agent", group:"orchestration", label:"Hermes Agent", desc:"Central orchestrator — config, extend, delegate, tools", radius:22 },
      { id:"claude-code", group:"core-agent", label:"Claude Code", desc:"Delegate coding to Claude Code CLI", radius:16 },
      { id:"codex", group:"core-agent", label:"Codex CLI", desc:"Delegate coding to OpenAI Codex CLI", radius:15 },
      { id:"local-agent", group:"core-agent", label:"Local Agent", desc:"调用本地 Ollama 模型执行任务", radius:14 },
      { id:"plan", group:"orchestration", label:"Plan", desc:"Write markdown plan to .hermes/plans/", radius:13 },
      { id:"subagent-dev", group:"orchestration", label:"Subagent Dev", desc:"Execute plans via delegate_task", radius:15 },
      { id:"kanban", group:"orchestration", label:"Kanban", desc:"Decomposition playbook, route work", radius:14 },
      { id:"tdd", group:"execution", label:"TDD", desc:"RED-GREEN-REFACTOR", radius:12 },
      { id:"code-review", group:"quality", label:"Code Review", desc:"Security scan, quality gates", radius:13 },
      { id:"github-pr", group:"github", label:"GitHub PR", desc:"Branch, commit, open, CI, merge", radius:15 },
      { id:"github-issues", group:"github", label:"GitHub Issues", desc:"Create, triage, label, assign", radius:12 },
      { id:"debug-py", group:"debug", label:"Python Debug", desc:"pdb REPL + debugpy remote", radius:11 },
      { id:"dspy", group:"ml", label:"DSPy", desc:"Declarative LM programs, RAG", radius:13 },
      { id:"ollama", group:"ml", label:"Ollama", desc:"Custom Modelfiles for local models", radius:15 },
      { id:"abliteration", group:"ml", label:"Abliteration", desc:"Download→obliterate→GGUF→deploy", radius:13 },
      { id:"profile-default", group:"profile", label:"Default Profile", desc:"Main profile — all skills active", radius:16 },
      { id:"memory-env", group:"memory", label:"Environment", desc:"M5 Pro 64GB, macOS, Python 3.14", radius:12 },
      { id:"memory-models", group:"memory", label:"Model Config", desc:"DeepSeek v4 Pro, api_key config", radius:12 },
      // === Skill Categories ===
      { id:"creative-skills", group:"skills", label:"Creative Tools", desc:"ASCII art, p5.js, Manim, ComfyUI, Songwriting — 20+ creative skills", radius:14 },
      { id:"productivity-skills", group:"skills", label:"Productivity", desc:"Notion, Gmail, Airtable, Linear, PowerPoint — 10+ office integrations", radius:14 },
      { id:"dev-skills", group:"skills", label:"Dev Skills", desc:"Plan, TDD, Code Review, Debug, Spike — software engineering workflows", radius:14 },
      { id:"research-skills", group:"skills", label:"Research", desc:"arXiv, Polymarket, LLM Wiki, Paper Writing — academic toolkit", radius:13 },
      { id:"ml-skills", group:"skills", label:"ML Ops", desc:"HuggingFace, vLLM, Ollama Models, Obliteratus — ML pipeline", radius:14 },
      { id:"media-skills", group:"skills", label:"Media", desc:"Spotify, YouTube Transcripts, GIF Search, Song Generation", radius:12 },
      { id:"apple-skills", group:"skills", label:"Apple Tools", desc:"Notes, Reminders, iMessage, FindMy — macOS native integration", radius:13 },
      { id:"social-skills", group:"skills", label:"Social", desc:"X/Twitter via xurl — post, search, DM, media", radius:11 },
      // === OpenCode Agent System ===
      { id:"opencode", group:"opencode", label:"OpenCode", desc:"Provider-agnostic coding agent — TUI+CLI, multi-agent, skills ecosystem", radius:17 },
      { id:"oc-build", group:"opencode", label:"OC Build", desc:"Full execution: read, edit, bash, web — implements features", radius:13 },
      { id:"oc-plan", group:"opencode", label:"OC Plan", desc:"Read-only planner: analyzes, writes .opencode/plans/*.md", radius:12 },
      { id:"oc-explore", group:"opencode", label:"OC Explore", desc:"Codebase exploration: grep, glob, list, bash, web", radius:11 },
    ];

    // === LINKS ===
    const links = [
      { source:"hermes-agent", target:"claude-code", type:"delegates" },
      { source:"hermes-agent", target:"codex", type:"delegates" },
      { source:"hermes-agent", target:"local-agent", type:"invokes" },
      { source:"hermes-agent", target:"plan", type:"workflow" },
      { source:"hermes-agent", target:"subagent-dev", type:"core" },
      { source:"hermes-agent", target:"kanban", type:"orchestrates" },
      { source:"plan", target:"subagent-dev", type:"executes" },
      { source:"subagent-dev", target:"tdd", type:"quality" },
      { source:"subagent-dev", target:"code-review", type:"quality" },
      { source:"kanban", target:"subagent-dev", type:"dispatches" },
      { source:"claude-code", target:"github-pr", type:"produces" },
      { source:"codex", target:"github-pr", type:"produces" },
      { source:"github-pr", target:"code-review", type:"requires" },
      { source:"github-pr", target:"github-issues", type:"links" },
      { source:"code-review", target:"debug-py", type:"feeds" },
      { source:"local-agent", target:"ollama", type:"depends" },
      { source:"abliteration", target:"ollama", type:"produces" },
      { source:"dspy", target:"ollama", type:"optimizes" },
      { source:"profile-default", target:"hermes-agent", type:"contains" },
      { source:"profile-default", target:"claude-code", type:"contains" },
      { source:"memory-env", target:"hermes-agent", type:"informs" },
      { source:"memory-models", target:"ollama", type:"configures" },
      { source:"hermes-agent", target:"debug-py", type:"uses" },
      { source:"hermes-agent", target:"github-issues", type:"manages" },
      { source:"hermes-agent", target:"dspy", type:"uses" },
      { source:"hermes-agent", target:"ollama", type:"depends" },
      { source:"hermes-agent", target:"abliteration", type:"uses" },
      { source:"code-review", target:"github-issues", type:"feeds" },
      { source:"tdd", target:"debug-py", type:"leads-to" },
      { source:"plan", target:"kanban", type:"feeds" },
      { source:"abliteration", target:"dspy", type:"research" },
      { source:"memory-env", target:"local-agent", type:"informs" },
      { source:"memory-models", target:"hermes-agent", type:"configures" },
      { source:"codex", target:"code-review", type:"requires" },
      { source:"profile-default", target:"codex", type:"contains" },
      { source:"profile-default", target:"local-agent", type:"contains" },
      { source:"profile-default", target:"ollama", type:"contains" },
      // === Skill Category Links ===
      { source:"hermes-agent", target:"creative-skills", type:"skills" },
      { source:"hermes-agent", target:"productivity-skills", type:"skills" },
      { source:"hermes-agent", target:"dev-skills", type:"skills" },
      { source:"hermes-agent", target:"research-skills", type:"skills" },
      { source:"hermes-agent", target:"ml-skills", type:"skills" },
      { source:"hermes-agent", target:"media-skills", type:"skills" },
      { source:"hermes-agent", target:"apple-skills", type:"skills" },
      { source:"hermes-agent", target:"social-skills", type:"skills" },
      { source:"profile-default", target:"creative-skills", type:"contains" },
      { source:"profile-default", target:"dev-skills", type:"contains" },
      { source:"profile-default", target:"ml-skills", type:"contains" },
      { source:"ml-skills", target:"ollama", type:"depends" },
      { source:"ml-skills", target:"abliteration", type:"contains" },
      { source:"dev-skills", target:"plan", type:"contains" },
      { source:"dev-skills", target:"tdd", type:"contains" },
      { source:"dev-skills", target:"code-review", type:"contains" },
      { source:"dev-skills", target:"debug-py", type:"contains" },
      { source:"research-skills", target:"dspy", type:"feeds" },
      // === OpenCode Agent Links ===
      { source:"hermes-agent", target:"opencode", type:"delegates" },
      { source:"opencode", target:"oc-build", type:"core" },
      { source:"opencode", target:"oc-plan", type:"workflow" },
      { source:"opencode", target:"oc-explore", type:"delegates" },
      { source:"oc-plan", target:"oc-build", type:"executes" },
      { source:"oc-build", target:"github-pr", type:"produces" },
      { source:"oc-build", target:"code-review", type:"requires" },
      { source:"oc-explore", target:"oc-build", type:"feeds" },
      { source:"profile-default", target:"opencode", type:"contains" },
      { source:"opencode", target:"claude-code", type:"related" },
      { source:"opencode", target:"codex", type:"related" },
    ];

    // === COLOR MAP (matches site blue-orange theme) ===
    const groupColors = {
      "core-agent":     "#3b82f6",
      "orchestration":  "#f97316",
      "execution":      "#22c55e",
      "quality":        "#a855f7",
      "github":         "#64748b",
      "debug":          "#ef4444",
      "ml":             "#ec4899",
      "profile":        "#f59e0b",
      "memory":         "#e2e8f0",
      "skills":         "#14b8a6",
      "opencode":       "#06b6d4",
    };

    const groupLabels = {
      "core-agent":     "Core Agents",
      "orchestration":  "Orchestration",
      "execution":      "Execution",
      "quality":        "Quality",
      "github":         "GitHub",
      "debug":          "Debug",
      "ml":             "ML/AI",
      "profile":        "Profiles",
      "memory":         "Memory",
      "skills":         "Skills",
      "opencode":       "OpenCode",
    };

    const linkTypes = {
      "delegates":  { dash:"", color:"rgba(59,130,246,0.5)", width:1.5 },
      "invokes":    { dash:"", color:"rgba(59,130,246,0.4)", width:1.2 },
      "workflow":   { dash:"5,5", color:"rgba(249,115,22,0.5)", width:1.3 },
      "core":       { dash:"", color:"rgba(249,115,22,0.7)", width:2 },
      "orchestrates":{ dash:"", color:"rgba(249,115,22,0.6)", width:1.8 },
      "executes":   { dash:"5,5", color:"rgba(249,115,22,0.5)", width:1.5 },
      "quality":    { dash:"3,6", color:"rgba(168,85,247,0.5)", width:1.5 },
      "dispatches": { dash:"", color:"rgba(34,197,94,0.5)", width:1.5 },
      "produces":   { dash:"", color:"rgba(100,116,139,0.5)", width:1.5 },
      "requires":   { dash:"5,5", color:"rgba(100,116,139,0.4)", width:1.2 },
      "links":      { dash:"8,4", color:"rgba(100,116,139,0.4)", width:1 },
      "feeds":      { dash:"5,5", color:"rgba(239,68,68,0.4)", width:1.2 },
      "depends":    { dash:"5,5", color:"rgba(236,72,153,0.4)", width:1.2 },
      "contains":   { dash:"2,4", color:"rgba(245,158,11,0.5)", width:1 },
      "informs":    { dash:"8,4", color:"rgba(226,232,240,0.4)", width:1 },
      "configures": { dash:"2,2", color:"rgba(226,232,240,0.4)", width:1.2 },
      "uses":        { dash:"", color:"rgba(59,130,246,0.45)", width:1.4 },
      "manages":     { dash:"4,2", color:"rgba(100,116,139,0.45)", width:1.3 },
      "leads-to":    { dash:"10,4", color:"rgba(239,68,68,0.35)", width:1.1 },
      "research":    { dash:"3,6", color:"rgba(236,72,153,0.4)", width:1.2 },
      "skills":      { dash:"", color:"rgba(20,184,166,0.45)", width:1.3 },
      "related":     { dash:"2,6", color:"rgba(6,182,212,0.4)", width:1.1 },
    };

    // Resolve source/target to node refs
    const nodeMap = new Map(nodes.map(n => [n.id, n]));
    links.forEach(l => {
      l.source = nodeMap.get(l.source) || l.source;
      l.target = nodeMap.get(l.target) || l.target;
    });

    // === SVG SETUP ===
    const svg = d3.select("#knowledge-graph").append("svg")
      .attr("width", W).attr("height", H)
      .attr("viewBox", `0 0 ${W} ${H}`);

    // === DEFS: arrow markers & glow filters ===
    const defs = svg.append("defs");

    // Arrow markers per link type
    Object.entries(linkTypes).forEach(([type, style]) => {
      defs.append("marker")
        .attr("id", `arrow-${type}`)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 12)
        .attr("refY", 0)
        .attr("markerWidth", 5)
        .attr("markerHeight", 5)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-4L8,0L0,4")
        .attr("fill", style.color)
        .attr("opacity", 0.6);
    });

    // Glow filter for nodes
    const glowFilter = defs.append("filter")
      .attr("id", "node-glow")
      .attr("x", "-50%").attr("y", "-50%")
      .attr("width", "200%").attr("height", "200%");
    glowFilter.append("feGaussianBlur")
      .attr("stdDeviation", "3")
      .attr("result", "blur");
    glowFilter.append("feMerge")
      .selectAll("feMergeNode")
      .data(["blur", "SourceGraphic"])
      .join("feMergeNode")
      .attr("in", d => d);

    const g = svg.append("g");

    // Zoom
    svg.call(d3.zoom()
      .scaleExtent([0.4, 3])
      .on("zoom", (e) => g.attr("transform", e.transform))
    );

    // Tooltip
    const tooltip = d3.select("#knowledge-tooltip");

    // === LINKS ===
    const linkG = g.append("g").attr("class","kg-links");
    const link = linkG.selectAll("line")
      .data(links)
      .join("line")
        .attr("stroke", d => linkTypes[d.type]?.color || "rgba(255,255,255,0.15)")
        .attr("stroke-width", d => linkTypes[d.type]?.width || 1)
        .attr("stroke-dasharray", d => linkTypes[d.type]?.dash || "")
        .attr("opacity", 0.35)
        .attr("marker-end", d => `url(#arrow-${d.type})`);

    // === NODE GLOW (background circles) ===
    const glowG = g.append("g").attr("class","kg-glows");
    const glow = glowG.selectAll("circle")
      .data(nodes)
      .join("circle")
        .attr("r", d => d.radius * 2.5)
        .attr("fill", d => groupColors[d.group] || "#666")
        .attr("opacity", 0.08)
        .attr("pointer-events", "none");

    // === NODES ===
    const nodeG = g.append("g").attr("class","kg-nodes");
    const node = nodeG.selectAll("circle")
      .data(nodes)
      .join("circle")
        .attr("r", d => d.radius)
        .attr("fill", d => groupColors[d.group] || "#666")
        .attr("stroke", d => d3.color(groupColors[d.group]||"#666").brighter(0.8))
        .attr("stroke-width", 1.5)
        .attr("opacity", 0.9)
        .attr("cursor", "pointer")
        .attr("filter", "url(#node-glow)")
        .on("mouseenter", onNodeEnter)
        .on("mousemove", onNodeMove)
        .on("mouseleave", onNodeLeave);

    function onNodeEnter(e, d) {
      tooltip.style("opacity", 1)
        .html(`<div class="kg-tooltip-name" style="color:${groupColors[d.group]}">${d.label}</div>
               <div class="kg-tooltip-category">${groupLabels[d.group]||d.group}</div>
               <div class="kg-tooltip-desc">${d.desc}</div>`);
      d3.select(e.target)
        .attr("stroke-width", 3)
        .attr("opacity", 1)
        .attr("r", d.radius * 1.3)
        .transition().duration(200);

      // Highlight connected links
      link
        .attr("opacity", l => (l.source.id === d.id || l.target.id === d.id) ? 0.8 : 0.08)
        .attr("stroke-width", l => (l.source.id === d.id || l.target.id === d.id)
          ? (linkTypes[l.type]?.width || 1) * 2
          : (linkTypes[l.type]?.width || 1) * 0.4);

      // Highlight connected nodes
      node
        .attr("opacity", n => (n.id === d.id || links.some(l =>
          (l.source.id === d.id && l.target.id === n.id) ||
          (l.target.id === d.id && l.source.id === n.id)
        )) ? 1 : 0.3);
    }

    function onNodeMove(e) {
      const wrapper = document.querySelector('.knowledge-graph-wrapper');
      const wrapRect = wrapper.getBoundingClientRect();
      tooltip
        .style("left", (e.clientX - wrapRect.left + 12) + "px")
        .style("top", (e.clientY - wrapRect.top - 12) + "px");
    }

    function onNodeLeave(e, d) {
      tooltip.style("opacity", 0);
      d3.select(e.target)
        .attr("stroke-width", 1.5)
        .attr("opacity", 0.9)
        .attr("r", d.radius)
        .transition().duration(200);

      // Restore all links
      link
        .attr("opacity", 0.35)
        .attr("stroke-width", l => linkTypes[l.type]?.width || 1);

      // Restore all nodes
      node.attr("opacity", 0.9);
    }

    // === DRAG ===
    const drag = d3.drag()
      .on("start", (e, d) => {
        if (!e.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (e, d) => {
        d.fx = e.x;
        d.fy = e.y;
      })
      .on("end", (e, d) => {
        if (!e.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    node.call(drag);

    // === LABELS ===
    const labelG = g.append("g").attr("class","kg-labels");
    const label = labelG.selectAll("text")
      .data(nodes)
      .join("text")
        .text(d => d.label)
        .attr("font-size", d => Math.max(8, d.radius * 0.5))
        .attr("fill", "#a1a1aa")
        .attr("text-anchor", "middle")
        .attr("dy", d => d.radius + 12)
        .attr("pointer-events", "none")
        .attr("opacity", 0.7);

    // === FORCE ===
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(d => {
        const dists = { "core": 65, "orchestrates": 75, "delegates": 80, "contains": 90, "uses": 85, "depends": 95 };
        return dists[d.type] || 110;
      }).strength(d => {
        const strengths = { "core": 0.5, "orchestrates": 0.4, "contains": 0.3, "uses": 0.3, "depends": 0.35 };
        return strengths[d.type] || 0.15;
      }))
      .force("charge", d3.forceManyBody().strength(d => -d.radius * 22))
      .force("center", d3.forceCenter(W/2, H/2))
      .force("collision", d3.forceCollide().radius(d => d.radius + 14))
      .force("x", d3.forceX(W/2).strength(0.03))
      .force("y", d3.forceY(H/2).strength(0.03));

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
      glow
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
      label
        .attr("x", d => d.x)
        .attr("y", d => d.y);
    });

    simulation.alpha(0.5).restart();
    setTimeout(() => simulation.alphaTarget(0).alphaDecay(0.02), 3000);

    // === LEGEND ===
    const legendEl = d3.select("#knowledge-legend");
    Object.entries(groupLabels).forEach(([key, lbl]) => {
      legendEl.append("div").attr("class","kg-legend-item")
        .html(`<div class="kg-legend-dot" style="background:${groupColors[key]};box-shadow:0 0 6px ${groupColors[key]}"></div> ${lbl}`);
    });
  }
})();

console.log('%c🔮 taomahj personal website ready %c| %c✧ %c%c%c',
  'color: #7c6ff7; font-weight: bold;',
  '', 'color: #00cec9;',
  'color: #e4e4ec;', 'font-size: 12px;');
console.log('%cMouse-following spotlight · Particle canvas · Bilingual · Glassmorphism · Knowledge Graph',
  'color: #9898a8; font-size: 11px;');
