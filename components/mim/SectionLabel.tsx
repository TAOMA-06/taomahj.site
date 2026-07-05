type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return <p className={`mim-section-label ${className}`}>{children}</p>;
}
