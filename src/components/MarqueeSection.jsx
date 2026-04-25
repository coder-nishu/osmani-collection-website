const marqueeText =
  "Premium Attars • Long Lasting • Arabian Fragrance • Signature Scents • ";

export default function MarqueeSection() {
  return (
    <section className="overflow-hidden border-y border-(--color-primary)/10 bg-(--color-bg) py-3">
      <div className="marquee-track">
        <p className="marquee-item text-xs uppercase tracking-[0.28em] text-(--color-primary)/75 sm:text-sm">
          {marqueeText.repeat(2)}
        </p>
        <p className="marquee-item text-xs uppercase tracking-[0.28em] text-(--color-primary)/75 sm:text-sm" aria-hidden="true">
          {marqueeText.repeat(2)}
        </p>
      </div>
    </section>
  );
}
