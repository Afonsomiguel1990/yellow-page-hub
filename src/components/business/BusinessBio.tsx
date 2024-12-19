import { ChevronDown, ChevronUp } from "lucide-react";

type BusinessBioProps = {
  bio: string;
  isExpanded: boolean;
  onToggle: () => void;
};

export const BusinessBio = ({ bio, isExpanded, onToggle }: BusinessBioProps) => {
  return (
    <div className="mt-2">
      {isExpanded ? (
        <>
          <p className="text-gray-600 mt-2">{bio}</p>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
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
            onToggle();
          }}
          className="text-gray-500 hover:text-gray-700 flex items-center text-sm"
        >
          <ChevronDown className="h-4 w-4 mr-1" />
          Ver mais
        </button>
      )}
    </div>
  );
};