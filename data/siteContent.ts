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
    title: 'AI 工作流',
    question: '当模型越来越强，人的判断还应该留在哪里？',
    stance: '我更关心可解释、可复用、可被人接管的 AI 流程，而不是一次性的炫技输出。',
    related: 'Ollama / agents / memory / practical tooling'
  },
  {
    title: '自动化与系统',
    question: '怎样让复杂系统从“能跑”变成“能被理解”？',
    stance: '自动化不是把人拿掉，而是把重复、脆弱和不可见的部分整理成稳定结构。',
    related: 'control / Linux / hardware-minded engineering'
  },
  {
    title: '个人工具',
    question: '一个小工具怎样避免变成又一个临时玩具？',
    stance: '我偏好轻、清楚、长期可维护的界面，让工具在日常里安静地留下来。',
    related: 'local-first apps / browser utilities / calm interfaces'
  }
];

export const projectArguments: ProjectArgument[] = [
  {
    id: 'mixflow',
    question: '配方数据怎样从列表变成可探索的知识界面？',
    method: '用搜索、分类、收藏和克制的视觉节奏，把信息密度压进一个轻量浏览器工具。',
    argument: 'MixFlow 不是为了展示一个花哨应用，而是在证明：好的工具应该让数据变得轻、清楚、可回到。'
  },
  {
    id: 'perler',
    question: '图像处理工具怎样保留材料感，而不是只输出结果？',
    method: '把珠子、间隙、圆角和塑料光泽作为界面语言，让算法结果看起来仍然有物理质感。',
    argument: 'Perler Bead 代表一种偏好：技术转换应该尊重媒介，而不是把所有东西压成同一种屏幕效果。'
  },
  {
    id: 'chiwu',
    question: '记录物品时，工具怎样承载时间而不是制造负担？',
    method: '围绕长期陪伴、物品档案和本地优先的产品叙事，减少社交化和排行榜式的噪音。',
    argument: '持物记录把工具放慢一点：不是催促用户输入更多，而是给记忆留下一个稳定容器。'
  },
  {
    id: 'gallery',
    question: '媒体浏览怎样做到低干扰，同时仍然可维护？',
    method: '用 manifest 驱动内容，把浏览、预览和下载拆成直接、可预测的路径。',
    argument: 'Gallery 是一个小型内容系统实验：好的展示页应该让对象本身成为主角。'
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
