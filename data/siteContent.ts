export type Theme = {
  title: string;
  question: string;
  stance: string;
  related: string;
};

export type VocabularyGroup = {
  label: string;
  items: string[];
};

export const themes: Theme[] = [
  {
    title: '实用工具',
    question: '从场景出发，功能服务于真实使用。',
    stance: '',
    related: 'web apps / browser tools / local-first'
  },
  {
    title: '信息组织',
    question: '重组数据与记录，建立可浏览的结构。',
    stance: '',
    related: 'data views / image tools / content systems'
  },
  {
    title: '克制界面',
    question: '解决问题，不制造干扰。',
    stance: '',
    related: 'calm UI / interaction / maintainability'
  }
];

export const vocabularyGroups: VocabularyGroup[] = [
  {
    label: '语言',
    items: ['Python', 'C', 'MATLAB', 'TypeScript', 'LaTeX']
  },
  {
    label: '系统',
    items: ['Linux', 'Git', 'Automation', 'Control Systems', 'Local-first']
  },
  {
    label: 'AI 工作流',
    items: ['Ollama', 'Agents', 'Memory', 'Prompt Systems', 'Tool Use']
  },
  {
    label: '界面',
    items: ['Next.js', 'React', 'Tailwind CSS', 'GSAP', 'Canvas']
  }
];
