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
    description: '拼豆创作与照片转模板的 iOS 手游。',
    detail:
      '面向喜欢拼豆的人：自由画布创作，或把照片变成可熨烫的拼豆图。SwiftUI + Canvas 原生主线，Unity 已停。',
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
    description: '本机调度 Grok Build 的 macOS 控制平面。',
    detail:
      '开源桌面端，经 ACP 管理 worktrees、权限、PTY 与 diff 审阅。非官方社区项目，与 xAI 无隶属关系。',
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
    description: '原文字幕与译文同屏的浏览器扩展。',
    detail:
      '在 YouTube 上同时显示原文与译文字幕，少切换、好跟读。支持 Chrome 与 Safari。',
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
    description: '按配方浏览鸡尾酒，浏览器里直接查。',
    detail: '按配方浏览鸡尾酒，浏览器里直接查。',
    image: '/assets/projects/mixflow.jpg',
    href: '/mixflow/index.html',
    tags: ['Web App', 'Recipe Data', 'Interaction'],
    status: 'Archive'
  },
  {
    id: 'perler',
    index: 'A2',
    title: 'Perler Bead',
    description: '任意图片转成拼豆像素图。',
    detail: '任意图片转成拼豆像素图。',
    image: '/assets/projects/perler.jpg',
    href: '/perler/index.html',
    tags: ['Canvas', 'Local-first', 'Image Tool'],
    status: 'Archive'
  },
  {
    id: 'chiwu',
    index: 'A3',
    title: '持物记录',
    description: '为长期陪伴的物品建个人档案。',
    detail: '为长期陪伴的物品建个人档案。',
    image: '/assets/projects/chiwu.jpg',
    href: '/chiwu/index.html',
    tags: ['Product', 'Archive', 'Mobile'],
    status: 'Archive'
  },
  {
    id: 'gallery',
    index: 'A4',
    title: 'Gallery',
    description: '低干扰的壁纸浏览与原图下载。',
    detail: '低干扰的壁纸浏览与原图下载。',
    image: '/assets/projects/gallery.jpg',
    href: '/gallery/index.html',
    tags: ['Gallery', 'Manifest', 'Media'],
    status: 'Archive'
  },
  {
    id: 'yonagi',
    index: 'A5',
    title: '夜凪食堂',
    description: '同一家虚构小餐厅的 S / P 官网对照。',
    detail: '同一家虚构小餐厅的 Simple / Pro 两档官网交付对照。',
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
