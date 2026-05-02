import { Link } from "react-router-dom";

const collectionCards = [
  {
    title: "Attar",
    href: "/attar",
    image:
      "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Perfume",
    href: "/perfume",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Best Sellers",
    href: "/attar",
    image:
      "https://images.unsplash.com/photo-1610461888750-10bfc601b874?auto=format&fit=crop&w=1400&q=80",
  },
];

export default function CollectionSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-10 pb-6 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
      <div className="mb-8 text-center sm:mb-12">
        <p className="text-xs uppercase tracking-[0.28em] text-(--color-accent)">Collections</p>
        <h2 className="font-heading mt-3 text-4xl text-(--color-primary) sm:text-5xl">Explore Signature Lines</h2>
      </div>

      <div
        className="
          flex gap-4 overflow-x-auto px-4 pb-3
          snap-x snap-mandatory
          scroll-smooth
          [scrollbar-width:none]
          [-ms-overflow-style:none]
          [&::-webkit-scrollbar]:hidden

          sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0
          lg:grid-cols-3
        "
      >
        {collectionCards.map((card) => (
          <Link
            key={card.title}
            to={card.href}
            className="group relative min-w-[200px] w-[72%] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-auto sm:min-w-0"
          >
            <img
              src={card.image}
              alt={card.title}
              className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-64"
            />

            <div className="absolute inset-0 bg-linear-to-t from-[rgba(23,33,25,0.68)] via-[rgba(23,33,25,0.26)] to-[rgba(23,33,25,0.1)]" />

            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <p className="text-[11px] uppercase tracking-[0.25em] text-(--color-accent)">Shop</p>
              <h3 className="font-heading mt-2 text-2xl text-(--color-bg) sm:text-4xl">{card.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
