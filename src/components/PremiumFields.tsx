import { useRef } from "react";
import { UseFormRegister } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

type PremiumFieldsProps = {
  register: UseFormRegister<FormData>;
  categories: { id: string; name: string }[];
};

export const PremiumFields = ({ register, categories }: PremiumFieldsProps) => {
  const premiumFieldsRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={premiumFieldsRef} className="space-y-4 pt-4 border-t">
      <div>
        <Label htmlFor="secondaryCategory">Categoria Secundária</Label>
        <select
          id="secondaryCategory"
          {...register("secondaryCategory")}
          className="w-full border rounded-md p-2 border-gray-300"
        >
          <option value="">Selecione uma categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="bio">Bio (até 200 caracteres)</Label>
        <Textarea
          id="bio"
          {...register("bio")}
          maxLength={200}
          placeholder="Descreva o seu negócio..."
        />
      </div>

      <div>
        <Label htmlFor="logoUrl">URL do Logotipo</Label>
        <Input
          id="logoUrl"
          {...register("logoUrl")}
          placeholder="https://exemplo.com/logo.png"
        />
      </div>

      <div>
        <Label htmlFor="containerColor">Cor do Container</Label>
        <Input
          id="containerColor"
          type="color"
          {...register("containerColor")}
          className="h-10"
        />
      </div>
    </div>
  );
};