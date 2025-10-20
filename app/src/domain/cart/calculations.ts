import type { CartItem } from './models';

export function computeTotals(items: CartItem[]) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const fee = 0; // parametrizável futuramente
  const total = subtotal + fee;
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  return { subtotal, fee, total, count };
}
