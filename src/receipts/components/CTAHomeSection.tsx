import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export const CTAHomeSection = () => {
  return (
    <section className="py-16 bg-primario/10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-foreground">
          Ready to Start Cooking?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join our community of food lovers and share your favorite recipes with
          the world.
        </p>
        <Button asChild size="lg">
          <Link to="/add-recipe">Share Your Recipe</Link>
        </Button>
      </div>
    </section>
  );
};
