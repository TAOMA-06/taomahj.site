import type { ReactNode } from 'react';

type SectionFrameProps = {
  id?: string;
  label?: string;
  elevation?: string;
  showGrid?: boolean;
  floorPlate?: boolean;
  sectionCut?: boolean;
  floorTick?: boolean;
  className?: string;
  children: ReactNode;
  as?: 'section' | 'footer' | 'div';
};

export default function SectionFrame({
  id,
  label,
  elevation,
  showGrid = false,
  floorPlate = false,
  sectionCut = false,
  floorTick = false,
  className = '',
  children,
  as: Tag = 'section'
}: SectionFrameProps) {
  return (
    <Tag
      id={id}
      className={[
        'mim-section-frame',
        floorTick ? 'mim-floor-tick' : '',
        floorPlate ? 'mim-section-frame--floor-plate' : '',
        className
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {(label || elevation) && (
        <div className="mim-section-frame__label" aria-hidden="true">
          {label && <span>{label}</span>}
          {elevation && <span>{elevation}</span>}
        </div>
      )}
      {showGrid && <div className="mim-axis-grid" aria-hidden="true" />}
      {sectionCut && <div className="mim-section-cut" aria-hidden="true" />}
      <div className="mim-section-frame__border" aria-hidden="true" />
      {floorPlate && <div className="mim-floor-plate-line" aria-hidden="true" />}
      {children}
    </Tag>
  );
}
