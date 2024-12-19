import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AuthDialog } from "./AuthDialog";
import { PremiumDialog } from "./PremiumDialog";
import { useQuery } from "@tanstack/react-query";
import { BasicFields } from "./BasicFields";
import { PremiumFields } from "./PremiumFields";

type FormData = {
  name: string;
  phone: string;
  url?: string;
  category: string;
  secondaryCategory?: string;
  bio?: string;
  logoUrl?: string;
  containerColor?: string;
};

export const AddBusinessForm = ({ categories = [] }: { categories: any[] }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [isPremium, setIsPremium] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showPremiumDialog, setShowPremiumDialog] = useState(false);
  const { toast } = useToast();

  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!session?.user) {
      setShowAuthDialog(true);
      return;
    }

    try {
      const { error } = await supabase
        .from('businesses')
        .insert([
          {
            name: data.name,
            phone: data.phone,
            url: data.url && (data.url.startsWith('http://') || data.url.startsWith('https://')) 
              ? data.url 
              : data.url 
                ? `https://${data.url}`
                : null,
            category: data.category,
            secondary_category: isPremium ? data.secondaryCategory : null,
            is_premium: isPremium,
            bio: isPremium ? data.bio : null,
            logo_url: isPremium ? data.logoUrl : null,
            container_color: isPremium ? data.containerColor : null,
            user_id: session.user.id
          }
        ]);

      if (error) throw error;

      toast({
        title: "Sucesso!",
        description: "Contacto adicionado com sucesso.",
      });
    } catch (error) {
      console.error('Error adding business:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao adicionar o contacto.",
        variant: "destructive",
      });
    }
  };

  const handlePremiumToggle = (checked: boolean) => {
    if (!session?.user) {
      setShowAuthDialog(true);
      return;
    }

    if (checked) {
      setShowPremiumDialog(true);
      return;
    }

    setIsPremium(checked);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Adicionar Novo Contacto</h1>
      <p className="text-gray-600 mb-8">
        Adicione um novo profissional ou empresa à lista.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <BasicFields
          register={register}
          errors={errors}
          categories={categories}
          isPremium={isPremium}
          onPremiumToggle={handlePremiumToggle}
        />

        {isPremium && (
          <PremiumFields
            register={register}
            categories={categories}
          />
        )}

        <Button type="submit" className="w-full">
          Adicionar Contacto
        </Button>
      </form>

      <AuthDialog 
        open={showAuthDialog} 
        onOpenChange={setShowAuthDialog} 
      />

      <PremiumDialog 
        open={showPremiumDialog} 
        onOpenChange={setShowPremiumDialog}
        onSuccess={() => setIsPremium(true)}
      />
    </div>
  );
};