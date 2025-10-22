/**
 * Modelo de item no carrinho.
 *
 * Representa um produto selecionado pelo usuário com a quantidade desejada.
 */
export type CartItem = {
  /** Identificador único do produto */
  productId: string;
  /** Nome do produto no momento da adição ao carrinho */
  name: string;
  /** Preço unitário do produto (em centavos ou unidade monetária, conforme convenção do app) */
  price: number;
  /** Quantidade atual no carrinho (>= 1 enquanto o item existir) */
  quantity: number;
  /**
   * Referência à imagem do produto. Pode ser uma URL (string) ou um require local (número)
   * de acordo com o React Native.
   */
  image?: string | number;
};
