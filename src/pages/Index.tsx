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
        .order('name');
      if (error) throw error;
      return data;
    },
  });

  const groupedBusinesses = categories.map(category => ({
    category: category.name,
    businesses: businesses.filter(business => business.category === category.name)
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
                <BusinessCard
                  key={business.id}
                  name={business.name}
                  phone={business.phone}
                  url={business.url}
                />
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