import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AddBusinessForm } from "@/components/AddBusinessForm";
import { PremiumDialog } from "@/components/PremiumDialog";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileBusinessList } from "@/components/profile/BusinessList";

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

      // Invalidate queries to refresh the data
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['userBusinesses'] }),
        queryClient.invalidateQueries({ queryKey: ['businesses'] })
      ]);
      
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
      <ProfileHeader
        onAddContact={() => setShowAddForm(true)}
        onLogout={handleLogout}
      />

      <ProfileBusinessList
        businesses={userBusinesses}
        onDelete={handleDelete}
        onUpgradeToPremium={() => setShowPremiumDialog(true)}
      />

      <PremiumDialog 
        open={showPremiumDialog} 
        onOpenChange={setShowPremiumDialog}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ['userBusinesses'] });
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