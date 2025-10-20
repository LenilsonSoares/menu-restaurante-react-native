import type { CartItem } from '@/domain/cart/models';

export function addItem(items: CartItem[], item: CartItem): CartItem[] {
  const existing = items.find(i => i.productId === item.productId);
  if (existing) {
    return items.map(i => (i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i));
  }
  return [...items, item];
}

export function removeItem(items: CartItem[], productId: string): CartItem[] {
  return items.filter(i => i.productId !== productId);
}

export function increment(items: CartItem[], productId: string): CartItem[] {
  return items.map(i => (i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i));
}

export function decrement(items: CartItem[], productId: string): CartItem[] {
  return items
    .map(i => (i.productId === productId ? { ...i, quantity: Math.max(0, i.quantity - 1) } : i))
    .filter(i => i.quantity > 0);
}

export function clear(): CartItem[] {
  return [];
}
