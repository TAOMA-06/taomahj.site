'use client';

import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

type EnterGateProps = {
  onEnter: () => void;
};

export default function EnterGate({ onEnter }: EnterGateProps) {
  const [hidden, setHidden] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setHidden(true);
      onEnter();
    }
  }, [reducedMotion, onEnter]);

  const unlock = () => {
    if (hidden) return;
    setHidden(true);
    onEnter();
  };

  useEffect(() => {
    if (hidden || reducedMotion) return;

    const onWheel = () => unlock();
    const onTouch = () => unlock();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') unlock();
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouch, { passive: true });
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouch);
      window.removeEventListener('keydown', onKey);
    };
  }, [hidden, reducedMotion]);

  if (hidden) return null;

  return (
    <div className={`mim-enter-gate mim-enter-gate--glass${hidden ? ' mim-enter-gate--hidden' : ''}`} onClick={unlock}>
      <div className="mim-glass mim-glass--strong mim-glass-panel--gate text-center">
        <p className="mim-display">taomahj</p>
        <p className="mim-enter-gate__hint mt-3">Scroll to enter · 滚动进入</p>
      </div>
    </div>
  );
}
