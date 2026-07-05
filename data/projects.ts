export type Project = {
  id: string;
  index: string;
  title: string;
  description: string;
  detail: string;
  image: string;
  href: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    id: 'mixflow',
    index: '01',
    title: 'MixFlow',
    description: '一个围绕搜索、发现和收藏组织的鸡尾酒配方浏览器。',
    detail:
      '把鸡尾酒配方整理成可以搜索、筛选和收藏的浏览体验。',
    image: '/assets/projects/mixflow.jpg',
    href: '/mixflow/index.html',
    tags: ['Web App', 'Recipe Data', 'Interaction']
  },
  {
    id: 'perler',
    index: '02',
    title: 'Perler Bead',
    description: '一个本地运行的图像转拼豆工具，强调材料感和预览控制。',
    detail:
      '在浏览器里完成图片转换，用珠子、间隙和圆角保留一点手作质感。',
    image: '/assets/projects/perler.jpg',
    href: '/perler/index.html',
    tags: ['Canvas', 'Local-first', 'Image Tool']
  },
  {
    id: 'chiwu',
    index: '03',
    title: '持物记录',
    description: '一个为长期物品记录而设计的本地优先应用概念。',
    detail:
      '为“身边物品”做一个更慢、更个人的记录入口。',
    image: '/assets/projects/chiwu.jpg',
    href: '/chiwu/index.html',
    tags: ['Product', 'Archive', 'Mobile']
  },
  {
    id: 'gallery',
    index: '04',
    title: 'Gallery',
    description: '一个由 manifest 驱动的低干扰壁纸画廊。',
    detail:
      '用简单的数据清单驱动图片展示，让浏览和下载路径保持直接。',
    image: '/assets/projects/gallery.jpg',
    href: '/gallery/index.html',
    tags: ['Gallery', 'Manifest', 'Media']
  }
];

export const skills = [
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
