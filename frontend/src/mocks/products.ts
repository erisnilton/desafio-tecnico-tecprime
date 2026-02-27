import type { Product } from "../types/product";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Teclado Mecânico RGB",
    price: 299.9,
    description: "Teclado switch blue com iluminação RGB personalizável.",
    image: "https://picsum.photos/400/300?random=1",
    category: "Periféricos",
  },
  {
    id: 2,
    name: "Mouse Gamer 16000 DPI",
    price: 159.9,
    description: "Sensor óptico de alta precisão e botões programáveis.",
    image: "https://picsum.photos/400/300?random=2",
    category: "Periféricos",
  },
  {
    id: 3,
    name: 'Monitor 24" 144Hz',
    price: 1299.0,
    description: "Painel IPS com tempo de resposta de 1ms.",
    image: "https://picsum.photos/400/300?random=3",
    category: "Monitores",
  },
  {
    id: 4,
    name: "Headset 7.1 Surround",
    price: 249.9,
    description: "Áudio imersivo e microfone com cancelamento de ruído.",
    image: "https://picsum.photos/400/300?random=4",
    category: "Áudio",
  },
  {
    id: 5,
    name: "Cadeira Gamer Ergonômica",
    price: 899.0,
    description: "Ajuste de altura e inclinação para máximo conforto.",
    image: "https://picsum.photos/400/300?random=5",
    category: "Móveis",
  },
  {
    id: 6,
    name: "Webcam 4K Ultra HD",
    price: 399.9,
    description: "Ideal para streaming e videoconferências em alta qualidade.",
    image: "https://picsum.photos/400/300?random=6",
    category: "Acessórios",
  },
];
