/**
 * Implementação de `CartStorage` usando AsyncStorage (React Native).
 *
 * Observações de design:
 * - Usa uma única chave (`STORAGE_KEY`) para persistir o array completo.
 * - Falhas são tratadas silenciosamente para não bloquear o fluxo da UI; em
 *   cenários reais, você pode instrumentar logs/telemetria.
 */
import AsyncStorage from '@react-native-async-storage/async-storage'; // Biblioteca de armazenamento chave-valor assíncrono do React Native
import type { CartItem } from '@/domain/cart/models'; // Tipo dos itens que serão serializados/desserializados
import type { CartStorage } from '@/application/ports/CartStorage'; // Contrato que esta classe implementa

const STORAGE_KEY = 'cart:v1'; // Chave única sob a qual o array completo de itens será salvo no AsyncStorage

export class AsyncStorageCartStorage implements CartStorage { // Implementação concreta do contrato CartStorage usando AsyncStorage
  /**
   * Carrega a lista do carrinho do AsyncStorage.
   * Retorna `[]` em caso de ausência de dados ou erro de parse/I/O.
   */
  async load(): Promise<CartItem[]> { // Lê e converte o conteúdo persistido em lista de CartItem
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY); // Busca string JSON pela chave
      if (!raw) return []; // Se não existir nada salvo, retorna lista vazia
      const parsed = JSON.parse(raw); // Tenta parsear JSON em objeto JS
      return Array.isArray(parsed) ? (parsed as CartItem[]) : []; // Garante que é um array; caso contrário, retorna []
    } catch {
      return []; // Em caso de erro (I/O ou JSON inválido), retorna [] para não quebrar a UI
    }
  }

  /**
   * Salva a coleção completa de itens sob a mesma chave, sobrescrevendo valor anterior.
   * Erros são engolidos para evitar travar a UI.
   */
  async save(items: CartItem[]): Promise<void> { // Persiste o estado completo do carrinho como JSON
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items)); // Serializa e grava sob a mesma chave
    } catch {
      // silencioso: falhas são ignoradas para não travar a interação do usuário
    }
  }
}
