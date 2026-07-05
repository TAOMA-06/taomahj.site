import GlassPanel from '@/components/mim/GlassPanel';

export default function SiteNav() {
  return (
    <GlassPanel
      as="nav"
      variant="nav"
      className="mim-nav mim-nav--visible fixed left-0 right-0 top-0 z-[100] px-[var(--section-pad)] py-5 [&>div]:w-full"
    >
      <div className="flex w-full items-center justify-between gap-6">
        <a href="#" className="shrink-0 text-sm font-semibold uppercase tracking-[0.14em]">
          taomahj
        </a>
        <div className="mim-nav__links">
          <a href="#approach">About</a>
          <a href="#work">Work</a>
          <a href="#stack">Stack</a>
          <a href="#contact">Contact</a>
        </div>
        <a
          href="https://github.com/TAOMA-06"
          target="_blank"
          rel="noreferrer"
          className="shrink-0 text-xs font-semibold uppercase tracking-[0.12em] text-mist"
        >
          GitHub
        </a>
      </div>
    </GlassPanel>
  );
}
