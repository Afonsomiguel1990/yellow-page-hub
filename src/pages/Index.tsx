import { Card, CardContent } from "@/components/ui/card";
import { mockBusinesses, categories } from "@/data/mockData";
import { PhoneCall, Globe, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  phone: z.string().min(9, "Telefone deve ter 9 dígitos"),
  category: z.string().min(1, "Selecione uma categoria"),
  url: z.string().url("URL inválido").optional().or(z.literal("")),
});

const Index = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      category: "",
      url: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // Aqui iremos adicionar a lógica para salvar no Supabase
  };

  const groupedBusinesses = categories.map(category => ({
    category: category.name,
    businesses: mockBusinesses.filter(business => business.category === category.name)
  })).filter(group => group.businesses.length > 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Fixed at top */}
      <div className="sticky top-0 z-50 bg-yellow-100 shadow-md">
        <div className="max-w-4xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-yellow-900 mb-2">
            Lista Empresas Abrantes
          </h1>
          <p className="text-yellow-800 text-lg mb-4">
            Encontra os profissionais que precisas aqui
          </p>
          {/* Advertisement Space */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-yellow-200">
            <p className="text-gray-500 text-sm">Espaço para Publicidade</p>
          </div>
        </div>
      </div>

      {/* Business Listings */}
      <div className="max-w-4xl mx-auto px-4 py-8 mt-4">
        {groupedBusinesses.map((group) => (
          <div key={group.category} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-yellow-800 bg-background py-2">
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

      {/* Add Contact Button */}
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            className="fixed bottom-4 right-4 shadow-lg z-50"
            size="lg"
          >
            <Plus className="mr-2" />
            Adicionar Contacto
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Adicionar Novo Contacto</SheetTitle>
            <SheetDescription>
              Adicione um novo profissional ou empresa à lista.
            </SheetDescription>
          </SheetHeader>
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
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Adicionar Contacto
                </Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Index;
