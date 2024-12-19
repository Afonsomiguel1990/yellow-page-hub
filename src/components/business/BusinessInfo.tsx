import { Globe, PhoneCall } from "lucide-react";

type BusinessInfoProps = {
  name: string;
  phone: string;
  url?: string | null;
  isPremium: boolean;
  logoUrl?: string | null;
};

export const BusinessInfo = ({ name, phone, url, isPremium, logoUrl }: BusinessInfoProps) => {
  const formatUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  return (
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
  );
};