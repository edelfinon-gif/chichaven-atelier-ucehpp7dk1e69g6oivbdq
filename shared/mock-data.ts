import type { User, Chat, ChatMessage, Product } from './types';
export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Usuário A' },
  { id: 'u2', name: 'Usuário B' }
];
export const MOCK_CHATS: Chat[] = [
  { id: 'c1', title: 'Geral' },
];
export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  { id: 'm1', chatId: 'c1', userId: 'u1', text: 'Olá', ts: Date.now() },
];
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Vestido de Gala em Cetim',
    description: 'Um luxuoso vestido de cetim longo para ocasiões formais e eventos especiais.',
    price: 299.99,
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop',
    category: 'Vestidos',
    brand: 'ChicAtelier',
    colors: ['#000000', '#800000', '#FFD700']
  },
  {
    id: 'p2',
    name: 'Blazer de Lã Sob Medida',
    description: 'Blazer sofisticado de corte justo feito com lã italiana premium.',
    price: 189.00,
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop',
    category: 'Casacos',
    brand: 'UrbanEdge',
    colors: ['#2F4F4F', '#000000']
  },
  {
    id: 'p3',
    name: 'Blusa Transpassada de Seda',
    description: 'Elegante blusa 100% seda pura com um design transpassado gracioso.',
    price: 120.00,
    imageUrl: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=800&auto=format&fit=crop',
    category: 'Blusas',
    brand: 'SilkRoad',
    colors: ['#FFFFFF', '#F5F5DC', '#FFC0CB']
  },
  {
    id: 'p4',
    name: 'Bolsa Tote de Couro Clássica',
    description: 'Bolsa tote espaçosa para o dia a dia, confeccionada em couro de curtimento vegetal.',
    price: 210.00,
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop',
    category: 'Acessórios',
    brand: 'Heritage',
    colors: ['#8B4513', '#000000']
  },
  {
    id: 'p5',
    name: 'Suéter de Cashmere Gola Alta',
    description: 'Suéter de gola alta ultra macio feito de cashmere da Mongólia.',
    price: 155.00,
    imageUrl: 'https://images.unsplash.com/photo-1574180563860-007bc9d87340?q=80&w=800&auto=format&fit=crop',
    category: 'Tricô',
    brand: 'ChicAtelier',
    colors: ['#D3D3D3', '#A52A2A', '#000080']
  },
  {
    id: 'p6',
    name: 'Calça de Alfaiataria Cintura Alta',
    description: 'Calças modernas de perna larga com um ajuste lisonjeiro de cintura alta.',
    price: 95.00,
    imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop',
    category: 'Calças',
    brand: 'UrbanEdge',
    colors: ['#000000', '#F5F5DC']
  },
  {
    id: 'p7',
    name: 'Vestido Curto de Veludo',
    description: 'Vestido chic de veludo cotelê, perfeito para festas e coquetéis.',
    price: 140.00,
    imageUrl: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?q=80&w=800&auto=format&fit=crop',
    category: 'Vestidos',
    brand: 'SilkRoad',
    colors: ['#4B0082', '#006400']
  },
  {
    id: 'p8',
    name: 'Cachecol de Lã Merino',
    description: 'Cachecol de lã merino extra longo com acabamento em franjas.',
    price: 45.00,
    imageUrl: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=800&auto=format&fit=crop',
    category: 'Acessórios',
    brand: 'Heritage',
    colors: ['#C0C0C0', '#800000', '#DEB887']
  }
];