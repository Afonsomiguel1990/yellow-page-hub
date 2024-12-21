import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AddBusinessForm } from "@/components/AddBusinessForm";
import { Hero } from "@/components/Hero";
import { useState } from "react";
import { AuthDialog } from "@/components/AuthDialog";
import { BottomNav } from "@/components/navigation/BottomNav";
import { BusinessList } from "@/components/business/BusinessList";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

const Index = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log("Current session:", session);
      return session;
    },
  });

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
    return (
      <AddBusinessForm 
        categories={categories} 
        onCancel={() => setShowAddForm(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Hero />
      {!session && (
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Button 
            onClick={() => setShowAuthDialog(true)}
            className="w-full flex items-center justify-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Criar conta para adicionar contacto
          </Button>
        </div>
      )}
      <BusinessList groupedBusinesses={groupedBusinesses} />
      <AuthDialog 
        open={showAuthDialog} 
        onOpenChange={setShowAuthDialog} 
      />
    </div>
  );
};

export default Index;