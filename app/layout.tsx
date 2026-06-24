import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'taomahj',
  description: 'Apple-inspired personal homepage for taomahj.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
