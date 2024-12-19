import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { AddBusinessForm } from "@/components/AddBusinessForm";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();

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
        .eq('id', id);
      
      if (error) throw error;

      toast({
        title: "Sucesso!",
        description: "Contacto removido com sucesso.",
      });
      refetchBusinesses();
    } catch (error) {
      console.error('Error deleting business:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao remover o contacto.",
        variant: "destructive",
      });
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
    return <AddBusinessForm categories={categories} onCancel={() => setShowAddForm(false)} />;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Meus Contactos</h1>
      <Button onClick={() => setShowAddForm(true)} className="mb-8">
        Adicionar Novo Contacto
      </Button>

      <div className="space-y-4">
        {userBusinesses.map((business) => (
          <div
            key={business.id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{business.name}</h3>
                <p className="text-sm text-gray-600">{business.phone}</p>
                {business.url && (
                  <a
                    href={business.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {business.url}
                  </a>
                )}
                <p className="text-sm text-gray-600 mt-1">
                  Categoria: {business.category}
                  {business.secondary_category && ` / ${business.secondary_category}`}
                </p>
                {business.is_premium && (
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded mt-2">
                    Premium
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDelete(business.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {userBusinesses.length === 0 && (
          <p className="text-gray-600 text-center py-8">
            Você ainda não tem nenhum contacto cadastrado.
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;