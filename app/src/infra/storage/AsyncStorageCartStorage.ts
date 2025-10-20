import AsyncStorage from '@react-native-async-storage/async-storage';
import type { CartItem } from '@/domain/cart/models';
import type { CartStorage } from '@/application/ports/CartStorage';

const STORAGE_KEY = 'cart:v1';

export class AsyncStorageCartStorage implements CartStorage {
  async load(): Promise<CartItem[]> {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
    } catch {
      return [];
    }
  }

  async save(items: CartItem[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // silencioso
    }
  }
}
