import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { AddBusinessForm } from "@/components/AddBusinessForm";
import { useState } from "react";
import { Pencil, Trash2, Plus, LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { PremiumDialog } from "@/components/PremiumDialog";
import { BusinessCard } from "@/components/BusinessCard";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showPremiumDialog, setShowPremiumDialog] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
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
      return data;
    },
  });

  const { data: userBusinesses = [], refetch: refetchBusinesses } = useQuery({
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

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('businesses')
        .delete()
        .eq('id', id)
        .eq('user_id', session?.user?.id);
      
      if (error) {
        console.error('Error deleting business:', error);
        toast({
          title: "Erro",
          description: "Ocorreu um erro ao remover o contacto.",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }

      // Invalidate and refetch queries
      await queryClient.invalidateQueries({ queryKey: ['userBusinesses'] });
      await queryClient.invalidateQueries({ queryKey: ['businesses'] });
      
      toast({
        title: "Sucesso!",
        description: "Contacto removido com sucesso.",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error deleting business:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao remover o contacto.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao fazer logout.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sucesso!",
        description: "Logout efetuado com sucesso.",
      });
      navigate('/');
    }
  };

  if (!session) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Perfil</h1>
        <p>Por favor, faça login para ver seu perfil.</p>
      </div>
    );
  }

  if (showAddForm) {
    return (
      <AddBusinessForm 
        categories={categories} 
        onCancel={() => setShowAddForm(false)}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Meus Contactos</h1>
        <div className="flex gap-2">
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="mr-2" />
            Adicionar Novo Contacto
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2" />
            Sair
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {userBusinesses.map((business) => (
          <div
            key={business.id}
            className="relative"
          >
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
            <div className="absolute top-2 right-2 flex gap-2">
              {!business.is_premium && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPremiumDialog(true)}
                >
                  Upgrade para Premium
                </Button>
              )}
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(business.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}

        {userBusinesses.length === 0 && (
          <p className="text-gray-600 text-center py-8">
            Você ainda não tem nenhum contacto cadastrado.
          </p>
        )}
      </div>

      <PremiumDialog 
        open={showPremiumDialog} 
        onOpenChange={setShowPremiumDialog}
        onSuccess={() => {
          refetchBusinesses();
          toast({
            title: "Sucesso!",
            description: "Seu plano foi atualizado com sucesso.",
          });
        }}
      />
    </div>
  );
};

export default Profile;