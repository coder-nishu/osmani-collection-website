import { Link } from "react-router-dom";

const heroImageUrl =
 "https://raw.githubusercontent.com/coder-nishu/osmani_images/main/aladin%20chearg.jpg";

export default function HeroSection() {
  return (
    <section className="relative min-h-[76vh] overflow-hidden sm:min-h-[82vh]">
      <img
        src={heroImageUrl}
        alt="Luxury attar and perfume bottle display"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-[rgba(23,33,25,0.48)]" />
      <div className="absolute inset-0 bg-linear-to-b from-[rgba(23,33,25,0.12)] via-[rgba(23,33,25,0.34)] to-[rgba(23,33,25,0.68)]" />

      <div className="relative mx-auto flex min-h-[76vh] max-w-7xl items-center justify-center px-4 py-20 text-center sm:min-h-[82vh] sm:px-6 lg:px-10">
        <div className="max-w-3xl animate-hero-fade-up">
          <p className="text-xs uppercase tracking-[0.34em] text-(--color-accent) sm:text-sm">
            Premium Arabian Perfumery
          </p>
          <h1 className="font-heading mt-6 text-5xl leading-[1.1] text-(--color-bg) sm:text-6xl lg:text-7xl">
            Luxury Attars That Define Presence
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-(--color-bg)/84 sm:text-lg">
            Long-lasting premium fragrances crafted for elegance
          </p>

          <div className="mt-11 flex justify-center">
            <Link to="/attar" className="btn-brand px-8 py-3 text-[11px]">
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
