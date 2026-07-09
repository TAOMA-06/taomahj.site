'use client';

import EnterGate from '@/components/mim/EnterGate';
import { useSmoothScroll } from '@/components/mim/SmoothScrollProvider';

export default function EnterGateBridge() {
  const { entered, setEntered } = useSmoothScroll();

  if (entered) return null;

  return <EnterGate onEnter={() => setEntered(true)} />;
}
