import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

type FormData = {
  name: string;
  phone: string;
  url?: string;
  category: string;
  secondaryCategory?: string;
  bio?: string;
  logoUrl?: string;
  containerColor?: string;
};

type BasicFieldsProps = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  categories: { id: string; name: string }[];
  isPremium: boolean;
  onPremiumToggle: (checked: boolean) => void;
};

export const BasicFields = ({ 
  register, 
  errors, 
  categories,
  isPremium,
  onPremiumToggle
}: BasicFieldsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Nome *</Label>
        <Input
          id="name"
          {...register("name", { required: true })}
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <span className="text-red-500 text-sm">Este campo é obrigatório</span>
        )}
      </div>

      <div>
        <Label htmlFor="phone">Telefone *</Label>
        <Input
          id="phone"
          {...register("phone", { required: true })}
          className={errors.phone ? "border-red-500" : ""}
        />
        {errors.phone && (
          <span className="text-red-500 text-sm">Este campo é obrigatório</span>
        )}
      </div>

      <div>
        <Label htmlFor="url">Website</Label>
        <Input id="url" {...register("url")} />
      </div>

      <div>
        <Label htmlFor="category">Categoria Principal *</Label>
        <select
          id="category"
          {...register("category", { required: true })}
          className={`w-full border rounded-md p-2 ${
            errors.category ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Selecione uma categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className="text-red-500 text-sm">Este campo é obrigatório</span>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="premium"
          checked={isPremium}
          onCheckedChange={onPremiumToggle}
        />
        <Label htmlFor="premium">Ativar Premium</Label>
      </div>
    </div>
  );
};