import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AuthDialog = ({ open, onOpenChange }: AuthDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar conta para adicionar contacto</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="light"
            providers={[]}
            redirectTo={window.location.origin}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};