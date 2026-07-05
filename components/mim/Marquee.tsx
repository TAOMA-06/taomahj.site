type MarqueeProps = {
  text: string;
  reverse?: boolean;
  className?: string;
};

export default function Marquee({ text, reverse = false, className = '' }: MarqueeProps) {
  const items = Array.from({ length: 8 }, () => text);

  return (
    <div className={`mim-marquee${reverse ? ' mim-marquee--reverse' : ''} ${className}`}>
      <div className="mim-marquee__track">
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="mim-headline uppercase opacity-30">
            {item}
          </span>
        ))}
        {items.map((item, index) => (
          <span key={`dup-${item}-${index}`} className="mim-headline uppercase opacity-30" aria-hidden="true">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
