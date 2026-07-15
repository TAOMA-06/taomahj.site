/**
 * Architectural drafting-style glyphs (decorative).
 * Mount inside sections from Statement onward — not on hero.
 */

import type { ReactElement } from 'react';

type MotifVariant = 'wave' | 'mobius' | 'beam' | 'gear';

type DraftingMotifProps = {
  variant: MotifVariant;
  className?: string;
};

function mobiusPoint(u: number, v: number, R = 1, w = 0.28) {
  const half = u / 2;
  const cosU = Math.cos(u);
  const sinU = Math.sin(u);
  const cosH = Math.cos(half);
  const sinH = Math.sin(half);
  const x = (R + w * v * cosH) * cosU;
  const y = (R + w * v * cosH) * sinU;
  const z = w * v * sinH;
  const sx = x * 0.92 - z * 0.35;
  const sy = y * 0.72 + z * 0.62;
  return { x: sx, y: sy };
}

function sampleMobiusEdge(v: number, steps: number) {
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const u = (i / steps) * Math.PI * 2;
    const p = mobiusPoint(u, v);
    pts.push(`${p.x.toFixed(4)},${p.y.toFixed(4)}`);
  }
  return pts.join(' ');
}

const MOBIUS_OUTER = sampleMobiusEdge(1, 96);
const MOBIUS_INNER = sampleMobiusEdge(-1, 96);
const MOBIUS_CENTER = sampleMobiusEdge(0, 64);
const MOBIUS_TICKS = Array.from({ length: 6 }, (_, i) => {
  const u = (i / 6) * Math.PI * 2;
  const a = mobiusPoint(u, -1);
  const b = mobiusPoint(u, 1);
  return { x1: a.x, y1: a.y, x2: b.x, y2: b.y };
});
const MOBIUS_NODE = mobiusPoint(0, 1);
const MOBIUS_NODE2 = mobiusPoint(Math.PI, -1);

function sinePath(steps = 48) {
  const amp = 28;
  const parts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = 12 + t * 176;
    const y = 50 - Math.sin(t * Math.PI * 2) * amp;
    parts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return parts.join(' ');
}

const WAVE_PATH = sinePath();

function gearOutline(teeth = 14, rPitch = 70, rAdd = 12, rDed = 10) {
  const pts: string[] = [];
  const steps = teeth * 8;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = t * Math.PI * 2;
    const pulse = Math.cos(t * teeth * Math.PI * 2);
    const r = rPitch + (pulse > 0 ? pulse * rAdd : pulse * rDed);
    const x = 100 + Math.cos(angle) * r;
    const y = 100 + Math.sin(angle) * r;
    pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return pts.join(' ');
}

const GEAR_OUTLINE = gearOutline();

function WaveSvg() {
  return (
    <svg className="mim-drafting-motif__svg" viewBox="0 0 200 100" fill="none">
      <line className="mim-drafting-motif__guide" x1="8" y1="50" x2="192" y2="50" strokeDasharray="3 4" />
      <line className="mim-drafting-motif__guide" x1="100" y1="12" x2="100" y2="88" strokeDasharray="3 4" />
      <path className="mim-drafting-motif__edge" d={WAVE_PATH} />
      <path
        className="mim-drafting-motif__spine"
        d="M100 50 L148 28"
        strokeDasharray="4 3"
      />
      <path
        className="mim-drafting-motif__tick"
        d="M100 50 A 28 28 0 0 1 124 28"
      />
      <circle className="mim-drafting-motif__node" cx="100" cy="50" r="2.2" />
      <circle className="mim-drafting-motif__node" cx="148" cy="28" r="2" />
    </svg>
  );
}

function MobiusSvg() {
  return (
    <svg
      className="mim-drafting-motif__svg mim-drafting-motif__svg--spin"
      viewBox="-1.65 -1.45 3.3 2.9"
      fill="none"
    >
      <circle
        className="mim-drafting-motif__guide"
        cx="0"
        cy="0"
        r="1"
        strokeDasharray="0.04 0.08"
      />
      <circle className="mim-drafting-motif__guide" cx="0" cy="0" r="0.12" />
      {MOBIUS_TICKS.map((t, i) => (
        <line
          key={i}
          className="mim-drafting-motif__tick"
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
        />
      ))}
      <polyline className="mim-drafting-motif__edge" points={MOBIUS_OUTER} />
      <polyline className="mim-drafting-motif__edge" points={MOBIUS_INNER} />
      <polyline className="mim-drafting-motif__spine" points={MOBIUS_CENTER} />
      <circle
        className="mim-drafting-motif__node"
        cx={MOBIUS_NODE.x}
        cy={MOBIUS_NODE.y}
        r="0.035"
      />
      <circle
        className="mim-drafting-motif__node"
        cx={MOBIUS_NODE2.x}
        cy={MOBIUS_NODE2.y}
        r="0.035"
      />
    </svg>
  );
}

function BeamSvg() {
  return (
    <svg className="mim-drafting-motif__svg" viewBox="0 0 220 110" fill="none">
      {/* Beam line */}
      <line className="mim-drafting-motif__edge" x1="24" y1="42" x2="196" y2="42" />
      {/* Supports */}
      <path className="mim-drafting-motif__edge" d="M30 42 L22 58 L38 58 Z" />
      <path className="mim-drafting-motif__edge" d="M190 42 L182 58 L198 58 Z" />
      {/* Load arrow */}
      <line className="mim-drafting-motif__tick" x1="110" y1="14" x2="110" y2="40" />
      <path className="mim-drafting-motif__edge" d="M110 40 L104 32 M110 40 L116 32" />
      {/* Moment diagram (parabola-ish) */}
      <path
        className="mim-drafting-motif__spine"
        d="M30 70 Q110 102 190 70"
        strokeDasharray="4 3"
      />
      <line className="mim-drafting-motif__guide" x1="24" y1="70" x2="196" y2="70" strokeDasharray="2 3" />
      <circle className="mim-drafting-motif__node" cx="30" cy="42" r="2.2" />
      <circle className="mim-drafting-motif__node" cx="190" cy="42" r="2.2" />
      <circle className="mim-drafting-motif__node" cx="110" cy="42" r="2" />
    </svg>
  );
}

function GearSvg() {
  return (
    <svg className="mim-drafting-motif__svg" viewBox="0 0 200 200" fill="none">
      <circle
        className="mim-drafting-motif__spine"
        cx="100"
        cy="100"
        r="70"
        strokeDasharray="4 4"
      />
      <circle className="mim-drafting-motif__guide" cx="100" cy="100" r="28" />
      <polyline className="mim-drafting-motif__edge" points={GEAR_OUTLINE} />
      <line className="mim-drafting-motif__tick" x1="100" y1="78" x2="100" y2="122" />
      <line className="mim-drafting-motif__tick" x1="78" y1="100" x2="122" y2="100" />
      <circle className="mim-drafting-motif__node" cx="100" cy="100" r="3" />
    </svg>
  );
}

const VARIANTS: Record<MotifVariant, () => ReactElement> = {
  wave: WaveSvg,
  mobius: MobiusSvg,
  beam: BeamSvg,
  gear: GearSvg
};

export default function DraftingMotif({ variant, className = '' }: DraftingMotifProps) {
  const Svg = VARIANTS[variant];
  return (
    <div
      className={`mim-drafting-motif mim-drafting-motif--${variant} ${className}`.trim()}
      aria-hidden="true"
    >
      <Svg />
    </div>
  );
}
