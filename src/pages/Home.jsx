import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import HeroSection from "../components/HeroSection";
import MarqueeSection from "../components/MarqueeSection";
import CollectionSection from "../components/CollectionSection";
import FeaturedProducts from "../components/FeaturedProducts";
import CTASection from "../components/CTASection";

export default function Home() {
  return (
    <div className="bg-(--color-bg)">
      <Navbar />
      <HeroSection />
      <MarqueeSection />
      <CollectionSection />

      <FeaturedProducts
        title="Featured Attars"
        subtitle="Small-batch Arabian attars with rich depth and refined longevity."
        type="attar"
        buttonLabel="View All Attars ->"
        buttonHref="/attar"
      />

      <FeaturedProducts
        title="Featured Perfumes"
        subtitle="Modern premium blends crafted for elegant projection and presence."
        type="perfume"
        buttonLabel="View All Perfumes ->"
        buttonHref="/perfume"
      />

      <CTASection />
      <Footer />
    </div>
  );
}
