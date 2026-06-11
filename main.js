/* ========================================================
   taomahj — Swiss Modernist · i18n · Knowledge Graph · Reveal
   ======================================================== */

// ==================== Theme Switcher ====================

const themes = ['cyan', 'zinc', 'red', 'rose', 'orange', 'green', 'blue', 'violet'];
const themeNames = {
  cyan: '青色', zinc: '锌灰', red: '红色', rose: '玫瑰',
  orange: '橙色', green: '绿色', blue: '蓝色', violet: '紫罗兰'
};

let currentTheme = localStorage.getItem('theme') || 'cyan';

function applyTheme(theme) {
  if (!themes.includes(theme)) theme = 'cyan';
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  // Update sidebar display
  const dot = document.getElementById('currentThemeDot');
  const name = document.getElementById('currentThemeName');
  const btn = document.querySelector(`.theme-color-btn[data-theme="${theme}"]`);

  if (dot && btn) {
    dot.style.background = btn.style.background;
  }
  if (name) {
    name.textContent = themeNames[theme] || theme;
  }

  // Update active button state
  document.querySelectorAll('.theme-color-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.theme === theme);
  });

  // Update light orbs
  updateLightOrbs();
}

function updateLightOrbs() {
  const style = getComputedStyle(document.documentElement);
  const primary = style.getPropertyValue('--primary').trim();
  const orbs = document.querySelectorAll('.light-orb--1, .light-orb--2');
  orbs.forEach(orb => {
    orb.style.background = `radial-gradient(circle, ${primary}18 0%, transparent 70%)`;
  });
}

function randomTheme() {
  const available = themes.filter(t => t !== currentTheme);
  const next = available[Math.floor(Math.random() * available.length)];
  applyTheme(next);
}

// Initialize theme buttons
document.querySelectorAll('.theme-color-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    applyTheme(btn.dataset.theme);
  });
});

// Shuffle button
document.getElementById('shuffleTheme')?.addEventListener('click', randomTheme);

// Mobile sidebar toggle
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');

function openSidebar() {
  sidebar.classList.add('open');
  sidebarOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  sidebar.classList.remove('open');
  sidebarOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

mobileMenuBtn?.addEventListener('click', openSidebar);
sidebarCloseBtn?.addEventListener('click', closeSidebar);
sidebarOverlay?.addEventListener('click', closeSidebar);

// Apply initial theme
applyTheme(currentTheme);

// ==================== i18n ====================

const i18n = {
  zh: {
    'nav.projects': '项目',
    'nav.knowledge': '知识库',
    'nav.about': '关于',
    'nav.contact': '联系',
    'nav.mixflow': 'MixFlow',
    'nav.perler': 'Perler',
    'nav.chiwu': '持物记录',
    'nav.gallery': '图库',
    'hero.tagline': '数学 × 电路 × 自动化 × 代码',
    'hero.sub': '探索硬件与软件交汇地带的本科生',
    'hero.viewWork': '查看作品',
    'hero.getInTouch': '联系我',
    'projects.title': '项目',
    'projects.desc': '做过和正在探索的事情',
    'projects.mixflow.title': 'MixFlow',
    'projects.mixflow.desc': 'AI 鸡尾酒配方浏览器 — 发现、搜索并收藏你喜欢的饮品。',
    'projects.perler.title': 'Perler Bead',
    'projects.perler.desc': '图片转拼豆风格 — 圆润珠子、网格间隙、塑料光泽，纯本地处理无水印。',
    'projects.chiwu.title': '持物记录',
    'projects.chiwu.desc': '记录长期陪伴你的每一件物品 — 本地优先的物品档案 App，iOS · Android · watchOS。',
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
    'projects.more.desc': '点击展开查看更多项目与工具。',
    'projects.gallery.title': '图库',
    'projects.gallery.desc': '高清壁纸收藏 — 浏览、预览并下载原图。',
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
    'nav.perler': 'Perler',
    'nav.chiwu': 'Chiwu',
    'nav.gallery': 'Gallery',
    'hero.tagline': 'Mathematics × Circuits × Automation × Code',
    'hero.sub': 'Undergraduate exploring the intersection of hardware and software',
    'hero.viewWork': 'View My Work',
    'hero.getInTouch': 'Get In Touch',
    'projects.title': 'Projects',
    'projects.desc': "Things I've built and explored",
    'projects.mixflow.title': 'MixFlow',
    'projects.mixflow.desc': 'AI-powered cocktail recipe browser — discover, search & save your favorite drinks.',
    'projects.perler.title': 'Perler Bead',
    'projects.perler.desc': 'Image-to-Perler-Bead converter — rounded beads, grid gaps, plastic shine. Fully client-side with no watermark.',
    'projects.chiwu.title': '持物记录',
    'projects.chiwu.desc': 'Record every item that accompanies you — a local-first item archive app for iOS, Android & watchOS.',
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
    'projects.more.desc': 'Click to explore more projects and tools.',
    'projects.gallery.title': 'Gallery',
    'projects.gallery.desc': 'HD wallpaper collection — browse, preview and download original images.',
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
    if (dict[key]) el.textContent = dict[key];
  });
  document.documentElement.lang = currentLang;
}

function updateLangToggle() {
  const toggle = document.getElementById('langToggle');
  if (!toggle) return;
  toggle.classList.toggle('lang-zh-active', currentLang === 'zh');
  toggle.classList.toggle('lang-en-active', currentLang === 'en');
}

document.getElementById('langToggle').addEventListener('click', () => {
  switchLang(currentLang === 'zh' ? 'en' : 'zh');
});

applyLang();
updateLangToggle();

// ==================== More Projects Toggle ====================

(function initMoreProjects() {
  const toggle = document.getElementById('moreProjectsToggle');
  const hiddenCards = document.querySelectorAll('.hidden-project');
  const arrowIcon = toggle?.querySelector('.more-arrow-icon');
  const countTag = toggle?.querySelector('.more-count-tag');

  if (!toggle || hiddenCards.length === 0) return;

  let expanded = false;
  let collapseTimer = null;

  function expand() {
    expanded = true;
    if (collapseTimer) { clearTimeout(collapseTimer); collapseTimer = null; }

    hiddenCards.forEach((card, i) => {
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      card.style.opacity = '0';
      card.style.transform = 'translateY(-12px)';
      card.style.pointerEvents = 'none';
      card.classList.remove('visible');

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          card.style.transitionDelay = `${i * 0.08}s`;
          card.classList.add('visible');
        });
      });
    });
    toggle.classList.add('expanded');
    if (arrowIcon) arrowIcon.style.transform = 'rotate(90deg)';
    if (countTag) countTag.textContent = '收起';
  }

  function collapse() {
    expanded = false;
    hiddenCards.forEach((card, i) => {
      card.style.transitionDelay = `${(hiddenCards.length - 1 - i) * 0.06}s`;
      card.classList.remove('visible');
    });
    toggle.classList.remove('expanded');
    if (arrowIcon) arrowIcon.style.transform = 'rotate(0deg)';
    if (countTag) countTag.textContent = '+2';

    collapseTimer = setTimeout(() => {
      if (!expanded) {
        hiddenCards.forEach(card => {
          card.style.display = 'none';
          card.style.opacity = '';
          card.style.transform = '';
          card.style.transitionDelay = '';
        });
      }
    }, 450);
  }

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    expanded ? collapse() : expand();
  });

  toggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      expanded ? collapse() : expand();
    }
  });
})();

// ==================== Scroll Reveal (Intersection Observer) ====================

(function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -30px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

// ==================== Nav Active State ====================

(function initNavActive() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-64px 0px 0px 0px' });

  sections.forEach(s => observer.observe(s));
})();

// ==================== Smooth Scroll ====================

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = 64;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ==================== Knowledge Graph (D3 Force-Directed) ====================

(function initKnowledgeGraph() {
  const container = document.getElementById('knowledge-graph');
  if (!container || typeof d3 === 'undefined') return;

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
    const H = 560;

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
      { id:"agentmemory", group:"memory", label:"AgentMemory", desc:"MCP 记忆系统 — 跨会话持久化记忆", radius:15 },
      { id:"memory-env", group:"memory", label:"Environment", desc:"Development environment configuration", radius:12 },
      { id:"memory-models", group:"memory", label:"Model Config", desc:"AI model configuration settings", radius:12 },
      { id:"creative-skills", group:"skills", label:"Creative Tools", desc:"ASCII art, p5.js, Manim, ComfyUI, Songwriting — 20+ creative skills", radius:14 },
      { id:"productivity-skills", group:"skills", label:"Productivity", desc:"Notion, Gmail, Airtable, Linear, PowerPoint — 10+ office integrations", radius:14 },
      { id:"dev-skills", group:"skills", label:"Dev Skills", desc:"Plan, TDD, Code Review, Debug, Spike — software engineering workflows", radius:14 },
      { id:"research-skills", group:"skills", label:"Research", desc:"arXiv, Polymarket, LLM Wiki, Paper Writing — academic toolkit", radius:13 },
      { id:"ml-skills", group:"skills", label:"ML Ops", desc:"HuggingFace, vLLM, Ollama Models, Obliteratus — ML pipeline", radius:14 },
      { id:"media-skills", group:"skills", label:"Media", desc:"Spotify, YouTube Transcripts, GIF Search, Song Generation", radius:12 },
      { id:"apple-skills", group:"skills", label:"Apple Tools", desc:"Notes, Reminders, iMessage, FindMy — macOS native integration", radius:13 },
      { id:"study-skills", group:"skills", label:"Study", desc:"学习助手 — 仆人模式 · 超级班主任", radius:13 },
      { id:"smart-home", group:"skills", label:"SmartHome", desc:"Philips Hue · OpenHue CLI 控制", radius:12 },
      { id:"gaming-skills", group:"skills", label:"Gaming", desc:"Minecraft Modpack · Pokemon Emulator", radius:12 },
      { id:"email-skills", group:"skills", label:"Email", desc:"Himalaya CLI — IMAP/SMTP 邮件管理", radius:11 },
      { id:"project-mixflow", group:"projects", label:"MixFlow", desc:"AI 鸡尾酒配方浏览器", radius:13 },
      { id:"project-perler", group:"projects", label:"Perler", desc:"图片转拼豆风格转换器", radius:12 },
      { id:"project-chiwu", group:"projects", label:"持物记录", desc:"本地优先物品档案 App", radius:14 },
      { id:"project-gallery", group:"projects", label:"Gallery", desc:"高清壁纸收藏图库", radius:12 },
      { id:"project-website", group:"projects", label:"taomahj.site", desc:"个人网站 v2 — 建筑感重设计", radius:15 },
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
      { source:"agentmemory", target:"hermes-agent", type:"memory" },
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
      { source:"hermes-agent", target:"creative-skills", type:"skills" },
      { source:"hermes-agent", target:"productivity-skills", type:"skills" },
      { source:"hermes-agent", target:"dev-skills", type:"skills" },
      { source:"hermes-agent", target:"research-skills", type:"skills" },
      { source:"hermes-agent", target:"ml-skills", type:"skills" },
      { source:"hermes-agent", target:"media-skills", type:"skills" },
      { source:"hermes-agent", target:"apple-skills", type:"skills" },
      { source:"hermes-agent", target:"study-skills", type:"skills" },
      { source:"hermes-agent", target:"smart-home", type:"skills" },
      { source:"hermes-agent", target:"gaming-skills", type:"skills" },
      { source:"hermes-agent", target:"email-skills", type:"skills" },
      { source:"ml-skills", target:"ollama", type:"depends" },
      { source:"ml-skills", target:"abliteration", type:"contains" },
      { source:"dev-skills", target:"plan", type:"contains" },
      { source:"dev-skills", target:"tdd", type:"contains" },
      { source:"dev-skills", target:"code-review", type:"contains" },
      { source:"dev-skills", target:"debug-py", type:"contains" },
      { source:"research-skills", target:"dspy", type:"feeds" },
      // Projects
      { source:"creative-skills", target:"project-perler", type:"creates" },
      { source:"creative-skills", target:"project-gallery", type:"creates" },
      { source:"dev-skills", target:"project-mixflow", type:"creates" },
      { source:"dev-skills", target:"project-chiwu", type:"creates" },
      { source:"dev-skills", target:"project-website", type:"creates" },
      { source:"productivity-skills", target:"project-chiwu", type:"supports" },
      { source:"ml-skills", target:"project-mixflow", type:"supports" },
      { source:"study-skills", target:"project-website", type:"supports" },
    ];

    // === Group Colors (adapted for light background) ===
    const groupColors = {
      "core-agent":     "#002FA7",
      "orchestration":  "#1A56D8",
      "execution":      "#0D6B3D",
      "quality":        "#7C3AED",
      "github":         "#4A4742",
      "debug":          "#C53030",
      "ml":             "#B13B6B",
      "memory":         "#6B6760",
      "skills":         "#0D7B6B",
      "projects":       "#0A8A7A",
    };

    const groupLabels = {
      "core-agent":     "Core Agents",
      "orchestration":  "Orchestration",
      "execution":      "Execution",
      "quality":        "Quality",
      "github":         "GitHub",
      "debug":          "Debug",
      "ml":             "ML/AI",
      "memory":         "Memory",
      "skills":         "Skills",
      "projects":       "Projects",
    };

    const linkTypes = {
      "delegates":   { dash:"", color:"rgba(0,47,167,0.40)", width:1.5 },
      "invokes":     { dash:"", color:"rgba(0,47,167,0.30)", width:1.2 },
      "workflow":    { dash:"5,5", color:"rgba(26,86,216,0.40)", width:1.3 },
      "core":        { dash:"", color:"rgba(26,86,216,0.60)", width:2 },
      "orchestrates":{ dash:"", color:"rgba(26,86,216,0.50)", width:1.8 },
      "executes":    { dash:"5,5", color:"rgba(26,86,216,0.40)", width:1.5 },
      "quality":     { dash:"3,6", color:"rgba(124,58,237,0.40)", width:1.5 },
      "dispatches":  { dash:"", color:"rgba(13,107,61,0.40)", width:1.5 },
      "produces":    { dash:"", color:"rgba(74,71,66,0.40)", width:1.5 },
      "requires":    { dash:"5,5", color:"rgba(74,71,66,0.30)", width:1.2 },
      "links":       { dash:"8,4", color:"rgba(74,71,66,0.30)", width:1 },
      "feeds":       { dash:"5,5", color:"rgba(197,48,48,0.30)", width:1.2 },
      "depends":     { dash:"5,5", color:"rgba(177,59,107,0.30)", width:1.2 },
      "contains":    { dash:"2,4", color:"rgba(139,94,0,0.40)", width:1 },
      "informs":     { dash:"8,4", color:"rgba(107,103,96,0.30)", width:1 },
      "configures":  { dash:"2,2", color:"rgba(107,103,96,0.30)", width:1.2 },
      "uses":        { dash:"", color:"rgba(0,47,167,0.35)", width:1.4 },
      "manages":     { dash:"4,2", color:"rgba(74,71,66,0.35)", width:1.3 },
      "leads-to":    { dash:"10,4", color:"rgba(197,48,48,0.25)", width:1.1 },
      "research":    { dash:"3,6", color:"rgba(177,59,107,0.30)", width:1.2 },
      "skills":      { dash:"", color:"rgba(13,123,107,0.35)", width:1.3 },
      "memory":      { dash:"2,4", color:"rgba(107,103,96,0.35)", width:1.2 },
      "creates":     { dash:"", color:"rgba(10,138,122,0.40)", width:1.5 },
      "supports":    { dash:"5,5", color:"rgba(10,138,122,0.30)", width:1.2 },
      "companion":   { dash:"3,3", color:"rgba(0,47,167,0.30)", width:1.2 },
    };

    const nodeMap = new Map(nodes.map(n => [n.id, n]));
    links.forEach(l => {
      l.source = nodeMap.get(l.source) || l.source;
      l.target = nodeMap.get(l.target) || l.target;
    });

    // === SVG SETUP ===
    const svg = d3.select("#knowledge-graph").append("svg")
      .attr("width", W).attr("height", H)
      .attr("viewBox", `0 0 ${W} ${H}`);

    const defs = svg.append("defs");

    Object.entries(linkTypes).forEach(([type, style]) => {
      defs.append("marker")
        .attr("id", `arrow-${type}`)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 12).attr("refY", 0)
        .attr("markerWidth", 5).attr("markerHeight", 5)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-4L8,0L0,4")
        .attr("fill", style.color)
        .attr("opacity", 0.5);
    });

    const glowFilter = defs.append("filter")
      .attr("id", "node-glow")
      .attr("x", "-50%").attr("y", "-50%")
      .attr("width", "200%").attr("height", "200%");
    glowFilter.append("feGaussianBlur")
      .attr("stdDeviation", "2.5")
      .attr("result", "blur");
    glowFilter.append("feMerge")
      .selectAll("feMergeNode")
      .data(["blur", "SourceGraphic"])
      .join("feMergeNode")
      .attr("in", d => d);

    const g = svg.append("g");

    svg.call(d3.zoom()
      .scaleExtent([0.4, 3])
      .on("zoom", (e) => g.attr("transform", e.transform))
    );

    const tooltip = d3.select("#knowledge-tooltip");

    const linkG = g.append("g").attr("class","kg-links");
    const link = linkG.selectAll("line")
      .data(links)
      .join("line")
        .attr("stroke", d => linkTypes[d.type]?.color || "rgba(74,71,66,0.15)")
        .attr("stroke-width", d => linkTypes[d.type]?.width || 1)
        .attr("stroke-dasharray", d => linkTypes[d.type]?.dash || "")
        .attr("opacity", 0.30)
        .attr("marker-end", d => `url(#arrow-${d.type})`);

    const glowG = g.append("g").attr("class","kg-glows");
    const glow = glowG.selectAll("circle")
      .data(nodes)
      .join("circle")
        .attr("r", d => d.radius * 2.2)
        .attr("fill", d => groupColors[d.group] || "#6B6760")
        .attr("opacity", 0.06)
        .attr("pointer-events", "none");

    const nodeG = g.append("g").attr("class","kg-nodes");
    const node = nodeG.selectAll("circle")
      .data(nodes)
      .join("circle")
        .attr("r", d => d.radius)
        .attr("fill", d => groupColors[d.group] || "#6B6760")
        .attr("stroke", d => d3.color(groupColors[d.group]||"#6B6760").darker(0.4))
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

      link
        .attr("opacity", l => (l.source.id === d.id || l.target.id === d.id) ? 0.7 : 0.06)
        .attr("stroke-width", l => (l.source.id === d.id || l.target.id === d.id)
          ? (linkTypes[l.type]?.width || 1) * 2
          : (linkTypes[l.type]?.width || 1) * 0.3);

      node
        .attr("opacity", n => (n.id === d.id || links.some(l =>
          (l.source.id === d.id && l.target.id === n.id) ||
          (l.target.id === d.id && l.source.id === n.id)
        )) ? 1 : 0.25);
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

      link
        .attr("opacity", 0.30)
        .attr("stroke-width", l => linkTypes[l.type]?.width || 1);

      node.attr("opacity", 0.9);
    }

    const drag = d3.drag()
      .on("start", (e, d) => {
        if (!e.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x; d.fy = d.y;
      })
      .on("drag", (e, d) => {
        d.fx = e.x; d.fy = e.y;
      })
      .on("end", (e, d) => {
        if (!e.active) simulation.alphaTarget(0);
        d.fx = null; d.fy = null;
      });

    node.call(drag);

    const labelG = g.append("g").attr("class","kg-labels");
    const label = labelG.selectAll("text")
      .data(nodes)
      .join("text")
        .text(d => d.label)
        .attr("font-size", d => Math.max(8, d.radius * 0.5))
        .attr("fill", "#6B6760")
        .attr("text-anchor", "middle")
        .attr("dy", d => d.radius + 12)
        .attr("pointer-events", "none")
        .attr("opacity", 0.65);

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(d => {
        const dists = { "core": 65, "orchestrates": 75, "delegates": 80, "contains": 90, "uses": 85, "depends": 95, "skills": 70, "creates": 80 };
        return dists[d.type] || 110;
      }).strength(d => {
        const strengths = { "core": 0.5, "orchestrates": 0.4, "contains": 0.3, "uses": 0.3, "depends": 0.35, "skills": 0.4, "creates": 0.35 };
        return strengths[d.type] || 0.15;
      }))
      .force("charge", d3.forceManyBody().strength(d => -d.radius * 22))
      .force("center", d3.forceCenter(W/2, H/2))
      .force("collision", d3.forceCollide().radius(d => d.radius + 14))
      .force("x", d3.forceX(W/2).strength(0.03))
      .force("y", d3.forceY(H/2).strength(0.03));

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x).attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x).attr("y2", d => d.target.y);
      node.attr("cx", d => d.x).attr("cy", d => d.y);
      glow.attr("cx", d => d.x).attr("cy", d => d.y);
      label.attr("x", d => d.x).attr("y", d => d.y);
    });

    simulation.alpha(0.5).restart();
    setTimeout(() => simulation.alphaTarget(0).alphaDecay(0.02), 3000);

    // === LEGEND ===
    const legendEl = d3.select("#knowledge-legend");
    legendEl.html('');
    Object.entries(groupLabels).forEach(([key, lbl]) => {
      legendEl.append("div").attr("class","kg-legend-item")
        .html(`<div class="kg-legend-dot" style="background:${groupColors[key]};box-shadow:0 0 5px ${groupColors[key]}40"></div> ${lbl}`);
    });
  }
})();
