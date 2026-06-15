/* ============================================================
   taomahj — Portfolio interactions, i18n, theme, knowledge graph
   ============================================================ */

const themes = ['classic', 'bauhaus', 'modern', 'warm', 'concrete'];
let currentTheme = localStorage.getItem('theme') || 'classic';
let currentLang = localStorage.getItem('lang') || 'zh';

const i18n = {
  zh: {
    'nav.projects': '作品',
    'nav.about': '关于',
    'nav.knowledge': '生态',
    'nav.contact': '联系',

    'hero.issue': 'Portfolio / 2026',
    'hero.place': '自动化本科 · AI 方向',
    'hero.featuredLabel': '主打作品',
    'hero.title': 'taomahj',
    'hero.lede': '一个作品集入口：把 Web 应用、AI 工作流和硬件思维，整理成可以直接打开体验的小工具。',
    'hero.openFeatured': '打开 MixFlow',
    'hero.viewIndex': '浏览作品索引',
    'hero.featuredDesc': 'AI 鸡尾酒配方浏览器，支持搜索、发现和收藏饮品。',

    'projects.kicker': 'Project index',
    'projects.title': '作品索引',
    'projects.desc': '从可玩的 Web 应用到本地优先产品页，这里按“能打开、能使用、能理解”的标准组织。',
    'projects.openCase': '查看项目',
    'projects.mixflow.title': 'MixFlow',
    'projects.mixflow.desc': 'AI 鸡尾酒配方浏览器，用搜索、分类和收藏把配方数据变成轻量好用的饮品探索工具。',
    'projects.perler.title': 'Perler Bead',
    'projects.perler.desc': '图片转拼豆风格：圆润珠子、网格间隙、塑料光泽，纯本地处理。',
    'projects.chiwu.title': '持物记录',
    'projects.chiwu.desc': '记录长期陪伴你的每一件物品，本地优先的物品档案 App 产品页。',
    'projects.gallery.title': 'Gallery',
    'projects.gallery.desc': '高清壁纸收藏：manifest 驱动的浏览、预览和原图下载体验。',

    'about.kicker': 'About',
    'about.title': '用工程方法做有质感的小工具。',
    'about.body': '我关注硬件与软件交汇的地方：控制、自动化、AI 工具链，以及能在浏览器里直接使用的轻量产品。',
    'about.capabilityBuild': '构建',
    'about.capabilityBuildText': 'Web 应用、产品展示页和本地优先的小工具。',
    'about.capabilitySystems': '系统',
    'about.capabilitySystemsText': '自动化、电路、控制系统和 Linux 工作流。',
    'about.capabilityAI': 'AI',
    'about.capabilityAIText': 'Ollama、智能体、记忆系统和实用的 AI 辅助开发。',

    'knowledge.kicker': 'AI workflow',
    'knowledge.title': 'Tooling Ecosystem',
    'knowledge.desc': '一个靠后的互动附加层：展示我的 Hermes AI 生态、智能体、记忆、技能和项目之间的关系。',

    'contact.kicker': 'Contact',
    'contact.title': '一起聊点有趣的东西。',
    'footer.built': '用好奇心构建',
  },
  en: {
    'nav.projects': 'Works',
    'nav.about': 'About',
    'nav.knowledge': 'Ecosystem',
    'nav.contact': 'Contact',

    'hero.issue': 'Portfolio / 2026',
    'hero.place': 'Automation undergraduate · AI direction',
    'hero.featuredLabel': 'Featured work',
    'hero.title': 'taomahj',
    'hero.lede': 'A portfolio gateway for web apps, AI workflows, and hardware-minded ideas shaped into small tools you can open and try.',
    'hero.openFeatured': 'Open MixFlow',
    'hero.viewIndex': 'Browse project index',
    'hero.featuredDesc': 'AI cocktail recipe browser with search, discovery, and saved drinks.',

    'projects.kicker': 'Project index',
    'projects.title': 'Works Index',
    'projects.desc': 'Playable web apps, local-first product pages, and small tools organized around what visitors can open, use, and understand.',
    'projects.openCase': 'View project',
    'projects.mixflow.title': 'MixFlow',
    'projects.mixflow.desc': 'An AI cocktail recipe browser that turns recipe data into a light discovery tool with search, categories, and saved drinks.',
    'projects.perler.title': 'Perler Bead',
    'projects.perler.desc': 'Image-to-Perler-Bead converter with rounded beads, grid gaps, plastic shine, and fully local processing.',
    'projects.chiwu.title': '持物记录',
    'projects.chiwu.desc': 'A local-first item archive app product page for recording the objects that stay with you over time.',
    'projects.gallery.title': 'Gallery',
    'projects.gallery.desc': 'A manifest-driven wallpaper collection for browsing, previewing, and downloading original images.',

    'about.kicker': 'About',
    'about.title': 'Building polished small tools with engineering habits.',
    'about.body': 'I work around the overlap between hardware and software: control, automation, AI tooling, and lightweight products that run directly in the browser.',
    'about.capabilityBuild': 'Build',
    'about.capabilityBuildText': 'Web apps, product pages, and local-first utilities.',
    'about.capabilitySystems': 'Systems',
    'about.capabilitySystemsText': 'Automation, circuits, control systems, and Linux workflows.',
    'about.capabilityAI': 'AI',
    'about.capabilityAIText': 'Ollama, agents, memory, and practical AI-assisted development.',

    'knowledge.kicker': 'AI workflow',
    'knowledge.title': 'Tooling Ecosystem',
    'knowledge.desc': 'A later interactive layer showing how my Hermes AI ecosystem, agents, memory, skills, and projects connect.',

    'contact.kicker': 'Contact',
    'contact.title': 'Let’s talk about interesting things.',
    'footer.built': 'Built with curiosity',
  }
};

function applyTheme(theme) {
  const nextTheme = themes.includes(theme) ? theme : 'classic';
  currentTheme = nextTheme;
  document.documentElement.setAttribute('data-theme', nextTheme);
  localStorage.setItem('theme', nextTheme);

  document.querySelectorAll('.theme-color-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.theme === nextTheme);
  });
}

function randomTheme() {
  const choices = themes.filter((theme) => theme !== currentTheme);
  applyTheme(choices[Math.floor(Math.random() * choices.length)]);
}

function applyLang() {
  const dict = i18n[currentLang] || i18n.zh;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  document.documentElement.lang = currentLang;
}

function updateLangToggle() {
  document.querySelectorAll('.lang-toggle').forEach((toggle) => {
    toggle.classList.toggle('lang-zh-active', currentLang === 'zh');
    toggle.classList.toggle('lang-en-active', currentLang === 'en');
  });
}

function switchLang(lang) {
  currentLang = lang === 'en' ? 'en' : 'zh';
  localStorage.setItem('lang', currentLang);
  applyLang();
  updateLangToggle();
}

function initThemeControls() {
  const themePanel = document.getElementById('themePanel');
  const themeToggle = document.getElementById('themeToggle');

  themeToggle?.addEventListener('click', (event) => {
    event.stopPropagation();
    themePanel?.classList.toggle('active');
  });

  document.addEventListener('click', (event) => {
    if (!themePanel?.contains(event.target) && !themeToggle?.contains(event.target)) {
      themePanel?.classList.remove('active');
    }
  });

  document.querySelectorAll('.theme-color-btn').forEach((btn) => {
    btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
  });

  document.getElementById('shuffleTheme')?.addEventListener('click', randomTheme);
  applyTheme(currentTheme);
}

function initMobileNav() {
  const overlay = document.getElementById('mobileNavOverlay');
  const openButton = document.getElementById('mobileMenuBtn');
  const closeButton = document.getElementById('mobileNavClose');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  function open() {
    overlay?.classList.add('active');
    overlay?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay?.classList.remove('active');
    overlay?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openButton?.addEventListener('click', open);
  closeButton?.addEventListener('click', close);
  overlay?.addEventListener('click', (event) => {
    if (event.target === overlay) close();
  });
  navLinks.forEach((link) => link.addEventListener('click', close));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });
}

function initLanguageControls() {
  document.getElementById('langToggle')?.addEventListener('click', () => {
    switchLang(currentLang === 'zh' ? 'en' : 'zh');
  });
  document.getElementById('mobileLangToggle')?.addEventListener('click', () => {
    switchLang(currentLang === 'zh' ? 'en' : 'zh');
  });
  switchLang(currentLang);
}

function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    targets.forEach((target) => target.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

  targets.forEach((target) => observer.observe(target));
}

function initNavActive() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link[href^="#"]');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { threshold: 0.32, rootMargin: '-64px 0px -42% 0px' });

  sections.forEach((section) => observer.observe(section));
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

function initKnowledgeGraph() {
  const container = document.getElementById('knowledge-graph');
  const section = document.getElementById('knowledge');
  if (!container || !section) return;

  let initialized = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !initialized) {
        initialized = true;
        if (typeof d3 === 'undefined') {
          renderStaticKnowledgeGraph(container);
        } else {
          renderKnowledgeGraph(container);
        }
        observer.disconnect();
      }
    });
  }, { threshold: 0.14 });

  observer.observe(section);
}

function renderStaticKnowledgeGraph(container) {
  const rect = container.getBoundingClientRect();
  const width = Math.max(320, rect.width || container.offsetWidth || 800);
  const height = width < 560 ? 360 : 480;
  const svgNS = 'http://www.w3.org/2000/svg';
  const nodes = [
    { label: 'Hermes', group: 'Orchestration', x: 0.5, y: 0.18, color: '#204b88' },
    { label: 'Codex', group: 'Agent', x: 0.25, y: 0.38, color: '#c9382a' },
    { label: 'Skills', group: 'Skills', x: 0.75, y: 0.38, color: '#006a7a' },
    { label: 'Memory', group: 'Memory', x: 0.5, y: 0.52, color: '#62645d' },
    { label: 'Ollama', group: 'AI/ML', x: 0.25, y: 0.72, color: '#7b4aa0' },
    { label: 'Projects', group: 'Projects', x: 0.75, y: 0.72, color: '#2f6b4f' },
  ];
  const links = [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 4],
    [2, 5],
    [3, 5],
  ];

  container.innerHTML = '';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Static tooling ecosystem graph');

  links.forEach(([sourceIndex, targetIndex]) => {
    const source = nodes[sourceIndex];
    const target = nodes[targetIndex];
    const line = document.createElementNS(svgNS, 'line');
    line.setAttribute('x1', source.x * width);
    line.setAttribute('y1', source.y * height);
    line.setAttribute('x2', target.x * width);
    line.setAttribute('y2', target.y * height);
    line.setAttribute('stroke', 'rgba(21,21,21,0.26)');
    line.setAttribute('stroke-width', '1.5');
    svg.appendChild(line);
  });

  nodes.forEach((node) => {
    const group = document.createElementNS(svgNS, 'g');
    const x = node.x * width;
    const y = node.y * height;

    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', width < 560 ? 18 : 24);
    circle.setAttribute('fill', node.color);
    circle.setAttribute('stroke', '#fff');
    circle.setAttribute('stroke-width', '2');
    group.appendChild(circle);

    const label = document.createElementNS(svgNS, 'text');
    label.setAttribute('x', x);
    label.setAttribute('y', y + (width < 560 ? 36 : 44));
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('font-family', 'Inter, sans-serif');
    label.setAttribute('font-size', width < 560 ? '12' : '14');
    label.setAttribute('font-weight', '700');
    label.setAttribute('fill', '#4b4b46');
    label.textContent = node.label;
    group.appendChild(label);

    svg.appendChild(group);
  });

  container.appendChild(svg);

  const legend = document.getElementById('knowledge-legend');
  if (!legend) return;
  legend.innerHTML = '';
  nodes.forEach((node) => {
    const item = document.createElement('div');
    item.className = 'knowledge-legend-item';
    const dot = document.createElement('span');
    dot.className = 'knowledge-legend-dot';
    dot.style.background = node.color;
    item.appendChild(dot);
    item.appendChild(document.createTextNode(node.group));
    legend.appendChild(item);
  });
}

function renderKnowledgeGraph(container) {
  const rect = container.getBoundingClientRect();
  const width = Math.max(320, rect.width || container.offsetWidth || 800);
  const height = width < 560 ? 360 : 480;

  container.innerHTML = '';

  const nodes = [
    { id: 'hermes', group: 'orchestration', label: 'Hermes', desc: 'Personal AI workflow layer for planning, delegation, tools, and memory.', radius: 24 },
    { id: 'codex', group: 'agent', label: 'Codex', desc: 'Coding, review, local implementation, and browser verification.', radius: 18 },
    { id: 'local-agent', group: 'agent', label: 'Local Agent', desc: 'Ollama-backed local task execution and experiments.', radius: 16 },
    { id: 'memory', group: 'memory', label: 'Memory', desc: 'Long-running project context across sessions.', radius: 16 },
    { id: 'skills', group: 'skills', label: 'Skills', desc: 'Reusable workflows for research, coding, documents, media, and automation.', radius: 18 },
    { id: 'review', group: 'quality', label: 'Review', desc: 'Quality gates, security checks, and implementation feedback.', radius: 15 },
    { id: 'github', group: 'quality', label: 'GitHub', desc: 'Branches, PRs, issues, CI, and release flow.', radius: 15 },
    { id: 'ollama', group: 'ai', label: 'Ollama', desc: 'Local model runtime and model configuration.', radius: 17 },
    { id: 'dspy', group: 'ai', label: 'DSPy', desc: 'Declarative LM programs and RAG research experiments.', radius: 15 },
    { id: 'mixflow', group: 'projects', label: 'MixFlow', desc: 'AI cocktail recipe browser and featured portfolio project.', radius: 17 },
    { id: 'perler', group: 'projects', label: 'Perler', desc: 'Local image-to-bead style converter.', radius: 14 },
    { id: 'chiwu', group: 'projects', label: '持物记录', desc: 'Local-first item archive product page.', radius: 15 },
    { id: 'gallery', group: 'projects', label: 'Gallery', desc: 'Manifest-driven wallpaper gallery.', radius: 14 },
    { id: 'website', group: 'projects', label: 'Portfolio', desc: 'This static website, rebuilt as a project-first portfolio.', radius: 16 },
  ];

  const links = [
    { source: 'hermes', target: 'codex' },
    { source: 'hermes', target: 'local-agent' },
    { source: 'hermes', target: 'memory' },
    { source: 'hermes', target: 'skills' },
    { source: 'hermes', target: 'review' },
    { source: 'review', target: 'github' },
    { source: 'local-agent', target: 'ollama' },
    { source: 'skills', target: 'dspy' },
    { source: 'skills', target: 'mixflow' },
    { source: 'skills', target: 'perler' },
    { source: 'skills', target: 'chiwu' },
    { source: 'skills', target: 'gallery' },
    { source: 'codex', target: 'website' },
    { source: 'codex', target: 'mixflow' },
    { source: 'memory', target: 'website' },
    { source: 'ollama', target: 'dspy' },
    { source: 'github', target: 'website' },
  ];

  const colors = {
    agent: '#c9382a',
    orchestration: '#204b88',
    memory: '#62645d',
    skills: '#006a7a',
    quality: '#8f3d4a',
    ai: '#7b4aa0',
    projects: '#2f6b4f',
  };

  const labels = {
    agent: 'Agents',
    orchestration: 'Orchestration',
    memory: 'Memory',
    skills: 'Skills',
    quality: 'Quality',
    ai: 'AI/ML',
    projects: 'Projects',
  };

  const svg = d3.select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`);

  const group = svg.append('g');

  svg.call(d3.zoom()
    .scaleExtent([0.55, 2.2])
    .on('zoom', (event) => group.attr('transform', event.transform)));

  const link = group.append('g')
    .attr('stroke', 'rgba(21,21,21,0.25)')
    .attr('stroke-width', 1.2)
    .selectAll('line')
    .data(links)
    .join('line');

  const node = group.append('g')
    .selectAll('circle')
    .data(nodes)
    .join('circle')
    .attr('r', (d) => d.radius)
    .attr('fill', (d) => colors[d.group] || '#62645d')
    .attr('stroke', '#fff')
    .attr('stroke-width', 2)
    .attr('cursor', 'pointer');

  const label = group.append('g')
    .selectAll('text')
    .data(nodes)
    .join('text')
    .text((d) => d.label)
    .attr('font-family', 'Inter, sans-serif')
    .attr('font-size', (d) => Math.max(9, d.radius * 0.56))
    .attr('font-weight', 700)
    .attr('text-anchor', 'middle')
    .attr('dy', (d) => d.radius + 14)
    .attr('fill', '#4b4b46')
    .attr('pointer-events', 'none');

  const tooltip = d3.select('#knowledge-tooltip');

  function safeText(text) {
    if (window.SecurityUtils?.escapeHtml) return window.SecurityUtils.escapeHtml(text);
    return String(text).replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    })[char]);
  }

  function showTooltip(event, d) {
    tooltip
      .style('opacity', 1)
      .html(`<div class="kg-tooltip-name" style="color:${colors[d.group]}">${safeText(d.label)}</div>
        <div class="kg-tooltip-category">${safeText(labels[d.group] || d.group)}</div>
        <div class="kg-tooltip-desc">${safeText(d.desc)}</div>`);

    node.attr('opacity', (n) => {
      const related = links.some((l) => (
        (l.source.id === d.id && l.target.id === n.id) ||
        (l.target.id === d.id && l.source.id === n.id)
      ));
      return n.id === d.id || related ? 1 : 0.25;
    });

    link
      .attr('opacity', (l) => (l.source.id === d.id || l.target.id === d.id ? 0.9 : 0.12))
      .attr('stroke-width', (l) => (l.source.id === d.id || l.target.id === d.id ? 2.4 : 0.8));
  }

  function moveTooltip(event) {
    const wrapper = document.querySelector('.knowledge-graph-container');
    const bounds = wrapper.getBoundingClientRect();
    tooltip
      .style('left', `${event.clientX - bounds.left + 14}px`)
      .style('top', `${event.clientY - bounds.top - 12}px`);
  }

  function hideTooltip() {
    tooltip.style('opacity', 0);
    node.attr('opacity', 1);
    link.attr('opacity', 1).attr('stroke-width', 1.2);
  }

  node
    .on('mouseenter', showTooltip)
    .on('mousemove', moveTooltip)
    .on('mouseleave', hideTooltip);

  const drag = d3.drag()
    .on('start', (event, d) => {
      if (!event.active) simulation.alphaTarget(0.25).restart();
      d.fx = d.x;
      d.fy = d.y;
    })
    .on('drag', (event, d) => {
      d.fx = event.x;
      d.fy = event.y;
    })
    .on('end', (event, d) => {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    });

  node.call(drag);

  const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id((d) => d.id).distance(width < 560 ? 76 : 112).strength(0.42))
    .force('charge', d3.forceManyBody().strength((d) => -d.radius * 28))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius((d) => d.radius + 20))
    .force('x', d3.forceX(width / 2).strength(0.05))
    .force('y', d3.forceY(height / 2).strength(0.05));

  simulation.on('tick', () => {
    link
      .attr('x1', (d) => d.source.x)
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y);

    node
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y);

    label
      .attr('x', (d) => d.x)
      .attr('y', (d) => d.y);
  });

  const legend = d3.select('#knowledge-legend');
  legend.html('');
  Object.entries(labels).forEach(([key, labelText]) => {
    legend.append('div')
      .attr('class', 'knowledge-legend-item')
      .html(`<span class="knowledge-legend-dot" style="background:${colors[key]}"></span>${safeText(labelText)}`);
  });
}

initThemeControls();
initMobileNav();
initLanguageControls();
initScrollReveal();
initNavActive();
initSmoothScroll();
initKnowledgeGraph();
