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
    description: 'AI cocktail recipe browser with search, discovery, and saved drinks.',
    detail:
      'A calm recipe surface that turns structured cocktail data into a fast, searchable, and collectible browsing experience.',
    image: '/assets/projects/mixflow.jpg',
    href: '/mixflow/index.html',
    tags: ['Web App', 'Recipe Data', 'Interaction']
  },
  {
    id: 'perler',
    index: '02',
    title: 'Perler Bead',
    description: 'Image-to-bead conversion with rounded cells, grid gaps, and local processing.',
    detail:
      'A browser-based image tool focused on tactile output: bead previews, clean controls, and no server round trips.',
    image: '/assets/projects/perler.jpg',
    href: '/perler/index.html',
    tags: ['Canvas', 'Local-first', 'Image Tool']
  },
  {
    id: 'chiwu',
    index: '03',
    title: '持物记录',
    description: 'A product page for a local-first item archive app.',
    detail:
      'A slower, more personal utility for recording the objects that stay with you over time and why they matter.',
    image: '/assets/projects/chiwu.jpg',
    href: '/chiwu/index.html',
    tags: ['Product', 'Archive', 'Mobile']
  },
  {
    id: 'gallery',
    index: '04',
    title: 'Gallery',
    description: 'A manifest-driven wallpaper gallery with preview and download flows.',
    detail:
      'A small gallery system that keeps the browsing surface quiet and lets the image collection do the work.',
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
