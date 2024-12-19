import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BusinessInfo } from "./business/BusinessInfo";
import { BusinessBio } from "./business/BusinessBio";

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

  return (
    <Card 
      className={`transition-all duration-300 ${isPremium ? 'hover:shadow-lg' : 'hover:shadow-md'}`}
      style={cardStyle}
      onClick={() => isPremium && bio && setIsExpanded(!isExpanded)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <BusinessInfo
              name={name}
              phone={phone}
              url={url}
              isPremium={isPremium}
              logoUrl={logoUrl}
            />
            {isPremium && bio && (
              <BusinessBio
                bio={bio}
                isExpanded={isExpanded}
                onToggle={() => setIsExpanded(!isExpanded)}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};