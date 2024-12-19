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
            localization={{
              variables: {
                sign_up: {
                  email_label: "Email",
                  password_label: "Palavra-passe",
                  button_label: "Criar conta",
                  loading_button_label: "A criar conta...",
                  social_provider_text: "Entrar com {{provider}}",
                  link_text: "Não tem conta? Criar conta",
                },
                sign_in: {
                  email_label: "Email",
                  password_label: "Palavra-passe",
                  button_label: "Entrar",
                  loading_button_label: "A entrar...",
                  social_provider_text: "Entrar com {{provider}}",
                  link_text: "Já tem conta? Entrar",
                },
              },
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};