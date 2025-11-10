/**
 * Tipos e dados estáticos de categorias para o cardápio.
 */
export type Category = { id: string; name: string }; // Tipo básico de categoria

export const categories: Category[] = [ // Lista estática usada para navegação/abas
  { id: 'burgers', name: 'Burgers' }, // Hambúrgueres
  { id: 'pizzas', name: 'Pizzas' }, // Pizzas
  { id: 'drinks', name: 'Bebidas' }, // Bebidas
  { id: 'desserts', name: 'Sobremesas' }, // Sobremesas
];
