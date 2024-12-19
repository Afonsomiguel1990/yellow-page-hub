import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BusinessCard } from "@/components/BusinessCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
  });

  const { data: userBusinesses = [] } = useQuery({
    queryKey: ['userBusinesses'],
    queryFn: async () => {
      if (!session?.user?.id) return [];
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Por favor, faça login para ver seu perfil.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Meu Perfil</h1>
          <Button onClick={() => navigate('/add-business')}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Anúncio
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Meus Anúncios</h2>
            {userBusinesses.length === 0 ? (
              <p className="text-gray-500">Você ainda não tem anúncios.</p>
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
      </div>
    </div>
  );
};

export default Profile;