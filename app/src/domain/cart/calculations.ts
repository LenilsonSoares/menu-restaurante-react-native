/**
 * Cálculos agregados do carrinho.
 *
 * Centraliza a lógica de somatórios (subtotal, taxa e total) e a contagem
 * de itens, permitindo evolução futura (ex.: taxas dinâmicas, cupons, frete).
 */
import type { CartItem } from './models'; // Importa o tipo base usado nos cálculos agregados

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
export function computeTotals(items: CartItem[]) { // Recebe lista imutável de itens e produz agregados financeiros
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0); // Soma preço * quantidade de cada item
  const fee = 0; // parametrizável futuramente (ex.: taxa de serviço)
  const total = subtotal + fee; // Total geral considerando taxa
  const count = items.reduce((sum, i) => sum + i.quantity, 0); // Quantidade total de unidades (para badge do carrinho, por ex.)
  return { subtotal, fee, total, count }; // Retorna objeto com todos os agregados para consumo na UI
}
