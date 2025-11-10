/**
 * Casos de uso do carrinho (operações puras sobre a lista de itens).
 *
 * Todas as funções retornam novas listas (imutabilidade), sem efeitos colaterais.
 */
import type { CartItem } from '@/domain/cart/models'; // Tipagem do item do carrinho usada nas funções puras abaixo

/**
 * Adiciona um item ao carrinho. Se o produto já existir, incrementa a quantidade.
 *
 * @param items Lista atual de itens
 * @param item Item a adicionar (quantity >= 1)
 * @returns Nova lista com o item adicionado/atualizado
 */
export function addItem(items: CartItem[], item: CartItem): CartItem[] { // Adiciona um novo item ou soma a quantidade se já existir
  const existing = items.find(i => i.productId === item.productId); // Procura item já presente pelo productId
  if (existing) { // Se já existir, cria nova lista atualizando somente o item correspondente
    return items.map(i => (i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i)); // Imutabilidade: retorna novo array com o item alvo tendo quantity somada
  }
  return [...items, item]; // Se não existir, retorna nova lista com o item adicionado ao final
}

/**
 * Remove por productId (se não existir, retorna a lista original).
 */
export function removeItem(items: CartItem[], productId: string): CartItem[] { // Remove item pelo productId
  return items.filter(i => i.productId !== productId); // Mantém somente itens cujo productId seja diferente
}

/**
 * Incrementa a quantidade de um item (se existir).
 */
export function increment(items: CartItem[], productId: string): CartItem[] { // Incrementa a quantidade do item se existir
  return items.map(i => (i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i)); // Cria novo array alterando somente o item alvo
}

/**
 * Decrementa a quantidade de um item; remove o item se a quantidade chegar a 0.
 */
export function decrement(items: CartItem[], productId: string): CartItem[] { // Decrementa a quantidade; remove o item se chegar a zero
  return items
    .map(i => (i.productId === productId ? { ...i, quantity: Math.max(0, i.quantity - 1) } : i)) // Garante que quantity não fique negativa
    .filter(i => i.quantity > 0); // Filtra itens com quantity > 0, removendo os zerados
}

/**
 * Limpa totalmente o carrinho.
 */
export function clear(): CartItem[] { // Limpa completamente o carrinho
  return []; // Retorna um novo array vazio
}
