'use client';

import { useId, useState, type CSSProperties, type ReactNode } from 'react';

type GlassPanelVariant = 'nav' | 'card' | 'gate' | 'strip';

type GlassPanelProps = {
  children: ReactNode;
  variant?: GlassPanelVariant;
  liquid?: boolean;
  className?: string;
  as?: 'div' | 'nav' | 'section' | 'footer';
  style?: CSSProperties;
  'aria-hidden'?: boolean;
};

const variantClass: Record<GlassPanelVariant, string> = {
  nav: 'mim-glass mim-glass--strong mim-glass-panel--nav',
  card: 'mim-glass mim-glass-panel--card',
  gate: 'mim-glass mim-glass--strong mim-glass-panel--gate',
  strip: 'mim-glass mim-glass-panel--strip'
};

export default function GlassPanel({
  children,
  variant = 'card',
  liquid = false,
  className = '',
  as: Tag = 'div',
  style,
  'aria-hidden': ariaHidden
}: GlassPanelProps) {
  const uid = useId().replace(/:/g, '');
  const filterId = `mim-glass-liquid-${uid}`;
  const [hovered, setHovered] = useState(false);
  const displacement = hovered ? 24 : 8;

  return (
    <Tag
      className={`${variantClass[variant]}${liquid ? ' mim-glass-panel--liquid' : ''} ${className}`.trim()}
      style={style}
      aria-hidden={ariaHidden}
      onMouseEnter={liquid ? () => setHovered(true) : undefined}
      onMouseLeave={liquid ? () => setHovered(false) : undefined}
    >
      {liquid && (
        <svg aria-hidden="true" className="mim-glass-liquid-filter">
          <defs>
            <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" result="noise" />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale={displacement}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      )}
      <div style={liquid ? { filter: `url(#${filterId})` } : undefined}>{children}</div>
    </Tag>
  );
}
