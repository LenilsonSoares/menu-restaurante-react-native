/**
 * Casos de uso do carrinho (operações puras sobre a lista de itens).
 *
 * Todas as funções retornam novas listas (imutabilidade), sem efeitos colaterais.
 */
import type { CartItem } from '@/domain/cart/models';

/**
 * Adiciona um item ao carrinho. Se o produto já existir, incrementa a quantidade.
 *
 * @param items Lista atual de itens
 * @param item Item a adicionar (quantity >= 1)
 * @returns Nova lista com o item adicionado/atualizado
 */
export function addItem(items: CartItem[], item: CartItem): CartItem[] {
  const existing = items.find(i => i.productId === item.productId);
  if (existing) {
    return items.map(i => (i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i));
  }
  return [...items, item];
}

/**
 * Remove por productId (se não existir, retorna a lista original).
 */
export function removeItem(items: CartItem[], productId: string): CartItem[] {
  return items.filter(i => i.productId !== productId);
}

/**
 * Incrementa a quantidade de um item (se existir).
 */
export function increment(items: CartItem[], productId: string): CartItem[] {
  return items.map(i => (i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i));
}

/**
 * Decrementa a quantidade de um item; remove o item se a quantidade chegar a 0.
 */
export function decrement(items: CartItem[], productId: string): CartItem[] {
  return items
    .map(i => (i.productId === productId ? { ...i, quantity: Math.max(0, i.quantity - 1) } : i))
    .filter(i => i.quantity > 0);
}

/**
 * Limpa totalmente o carrinho.
 */
export function clear(): CartItem[] {
  return [];
}
