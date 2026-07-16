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
    description: '拼豆。iOS 创作与照片模板。',
    detail: 'SwiftUI · Canvas。自由创作与照片转图。原生主线；Unity 搁置。',
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
    description: '本机控制平面。调度 Grok Build。',
    detail: 'macOS · ACP。worktrees、权限、PTY、diff。开源；非官方。',
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
    description: '原文与译文同屏。',
    detail: 'Chrome / Safari 扩展。YouTube 字幕并列显示。',
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
    description: '鸡尾酒配方。浏览器查阅。',
    detail: '鸡尾酒配方。浏览器查阅。',
    image: '/assets/projects/mixflow.jpg',
    href: '/mixflow/index.html',
    tags: ['Web App', 'Recipe Data', 'Interaction'],
    status: 'Archive'
  },
  {
    id: 'perler',
    index: 'A2',
    title: 'Perler Bead',
    description: '图像至拼豆。',
    detail: '图像至拼豆。',
    image: '/assets/projects/perler.jpg',
    href: '/perler/index.html',
    tags: ['Canvas', 'Local-first', 'Image Tool'],
    status: 'Archive'
  },
  {
    id: 'chiwu',
    index: 'A3',
    title: '持物记录',
    description: '物品档案。长期记录。',
    detail: '物品档案。长期记录。',
    image: '/assets/projects/chiwu.jpg',
    href: '/chiwu/index.html',
    tags: ['Product', 'Archive', 'Mobile'],
    status: 'Archive'
  },
  {
    id: 'gallery',
    index: 'A4',
    title: 'Gallery',
    description: '壁纸。低干扰阅览。',
    detail: '壁纸。低干扰阅览。',
    image: '/assets/projects/gallery.jpg',
    href: '/gallery/index.html',
    tags: ['Gallery', 'Manifest', 'Media'],
    status: 'Archive'
  },
  {
    id: 'yonagi',
    index: 'A5',
    title: '夜凪食堂',
    description: '餐饮官网。S / P 对照样板。',
    detail: '餐饮官网。S / P 对照样板。',
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
