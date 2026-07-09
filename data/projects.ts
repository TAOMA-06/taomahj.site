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
    description: '鸡尾酒配方浏览器。',
    detail: '鸡尾酒配方浏览器。',
    image: '/assets/projects/mixflow.jpg',
    href: '/mixflow/index.html',
    tags: ['Web App', 'Recipe Data', 'Interaction']
  },
  {
    id: 'perler',
    index: '02',
    title: 'Perler Bead',
    description: '图像转拼豆工具。',
    detail: '图像转拼豆工具。',
    image: '/assets/projects/perler.jpg',
    href: '/perler/index.html',
    tags: ['Canvas', 'Local-first', 'Image Tool']
  },
  {
    id: 'chiwu',
    index: '03',
    title: '持物记录',
    description: '长期物品的个人档案。',
    detail: '长期物品的个人档案。',
    image: '/assets/projects/chiwu.jpg',
    href: '/chiwu/index.html',
    tags: ['Product', 'Archive', 'Mobile']
  },
  {
    id: 'gallery',
    index: '04',
    title: 'Gallery',
    description: '低干扰壁纸画廊。',
    detail: '低干扰壁纸画廊。',
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
