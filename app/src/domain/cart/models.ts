/**
 * Modelo de item no carrinho.
 *
 * Representa um produto selecionado pelo usuário com a quantidade desejada.
 */
export type CartItem = { // Define a estrutura de um item armazenado no carrinho
  /** Identificador único do produto */
  productId: string; // Usado para correlacionar operações (increment, remove, etc.)
  /** Nome do produto no momento da adição ao carrinho */
  name: string; // Congelado no momento da adição (não busca atualizações externas automaticamente)
  /** Preço unitário do produto (em centavos ou unidade monetária, conforme convenção do app) */
  price: number; // Valor individual usado nos cálculos de subtotal
  /** Quantidade atual no carrinho (>= 1 enquanto o item existir) */
  quantity: number; // Deve ser gerenciada pelos casos de uso para não ficar < 0
  /**
   * Referência à imagem do produto. Pode ser uma URL (string) ou um require local (número)
   * de acordo com o React Native.
   */
  image?: string | number; // Opcional: permite renderização visual sem obrigatoriedade
};
