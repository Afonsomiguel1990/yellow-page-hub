import { Card, CardContent } from "@/components/ui/card";
import { mockBusinesses, categories } from "@/data/mockData";
import { PhoneCall, Globe } from "lucide-react";

const Index = () => {
  const groupedBusinesses = categories.map(category => ({
    category: category.name,
    businesses: mockBusinesses.filter(business => business.category === category.name)
  })).filter(group => group.businesses.length > 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-yellow-100 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-yellow-900 mb-4">
            Páginas Amarelas Locais
          </h1>
          <p className="text-yellow-800 text-lg">
            Encontre os melhores negócios e serviços da sua cidade
          </p>
        </div>
      </div>

      {/* Business Listings */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {groupedBusinesses.map((group) => (
          <div key={group.category} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-yellow-800 sticky top-0 bg-background py-2">
              {group.category}
            </h2>
            <div className="space-y-3">
              {group.businesses.map((business) => (
                <Card key={business.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{business.name}</h3>
                        <div className="flex items-center mt-2 space-x-4">
                          <a
                            href={`tel:${business.phone}`}
                            className="flex items-center text-blue-600 hover:text-blue-800"
                          >
                            <PhoneCall className="h-4 w-4 mr-1" />
                            {business.phone}
                          </a>
                          {business.url && (
                            <a
                              href={business.url}
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;