import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'taomahj — 数字工具展厅',
  description: 'taomahj 的数字工具与界面设计展厅：将真实问题组织成清晰、可停留的产品体验。'
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
