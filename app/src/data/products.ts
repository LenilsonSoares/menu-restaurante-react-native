/**
 * Tipos e dados estáticos de produtos para exibição e navegação.
 * Em produção, estes dados viriam de uma API.
 */
export type Product = { // Estrutura de um produto do cardápio
  id: string; // Identificador único
  name: string; // Nome exibido
  description: string; // Descrição breve
  price: number; // Preço unitário
  // string (URL) ou number (require de imagem local)
  image?: string | number; // Referência à imagem (URL ou require local)
  categoryId: string; // Categoria a que pertence
};

export const products: Product[] = [ // Dados estáticos para exibição (mock de API)
  {
    id: 'p1', // Produto 1
    name: 'Cheeseburger',
    description: 'Burger com queijo',
    price: 24.9,
    categoryId: 'burgers',
    image: require('../../assets/images/hamburguer.png'), // Asset local
  },
  {
    id: 'p2', // Produto 2
    name: 'Duplo Bacon',
    description: 'Burger duplo com bacon',
    price: 34.9,
    categoryId: 'burgers',
    image: require('../../assets/images/hamburguer1.png'),
  },
  {
    id: 'p3', // Produto 3
    name: 'Pizza Margherita',
    description: 'Tomate, muçarela e manjericão',
    price: 49.9,
    categoryId: 'pizzas',
    image: require('../../assets/images/pizza.png'),
  },
  {
    id: 'p4', // Produto 4
    name: 'Refrigerante Lata',
    description: '350ml',
    price: 6.5,
    categoryId: 'drinks',
    image: require('../../assets/images/refri.png'),
  },
  { id: 'p5', // Produto 5
    name: 'Sorvete',
    description: 'Baunilha', price: 12.0, categoryId: 'desserts',
    image: require('../../assets/images/sorvete.png')},
];
