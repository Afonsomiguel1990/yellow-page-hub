import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PhoneCall, Globe, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

type BusinessCardProps = {
  id: string;
  name: string;
  phone: string;
  url?: string | null;
  isPremium?: boolean;
  logoUrl?: string | null;
  bio?: string | null;
  containerColor?: string | null;
};

export const BusinessCard = ({ 
  id,
  name, 
  phone, 
  url, 
  isPremium = false,
  logoUrl,
  bio,
  containerColor
}: BusinessCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  const cardStyle = {
    backgroundColor: containerColor || undefined,
    cursor: isPremium && bio ? 'pointer' : 'default'
  };

  const togglePremium = async () => {
    try {
      const { error } = await supabase
        .from('businesses')
        .update({ 
          is_premium: !isPremium,
          // Add some sample premium data when enabling premium
          bio: !isPremium ? "Esta é uma bio de exemplo para testar o modo premium. Aqui pode escrever até 200 caracteres sobre o seu negócio." : null,
          container_color: !isPremium ? "#f0f9ff" : null,
          logo_url: !isPremium ? "https://picsum.photos/200" : null
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: !isPremium ? "Modo Premium ativado!" : "Modo Premium desativado",
        description: !isPremium 
          ? "Agora pode ver como funciona o modo premium" 
          : "Voltou ao modo normal",
      });
    } catch (error) {
      console.error('Error toggling premium:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível alterar o modo premium",
      });
    }
  };

  return (
    <Card 
      className={`transition-all duration-300 ${isPremium ? 'hover:shadow-lg' : 'hover:shadow-md'}`}
      style={cardStyle}
      onClick={() => isPremium && bio && setIsExpanded(!isExpanded)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              {logoUrl && (
                <img 
                  src={logoUrl} 
                  alt={`${name} logo`} 
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              <div>
                <h3 className={`font-medium ${isPremium ? 'text-xl' : 'text-lg'}`}>
                  {name}
                  {isPremium && <span className="ml-2 text-yellow-500 text-sm">Premium</span>}
                </h3>
                <div className="flex items-center mt-2 space-x-4">
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <PhoneCall className="h-4 w-4 mr-1" />
                    {phone}
                  </a>
                  {url && (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-gray-800"
                    >
                      <Globe className="h-4 w-4 mr-1" />
                      Website
                    </a>
                  )}
                </div>
              </div>
            </div>
            {isPremium && bio && (
              <div className="mt-2">
                {isExpanded ? (
                  <>
                    <p className="text-gray-600 mt-2">{bio}</p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsExpanded(false);
                      }}
                      className="text-gray-500 hover:text-gray-700 mt-2 flex items-center text-sm"
                    >
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Ver menos
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsExpanded(true);
                    }}
                    className="text-gray-500 hover:text-gray-700 flex items-center text-sm"
                  >
                    <ChevronDown className="h-4 w-4 mr-1" />
                    Ver mais
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        {/* Temporary Premium Toggle Button */}
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            togglePremium();
          }}
          variant={isPremium ? "destructive" : "default"}
          className="mt-4 w-full"
        >
          {isPremium ? "Desativar Premium" : "Ativar Premium"}
        </Button>
      </CardContent>
    </Card>
  );
};