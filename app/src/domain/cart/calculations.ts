/**
 * Cálculos agregados do carrinho.
 *
 * Centraliza a lógica de somatórios (subtotal, taxa e total) e a contagem
 * de itens, permitindo evolução futura (ex.: taxas dinâmicas, cupons, frete).
 */
import type { CartItem } from './models';

/**
 * Calcula totais financeiros e contagem de itens.
 *
 * Entrada:
 * - items: lista imutável de `CartItem`.
 *
 * Saída:
 * - subtotal: soma de preço unitário × quantidade.
 * - fee: taxa adicional (atualmente 0; parametrizável no futuro).
 * - total: subtotal + fee.
 * - count: soma das quantidades (quantidade total de unidades no carrinho).
 *
 * Observações:
 * - Não altera a lista recebida.
 */
export function computeTotals(items: CartItem[]) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const fee = 0; // parametrizável futuramente
  const total = subtotal + fee;
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  return { subtotal, fee, total, count };
}
