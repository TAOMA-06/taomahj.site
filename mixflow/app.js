/* ========================================================
   MixFlow App — Cocktail Browser Logic
   Bilingual (zh/en) · Favorites · Random Pick · Sort · Share
   ======================================================== */

// ─── i18n ─────────────────────────────────────────────────
const i18n = {
  zh: {
    'nav.cocktails': '鸡尾酒',
    'nav.mocktails': '无酒精',
    'nav.favorites': '收藏',
    'hero.subtitle': 'AI 驱动的鸡尾酒配方浏览器',
    'search.placeholder': '搜索鸡尾酒名称、配料、类别...',
    'category.all': '全部类别',
    'stats.recipes': '个配方',
    'action.random': '随机推荐',
    'action.sort': '排序',
    'action.share': '分享',
    'loading': '加载配方中...',
    'empty': '没有找到匹配的配方',
    'modal.ingredients': '配料 Ingredients',
    'modal.instructions': '做法 Instructions',
    'modal.favorite': '☆ 收藏配方',
    'modal.favorited': '★ 已收藏',
    'modal.close': '关闭',
    'random.title': '命运的安排',
    'random.subtitle': '摇动手机或点击按钮，让命运为你调一杯',
    'random.shakeAgain': '再摇一次',
    'random.accept': '接受命运',
    'sort.nameAsc': '名称 A-Z',
    'sort.nameDesc': '名称 Z-A',
    'sort.category': '按类别',
    'share.title': 'MixFlow 鸡尾酒配方',
    'share.copySuccess': '链接已复制到剪贴板',
    'share.unsupported': '您的浏览器不支持分享功能',
  },
  en: {
    'nav.cocktails': 'Cocktails',
    'nav.mocktails': 'Mocktails',
    'nav.favorites': 'Favorites',
    'hero.subtitle': 'AI-powered cocktail recipe browser',
    'search.placeholder': 'Search by name, ingredient, category...',
    'category.all': 'All Categories',
    'stats.recipes': 'recipes',
    'action.random': 'Random',
    'action.sort': 'Sort',
    'action.share': 'Share',
    'loading': 'Loading recipes...',
    'empty': 'No matching recipes found',
    'modal.ingredients': 'Ingredients',
    'modal.instructions': 'Instructions',
    'modal.favorite': '☆ Favorite',
    'modal.favorited': '★ Favorited',
    'modal.close': 'Close',
    'random.title': "Fate's Arrangement",
    'random.subtitle': 'Shake your phone or tap to let fate mix one for you',
    'random.shakeAgain': 'Shake Again',
    'random.accept': 'Accept Fate',
    'sort.nameAsc': 'Name A-Z',
    'sort.nameDesc': 'Name Z-A',
    'sort.category': 'By Category',
    'share.title': 'MixFlow Cocktail Recipe',
    'share.copySuccess': 'Link copied to clipboard',
    'share.unsupported': 'Sharing not supported in this browser',
  }
};


// ─── Category Translation Map ─────────────────────────────
const categoryTranslations = {
  'Ordinary Drink': '普通饮品',
  'Cocktail': '鸡尾酒',
  'Shake': '摇和',
  'Other / Unknown': '其他/未知',
  'Cocoa': '可可',
  'Shot': ' shots',
  'Coffee / Tea': '咖啡/茶',
  'Homemade Liqueur': '自制利口酒',
  'Punch / Party Drink': '宾治/派对饮品',
  'Beer': '啤酒',
  'Soft Drink': '软饮',
};

const glassTranslations = {
  'Highball glass': '高球杯',
  'Cocktail glass': '鸡尾酒杯',
  'Old-fashioned glass': '古典杯',
  'Whiskey Glass': '威士忌杯',
  'Collins glass': '柯林杯',
  'Pousse cafe glass': '普施咖啡杯',
  'Champagne flute': '香槟笛杯',
  'Whiskey sour glass': '酸威士忌杯',
  'Cordial glass': '甜酒杯',
  'Brandy snifter': '白兰地杯',
  'White wine glass': '白葡萄酒杯',
  'Nick and Nora Glass': '尼克诺拉杯',
  'Hurricane glass': '飓风杯',
  'Coffee mug': '咖啡杯',
  'Shot glass': ' shot杯',
  'Jar': '罐',
  'Irish coffee cup': '爱尔兰咖啡杯',
  'Punch bowl': '宾治碗',
  'Pitcher': '水壶',
  'Pint glass': '品脱杯',
  'Copper Mug': '铜杯',
  'Wine Glass': '葡萄酒杯',
  'Beer mug': '啤酒杯',
  'Margarita/Coupette glass': '玛格丽特杯',
  'Beer pilsner': '比尔森啤酒杯',
  'Beer Glass': '啤酒杯',
  'Parfait glass': '芭菲杯',
  'Mason jar': '梅森罐',
  'Margarita glass': '玛格丽特杯',
  'Martini Glass': '马天尼杯',
  'Balloon Glass': '气球杯',
  'Coupe Glass': '碟形杯',
};

function translateCategory(cat) {
  if (!cat) return '';
  if (currentLang === 'zh') return categoryTranslations[cat] || cat;
  return cat;
}

function translateGlass(glass) {
  if (!glass) return '';
  if (currentLang === 'zh') return glassTranslations[glass] || glass;
  return glass;
}

function translateAlcoholic(val) {
  if (!val) return '';
  if (val === 'Alcoholic') return currentLang === 'zh' ? '含酒精' : 'Alcoholic';
  if (val === 'Non alcoholic') return currentLang === 'zh' ? '无酒精' : 'Non-Alcoholic';
  if (val === 'Optional alcohol') return currentLang === 'zh' ? '可选酒精' : 'Optional alcohol';
  return val;
}

let currentLang = localStorage.getItem('lang') || 'zh';

function applyLang() {
  const dict = i18n[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.placeholder = dict[key];
  });
  document.documentElement.lang = currentLang;
}

function updateLangToggle() {
  const toggle = document.getElementById('langToggle');
  toggle.classList.toggle('lang-zh-active', currentLang === 'zh');
  toggle.classList.toggle('lang-en-active', currentLang === 'en');
}

function switchLang() {
  currentLang = currentLang === 'zh' ? 'en' : 'zh';
  localStorage.setItem('lang', currentLang);
  applyLang();
  updateLangToggle();
  buildCategoryOptions(allRecipes);
  render();
}

document.getElementById('langToggle').addEventListener('click', switchLang);

// ─── Debug: catch and display errors ──────────────────────
function showError(title, msg) {
  const el = document.getElementById('cocktailGrid');
  if (!el) return;
  el.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.style.cssText = 'padding:40px;color:#f97316;font-family:monospace';
  const h3 = document.createElement('h3');
  h3.textContent = title;
  const pre = document.createElement('pre');
  pre.textContent = msg;
  wrap.appendChild(h3);
  wrap.appendChild(pre);
  el.appendChild(wrap);
}
window.addEventListener('error', (e) => {
  showError('JS Error', e.message || e.error?.message || 'Unknown');
});
window.addEventListener('unhandledrejection', (e) => {
  showError('Promise Error', e.reason?.message || String(e.reason));
});

// ─── State ────────────────────────────────────────────────
let allRecipes = [];
let currentTab = 'cocktails';
let favorites = [];
let sortMode = 'default';

// ─── DOM Refs ────────────────────────────────────────────
const $grid = document.getElementById('cocktailGrid');
const $loading = document.getElementById('loading');
const $empty = document.getElementById('emptyState');
const $search = document.getElementById('searchInput');
const $category = document.getElementById('categoryFilter');
const $resultCount = document.getElementById('resultCount');
const $favCount = document.getElementById('favCount');
const $modalOverlay = document.getElementById('modalOverlay');
const $modalContent = document.getElementById('modalContent');
const $modalClose = document.getElementById('modalClose');
const $backToTop = document.getElementById('backToTop');
const $randomOverlay = document.getElementById('randomOverlay');
const $randomContent = document.getElementById('randomContent');
const $randomClose = document.getElementById('randomClose');
const $shakeAgainBtn = document.getElementById('shakeAgainBtn');
const $acceptFateBtn = document.getElementById('acceptFateBtn');
const $sortDropdown = document.getElementById('sortDropdown');

// ─── Spotlight ───────────────────────────────────────────
document.addEventListener('mousemove', (e) => {
  document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
  document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
});

// ─── Back to Top ─────────────────────────────────────────
window.addEventListener('scroll', () => {
  $backToTop.classList.toggle('visible', window.scrollY > 400);
});

$backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─── Favorites ───────────────────────────────────────────
function loadFavorites() {
  try {
    favorites = JSON.parse(localStorage.getItem('mixflow_favorites') || '[]');
  } catch {
    favorites = [];
  }
  updateFavCount();
}

function saveFavorites() {
  localStorage.setItem('mixflow_favorites', JSON.stringify(favorites));
  updateFavCount();
  render();
}

function toggleFavorite(id) {
  const idx = favorites.indexOf(id);
  if (idx >= 0) {
    favorites.splice(idx, 1);
  } else {
    favorites.push(id);
  }
  saveFavorites();
}

function isFavorite(id) {
  return favorites.includes(id);
}

function updateFavCount() {
  $favCount.textContent = favorites.length;
}

// ─── Data Loading ────────────────────────────────────────
async function loadData() {
  try {
    const [recipesRes, mocktailsRes] = await Promise.all([
      fetch('recipes.json'),
      fetch('mocktails.json')
    ]);

    const recipesData = await recipesRes.json();
    const mocktailsData = await mocktailsRes.json();

    const recipes = (recipesData.drinks || []).map(r => ({ ...r, _type: 'cocktail' }));
    const mocktails = (mocktailsData.drinks || []).map(r => ({ ...r, _type: 'mocktail' }));

    allRecipes = [...recipes, ...mocktails];
    buildCategoryOptions(allRecipes);
    applyLang();
    updateLangToggle();
    render();
  } catch (err) {
    console.error('Failed to load recipes:', err);
    const dict = i18n[currentLang];
    $loading.innerHTML = `<p style="color:var(--accent2)">${dict['loading'] || 'Loading failed'}</p>`;
  }
}

function buildCategoryOptions(recipes) {
  const cats = new Set();
  for (const r of recipes) {
    if (r.strCategory) cats.add(r.strCategory);
  }
  const dict = i18n[currentLang];
  const allLabel = dict['category.all'] || 'All Categories';
  const sorted = ['all', ...Array.from(cats).sort()];
  $category.innerHTML = sorted.map(c => {
    const label = c === 'all' ? allLabel : translateCategory(c);
    return `<option value="${c}">${label}</option>`;
  }).join('');
}

// ─── Filtering ───────────────────────────────────────────
function getFiltered() {
  let list = [];

  if (currentTab === 'favorites') {
    list = allRecipes.filter(r => favorites.includes(r.idDrink));
  } else {
    list = allRecipes.filter(r => r._type === (currentTab === 'cocktails' ? 'cocktail' : 'mocktail'));
  }

  // Search
  const q = $search.value.toLowerCase().trim();
  if (q) {
    list = list.filter(r => {
      const name = (r.strDrink || '').toLowerCase();
      const cat = (r.strCategory || '').toLowerCase();
      const glass = (r.strGlass || '').toLowerCase();
      const ings = getIngredients(r).join(' ').toLowerCase();
      return name.includes(q) || cat.includes(q) || glass.includes(q) || ings.includes(q);
    });
  }

  // Category
  const catVal = $category.value;
  if (catVal && catVal !== 'all') {
    list = list.filter(r => r.strCategory === catVal);
  }

  // Sort
  if (sortMode === 'name-asc') {
    list.sort((a, b) => (a.strDrink || '').localeCompare(b.strDrink || ''));
  } else if (sortMode === 'name-desc') {
    list.sort((a, b) => (b.strDrink || '').localeCompare(a.strDrink || ''));
  } else if (sortMode === 'category') {
    list.sort((a, b) => (a.strCategory || '').localeCompare(b.strCategory || ''));
  }

  return list;
}

function getIngredients(recipe) {
  const ings = [];
  for (let i = 1; i <= 15; i++) {
    const val = recipe['strIngredient' + i];
    if (val && typeof val === 'string' && val.trim()) {
      ings.push(val.trim());
    }
  }
  return ings;
}

function getMeasures(recipe) {
  const measures = [];
  for (let i = 1; i <= 15; i++) {
    const val = recipe['strMeasure' + i];
    if (val && typeof val === 'string' && val.trim()) {
      measures.push(val.trim());
    }
  }
  return measures;
}

// ─── Render ──────────────────────────────────────────────
function render() {
  const filtered = getFiltered();

  $loading.style.display = 'none';
  $resultCount.textContent = filtered.length;

  if (filtered.length === 0) {
    $grid.innerHTML = '';
    $empty.style.display = 'flex';
    return;
  }

  $empty.style.display = 'none';
  $grid.innerHTML = filtered.map(recipe => createCard(recipe)).join('');

  // Attach event listeners to cards
  $grid.querySelectorAll('.cocktail-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.card-fav')) return;
      openModal(card.dataset.id);
    });
  });

  // Attach event listeners to fav buttons
  $grid.querySelectorAll('.card-fav').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorite(btn.dataset.id);
      btn.classList.toggle('active', isFavorite(btn.dataset.id));
      btn.innerHTML = isFavorite(btn.dataset.id) ? '★' : '☆';
    });
  });

  // Image error fallback
  $grid.querySelectorAll('.card-image').forEach(img => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
      const placeholder = img.nextElementSibling;
      if (placeholder) placeholder.style.display = 'flex';
    });
  });
}

function createCard(recipe) {
  const id = recipe.idDrink;
  const thumb = recipe.strDrinkThumb;
  const name = recipe.strDrink || 'Unknown';
  const category = recipe.strCategory || '';
  const glass = recipe.strGlass || '';
  const catLabel = translateCategory(category);
  const glassLabel = translateGlass(glass);
  const fav = isFavorite(id);

  const imageHtml = thumb
    ? `<img class="card-image" src="${escapeHtml(thumb)}" alt="${escapeHtml(name)}" loading="lazy">`
    : '';

  const placeholderHtml = thumb
    ? `<div class="card-image-placeholder" style="display:none">🍸</div>`
    : `<div class="card-image-placeholder">🍸</div>`;

  return `
    <div class="cocktail-card" data-id="${escapeHtml(id)}">
      ${imageHtml}${placeholderHtml}
      <button class="card-fav ${fav ? 'active' : ''}" data-id="${escapeHtml(id)}" aria-label="favorite">${fav ? '★' : '☆'}</button>
      <div class="card-body">
        <h3 class="card-title" title="${escapeHtml(name)}">${escapeHtml(name)}</h3>
        <div class="card-meta">
          ${category ? `<span class="card-category" title="${escapeHtml(category)}">${escapeHtml(catLabel)}</span>` : ''}
          ${glass ? `<span class="card-glass" title="${escapeHtml(glass)}">${escapeHtml(glassLabel)}</span>` : ''}
        </div>
      </div>
    </div>
  `;
}

// ─── Modal ───────────────────────────────────────────────
function openModal(id) {
  const recipe = allRecipes.find(r => r.idDrink === id);
  if (!recipe) return;

  const thumb = recipe.strDrinkThumb;
  const ingredients = getIngredients(recipe);
  const measures = getMeasures(recipe);
  const fav = isFavorite(id);
  const dict = i18n[currentLang];
  const catLabel = translateCategory(recipe.strCategory);
  const glassLabel = translateGlass(recipe.strGlass);
  const alcLabel = translateAlcoholic(recipe.strAlcoholic);

  const imageHtml = thumb
    ? `<img class="modal-image" src="${escapeHtml(thumb)}" alt="${escapeHtml(recipe.strDrink)}">`
    : `<div class="modal-image-placeholder">🍸</div>`;

  const ingredientsHtml = ingredients.map((ing, i) => `
    <li class="ingredient-item">
      <span class="ingredient-name">${escapeHtml(ing)}</span>
      ${measures[i] ? `<span class="ingredient-measure">${escapeHtml(measures[i])}</span>` : ''}
    </li>
  `).join('');

  $modalContent.innerHTML = `
    ${imageHtml}
    <div class="modal-info">
      <h2 class="modal-title">${escapeHtml(recipe.strDrink)}</h2>
      <div class="modal-meta-row">
        ${recipe.strCategory ? `<span class="modal-badge" title="${escapeHtml(recipe.strCategory)}">${escapeHtml(catLabel)}</span>` : ''}
        ${recipe.strAlcoholic ? `<span class="modal-badge alcoholic">${escapeHtml(alcLabel)}</span>` : ''}
        ${recipe.strGlass ? `<span class="modal-badge" title="${escapeHtml(recipe.strGlass)}">${escapeHtml(glassLabel)}</span>` : ''}
        ${recipe.strIBA ? `<span class="modal-badge">${escapeHtml(recipe.strIBA)}</span>` : ''}
      </div>

      ${ingredients.length > 0 ? `
        <div class="modal-section">
          <h3 class="modal-section-title">${dict['modal.ingredients']}</h3>
          <ul class="ingredients-list">${ingredientsHtml}</ul>
        </div>
      ` : ''}

      ${recipe.strInstructions ? `
        <div class="modal-section">
          <h3 class="modal-section-title">${dict['modal.instructions']}</h3>
          <p class="instructions-text">${escapeHtml(recipe.strInstructions)}</p>
        </div>
      ` : ''}

      <button class="modal-fav-btn ${fav ? 'active' : ''}" id="modalFavBtn" data-id="${escapeHtml(id)}">
        ${fav ? dict['modal.favorited'] : dict['modal.favorite']}
      </button>
    </div>
  `;

  $modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  const modalImg = $modalContent.querySelector('.modal-image');
  if (modalImg) {
    modalImg.addEventListener('error', () => {
      modalImg.style.display = 'none';
      const placeholder = modalImg.nextElementSibling;
      if (placeholder && placeholder.classList.contains('modal-image-placeholder')) {
        placeholder.style.display = 'flex';
      }
    });
  }

  const modalFavBtn = document.getElementById('modalFavBtn');
  if (modalFavBtn) {
    modalFavBtn.addEventListener('click', () => {
      toggleFavorite(id);
      const nowFav = isFavorite(id);
      modalFavBtn.classList.toggle('active', nowFav);
      modalFavBtn.innerHTML = nowFav ? dict['modal.favorited'] : dict['modal.favorite'];
    });
  }
}

function closeModal() {
  $modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

$modalClose.addEventListener('click', closeModal);
$modalOverlay.addEventListener('click', (e) => {
  if (e.target === $modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeRandomModal();
  }
});

// ─── Random Pick ─────────────────────────────────────────
function openRandomModal() {
  $randomOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('randomResult').style.display = 'none';
  document.querySelector('.random-hero').style.display = 'block';
}

function closeRandomModal() {
  $randomOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

function shakeRandom() {
  const list = currentTab === 'favorites'
    ? allRecipes.filter(r => favorites.includes(r.idDrink))
    : allRecipes.filter(r => r._type === (currentTab === 'cocktails' ? 'cocktail' : 'mocktail'));

  if (list.length === 0) return;

  const recipe = list[Math.floor(Math.random() * list.length)];
  const name = recipe.strDrink || 'Unknown';
  const category = recipe.strCategory || '';
  const glass = recipe.strGlass || '';
  const catLabel = translateCategory(category);
  const glassLabel = translateGlass(glass);

  document.querySelector('.random-hero').style.display = 'none';
  const resultEl = document.getElementById('randomResult');
  resultEl.style.display = 'block';
  resultEl.innerHTML = `
    <div class="random-result-card" data-id="${escapeHtml(recipe.idDrink)}">
      <div style="font-size:48px;margin-bottom:12px;">🍸</div>
      <h3 class="card-title">${escapeHtml(name)}</h3>
      <div class="card-meta" style="justify-content:center;">
        ${category ? `<span class="card-category" title="${escapeHtml(category)}">${escapeHtml(catLabel)}</span>` : ''}
        ${glass ? `<span class="card-glass" title="${escapeHtml(glass)}">${escapeHtml(glassLabel)}</span>` : ''}
      </div>
    </div>
  `;

  resultEl.querySelector('.random-result-card').addEventListener('click', () => {
    closeRandomModal();
    openModal(recipe.idDrink);
  });
}

document.getElementById('randomBtn').addEventListener('click', () => {
  openRandomModal();
  shakeRandom();
});

$randomClose.addEventListener('click', closeRandomModal);
$randomOverlay.addEventListener('click', (e) => {
  if (e.target === $randomOverlay) closeRandomModal();
});

$shakeAgainBtn.addEventListener('click', shakeRandom);
$acceptFateBtn.addEventListener('click', () => {
  const card = document.querySelector('.random-result-card');
  if (card) {
    closeRandomModal();
    openModal(card.dataset.id);
  }
});

// ─── Sort ────────────────────────────────────────────────
const $sortBtn = document.getElementById('sortBtn');

$sortBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const rect = $sortBtn.getBoundingClientRect();
  $sortDropdown.style.display = $sortDropdown.style.display === 'none' ? 'block' : 'none';
  $sortDropdown.style.top = (rect.bottom + window.scrollY + 4) + 'px';
  $sortDropdown.style.left = rect.left + 'px';
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('#sortDropdown') && !e.target.closest('#sortBtn')) {
    $sortDropdown.style.display = 'none';
  }
});

document.querySelectorAll('.sort-option').forEach(btn => {
  btn.addEventListener('click', () => {
    sortMode = btn.dataset.sort;
    $sortDropdown.style.display = 'none';
    render();
  });
});

// ─── Share ───────────────────────────────────────────────
document.getElementById('shareBtn').addEventListener('click', async () => {
  const dict = i18n[currentLang];
  const shareData = {
    title: dict['share.title'],
    text: 'MixFlow — AI Cocktail Recipe Browser',
    url: window.location.href
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      // User cancelled
    }
  } else if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert(dict['share.copySuccess']);
    } catch {
      alert(dict['share.unsupported']);
    }
  } else {
    alert(dict['share.unsupported']);
  }
});

// ─── Navigation / Tabs ───────────────────────────────────
document.querySelectorAll('.nav-btn[data-tab]').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    if (tab === 'favorites') {
      currentTab = 'favorites';
      document.querySelectorAll('.nav-btn[data-tab]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    } else if (tab === 'cocktails' || tab === 'mocktails') {
      currentTab = tab;
      document.querySelectorAll('.nav-btn[data-tab]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('favBtn').classList.remove('active');
    }
    render();
  });
});

// Fav button in nav
document.getElementById('favBtn').addEventListener('click', function() {
  currentTab = 'favorites';
  document.querySelectorAll('.nav-btn[data-tab]').forEach(b => b.classList.remove('active'));
  this.classList.add('active');
  render();
});

// ─── Search & Filter ─────────────────────────────────────
let debounceTimer;
$search.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(render, 200);
});

$category.addEventListener('change', render);

// ─── Utilities ───────────────────────────────────────────
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ─── Mobile FAB ──────────────────────────────────────────
const $mobileFab = document.getElementById('mobileFab');
const $mobileFabMenu = document.getElementById('mobileFabMenu');

if ($mobileFab && $mobileFabMenu) {
  $mobileFab.addEventListener('click', () => {
    const isOpen = $mobileFabMenu.classList.contains('open');
    if (isOpen) {
      $mobileFabMenu.classList.remove('open');
      $mobileFab.classList.remove('active');
      $mobileFab.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 21h8"/><path d="M12 21v-7"/><path d="M12 14l7-7H5l7 7z"/>
        </svg>
      `;
    } else {
      $mobileFabMenu.classList.add('open');
      $mobileFab.classList.add('active');
      $mobileFab.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6L6 18"/><path d="M6 6l12 12"/>
        </svg>
      `;
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!$mobileFab.contains(e.target) && !$mobileFabMenu.contains(e.target)) {
      $mobileFabMenu.classList.remove('open');
      $mobileFab.classList.remove('active');
      $mobileFab.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 21h8"/><path d="M12 21v-7"/><path d="M12 14l7-7H5l7 7z"/>
        </svg>
      `;
    }
  });

  // FAB menu actions
  document.getElementById('fabRandom')?.addEventListener('click', () => {
    $mobileFabMenu.classList.remove('open');
    $mobileFab.classList.remove('active');
    $mobileFab.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 21h8"/><path d="M12 21v-7"/><path d="M12 14l7-7H5l7 7z"/>
      </svg>
    `;
    openRandomModal();
  });

  document.getElementById('fabFav')?.addEventListener('click', () => {
    $mobileFabMenu.classList.remove('open');
    $mobileFab.classList.remove('active');
    $mobileFab.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 21h8"/><path d="M12 21v-7"/><path d="M12 14l7-7H5l7 7z"/>
      </svg>
    `;
    currentTab = 'favorites';
    document.querySelectorAll('.nav-btn[data-tab]').forEach(b => b.classList.remove('active'));
    document.getElementById('favBtn').classList.add('active');
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.getElementById('fabShare')?.addEventListener('click', () => {
    $mobileFabMenu.classList.remove('open');
    $mobileFab.classList.remove('active');
    $mobileFab.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 21h8"/><path d="M12 21v-7"/><path d="M12 14l7-7H5l7 7z"/>
      </svg>
    `;
    sharePage();
  });

  document.getElementById('fabTop')?.addEventListener('click', () => {
    $mobileFabMenu.classList.remove('open');
    $mobileFab.classList.remove('active');
    $mobileFab.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 21h8"/><path d="M12 21v-7"/><path d="M12 14l7-7H5l7 7z"/>
      </svg>
    `;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── Init ────────────────────────────────────────────────
(function init() {
  loadFavorites();
  loadData();
})();
