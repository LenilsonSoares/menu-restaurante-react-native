/**
 * Implementação de `CartStorage` usando AsyncStorage (React Native).
 *
 * Observações de design:
 * - Usa uma única chave (`STORAGE_KEY`) para persistir o array completo.
 * - Falhas são tratadas silenciosamente para não bloquear o fluxo da UI; em
 *   cenários reais, você pode instrumentar logs/telemetria.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { CartItem } from '@/domain/cart/models';
import type { CartStorage } from '@/application/ports/CartStorage';

const STORAGE_KEY = 'cart:v1';

export class AsyncStorageCartStorage implements CartStorage {
  /**
   * Carrega a lista do carrinho do AsyncStorage.
   * Retorna `[]` em caso de ausência de dados ou erro de parse/I/O.
   */
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

  /**
   * Salva a coleção completa de itens sob a mesma chave, sobrescrevendo valor anterior.
   * Erros são engolidos para evitar travar a UI.
   */
  async save(items: CartItem[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // silencioso
    }
  }
}
