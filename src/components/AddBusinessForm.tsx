import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AuthDialog } from "./AuthDialog";
import { PremiumDialog } from "./PremiumDialog";
import { useQuery } from "@tanstack/react-query";

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
  const premiumFieldsRef = useRef<HTMLDivElement>(null);

  // Fetch user profile and subscription status
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

  // Reset premium state when profile changes
  useEffect(() => {
    if (!profile?.is_premium) {
      setIsPremium(false);
    }
  }, [profile]);

  useEffect(() => {
    if (isPremium && premiumFieldsRef.current) {
      setTimeout(() => {
        premiumFieldsRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }, [isPremium]);

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
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nome *</Label>
            <Input
              id="name"
              {...register("name", { required: true })}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">Este campo é obrigatório</span>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Telefone *</Label>
            <Input
              id="phone"
              {...register("phone", { required: true })}
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">Este campo é obrigatório</span>
            )}
          </div>

          <div>
            <Label htmlFor="url">Website</Label>
            <Input id="url" {...register("url")} />
          </div>

          <div>
            <Label htmlFor="category">Categoria Principal *</Label>
            <select
              id="category"
              {...register("category", { required: true })}
              className={`w-full border rounded-md p-2 ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="text-red-500 text-sm">Este campo é obrigatório</span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="premium"
              checked={isPremium}
              onCheckedChange={handlePremiumToggle}
            />
            <Label htmlFor="premium">Ativar Premium</Label>
          </div>
        </div>

        {isPremium && profile?.is_premium && (
          <div ref={premiumFieldsRef} className="space-y-4 pt-4 border-t">
            <div>
              <Label htmlFor="secondaryCategory">Categoria Secundária</Label>
              <select
                id="secondaryCategory"
                {...register("secondaryCategory")}
                className="w-full border rounded-md p-2 border-gray-300"
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="bio">Bio (até 200 caracteres)</Label>
              <Textarea
                id="bio"
                {...register("bio")}
                maxLength={200}
                placeholder="Descreva o seu negócio..."
              />
            </div>

            <div>
              <Label htmlFor="logoUrl">URL do Logotipo</Label>
              <Input
                id="logoUrl"
                {...register("logoUrl")}
                placeholder="https://exemplo.com/logo.png"
              />
            </div>

            <div>
              <Label htmlFor="containerColor">Cor do Container</Label>
              <Input
                id="containerColor"
                type="color"
                {...register("containerColor")}
                className="h-10"
              />
            </div>
          </div>
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
