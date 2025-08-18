import { CTAHomeSection } from "@/receipts/components/CTAHomeSection";
import { FeaturedRecipes } from "@/receipts/components/FeaturedRecipes";
import { HeroSection } from "@/receipts/components/HeroSection";

export const HomePage = () => {
  return (
    <div className="font-montserrat">
      <HeroSection />

      <FeaturedRecipes />

      <CTAHomeSection />
    </div>
  );
};
