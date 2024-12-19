export type Business = {
  id: string;
  name: string;
  phone: string;
  category: string;
  url?: string;
};

export type Category = {
  id: string;
  name: string;
};

export const categories: Category[] = [
  { id: "1", name: "Carpinteiro" },
  { id: "2", name: "Serralheiro" },
  { id: "3", name: "Táxi" },
  { id: "4", name: "Peixaria" },
  { id: "5", name: "Empreiteiro" },
  { id: "6", name: "Mudanças" },
  { id: "7", name: "Eletricista" },
  { id: "8", name: "Canalizador" },
  { id: "9", name: "Padaria" },
  { id: "10", name: "Mercearia" }
];

export const mockBusinesses: Business[] = [
  {
    id: "1",
    name: "Carpintaria do Manuel",
    phone: "912345678",
    category: "Carpinteiro",
    url: "https://instagram.com/carpintariamanuel"
  },
  {
    id: "2",
    name: "Móveis Antigos - José Silva",
    phone: "934567890",
    category: "Carpinteiro"
  },
  {
    id: "3",
    name: "Serralharia Moderna",
    phone: "965432198",
    category: "Serralheiro",
    url: "https://facebook.com/serralhariamoderna"
  },
  {
    id: "4",
    name: "Metalúrgica Santos",
    phone: "927654321",
    category: "Serralheiro"
  },
  {
    id: "5",
    name: "Táxi João",
    phone: "939876543",
    category: "Táxi"
  },
  {
    id: "6",
    name: "Central Táxis",
    phone: "961234567",
    category: "Táxi",
    url: "https://centraltaxis.pt"
  },
  {
    id: "7",
    name: "Peixaria Mar Azul",
    phone: "932109876",
    category: "Peixaria",
    url: "https://instagram.com/peixariamarazul"
  },
  {
    id: "8",
    name: "Peixe Fresco do Dia",
    phone: "968765432",
    category: "Peixaria"
  },
  {
    id: "9",
    name: "Construções Oliveira",
    phone: "915678901",
    category: "Empreiteiro",
    url: "https://construcoesoliveira.pt"
  },
  {
    id: "10",
    name: "Obras & Remodelações",
    phone: "936789012",
    category: "Empreiteiro"
  },
  {
    id: "11",
    name: "Mudanças Rápidas",
    phone: "963210987",
    category: "Mudanças",
    url: "https://mudancasrapidas.pt"
  },
  {
    id: "12",
    name: "Transportes Silva & Filhos",
    phone: "924567890",
    category: "Mudanças"
  },
  {
    id: "13",
    name: "Eletricista 24h",
    phone: "967890123",
    category: "Eletricista"
  },
  {
    id: "14",
    name: "Instalações Elétricas Costa",
    phone: "938901234",
    category: "Eletricista",
    url: "https://eletricistacosta.pt"
  },
  {
    id: "15",
    name: "Canalizações Express",
    phone: "969012345",
    category: "Canalizador"
  },
  {
    id: "16",
    name: "Padaria Central",
    phone: "912345678",
    category: "Padaria",
    url: "https://instagram.com/padariacentral"
  },
  {
    id: "17",
    name: "Mercearia do Bairro",
    phone: "934567890",
    category: "Mercearia"
  }
];