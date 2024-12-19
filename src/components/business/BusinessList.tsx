import { BusinessCard } from "@/components/BusinessCard";

interface Business {
  id: string;
  name: string;
  phone: string;
  url?: string | null;
  is_premium?: boolean;
  logo_url?: string | null;
  bio?: string | null;
  container_color?: string | null;
}

interface BusinessGroup {
  category: string;
  businesses: Business[];
}

interface BusinessListProps {
  groupedBusinesses: BusinessGroup[];
}

export const BusinessList = ({ groupedBusinesses }: BusinessListProps) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mt-4">
      {groupedBusinesses.map((group) => (
        <div key={group.category} className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-yellow-800 bg-background py-2">
            {group.category}
          </h2>
          <div className="space-y-3">
            {group.businesses.map((business) => (
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
        </div>
      ))}
    </div>
  );
};