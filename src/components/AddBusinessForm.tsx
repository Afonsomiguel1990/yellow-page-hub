import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  phone: z.string().min(9, "Telefone deve ter 9 dígitos"),
  category: z.string().min(1, "Selecione uma categoria"),
  url: z.string().refine((val) => {
    if (!val) return true; // Allow empty strings
    // Only validate if there's a value
    try {
      new URL(val.startsWith('http') ? val : `https://${val}`);
      return true;
    } catch {
      return false;
    }
  }, "URL inválido").optional().or(z.literal("")),
  isPremium: z.boolean().default(false),
  bio: z.string().max(200, "A bio não pode ter mais de 200 caracteres").optional(),
  containerColor: z.string().optional(),
  logoUrl: z.string().optional(),
});

type Category = {
  id: string;
  name: string;
};

type AddBusinessFormProps = {
  categories: Category[];
};

export const AddBusinessForm = ({ categories }: AddBusinessFormProps) => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      category: "",
      url: "",
      isPremium: false,
      bio: "",
      containerColor: "",
      logoUrl: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Add https:// to URL if it doesn't start with http:// or https://
      const formattedUrl = values.url
        ? values.url.startsWith('http') 
          ? values.url 
          : `https://${values.url}`
        : null;

      const { error } = await supabase
        .from('businesses')
        .insert([
          {
            name: values.name,
            phone: values.phone,
            category: values.category,
            url: formattedUrl,
            is_premium: values.isPremium,
            bio: values.isPremium ? values.bio : null,
            container_color: values.isPremium ? values.containerColor : null,
            logo_url: values.isPremium ? values.logoUrl : null,
          },
        ]);

      if (error) throw error;

      toast({
        title: "Contacto adicionado com sucesso!",
        description: "O novo contacto foi salvo na base de dados.",
      });

      form.reset();
    } catch (error) {
      console.error('Error inserting contact:', error);
      toast({
        variant: "destructive",
        title: "Erro ao adicionar contacto",
        description: "Ocorreu um erro ao salvar o contacto. Por favor, tente novamente.",
      });
    }
  };

  const watchIsPremium = form.watch("isPremium");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Empresa/Profissional</FormLabel>
              <FormControl>
                <Input placeholder="Nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input placeholder="912345678" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <FormControl>
                <select 
                  {...field}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website ou Rede Social (opcional)</FormLabel>
              <FormControl>
                <Input placeholder="exemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPremium"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Perfil Premium</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Ative para ter acesso a recursos premium como logotipo, bio e mais destaque.
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {watchIsPremium && (
          <>
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio (até 200 caracteres)</FormLabel>
                  <FormControl>
                    <Input placeholder="Descreva seu negócio..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="containerColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cor do Container</FormLabel>
                  <FormControl>
                    <Input type="color" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL do Logotipo</FormLabel>
                  <FormControl>
                    <Input placeholder="URL da imagem do logotipo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <Button type="submit" className="w-full">
          Adicionar Contacto
        </Button>
      </form>
    </Form>
  );
};