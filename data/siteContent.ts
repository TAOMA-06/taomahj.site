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
    question: '从具体场景动手，做完就能立刻用。',
    stance: '',
    related: 'web apps / browser tools / local-first'
  },
  {
    title: '信息组织',
    question: '把散乱数据收成可浏览、可检索的结构。',
    stance: '',
    related: 'data views / image tools / content systems'
  },
  {
    title: '克制界面',
    question: '界面只服务任务，不抢注意力。',
    stance: '',
    related: 'calm UI / interaction / maintainability'
  }
];

export const vocabularyGroups: VocabularyGroup[] = [
  {
    label: '语言',
    items: ['Swift', 'Python', 'TypeScript', 'C', 'MATLAB']
  },
  {
    label: '系统',
    items: ['macOS', 'Linux', 'Git', 'ACP', 'Local-first']
  },
  {
    label: 'AI 工作流',
    items: ['Ollama', 'Agents', 'Memory', 'Prompt Systems', 'Tool Use']
  },
  {
    label: '界面',
    items: ['SwiftUI', 'Next.js', 'React', 'GSAP', 'Canvas']
  }
];
