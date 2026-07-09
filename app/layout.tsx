import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'taomahj — 数字工具与界面设计',
  description: '独立创作者 taomahj 的个人工作室。网页工具、图像应用与本地优先产品。'
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
