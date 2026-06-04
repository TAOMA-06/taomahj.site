1|/* ========================================================
2|   MixFlow App — Cocktail Browser Logic
3|   Bilingual (zh/en) · Favorites · Random Pick · Sort · Share
4|   Auto-translate: English content gets inline Chinese translation
5|   ======================================================== */
6|
7|// ─── Category Translation Map ─────────────────────────────
8|const categoryTranslations = {
9|  'Ordinary Drink': '普通饮品',
10|  'Cocktail': '鸡尾酒',
11|  'Shake': '摇和',
12|  'Other / Unknown': '其他/未知',
13|  'Cocoa': '可可',
14|  'Shot': ' shots',
15|  'Coffee / Tea': '咖啡/茶',
16|  'Homemade Liqueur': '自制利口酒',
17|  'Punch / Party Drink': '宾治/派对饮品',
18|  'Beer': '啤酒',
19|  'Soft Drink': '软饮',
20|  'Alcoholic': '含酒精',
21|  'Non-Alcoholic': '无酒精',
22|  'Optional alcohol': '可选酒精',
23|};
24|
25|const glassTranslations = {
26|  'Highball glass': '高球杯',
27|  'Cocktail glass': '鸡尾酒杯',
28|  'Old-fashioned glass': '古典杯',
29|  'Whiskey Glass': '威士忌杯',
30|  'Collins glass': '柯林杯',
31|  'Pousse cafe glass': '普施咖啡杯',
32|  'Champagne flute': '香槟笛杯',
33|  'Whiskey sour glass': '酸威士忌杯',
34|  'Cordial glass': '甜酒杯',
35|  'Brandy snifter': '白兰地杯',
36|  'White wine glass': '白葡萄酒杯',
37|  'Nick and Nora Glass': '尼克诺拉杯',
38|  'Hurricane glass': '飓风杯',
39|  'Coffee mug': '咖啡杯',
40|  'Shot glass': ' shot杯',
41|  'Jar': '罐',
42|  'Irish coffee cup': '爱尔兰咖啡杯',
43|  'Punch bowl': '宾治碗',
44|  'Pitcher': '水壶',
45|  'Pint glass': '品脱杯',
46|  'Copper Mug': '铜杯',
47|  'Wine Glass': '葡萄酒杯',
48|  'Beer mug': '啤酒杯',
49|  'Margarita/Coupette glass': '玛格丽特杯',
50|  'Beer pilsner': '比尔森啤酒杯',
51|  'Beer Glass': '啤酒杯',
52|  'Parfait glass': '芭菲杯',
53|  'Mason jar': '梅森罐',
54|  'Margarita glass': '玛格丽特杯',
55|  'Martini Glass': '马天尼杯',
56|  'Balloon Glass': '气球杯',
57|  'Coupe Glass': '碟形杯',
58|};
59|
60|// ─── i18n ─────────────────────────────────────────────────
61|const i18n = {
62|  zh: {
63|    'nav.cocktails': '鸡尾酒',
64|    'nav.mocktails': '无酒精',
65|    'nav.favorites': '收藏',
66|    'hero.subtitle': 'AI 驱动的鸡尾酒配方浏览器',
67|    'search.placeholder': '搜索鸡尾酒名称、配料、类别...',
68|    'category.all': '全部类别',
69|    'stats.recipes': '个配方',
70|    'action.random': '随机推荐',
71|    'action.sort': '排序',
72|    'action.share': '分享',
73|    'loading': '加载配方中...',
74|    'empty': '没有找到匹配的配方',
75|    'modal.ingredients': '配料 \u003cspan class="trans-label"\u003eIngredients\u003c/span\u003e',
76|    'modal.instructions': '做法 \u003cspan class="trans-label"\u003eInstructions\u003c/span\u003e',
77|    'modal.favorite': '☆ 收藏配方',
78|    'modal.favorited': '★ 已收藏',
79|    'modal.close': '关闭',
80|    'random.title': '命运的安排',
81|    'random.subtitle': '摇动手机或点击按钮，让命运为你调一杯',
82|    'random.shakeAgain': '再摇一次',
83|    'random.accept': '接受命运',
84|    'sort.nameAsc': '名称 A-Z',
85|    'sort.nameDesc': '名称 Z-A',
86|    'sort.category': '按类别',
87|    'share.title': 'MixFlow 鸡尾酒配方',
88|    'share.copySuccess': '链接已复制到剪贴板',
89|    'share.unsupported': '您的浏览器不支持分享功能',
90|    'alcoholic.alcoholic': '含酒精',
91|    'alcoholic.non': '无酒精',
92|    'alcoholic.optional': '可选酒精',
93|  },
94|  en: {
95|    'nav.cocktails': 'Cocktails',
96|    'nav.mocktails': 'Mocktails',
97|    'nav.favorites': 'Favorites',
98|    'hero.subtitle': 'AI-powered cocktail recipe browser',
99|    'search.placeholder': 'Search by name, ingredient, category...',
100|    'category.all': 'All Categories',
101|    'stats.recipes': 'recipes',
102|    'action.random': 'Random',
103|    'action.sort': 'Sort',
104|    'action.share': 'Share',
105|    'loading': 'Loading recipes...',
106|    'empty': 'No matching recipes found',
107|    'modal.ingredients': 'Ingredients \u003cspan class="trans-label"\u003e配料\u003c/span\u003e',
108|    'modal.instructions': 'Instructions \u003cspan class="trans-label"\u003e做法\u003c/span\u003e',
109|    'modal.favorite': '☆ Favorite',
110|    'modal.favorited': '★ Favorited',
111|    'modal.close': 'Close',
112|    'random.title': "Fate's Arrangement",
113|    'random.subtitle': 'Shake your phone or tap to let fate mix one for you',
114|    'random.shakeAgain': 'Shake Again',
115|    'random.accept': 'Accept Fate',
116|    'sort.nameAsc': 'Name A-Z',
117|    'sort.nameDesc': 'Name Z-A',
118|    'sort.category': 'By Category',
119|    'share.title': 'MixFlow Cocktail Recipe',
120|    'share.copySuccess': 'Link copied to clipboard',
121|    'share.unsupported': 'Sharing not supported in this browser',
122|    'alcoholic.alcoholic': 'Alcoholic',
123|    'alcoholic.non': 'Non-Alcoholic',
124|    'alcoholic.optional': 'Optional alcohol',
125|  }
126|};
127|
128|let currentLang = localStorage.getItem('mixflow_lang') || 'zh';
129|
130|function t(key) {
131|  return i18n[currentLang]?.[key] || key;
132|}
133|
134|function applyLang() {
135|  const dict = i18n[currentLang];
136|  document.querySelectorAll('[data-i18n]').forEach(el => {
137|    const key = el.getAttribute('data-i18n');
138|    if (dict[key]) el.textContent = dict[key];
139|  });
140|  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
141|    const key = el.getAttribute('data-i18n-placeholder');
142|    if (dict[key]) el.placeholder = dict[key];
143|  });
144|  document.documentElement.lang = currentLang;
145|}
146|
147|function updateLangToggle() {
148|  const toggle = document.getElementById('langToggle');
149|  toggle.classList.toggle('lang-zh-active', currentLang === 'zh');
150|  toggle.classList.toggle('lang-en-active', currentLang === 'en');
151|}
152|
153|function switchLang() {
154|  currentLang = currentLang === 'zh' ? 'en' : 'zh';
155|  localStorage.setItem('mixflow_lang', currentLang);
156|  applyLang();
157|  updateLangToggle();
158|  buildCategoryOptions(allRecipes);
159|  render();
160|}
161|
162|document.getElementById('langToggle').addEventListener('click', switchLang);
163|
164|// ─── Debug: catch and display errors ──────────────────────
165|window.addEventListener('error', (e) => {
166|  const el = document.getElementById('cocktailGrid');
167|  if (el) el.innerHTML = '<div style="padding:40px;color:#f97316;font-family:monospace"><h3>JS Error</h3><pre>' +
168|    (e.message || e.error?.message || 'Unknown') + '</pre></div>';
169|});
170|window.addEventListener('unhandledrejection', (e) => {
171|  const el = document.getElementById('cocktailGrid');
172|  if (el) el.innerHTML = '<div style="padding:40px;color:#f97316;font-family:monospace"><h3>Promise Error</h3><pre>' +
173|    (e.reason?.message || String(e.reason)) + '</pre></div>';
174|});
175|
176|// ─── State ────────────────────────────────────────────────
177|let allRecipes = [];
178|let currentTab = 'cocktails';
179|let favorites = [];
180|let sortMode = 'default';
181|
182|// ─── DOM Refs ────────────────────────────────────────────
183|const $grid = document.getElementById('cocktailGrid');
184|const $loading = document.getElementById('loading');
185|const $empty = document.getElementById('emptyState');
186|const $search = document.getElementById('searchInput');
187|const $category = document.getElementById('categoryFilter');
188|const $resultCount = document.getElementById('resultCount');
189|const $favCount = document.getElementById('favCount');
190|const $modalOverlay = document.getElementById('modalOverlay');
191|const $modalContent = document.getElementById('modalContent');
192|const $modalClose = document.getElementById('modalClose');
193|const $backToTop = document.getElementById('backToTop');
194|const $randomOverlay = document.getElementById('randomOverlay');
195|const $randomContent = document.getElementById('randomContent');
196|const $randomClose = document.getElementById('randomClose');
197|const $shakeAgainBtn = document.getElementById('shakeAgainBtn');
198|const $acceptFateBtn = document.getElementById('acceptFateBtn');
199|const $sortDropdown = document.getElementById('sortDropdown');
200|
201|// ─── Spotlight ───────────────────────────────────────────
202|document.addEventListener('mousemove', (e) => {
203|  document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
204|  document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
205|});
206|
207|// ─── Back to Top ─────────────────────────────────────────
208|window.addEventListener('scroll', () => {
209|  $backToTop.classList.toggle('visible', window.scrollY > 400);
210|});
211|
212|$backToTop.addEventListener('click', () => {
213|  window.scrollTo({ top: 0, behavior: 'smooth' });
214|});
215|
216|// ─── Favorites ───────────────────────────────────────────
217|function loadFavorites() {
218|  try {
219|    favorites = JSON.parse(localStorage.getItem('mixflow_favorites') || '[]');
220|  } catch {
221|    favorites = [];
222|  }
223|  updateFavCount();
224|}
225|
226|function saveFavorites() {
227|  localStorage.setItem('mixflow_favorites', JSON.stringify(favorites));
228|  updateFavCount();
229|  render();
230|}
231|
232|function toggleFavorite(id) {
233|  const idx = favorites.indexOf(id);
234|  if (idx >= 0) {
235|    favorites.splice(idx, 1);
236|  } else {
237|    favorites.push(id);
238|  }
239|  saveFavorites();
240|}
241|
242|function isFavorite(id) {
243|  return favorites.includes(id);
244|}
245|
246|function updateFavCount() {
247|  $favCount.textContent = favorites.length;
248|}
249|
250|// ─── Translation helpers ─────────────────────────────────
251|function translateCategory(cat) {
252|  if (!cat) return '';
253|  if (currentLang === 'zh') return categoryTranslations[cat] || cat;
254|  return cat;
255|}
256|
257|function translateGlass(glass) {
258|  if (!glass) return '';
259|  if (currentLang === 'zh') return glassTranslations[glass] || glass;
260|  return glass;
261|}
262|
263|function translateAlcoholic(val) {
264|  if (!val) return '';
265|  if (val === 'Alcoholic') return t('alcoholic.alcoholic');
266|  if (val === 'Non alcoholic') return t('alcoholic.non');
267|  if (val === 'Optional alcohol') return t('alcoholic.optional');
268|  return val;
269|}
270|
271|function bilingualLabel(en, zh) {
272|  if (currentLang === 'zh') {
273|    return zh + ' <span class="trans-label">' + en + '</span>';
274|  }
275|  return en + ' <span class="trans-label">' + zh + '</span>';
276|}
277|
278|// ─── Data Loading ────────────────────────────────────────
279|async function loadData() {
280|  try {
281|    const [recipesRes, mocktailsRes] = await Promise.all([
282|      fetch('recipes.json'),
283|      fetch('mocktails.json')
284|    ]);
285|
286|    const recipesData = await recipesRes.json();
287|    const mocktailsData = await mocktailsRes.json();
288|
289|    const recipes = (recipesData.drinks || []).map(r => ({ ...r, _type: 'cocktail' }));
290|    const mocktails = (mocktailsData.drinks || []).map(r => ({ ...r, _type: 'mocktail' }));
291|
292|    allRecipes = [...recipes, ...mocktails];
293|    buildCategoryOptions(allRecipes);
294|    applyLang();
295|    updateLangToggle();
296|    render();
297|  } catch (err) {
298|    console.error('Failed to load recipes:', err);
299|    $loading.innerHTML = `<p style="color:var(--accent2)">${t('loading')}</p>`;
300|  }
301|}
302|
303|function buildCategoryOptions(recipes) {
304|  const cats = new Set();
305|  for (const r of recipes) {
306|    if (r.strCategory) cats.add(r.strCategory);
307|  }
308|  const allLabel = t('category.all');
309|  const sorted = ['all', ...Array.from(cats).sort()];
310|  $category.innerHTML = sorted.map(c => {
311|    const label = c === 'all' ? allLabel : translateCategory(c);
312|    return `<option value="${c}">${label}</option>`;
313|  }).join('');
314|}
315|
316|// ─── Filtering ───────────────────────────────────────────
317|function getFiltered() {
318|  let list = [];
319|
320|  if (currentTab === 'favorites') {
321|    list = allRecipes.filter(r => favorites.includes(r.idDrink));
322|  } else {
323|    list = allRecipes.filter(r => r._type === (currentTab === 'cocktails' ? 'cocktail' : 'mocktail'));
324|  }
325|
326|  // Search
327|  const q = $search.value.toLowerCase().trim();
328|  if (q) {
329|    list = list.filter(r => {
330|      const name = (r.strDrink || '').toLowerCase();
331|      const cat = (r.strCategory || '').toLowerCase();
332|      const glass = (r.strGlass || '').toLowerCase();
333|      const ings = getIngredients(r).join(' ').toLowerCase();
334|      return name.includes(q) || cat.includes(q) || glass.includes(q) || ings.includes(q);
335|    });
336|  }
337|
338|  // Category
339|  const catVal = $category.value;
340|  if (catVal && catVal !== 'all') {
341|    list = list.filter(r => r.strCategory === catVal);
342|  }
343|
344|  // Sort
345|  if (sortMode === 'name-asc') {
346|    list.sort((a, b) => (a.strDrink || '').localeCompare(b.strDrink || ''));
347|  } else if (sortMode === 'name-desc') {
348|    list.sort((a, b) => (b.strDrink || '').localeCompare(a.strDrink || ''));
349|  } else if (sortMode === 'category') {
350|    list.sort((a, b) => (a.strCategory || '').localeCompare(b.strCategory || ''));
351|  }
352|
353|  return list;
354|}
355|
356|function getIngredients(recipe) {
357|  const ings = [];
358|  for (let i = 1; i <= 15; i++) {
359|    const val = recipe['strIngredient' + i];
360|    if (val && typeof val === 'string' && val.trim()) {
361|      ings.push(val.trim());
362|    }
363|  }
364|  return ings;
365|}
366|
367|function getMeasures(recipe) {
368|  const measures = [];
369|  for (let i = 1; i <= 15; i++) {
370|    const val = recipe['strMeasure' + i];
371|    if (val && typeof val === 'string' && val.trim()) {
372|      measures.push(val.trim());
373|    }
374|  }
375|  return measures;
376|}
377|
378|// ─── Render ──────────────────────────────────────────────
379|function render() {
380|  const filtered = getFiltered();
381|
382|  $loading.style.display = 'none';
383|  $resultCount.textContent = filtered.length;
384|
385|  if (filtered.length === 0) {
386|    $grid.innerHTML = '';
387|    $empty.style.display = 'flex';
388|    return;
389|  }
390|
391|  $empty.style.display = 'none';
392|  $grid.innerHTML = filtered.map(recipe => createCard(recipe)).join('');
393|
394|  // Attach event listeners to cards
395|  $grid.querySelectorAll('.cocktail-card').forEach(card => {
396|    card.addEventListener('click', (e) => {
397|      if (e.target.closest('.card-fav')) return;
398|      openModal(card.dataset.id);
399|    });
400|  });
401|
402|  // Attach event listeners to fav buttons
403|  $grid.querySelectorAll('.card-fav').forEach(btn => {
404|    btn.addEventListener('click', (e) => {
405|      e.stopPropagation();
406|      toggleFavorite(btn.dataset.id);
407|      btn.classList.toggle('active', isFavorite(btn.dataset.id));
408|      btn.innerHTML = isFavorite(btn.dataset.id) ? '★' : '☆';
409|    });
410|  });
411|
412|  // Image error fallback
413|  $grid.querySelectorAll('.card-image').forEach(img => {
414|    img.addEventListener('error', () => {
415|      img.style.display = 'none';
416|      const placeholder = img.nextElementSibling;
417|      if (placeholder) placeholder.style.display = 'flex';
418|    });
419|  });
420|}
421|
422|function createCard(recipe) {
423|  const id = recipe.idDrink;
424|  const thumb = recipe.strDrinkThumb;
425|  const name = recipe.strDrink || 'Unknown';
426|  const category = recipe.strCategory || '';
427|  const glass = recipe.strGlass || '';
428|  const fav = isFavorite(id);
429|
430|  const imageHtml = thumb
431|    ? `<img class="card-image" src="${escapeHtml(thumb)}" alt="${escapeHtml(name)}" loading="lazy">`
432|    : '';
433|
434|  const placeholderHtml = thumb
435|    ? `<div class="card-image-placeholder" style="display:none">🍸</div>`
436|    : `<div class="card-image-placeholder">🍸</div>`;
437|
438|  const catLabel = translateCategory(category);
439|  const glassLabel = translateGlass(glass);
440|
441|  return `
442|    <div class="cocktail-card" data-id="${escapeHtml(id)}">
443|      ${imageHtml}${placeholderHtml}
444|      <button class="card-fav ${fav ? 'active' : ''}" data-id="${escapeHtml(id)}" aria-label="favorite">${fav ? '★' : '☆'}</button>
445|      <div class="card-body">
446|        <h3 class="card-title" title="${escapeHtml(name)}">${escapeHtml(name)}</h3>
447|        <div class="card-meta">
448|          ${category ? `<span class="card-category" title="${escapeHtml(category)}">${escapeHtml(catLabel)}</span>` : ''}
449|          ${glass ? `<span class="card-glass" title="${escapeHtml(glass)}">${escapeHtml(glassLabel)}</span>` : ''}
450|        </div>
451|      </div>
452|    </div>
453|  `;
454|}
455|
456|// ─── Modal ───────────────────────────────────────────────
457|function openModal(id) {
458|  const recipe = allRecipes.find(r => r.idDrink === id);
459|  if (!recipe) return;
460|
461|  const thumb = recipe.strDrinkThumb;
462|  const ingredients = getIngredients(recipe);
463|  const measures = getMeasures(recipe);
464|  const fav = isFavorite(id);
465|
466|  const imageHtml = thumb
467|    ? `<img class="modal-image" src="${escapeHtml(thumb)}" alt="${escapeHtml(recipe.strDrink)}">`
468|    : `<div class="modal-image-placeholder">🍸</div>`;
469|
470|  const ingredientsHtml = ingredients.map((ing, i) => `
471|    <li class="ingredient-item">
472|      <span class="ingredient-name">${escapeHtml(ing)}</span>
473|      ${measures[i] ? `<span class="ingredient-measure">${escapeHtml(measures[i])}</span>` : ''}
474|    </li>
475|  `).join('');
476|
477|  const catLabel = translateCategory(recipe.strCategory);
478|  const glassLabel = translateGlass(recipe.strGlass);
479|  const alcLabel = translateAlcoholic(recipe.strAlcoholic);
480|
481|  $modalContent.innerHTML = `
482|    ${imageHtml}
483|    <div class="modal-info">
484|      <h2 class="modal-title">${escapeHtml(recipe.strDrink)}</h2>
485|      <div class="modal-meta-row">
486|        ${recipe.strCategory ? `<span class="modal-badge" title="${escapeHtml(recipe.strCategory)}">${escapeHtml(catLabel)}</span>` : ''}
487|        ${recipe.strAlcoholic ? `<span class="modal-badge alcoholic">${escapeHtml(alcLabel)}</span>` : ''}
488|        ${recipe.strGlass ? `<span class="modal-badge" title="${escapeHtml(recipe.strGlass)}">${escapeHtml(glassLabel)}</span>` : ''}
489|        ${recipe.strIBA ? `<span class="modal-badge">${escapeHtml(recipe.strIBA)}</span>` : ''}
490|      </div>
491|
492|      ${ingredients.length > 0 ? `
493|        <div class="modal-section">
494|          <h3 class="modal-section-title">${bilingualLabel('Ingredients', '配料')}</h3>
495|          <ul class="ingredients-list">${ingredientsHtml}</ul>
496|        </div>
497|      ` : ''}
498|
499|      ${recipe.strInstructions ? `
500|        <div class="modal-section">
501|