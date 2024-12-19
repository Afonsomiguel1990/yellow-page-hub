import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BusinessCard } from "@/components/BusinessCard";
import { AddBusinessForm } from "@/components/AddBusinessForm";
import { Hero } from "@/components/Hero";

const Index = () => {
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      if (error) throw error;
      return data;
    },
  });

  const { data: businesses = [] } = useQuery({
    queryKey: ['businesses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .order('is_premium', { ascending: false })
        .order('name');
      if (error) throw error;
      return data;
    },
  });

  const togglePremium = async (id: string, isPremium: boolean) => {
    try {
      const { error } = await supabase
        .from('businesses')
        .update({ 
          is_premium: !isPremium,
          bio: !isPremium ? "Esta é uma bio de exemplo para testar o modo premium. Aqui pode escrever até 200 caracteres sobre o seu negócio." : null,
          container_color: !isPremium ? "#f0f9ff" : null,
          logo_url: !isPremium ? "https://picsum.photos/200" : null
        })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error toggling premium:', error);
    }
  };

  const groupedBusinesses = categories.map(category => ({
    category: category.name,
    businesses: businesses.filter(business => 
      business.category === category.name || business.secondary_category === category.name
    )
  })).filter(group => group.businesses.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Hero />

      {/* Business Listings */}
      <div className="max-w-4xl mx-auto px-4 py-8 mt-4">
        {groupedBusinesses.map((group) => (
          <div key={group.category} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-yellow-800 bg-background py-2">
              {group.category}
            </h2>
            <div className="space-y-3">
              {group.businesses.map((business) => (
                <div key={business.id} className="space-y-2">
                  <BusinessCard
                    id={business.id}
                    name={business.name}
                    phone={business.phone}
                    url={business.url}
                    isPremium={business.is_premium}
                    logoUrl={business.logo_url}
                    bio={business.bio}
                    containerColor={business.container_color}
                  />
                  {/* Temporary Premium Toggle Button */}
                  <Button
                    onClick={() => togglePremium(business.id, business.is_premium)}
                    variant={business.is_premium ? "destructive" : "default"}
                    size="sm"
                    className="w-full"
                  >
                    {business.is_premium ? "Desativar Premium" : "Ativar Premium"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Contact Button */}
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            className="fixed bottom-4 right-4 shadow-lg z-50"
            size="lg"
          >
            <Plus className="mr-2" />
            Adicionar Contacto
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Adicionar Novo Contacto</SheetTitle>
            <SheetDescription>
              Adicione um novo profissional ou empresa à lista.
            </SheetDescription>
          </SheetHeader>
          <AddBusinessForm categories={categories} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Index;