import type { Metadata } from 'next';
import DemoS from '@/components/sales/DemoS';
import { yonagi } from '@/data/yonagi';

export const metadata: Metadata = {
  title: yonagi.seo.s.title,
  description: yonagi.seo.s.description,
  openGraph: { title: yonagi.seo.s.title, description: yonagi.seo.s.description, images: ['/assets/yonagi/og-s.webp'] }
};

export default function SimpleDemoPage() { return <DemoS />; }
