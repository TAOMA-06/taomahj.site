type DisplayTypeProps = {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'p';
  className?: string;
};

export default function DisplayType({ children, as: Tag = 'h1', className = '' }: DisplayTypeProps) {
  return <Tag className={`mim-display ${className}`}>{children}</Tag>;
}
