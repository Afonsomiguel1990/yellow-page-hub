import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const MONTHLY_PRICE = 3.99;
const ANNUAL_PRICE = 19.99;
const MONTHLY_PRICE_ID = "price_1QXrrqLsjurCRyLCd7TffCdP";
const ANNUAL_PRICE_ID = "price_1QXpzmLsjurCRyLC5DKD8i6g";

const benefits = [
  "Categoria secundária",
  "Bio personalizada (200 caracteres)",
  "Logotipo personalizado",
  "Cor do container personalizada",
  "Destaque na listagem"
];

export const PremiumPlans = ({ onClose }: { onClose?: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const annualSavings = Number((MONTHLY_PRICE * 12 - ANNUAL_PRICE).toFixed(2));
  const savingsPercentage = Math.round((annualSavings / (MONTHLY_PRICE * 12)) * 100);

  const handleSubscribe = async (priceId: string) => {
    try {
      setIsLoading(true);
      const response = await fetch("/functions/v1/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
        body: JSON.stringify({ priceId }),
      });

      const { url, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro ao processar o pagamento.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Plano Mensal */}
      <Card className="relative">
        <CardHeader>
          <CardTitle>Mensal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-4">
            €{MONTHLY_PRICE}
            <span className="text-sm font-normal text-muted-foreground">/mês</span>
          </div>
          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                {benefit}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => handleSubscribe(MONTHLY_PRICE_ID)}
            disabled={isLoading}
          >
            Assinar Plano Mensal
          </Button>
        </CardFooter>
      </Card>

      {/* Plano Anual */}
      <Card className="relative">
        <div className="absolute -top-3 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
          Poupe {savingsPercentage}%
        </div>
        <CardHeader>
          <CardTitle>Anual</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-4">
            €{ANNUAL_PRICE}
            <span className="text-sm font-normal text-muted-foreground">/ano</span>
          </div>
          <div className="mb-4 text-sm text-green-600">
            Poupe €{annualSavings} por ano
          </div>
          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                {benefit}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => handleSubscribe(ANNUAL_PRICE_ID)}
            disabled={isLoading}
          >
            Assinar Plano Anual
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};