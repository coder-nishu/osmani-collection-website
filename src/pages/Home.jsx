import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Hero from "../components/Hero";
import SignatureSection from "../components/SignatureSection";
import FeaturedProducts from "../components/FeaturedProducts";
import WhyChooseUs from "../components/WhyChooseUs";
import BrandStory from "../components/BrandStory";
import CTASection from "../components/CTASection";
import { getBestSellers, getProductsByType } from "../services/productService";

export default function Home() {
  const featuredAttars = getProductsByType("attar").slice(0, 4);
  const featuredPerfumes = getProductsByType("perfume").slice(0, 4);
  const bestSellers = getBestSellers(4);

  return (
    <div className="bg-[color:var(--color-bg)]">
      <Navbar />
      <Hero />
      <SignatureSection />

      <FeaturedProducts
        title="Featured Attars"
        subtitle="Small-batch inspired attars with rich depth and lasting character"
        products={featuredAttars}
        buttonLabel="Explore All Attars"
        buttonHref="/attar"
      />

      <FeaturedProducts
        title="Featured Perfumes"
        subtitle="Modern perfume interpretations with premium projection and style"
        products={featuredPerfumes}
        buttonLabel="Explore All Perfumes"
        buttonHref="/perfume"
      />

      <WhyChooseUs />
      <BrandStory />

      <FeaturedProducts
        title="Best Sellers"
        subtitle="Most-loved signatures chosen by our fragrance community"
        products={bestSellers}
        buttonLabel="View Collection"
        buttonHref="/collections"
        showBestSellerTag
      />

      <CTASection />
      <Footer />
    </div>
  );
}
