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
  // Ofícios e Trabalhos Manuais
  { id: "1", name: "Serralheiro" },
  { id: "2", name: "Carpinteiro" },
  { id: "3", name: "Marceneiro" },
  { id: "4", name: "Canalizador" },
  { id: "5", name: "Eletricista" },
  { id: "6", name: "Pintor" },
  { id: "7", name: "Pedreiro" },
  { id: "8", name: "Estucador" },
  { id: "9", name: "Vidraceiro" },
  { id: "10", name: "Soldador" },
  { id: "11", name: "Mecânico" },
  { id: "12", name: "Técnico de Ar Condicionado" },
  { id: "13", name: "Instalador de Painéis Solares" },
  
  // Trabalhos de Fabricação
  { id: "14", name: "Torneiro Mecânico" },
  { id: "15", name: "Operador de CNC" },
  { id: "16", name: "Ferramenteiro" },
  
  // Trabalhos Criativos
  { id: "17", name: "Restaurador de Móveis" },
  { id: "18", name: "Designer de Interiores" },
  { id: "19", name: "Artesão" },
  
  // Trabalhos de Reparação
  { id: "20", name: "Reparador de Eletrodomésticos" },
  { id: "21", name: "Técnico de Informática" },
  { id: "22", name: "Reparador de Móveis" },
  
  // Trabalhos ao Ar Livre
  { id: "23", name: "Jardineiro" },
  { id: "24", name: "Paisagista" },
  
  // Transportes e Logística
  { id: "25", name: "Motorista" },
  { id: "26", name: "Estafeta" },
  { id: "27", name: "Mudanças" },
  
  // Trabalhos Especializados
  { id: "28", name: "Engenheiro Civil" },
  { id: "29", name: "Topógrafo" },
  { id: "30", name: "Instalador de Equipamentos" }
];

export const mockBusinesses: Business[] = [
  {
    id: "1",
    name: "Serralharia Moderna",
    phone: "912345678",
    category: "Serralheiro",
    url: "https://instagram.com/serralhariamoderna"
  },
  {
    id: "2",
    name: "Carpintaria do Manuel",
    phone: "934567890",
    category: "Carpinteiro"
  },
  {
    id: "3",
    name: "Marcenaria Artística",
    phone: "965432198",
    category: "Marceneiro",
    url: "https://facebook.com/marcenariaartistica"
  },
  {
    id: "4",
    name: "Canalizações 24h",
    phone: "927654321",
    category: "Canalizador"
  },
  {
    id: "5",
    name: "Eletricista João",
    phone: "939876543",
    category: "Eletricista"
  },
  {
    id: "6",
    name: "Pinturas & Acabamentos",
    phone: "961234567",
    category: "Pintor",
    url: "https://pinturasacabamentos.pt"
  },
  {
    id: "7",
    name: "Pedreiro Silva",
    phone: "932109876",
    category: "Pedreiro"
  },
  {
    id: "8",
    name: "Estuques Decorativos",
    phone: "968765432",
    category: "Estucador"
  },
  {
    id: "9",
    name: "Vidros & Espelhos",
    phone: "915678901",
    category: "Vidraceiro",
    url: "https://vidrosespelhos.pt"
  },
  {
    id: "10",
    name: "Soldadura Técnica",
    phone: "936789012",
    category: "Soldador"
  },
  {
    id: "11",
    name: "Mecânica Geral Auto",
    phone: "963210987",
    category: "Mecânico",
    url: "https://mecanicageral.pt"
  },
  {
    id: "12",
    name: "Ar Condicionado Express",
    phone: "924567890",
    category: "Técnico de Ar Condicionado"
  },
  {
    id: "13",
    name: "Solar Solutions",
    phone: "967890123",
    category: "Instalador de Painéis Solares"
  },
  {
    id: "14",
    name: "Tornearia de Precisão",
    phone: "938901234",
    category: "Torneiro Mecânico"
  },
  {
    id: "15",
    name: "CNC Pro",
    phone: "969012345",
    category: "Operador de CNC"
  },
  {
    id: "16",
    name: "Ferramentas & Moldes",
    phone: "912345678",
    category: "Ferramenteiro"
  },
  {
    id: "17",
    name: "Restauro de Antiguidades",
    phone: "934567890",
    category: "Restaurador de Móveis"
  },
  {
    id: "18",
    name: "Design de Interiores Silva",
    phone: "965432198",
    category: "Designer de Interiores"
  },
  {
    id: "19",
    name: "Artesanato Tradicional",
    phone: "927654321",
    category: "Artesão"
  },
  {
    id: "20",
    name: "Reparações Domésticas 24h",
    phone: "939876543",
    category: "Reparador de Eletrodomésticos"
  }
];