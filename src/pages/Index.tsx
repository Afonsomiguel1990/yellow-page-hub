import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BusinessCard } from "@/components/BusinessCard";
import { AddBusinessForm } from "@/components/AddBusinessForm";
import { Hero } from "@/components/Hero";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, LogIn, UserPlus, User } from "lucide-react";
import { AuthDialog } from "@/components/AuthDialog";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const { data: session, isLoading: isSessionLoading } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log("Current session:", session); // Debug log
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

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
    <div className="min-h-screen bg-background pb-20">
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

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-3 py-2 flex justify-between items-center z-50 md:px-4 md:py-3">
        <div className="flex gap-1 sm:gap-2">
          {!session ? (
            <>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowAuthDialog(true)}
                className="text-xs sm:text-sm"
              >
                <LogIn className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Entrar
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowAuthDialog(true)}
                className="text-xs sm:text-sm"
              >
                <UserPlus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Registar
              </Button>
            </>
          ) : (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/profile')}
              className="text-xs sm:text-sm"
            >
              <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Perfil
            </Button>
          )}
        </div>
        <Button 
          size="sm"
          onClick={() => session ? setShowAddForm(true) : setShowAuthDialog(true)}
          className="text-xs sm:text-sm"
        >
          <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          Adicionar Contacto
        </Button>
      </div>

      <AuthDialog 
        open={showAuthDialog} 
        onOpenChange={setShowAuthDialog} 
      />
    </div>
  );
};

export default Index;