import type { Metadata } from 'next';
import DemoP from '@/components/sales/DemoP';
import { yonagi } from '@/data/yonagi';

export const metadata: Metadata = {
  title: yonagi.seo.p.title,
  description: yonagi.seo.p.description,
  openGraph: { title: yonagi.seo.p.title, description: yonagi.seo.p.description, images: ['/assets/yonagi/og-p.webp'] }
};

export default function ProDemoPage() { return <DemoP />; }
