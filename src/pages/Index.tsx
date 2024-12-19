import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AddBusinessForm } from "@/components/AddBusinessForm";
import { Hero } from "@/components/Hero";
import { useState } from "react";
import { AuthDialog } from "@/components/AuthDialog";
import { BottomNav } from "@/components/navigation/BottomNav";
import { BusinessList } from "@/components/business/BusinessList";

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
    return <AddBusinessForm 
      categories={categories} 
      onCancel={() => setShowAddForm(false)}
    />;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Hero />
      <BusinessList groupedBusinesses={groupedBusinesses} />
      <BottomNav 
        session={session}
        onAddContact={() => session ? setShowAddForm(true) : setShowAuthDialog(true)}
        onShowAuth={() => setShowAuthDialog(true)}
      />
      <AuthDialog 
        open={showAuthDialog} 
        onOpenChange={setShowAuthDialog} 
      />
    </div>
  );
};

export default Index;