/**
 * Formata valores numéricos para BRL (pt-BR).
 *
 * @example
 * formatCurrency(12.5) => "R$ 12,50"
 */
export function formatCurrency(value: number) { // Converte número para moeda BRL (pt-BR)
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value); // Ex.: 12.5 -> "R$ 12,50"
}
