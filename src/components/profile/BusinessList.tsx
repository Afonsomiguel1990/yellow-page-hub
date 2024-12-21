import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BusinessCard } from "@/components/BusinessCard";
import type { Database } from "@/integrations/supabase/types";

type Business = Database['public']['Tables']['businesses']['Row'];

type BusinessListProps = {
  businesses: Business[];
  onDelete: (id: string) => Promise<void>;
  onUpgradeToPremium: () => void;
};

export const ProfileBusinessList = ({ 
  businesses, 
  onDelete, 
  onUpgradeToPremium 
}: BusinessListProps) => {
  return (
    <div className="space-y-4">
      {businesses.map((business) => (
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
                onClick={onUpgradeToPremium}
              >
                Upgrade para Premium
              </Button>
            )}
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(business.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}

      {businesses.length === 0 && (
        <p className="text-gray-600 text-center py-8">
          Você ainda não tem nenhum contacto cadastrado.
        </p>
      )}
    </div>
  );
};