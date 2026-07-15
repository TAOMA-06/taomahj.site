export type Project = {
  id: string;
  index: string;
  title: string;
  englishTitle?: string;
  description: string;
  detail: string;
  image: string;
  href: string;
  tags: string[];
  status: string;
  github?: string;
  featured?: boolean;
};

/** Homepage 主要展示 — public GitHub projects */
export const featuredProjects: Project[] = [
  {
    id: 'bubble',
    index: '01',
    title: 'BeadWorks',
    englishTitle: 'bubble',
    description: '拼豆手游：自由创作与照片→拼豆模板。',
    detail:
      '原生 iOS（SwiftUI + Canvas）为主线，Unity 已暂停。免费创作、照片转模板、编辑、熨烫与画廊，把拼豆流程收进可停留的移动界面。',
    image: '/assets/exhibition/perler-materials.png',
    href: 'https://github.com/TAOMA-06/bubble',
    github: 'https://github.com/TAOMA-06/bubble',
    tags: ['iOS', 'SwiftUI', 'Canvas', 'Game'],
    status: 'Active — native iOS',
    featured: true
  },
  {
    id: 'grok-build',
    index: '02',
    title: 'Grok Build Desktop',
    englishTitle: 'grok-build-agent',
    description: '本机优先的 macOS 控制平面，经 ACP 调度 Grok Build。',
    detail:
      '开源桌面端：worktrees、权限、PTY、diff 审阅、验证与崩溃恢复。非官方社区项目，与 xAI 无隶属关系。',
    image: '/assets/exhibition/mixflow-bar.png',
    href: 'https://github.com/TAOMA-06/grok-build-agent',
    github: 'https://github.com/TAOMA-06/grok-build-agent',
    tags: ['macOS', 'ACP', 'Local-first', 'Open Source'],
    status: 'Open source — unofficial',
    featured: true
  },
  {
    id: 'yt-captions',
    index: '03',
    title: 'YouTube 双语字幕',
    englishTitle: 'bilingual captions',
    description: '原文字幕与译文同屏显示。',
    detail:
      'Chrome / Safari 扩展：在 YouTube 上同时展示原文与译文字幕，减少来回切换与理解成本。',
    image: '/assets/exhibition/gallery-room.png',
    href: 'https://github.com/TAOMA-06/youtube-bilingual-captions',
    github: 'https://github.com/TAOMA-06/youtube-bilingual-captions',
    tags: ['Extension', 'Chrome', 'Safari', 'YouTube'],
    status: 'Public extension',
    featured: true
  }
];

/** Secondary archive — older web tools & sales demos (not homepage primary) */
export const archiveProjects: Project[] = [
  {
    id: 'mixflow',
    index: 'A1',
    title: 'MixFlow',
    description: '鸡尾酒配方浏览器。',
    detail: '鸡尾酒配方浏览器。',
    image: '/assets/projects/mixflow.jpg',
    href: '/mixflow/index.html',
    tags: ['Web App', 'Recipe Data', 'Interaction'],
    status: 'Archive'
  },
  {
    id: 'perler',
    index: 'A2',
    title: 'Perler Bead',
    description: '图像转拼豆工具。',
    detail: '图像转拼豆工具。',
    image: '/assets/projects/perler.jpg',
    href: '/perler/index.html',
    tags: ['Canvas', 'Local-first', 'Image Tool'],
    status: 'Archive'
  },
  {
    id: 'chiwu',
    index: 'A3',
    title: '持物记录',
    description: '长期物品的个人档案。',
    detail: '长期物品的个人档案。',
    image: '/assets/projects/chiwu.jpg',
    href: '/chiwu/index.html',
    tags: ['Product', 'Archive', 'Mobile'],
    status: 'Archive'
  },
  {
    id: 'gallery',
    index: 'A4',
    title: 'Gallery',
    description: '低干扰壁纸画廊。',
    detail: '低干扰壁纸画廊。',
    image: '/assets/projects/gallery.jpg',
    href: '/gallery/index.html',
    tags: ['Gallery', 'Manifest', 'Media'],
    status: 'Archive'
  },
  {
    id: 'yonagi',
    index: 'A5',
    title: '夜凪食堂',
    description: '小微餐饮官网销售样板。',
    detail: '同一家虚构餐厅的 Simple / Pro 两档官网交付对照。',
    image: '/assets/yonagi/counter.webp',
    href: '/sales/',
    tags: ['Restaurant', 'Sales Demo', 'Mobile-first'],
    status: 'Sales demo'
  }
];

/** @deprecated Prefer featuredProjects for homepage showcase */
export const projects: Project[] = featuredProjects;

export const skills = [
  'SwiftUI',
  'Next.js',
  'React',
  'Tailwind CSS',
  'GSAP',
  'Python',
  'C',
  'MATLAB',
  'Linux',
  'Git',
  'Ollama',
  'Automation',
  'Machine Learning'
];
