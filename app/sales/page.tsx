import type { Metadata } from 'next';
import SalesLanding from '@/components/sales/SalesLanding';

export const metadata: Metadata = {
  title: '飲食店ウェブサイト制作｜S / P デモ比較｜taomahj',
  description: '日本の小さな飲食店向けウェブサイト制作。49,800円相当のSimpleと98,000円相当のProを、同じ架空店舗で比較できます。',
  openGraph: {
    title: '飲食店ウェブサイト制作｜S / P デモ比較｜taomahj',
    description: '同じ小さな飲食店を、SimpleとProの二つの交付で比較。',
    images: ['/assets/yonagi/og-p.webp']
  }
};

export default function SalesPage() { return <SalesLanding />; }
