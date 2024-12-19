import { Button } from "@/components/ui/button";
import { Plus, LogIn, UserPlus, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

interface BottomNavProps {
  session: Session | null;
  onAddContact: () => void;
  onShowAuth: () => void;
}

export const BottomNav = ({ session, onAddContact, onShowAuth }: BottomNavProps) => {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-3 py-2 flex justify-between items-center z-50 md:px-4 md:py-3">
      <div className="flex gap-1 sm:gap-2">
        {!session ? (
          <>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onShowAuth}
              className="text-xs sm:text-sm"
            >
              <LogIn className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Entrar
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onShowAuth}
              className="text-xs sm:text-sm"
            >
              <UserPlus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Registar
            </Button>
          </>
        ) : (
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleSignOut}
            className="text-xs sm:text-sm"
          >
            <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Perfil
          </Button>
        )}
      </div>
      <Button 
        size="sm"
        onClick={onAddContact}
        className="text-xs sm:text-sm"
      >
        <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
        Adicionar Contacto
      </Button>
    </div>
  );
};