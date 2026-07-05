import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'taomahj',
  description: 'taomahj 的个人网站，记录网页工具、图像实验、本地优先应用和一些正在形成的想法。'
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
