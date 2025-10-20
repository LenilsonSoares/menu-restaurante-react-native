import type { CartItem } from '@/domain/cart/models';

export interface CartStorage {
  load(): Promise<CartItem[]>;
  save(items: CartItem[]): Promise<void>;
}
