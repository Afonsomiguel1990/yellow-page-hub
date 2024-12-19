import { useState, useEffect } from "react";
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
  const [createdBusinessId, setCreatedBusinessId] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return null;

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      return profile;
    },
  });

  useEffect(() => {
    if (!profile?.is_premium) {
      setIsPremium(false);
    }
  }, [profile]);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && createdBusinessId && session?.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ business_id: createdBusinessId })
          .eq('id', session.user.id);

        if (profileError) {
          console.error('Error updating profile:', profileError);
          return;
        }

        setShowAuthDialog(false);
        toast({
          title: "Conta criada com sucesso!",
          description: "Agora você pode acessar os recursos premium.",
        });
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [createdBusinessId, toast]);

  const handlePremiumToggle = async (checked: boolean) => {
    const session = await supabase.auth.getSession();
    if (checked && !session.data.session) {
      setShowAuthDialog(true);
      return;
    }

    if (!profile?.is_premium) {
      setShowPremiumDialog(true);
      return;
    }

    setIsPremium(checked);
  };

  const onSubmit = async (data: FormData) => {
    try {
      const { data: businessData, error } = await supabase
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
          }
        ])
        .select();

      if (error) throw error;

      if (businessData && businessData[0]) {
        setCreatedBusinessId(businessData[0].id);
      }

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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
        <BasicFields
          register={register}
          errors={errors}
          categories={categories}
          isPremium={isPremium}
          onPremiumToggle={handlePremiumToggle}
        />

        {isPremium && profile?.is_premium && (
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
      />
    </>
  );
};