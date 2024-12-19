import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BusinessCard } from "@/components/BusinessCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddBusinessForm } from "@/components/AddBusinessForm";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);

  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/');
      }
      return session;
    },
  });

  const { data: userBusinesses = [] } = useQuery({
    queryKey: ['userBusinesses'],
    queryFn: async () => {
      if (!session?.user.id) return [];
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!session?.user.id,
  });

  if (showAddForm) {
    return <AddBusinessForm onCancel={() => setShowAddForm(false)} />;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-yellow-800">Meu Perfil</h1>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Contacto
          </Button>
        </div>

        {userBusinesses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Ainda não tem nenhum anúncio.</p>
            <Button 
              className="mt-4" 
              onClick={() => setShowAddForm(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Criar Primeiro Anúncio
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {userBusinesses.map((business) => (
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
        )}
      </div>
    </div>
  );
};

export default Profile;