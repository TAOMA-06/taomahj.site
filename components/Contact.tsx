export default function Contact() {
  return (
    <section id="contact" className="bg-ink px-6 py-24 text-white sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="section-kicker text-white/46">Contact</p>
          <h2 className="mt-5 max-w-4xl text-[clamp(52px,8vw,128px)] font-semibold leading-[0.88] tracking-[-0.075em]">
            如果你也在思考工具、系统和人的关系。
          </h2>
        </div>
        <a href="mailto:taomahj834225@outlook.com" className="contact-button">
          <span>写信给我</span>
          <span className="contact-arrow" aria-hidden="true">
            →
          </span>
        </a>
      </div>
      <footer className="mx-auto mt-20 flex max-w-[1180px] flex-wrap justify-between gap-4 border-t border-white/12 pt-6 text-sm text-white/48">
        <span>taomahj / 2026</span>
        <a href="https://github.com/TAOMA-06" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </footer>
    </section>
  );
}
