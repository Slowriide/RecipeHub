import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import {
  ChefHat,
  Heart,
  Home,
  LogOut,
  Plus,
  User,
  type LucideIcon,
} from "lucide-react";
import { getUserFromLocal, logout } from "@/firebase/auth";

type NavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
};

export const CustomHeader = () => {
  const location = useLocation();
  const user = getUserFromLocal();

  const isActive = (path: string) => location.pathname === path;

  const navItems: NavItem[] = [
    { to: "/", label: "Home", icon: Home },
    { to: "/add-recipe", label: "Add Recipe", icon: Plus },
    { to: "/favorites", label: "Favorites", icon: Heart },
  ];

  if (user) {
    navItems.push({
      to: "#",
      label: "Logout",
      icon: LogOut,
      onClick: async () => {
        await logout();
        // recarga la página para actualizar header
        window.location.href = "/";
      },
    });
  } else {
    navItems.push({ to: "/auth/login", label: "Login", icon: User });
  }

  return (
    <header className="border-b bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primario rounded-full flex items-center justify-center">
              <ChefHat className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground">
              RecipeHub
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Button
                key={item.to}
                asChild
                variant={isActive(item.to) ? "default" : "ghost"}
                className="transition-all duration-200"
              >
                {item.onClick ? (
                  <button
                    onClick={item.onClick}
                    className="flex items-center space-x-2"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <Link to={item.to} className="flex items-center space-x-2">
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                )}
              </Button>
            ))}
          </nav>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center space-x-1">
            {navItems.map((item) =>
              item.onClick ? (
                <Button
                  key={item.label}
                  variant={isActive(item.to) ? "default" : "ghost"}
                  size="sm"
                  onClick={item.onClick}
                >
                  <item.icon className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  key={item.to}
                  asChild
                  variant={isActive(item.to) ? "default" : "ghost"}
                  size="sm"
                >
                  <Link to={item.to}>
                    <item.icon className="h-4 w-4" />
                  </Link>
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
