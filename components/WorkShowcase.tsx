import SectionFrame from '@/components/mim/SectionFrame';
import { projects } from '@/data/projects';

const exhibitionImages: Record<string, { src: string; alt: string }> = {
  mixflow: { src: '/assets/exhibition/mixflow-bar.png', alt: '暗色石材酒吧空间' },
  perler: { src: '/assets/exhibition/perler-materials.png', alt: '混凝土与彩色骨料材料样本' },
  chiwu: { src: '/assets/exhibition/chiwu-archive.png', alt: '嵌入式混凝土陈列墙' },
  gallery: { src: '/assets/exhibition/gallery-room.png', alt: '光影中的极简展厅' }
};

export default function WorkShowcase() {
  return (
    <SectionFrame id="work" label="Exhibits" elevation="LEVEL 01" className="exhibit-work">
      <div className="exhibit-work__top">
        <div>
          <p className="exhibit-kicker">Selected work</p>
          <h2 className="mim-headline mt-5">精选项目</h2>
        </div>
        <p>每一件展品保持独立的工具逻辑，并共享同一套可浏览、可停留的展厅秩序。</p>
      </div>
      <div className="exhibit-work-list">
        {projects.map((project, index) => (
          <a key={project.id} href={project.href} data-mim-transition className="exhibit-work-card">
            <span className="exhibit-work-card__index">{String(index + 1).padStart(2, '0')} / 04</span>
            <div>
              <h3>{project.title}</h3>
              <p>{project.detail}</p>
            </div>
            <div className={`project-specimen project-specimen--${project.id}`}>
              <img src={exhibitionImages[project.id].src} alt={exhibitionImages[project.id].alt} />
              <span className="project-specimen__label">material study / 2026</span>
            </div>
          </a>
        ))}
      </div>
    </SectionFrame>
  );
}
