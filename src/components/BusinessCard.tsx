import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PhoneCall, Globe, ChevronDown, ChevronUp } from "lucide-react";

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

  const cardStyle = {
    backgroundColor: containerColor || undefined,
    cursor: isPremium && bio ? 'pointer' : 'default'
  };

  const formatUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace('www.', '');
    } catch {
      return url;
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
                      {formatUrl(url)}
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
      </CardContent>
    </Card>
  );
};