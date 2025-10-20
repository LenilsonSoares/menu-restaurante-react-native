export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  categoryId: string;
};

export const products: Product[] = [
  { id: 'p1', name: 'Cheeseburger', description: 'Burger com queijo', price: 24.9, categoryId: 'burgers' },
  { id: 'p2', name: 'Duplo Bacon', description: 'Burger duplo com bacon', price: 34.9, categoryId: 'burgers' },
  { id: 'p3', name: 'Pizza Margherita', description: 'Tomate, muçarela e manjericão', price: 49.9, categoryId: 'pizzas' },
  { id: 'p4', name: 'Refrigerante Lata', description: '350ml', price: 6.5, categoryId: 'drinks' },
  { id: 'p5', name: 'Sorvete', description: 'Baunilha', price: 12.0, categoryId: 'desserts' },
];
