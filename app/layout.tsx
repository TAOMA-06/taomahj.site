import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://taomahj.site'),
  title: 'taomahj — 本机优先的数字工具',
  description:
    'taomahj：为日常场景做本机优先的工具与界面。公开项目包括拼豆手游、macOS Agent 控制平面与 YouTube 双语字幕。'
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
