import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Heart, Star } from "lucide-react";
import { Link } from "react-router";

interface RecipeCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  cookTime: string;
  category: string;
  whereFrom: string;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export const RecipeCard = ({
  id,
  title,
  image,
  category,
  whereFrom,
  isFavorite,
  onToggleFavorite,
}: RecipeCardProps) => {
  return (
    <Card className="group overflow-hidden shadow-card  hover:shadow-soft transition-all duration-300 hover:scale-[1.02] bg-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {onToggleFavorite && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite(id);
            }}
          >
            <Heart
              className={`h-4 w-4 ${
                isFavorite
                  ? "fill-primario text-primary"
                  : "text-muted-foreground"
              }`}
            />
          </Button>
        )}
      </div>

      <CardContent className="pb-4 pl-4 pr-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
          <Badge className={`text-xs bg-primario`}>{whereFrom}</Badge>
        </div>

        <Link to={`/recipe/${id}`}>
          <h3 className="font-semibold text-lg mb-2 truncate hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>

        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          Incididunt enim sunt consequat ut ut officia. Ut Lorem aliqua tempor
          laboris ut. Ex eu incididunt in ex tempor esse laboris. Ullamco
          voluptate est in quis et quis ut. Ut sint occaecat ipsum cillum
          commodo incididunt velit ex velit. Consectetur et et excepteur ut
          deserunt qui. Incididunt minim mollit laborum excepteur laboris
          consectetur aliquip mollit proident exercitation.
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm">25 mins</span>
          </div>

          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-3 w-3 fill-primary text-primary" />
            ))}
            <span className="text-sm text-muted-foreground ml-1">4.8</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
