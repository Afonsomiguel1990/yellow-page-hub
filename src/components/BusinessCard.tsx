import { Card, CardContent } from "@/components/ui/card";
import { PhoneCall, Globe } from "lucide-react";

type BusinessCardProps = {
  name: string;
  phone: string;
  url?: string | null;
};

export const BusinessCard = ({ name, phone, url }: BusinessCardProps) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardContent className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg">{name}</h3>
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
    </CardContent>
  </Card>
);