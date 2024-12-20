import { Link, useLocation } from "react-router-dom";
import { Home, User } from "lucide-react";

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-around py-2">
          <Link
            to="/"
            className={`flex flex-col items-center p-2 ${
              location.pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Início</span>
          </Link>
          <Link
            to="/profile"
            className={`flex flex-col items-center p-2 ${
              location.pathname === "/profile" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">Perfil</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}