import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AuthDialog = ({ open, onOpenChange }: AuthDialogProps) => {
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        toast({
          title: "Login bem-sucedido",
          description: "Bem-vindo de volta!",
          duration: 2000,
        });
        onOpenChange(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [onOpenChange, toast]);

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
                  email_input_placeholder: "O seu email",
                  password_input_placeholder: "A sua palavra-passe",
                  loading_button_label: "A criar conta...",
                  social_provider_text: "Entrar com {{provider}}",
                  link_text: "Não tem conta? Criar conta",
                  confirmation_text: "Verifique o seu email para confirmar o registo",
                },
                sign_in: {
                  email_label: "Email",
                  password_label: "Palavra-passe",
                  button_label: "Entrar",
                  email_input_placeholder: "O seu email",
                  password_input_placeholder: "A sua palavra-passe",
                  loading_button_label: "A entrar...",
                  social_provider_text: "Entrar com {{provider}}",
                  link_text: "Já tem conta? Entrar",
                },
                forgotten_password: {
                  link_text: "Esqueceu a palavra-passe?",
                  button_label: "Recuperar palavra-passe",
                  loading_button_label: "A enviar email...",
                  confirmation_text: "Verifique o seu email para recuperar a palavra-passe",
                },
              },
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};