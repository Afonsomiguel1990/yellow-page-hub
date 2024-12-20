import { Link, useLocation } from "react-router-dom";
import { Home, User, LogIn } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface BottomNavProps {
  onAddContact?: () => void;
  onShowAuth?: () => void;
}

export const BottomNav = ({ onAddContact, onShowAuth }: BottomNavProps) => {
  const location = useLocation();

  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
  });

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
          
          {session ? (
            <Link
              to="/profile"
              className={`flex flex-col items-center p-2 ${
                location.pathname === "/profile" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <User className="h-6 w-6" />
              <span className="text-xs mt-1">Perfil</span>
            </Link>
          ) : (
            <button
              onClick={onShowAuth}
              className="flex flex-col items-center p-2 text-muted-foreground"
            >
              <LogIn className="h-6 w-6" />
              <span className="text-xs mt-1">Entrar</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};