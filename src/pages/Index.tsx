import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BusinessCard } from "@/components/BusinessCard";
import { AddBusinessForm } from "@/components/AddBusinessForm";
import { Hero } from "@/components/Hero";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Index = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      if (error) throw error;
      return data.sort(() => Math.random() - 0.5);
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

  const groupedBusinesses = categories.map(category => ({
    category: category.name,
    businesses: businesses.filter(business => 
      business.category === category.name || business.secondary_category === category.name
    )
  })).filter(group => group.businesses.length > 0);

  if (showAddForm) {
    return <AddBusinessForm categories={categories} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Hero />

      {/* Business Listings */}
      <div className="max-w-4xl mx-auto px-4 py-8 mt-4">
        {groupedBusinesses.map((group) => (
          <div key={group.category} className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-yellow-800 bg-background py-2">
              {group.category}
            </h2>
            <div className="space-y-3">
              {group.businesses.map((business) => (
                <BusinessCard
                  key={business.id}
                  id={business.id}
                  name={business.name}
                  phone={business.phone}
                  url={business.url}
                  isPremium={business.is_premium}
                  logoUrl={business.logo_url}
                  bio={business.bio}
                  containerColor={business.container_color}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Contact Button */}
      <Button 
        className="fixed bottom-4 right-4 shadow-lg z-50"
        size="lg"
        onClick={() => setShowAddForm(true)}
      >
        <Plus className="mr-2" />
        Adicionar Contacto
      </Button>
    </div>
  );
};

export default Index;