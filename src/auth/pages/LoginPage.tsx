import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserFromLocal, loginWithGoogle } from "@/firebase/auth";
import { cn } from "@/lib/utils";
import { Apple, Chrome, User } from "lucide-react";
export const LoginPage = () => {
  const user = getUserFromLocal();
  const isLogin = !user;

  return (
    <div className="min-h-screen bg-primario/10 flex items-center justify-center p-4">
      <div className="w-full  max-w-md animate-fade-in">
        <Card className="shadow-soft border-0 py-10">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primario rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-foreground">
                {isLogin ? "Welcome Back" : "Create Account"}
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-2">
                {isLogin
                  ? "Sign in to access your favorite recipes"
                  : "Join our cooking community today"}
              </CardDescription>
            </div>

            {/* Toggle Badges */}
            <div className="flex gap-2 justify-center">
              <Badge
                variant={isLogin ? "default" : "outline"}
                className={cn(
                  "cursor-pointer transition-all duration-200 hover:scale-105",
                  isLogin
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                // onClick={}
              >
                Login
              </Badge>
              <Badge
                variant={!isLogin ? "default" : "outline"}
                className={cn(
                  "cursor-pointer transition-all duration-200 hover:scale-105",
                  !isLogin
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                // onClick={}
              >
                Register
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full transition-all duration-200 hover:scale-[1.02] hover:shadow-soft"
                onClick={loginWithGoogle}
                type="button"
              >
                <Chrome className="h-4 w-4 mr-2" />
                Continue with Google
              </Button>

              <Button
                variant="outline"
                className="w-full transition-all duration-200 hover:scale-[1.02] hover:shadow-soft"
                // onClick={() => handleSocialLogin("Apple")}
                type="button"
              >
                <Apple className="h-4 w-4 mr-2" />
                Continue with Apple
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
