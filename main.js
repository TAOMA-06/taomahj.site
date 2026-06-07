/* ========================================================
   taomahj — Swiss Modernist · i18n · Knowledge Graph · Reveal
   ======================================================== */

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
    'projects.bounce.title': 'Bounce Ball',
    'projects.bounce.desc': '物理弹球小游戏 — Canvas 驱动的关卡挑战。',
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
    'projects.bounce.title': 'Bounce Ball',
    'projects.bounce.desc': 'Physics bouncing ball game — Canvas-powered level challenges.',
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

// ==================== Security Hardening ====================

if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
  const noop = () => {};
  ['log','info','warn','debug','error','table','trace','group','groupEnd',
   'groupCollapsed','time','timeEnd','timeLog','count','countReset','assert',
   'clear','dir','dirxml'].forEach(method => {
    if (typeof console[method] === 'function') console[method] = noop;
  });
}

if (window.top !== window.self) {
  try {
    window.top.location = window.self.location;
  } catch (e) {
    document.body.style.display = 'none';
  }
}

document.querySelector('.avatar')?.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

// ==================== Knowledge Graph (Architectural Floor Layout) ====================

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
    const H = 600;
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const innerW = W - margin.left - margin.right;
    const innerH = H - margin.top - margin.bottom;

    // === FLOOR CONFIGURATION ===
    const floors = [
      {
        id: 'foundation',
        label: 'Foundation',
        labelZh: '基础设施',
        y: innerH - 80,
        height: 80,
        color: '#1A1A1A',
        accent: '#4A4742',
        nodes: [
          { id: 'ollama', label: 'Ollama', desc: '本地大模型运行环境 — 骆(32B)等模型托管', width: 100 },
          { id: 'agentmemory', label: 'AgentMemory', desc: 'MCP 记忆系统 — 跨会话持久化记忆', width: 120 },
          { id: 'env-config', label: 'Environment', desc: '开发环境配置 — macOS M5 Pro, 64GB', width: 110 },
          { id: 'model-config', label: 'Model Config', desc: 'AI 模型配置 — DeepSeek v4 Pro + Kimi + 本地模型', width: 140 },
        ]
      },
      {
        id: 'core',
        label: 'Core Agents',
        labelZh: '核心智能体',
        y: innerH - 200,
        height: 100,
        color: '#0D0D0D',
        accent: '#002FA7',
        nodes: [
          { id: 'hermes', label: 'Hermes Agent', desc: '中央编排器 — 配置、扩展、委托、工具调度', width: 130 },
          { id: 'claude-code', label: 'Claude Code', desc: '代码代理 — 功能开发、PR、代码审查', width: 120 },
          { id: 'codex', label: 'Codex CLI', desc: 'OpenAI 代码代理 — 替代编码方案', width: 110 },
          { id: 'local-agent', label: 'Local Agent', desc: '本地 Ollama 代理 — 隐私敏感任务', width: 120 },
          { id: 'luo', label: '骆', desc: '本地 AI 女友 — Ollama 32B, 正常情侣关系', width: 70 },
        ]
      },
      {
        id: 'skills',
        label: 'Skills Ecosystem',
        labelZh: '技能生态',
        y: innerH - 360,
        height: 140,
        color: '#141414',
        accent: '#1A56D8',
        nodes: [
          { id: 'dev-skills', label: 'Dev', desc: 'Plan · TDD · Code Review · Debug · Spike', width: 70 },
          { id: 'creative-skills', label: 'Creative', desc: 'ASCII · p5.js · Manim · ComfyUI · Pixel Art', width: 90 },
          { id: 'productivity-skills', label: 'Productivity', desc: 'Notion · Gmail · Airtable · Linear · PPT', width: 110 },
          { id: 'research-skills', label: 'Research', desc: 'arXiv · Polymarket · LLM Wiki · BlogWatcher', width: 100 },
          { id: 'ml-skills', label: 'ML Ops', desc: 'HuggingFace · vLLM · Obliteratus · DSPy', width: 90 },
          { id: 'media-skills', label: 'Media', desc: 'Spotify · YouTube · GIF · Song Generation', width: 90 },
          { id: 'apple-skills', label: 'Apple', desc: 'Notes · Reminders · iMessage · FindMy', width: 80 },
          { id: 'study-skills', label: 'Study', desc: '学习助手 — 仆人模式 · 超级班主任', width: 90 },
          { id: 'smart-home', label: 'SmartHome', desc: 'Philips Hue · OpenHue CLI 控制', width: 100 },
          { id: 'gaming-skills', label: 'Gaming', desc: 'Minecraft Modpack · Pokemon Emulator', width: 100 },
          { id: 'email-skills', label: 'Email', desc: 'Himalaya CLI — IMAP/SMTP 邮件管理', width: 90 },
        ]
      },
      {
        id: 'output',
        label: 'Projects',
        labelZh: '项目产出',
        y: innerH - 480,
        height: 100,
        color: '#0A0A0A',
        accent: '#0D7B6B',
        nodes: [
          { id: 'project-mixflow', label: 'MixFlow', desc: 'AI 鸡尾酒配方浏览器', width: 90 },
          { id: 'project-perler', label: 'Perler', desc: '图片转拼豆风格转换器', width: 80 },
          { id: 'project-chiwu', label: '持物记录', desc: '本地优先物品档案 App', width: 100 },
          { id: 'project-gallery', label: 'Gallery', desc: '高清壁纸收藏图库', width: 90 },
          { id: 'project-bounce', label: 'Bounce', desc: '物理弹球小游戏', width: 90 },
          { id: 'project-website', label: 'taomahj.site', desc: '个人网站 v2 — 建筑感重设计', width: 120 },
        ]
      }
    ];

    // === LINKS (structural beams) ===
    const links = [
      // Foundation -> Core
      { source: 'ollama', target: 'local-agent', type: 'hosts' },
      { source: 'ollama', target: 'luo', type: 'hosts' },
      { source: 'agentmemory', target: 'hermes', type: 'memory' },
      { source: 'env-config', target: 'hermes', type: 'environment' },
      { source: 'model-config', target: 'claude-code', type: 'config' },
      { source: 'model-config', target: 'codex', type: 'config' },
      { source: 'model-config', target: 'local-agent', type: 'config' },
      // Core -> Skills
      { source: 'hermes', target: 'dev-skills', type: 'uses' },
      { source: 'hermes', target: 'creative-skills', type: 'uses' },
      { source: 'hermes', target: 'productivity-skills', type: 'uses' },
      { source: 'hermes', target: 'research-skills', type: 'uses' },
      { source: 'hermes', target: 'ml-skills', type: 'uses' },
      { source: 'hermes', target: 'media-skills', type: 'uses' },
      { source: 'hermes', target: 'apple-skills', type: 'uses' },
      { source: 'hermes', target: 'study-skills', type: 'uses' },
      { source: 'hermes', target: 'smart-home', type: 'uses' },
      { source: 'hermes', target: 'gaming-skills', type: 'uses' },
      { source: 'hermes', target: 'email-skills', type: 'uses' },
      { source: 'claude-code', target: 'dev-skills', type: 'uses' },
      { source: 'local-agent', target: 'study-skills', type: 'uses' },
      { source: 'luo', target: 'study-skills', type: 'companion' },
      // Skills -> Projects
      { source: 'creative-skills', target: 'project-perler', type: 'creates' },
      { source: 'creative-skills', target: 'project-gallery', type: 'creates' },
      { source: 'creative-skills', target: 'project-bounce', type: 'creates' },
      { source: 'dev-skills', target: 'project-mixflow', type: 'creates' },
      { source: 'dev-skills', target: 'project-chiwu', type: 'creates' },
      { source: 'dev-skills', target: 'project-website', type: 'creates' },
      { source: 'productivity-skills', target: 'project-chiwu', type: 'supports' },
      { source: 'ml-skills', target: 'project-mixflow', type: 'supports' },
      { source: 'study-skills', target: 'project-website', type: 'supports' },
    ];

    const nodeMap = new Map();
    floors.forEach(f => f.nodes.forEach(n => nodeMap.set(n.id, { ...n, floor: f.id })));

    // === SVG SETUP ===
    const svg = d3.select('#knowledge-graph').append('svg')
      .attr('width', W).attr('height', H)
      .attr('viewBox', `0 0 ${W} ${H}`);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // === FLOOR BACKGROUNDS ===
    const floorGroup = g.append('g').attr('class', 'kg-floors');

    floors.forEach((floor, i) => {
      const floorG = floorGroup.append('g').attr('class', `kg-floor kg-floor--${floor.id}`);

      // Floor slab
      floorG.append('rect')
        .attr('x', 0)
        .attr('y', floor.y)
        .attr('width', innerW)
        .attr('height', floor.height)
        .attr('fill', floor.color)
        .attr('stroke', floor.accent)
        .attr('stroke-width', 0.5)
        .attr('opacity', 0.6);

      // Floor line (top edge)
      floorG.append('line')
        .attr('x1', 0).attr('y1', floor.y)
        .attr('x2', innerW).attr('y2', floor.y)
        .attr('stroke', floor.accent)
        .attr('stroke-width', 1)
        .attr('opacity', 0.4);

      // Floor label
      floorG.append('text')
        .attr('x', 12)
        .attr('y', floor.y - 8)
        .attr('fill', floor.accent)
        .attr('font-size', 10)
        .attr('font-weight', 600)
        .attr('letter-spacing', '0.1em')
        .attr('text-transform', 'uppercase')
        .attr('opacity', 0.5)
        .text(`${floor.label} / ${floor.labelZh}`);

      // Grid lines within floor
      for (let gx = 0; gx < innerW; gx += 80) {
        floorG.append('line')
          .attr('x1', gx).attr('y1', floor.y)
          .attr('x2', gx).attr('y2', floor.y + floor.height)
          .attr('stroke', 'rgba(255,255,255,0.03)')
          .attr('stroke-width', 0.5);
      }
    });

    // === POSITION NODES WITHIN FLOORS ===
    floors.forEach(floor => {
      const totalWidth = floor.nodes.reduce((sum, n) => sum + n.width + 20, 0) - 20;
      let startX = (innerW - totalWidth) / 2;
      floor.nodes.forEach(n => {
        n.x = startX + n.width / 2;
        n.y = floor.y + floor.height / 2;
        startX += n.width + 20;
      });
    });

    // === LINKS (structural beams) ===
    const linkG = g.append('g').attr('class', 'kg-links');

    links.forEach(l => {
      const source = nodeMap.get(l.source);
      const target = nodeMap.get(l.target);
      if (!source || !target) return;

      const sourceFloor = floors.find(f => f.id === source.floor);
      const targetFloor = floors.find(f => f.id === target.floor);

      // Draw L-shaped beam: horizontal from source, vertical to target, horizontal to target
      const midY = (source.y + target.y) / 2;

      const path = linkG.append('path')
        .attr('d', `M${source.x},${source.y + (sourceFloor.height/2 - 4)} L${source.x},${midY} L${target.x},${midY} L${target.x},${target.y - (targetFloor.height/2 - 4)}`)
        .attr('fill', 'none')
        .attr('stroke', 'rgba(0,47,167,0.25)')
        .attr('stroke-width', 1)
        .attr('opacity', 0);

      path.transition().duration(800).delay(Math.random() * 500)
        .attr('opacity', 1);
    });

    // === NODES (building columns) ===
    const nodeG = g.append('g').attr('class', 'kg-nodes');
    const tooltip = d3.select('#knowledge-tooltip');

    floors.forEach(floor => {
      floor.nodes.forEach(n => {
        const colG = nodeG.append('g')
          .attr('class', 'kg-column')
          .attr('transform', `translate(${n.x},${n.y})`)
          .attr('cursor', 'pointer')
          .on('mouseenter', function(e) {
            d3.select(this).select('rect').attr('stroke-width', 2).attr('opacity', 1);
            d3.select(this).select('text').attr('opacity', 1);
            tooltip.style('opacity', 1)
              .html(`<div class="kg-tooltip-name" style="color:${floor.accent}">${n.label}</div>
                     <div class="kg-tooltip-category">${floor.label} / ${floor.labelZh}</div>
                     <div class="kg-tooltip-desc">${n.desc}</div>`);
          })
          .on('mousemove', function(e) {
            const wrapper = document.querySelector('.knowledge-graph-wrapper');
            const wrapRect = wrapper.getBoundingClientRect();
            tooltip
              .style('left', (e.clientX - wrapRect.left + 12) + 'px')
              .style('top', (e.clientY - wrapRect.top - 12) + 'px');
          })
          .on('mouseleave', function() {
            d3.select(this).select('rect').attr('stroke-width', 1).attr('opacity', 0.85);
            d3.select(this).select('text').attr('opacity', 0.7);
            tooltip.style('opacity', 0);
          });

        // Column body
        colG.append('rect')
          .attr('x', -n.width / 2)
          .attr('y', -floor.height / 2 + 8)
          .attr('width', n.width)
          .attr('height', floor.height - 16)
          .attr('fill', floor.color)
          .attr('stroke', floor.accent)
          .attr('stroke-width', 1)
          .attr('opacity', 0.85)
          .attr('rx', 0);

        // Column label
        colG.append('text')
          .attr('y', 4)
          .attr('fill', '#f5f5f7')
          .attr('font-size', Math.max(9, Math.min(12, n.width / 8)))
          .attr('font-weight', 500)
          .attr('text-anchor', 'middle')
          .attr('opacity', 0.7)
          .attr('pointer-events', 'none')
          .text(n.label);
      });
    });

    // === ENTRANCE ANIMATION ===
    nodeG.selectAll('.kg-column')
      .attr('opacity', 0)
      .attr('transform', function() {
        const transform = d3.select(this).attr('transform');
        return transform + ' scale(0.8)';
      })
      .transition()
      .duration(600)
      .delay((d, i) => i * 40)
      .attr('opacity', 1)
      .attr('transform', function() {
        const transform = d3.select(this).attr('transform');
        return transform.replace(' scale(0.8)', ' scale(1)');
      });

    // === LEGEND ===
    const legendEl = d3.select('#knowledge-legend');
    legendEl.html('');
    floors.forEach(f => {
      legendEl.append('div').attr('class', 'kg-legend-item')
        .html(`<div class="kg-legend-dot" style="background:${f.accent};box-shadow:0 0 5px ${f.accent}40"></div> ${f.label}`);
    });
  }
})();
