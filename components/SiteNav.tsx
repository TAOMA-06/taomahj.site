export default function SiteNav() {
  return (
    <nav className="mim-nav" aria-label="主导航">
      <div className="mim-nav__inside">
        <a href="#hero" className="mim-nav__brand">
          taomahj
        </a>
        <div className="mim-nav__links">
          <a href="#approach">关于</a>
          <a href="#work">作品</a>
          <a href="#stack">技术</a>
          <a href="#contact">联系</a>
        </div>
        <a
          href="https://github.com/TAOMA-06"
          target="_blank"
          rel="noreferrer"
          className="mim-nav__link mim-nav__link--out"
        >
          GitHub
        </a>
      </div>
    </nav>
  );
}
