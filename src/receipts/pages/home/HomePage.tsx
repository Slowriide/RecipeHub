import { CTAHomeSection } from "@/receipts/components/CTAHomeSection";
import { FeaturedRecipes } from "@/receipts/components/FeaturedRecipes";
import { HeroSection } from "@/receipts/components/HeroSection";
import { UserRecipes } from "@/receipts/components/UserRecipes";

export const HomePage = () => {
  return (
    <div className="font-montserrat">
      <HeroSection />

      <UserRecipes />

      <FeaturedRecipes />

      <CTAHomeSection />
    </div>
  );
};
