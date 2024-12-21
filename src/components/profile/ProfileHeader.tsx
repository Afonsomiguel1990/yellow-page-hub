import { LogOut, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type ProfileHeaderProps = {
  onAddContact: () => void;
  onLogout: () => void;
};

export const ProfileHeader = ({ onAddContact, onLogout }: ProfileHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold">Meus Contactos</h1>
      <div className="flex gap-2">
        <Button onClick={onAddContact}>
          <Plus className="mr-2" />
          Adicionar Novo Contacto
        </Button>
        <Button variant="outline" onClick={onLogout}>
          <LogOut className="mr-2" />
          Sair
        </Button>
      </div>
    </div>
  );
};