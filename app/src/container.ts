/**
 * Container simples para injeção/acesso a dependências da aplicação.
 *
 * Atualmente expõe `cartStorage` como singleton lazy (instanciado sob demanda).
 */
import { AsyncStorageCartStorage } from '@/infra/storage/AsyncStorageCartStorage';
import type { CartStorage } from '@/application/ports/CartStorage';

class Container {
  private _cartStorage?: CartStorage;

  /**
   * Retorna a implementação de `CartStorage` (singleton).
   * Substitua aqui caso deseje trocar o backend de persistência.
   */
  get cartStorage(): CartStorage {
    if (!this._cartStorage) this._cartStorage = new AsyncStorageCartStorage();
    return this._cartStorage;
  }
}

export const container = new Container();
