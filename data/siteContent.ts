export type Theme = {
  title: string;
  question: string;
  stance: string;
  related: string;
};

export type ProjectArgument = {
  id: string;
  question: string;
  method: string;
  argument: string;
};

export type VocabularyGroup = {
  label: string;
  items: string[];
};

export const themes: Theme[] = [
  {
    title: '做能用的小工具',
    question: '从一个真实的麻烦开始，而不是从一个很大的概念开始。',
    stance: '我喜欢把问题缩小到可以使用的界面里：能搜索、能预览、能保存，最好还能让人愿意反复打开。',
    related: 'web apps / browser tools / local-first'
  },
  {
    title: '整理复杂信息',
    question: '很多信息不是缺少内容，而是缺少一个清楚的观看方式。',
    stance: '我会把数据、图片、物品和记录重新组织成可浏览的结构，让页面先帮人建立方向感。',
    related: 'data views / image tools / content systems'
  },
  {
    title: '保持界面安静',
    question: '我希望工具解决问题，而不是制造新的注意力负担。',
    stance: '所以我偏好克制的视觉、明确的操作路径和可维护的结构。高级感应该来自清楚，而不是堆满效果。',
    related: 'calm UI / interaction / maintainability'
  }
];

export const projectArguments: ProjectArgument[] = [
  {
    id: 'mixflow',
    question: '配方数据怎样从列表变成可探索的知识界面？',
    method: '做了一个可以搜索、筛选、收藏鸡尾酒配方的浏览器应用，让配方不只是列表，而是可以慢慢探索的资料库。',
    argument: '我想练习的是信息密度和轻量体验之间的平衡：东西很多，但页面不能让人累。'
  },
  {
    id: 'perler',
    question: '图像处理工具怎样保留材料感，而不是只输出结果？',
    method: '做了一个本地运行的图像转拼豆工具，把图片转换成带间隙、圆角和珠子质感的预览。',
    argument: '我喜欢这种带一点手作感的工具：算法负责转换，界面负责让结果看起来仍然有材料的温度。'
  },
  {
    id: 'chiwu',
    question: '记录物品时，工具怎样承载时间而不是制造负担？',
    method: '设计了一个本地优先的物品记录应用页面，围绕物品档案、长期陪伴和个人记忆来组织内容。',
    argument: '它不是鼓励人不断输入，而是给那些已经留在身边的东西一个安静的位置。'
  },
  {
    id: 'gallery',
    question: '媒体浏览怎样做到低干扰，同时仍然可维护？',
    method: '做了一个由 manifest 驱动的壁纸画廊，把预览、浏览和下载整理成很直接的路径。',
    argument: '这个项目让我练习如何让展示页退后一步，把真正的主角留给图片本身。'
  }
];

export const vocabularyGroups: VocabularyGroup[] = [
  {
    label: 'Languages',
    items: ['Python', 'C', 'MATLAB', 'TypeScript', 'LaTeX']
  },
  {
    label: 'Systems',
    items: ['Linux', 'Git', 'Automation', 'Control Systems', 'Local-first']
  },
  {
    label: 'AI Workflow',
    items: ['Ollama', 'Agents', 'Memory', 'Prompt Systems', 'Tool Use']
  },
  {
    label: 'Interface',
    items: ['Next.js', 'React', 'Tailwind CSS', 'GSAP', 'Canvas']
  }
];
