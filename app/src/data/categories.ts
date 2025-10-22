/**
 * Tipos e dados estáticos de categorias para o cardápio.
 */
export type Category = { id: string; name: string };

export const categories: Category[] = [
  { id: 'burgers', name: 'Burgers' },
  { id: 'pizzas', name: 'Pizzas' },
  { id: 'drinks', name: 'Bebidas' },
  { id: 'desserts', name: 'Sobremesas' },
];
