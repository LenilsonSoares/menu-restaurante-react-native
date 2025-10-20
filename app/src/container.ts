import { AsyncStorageCartStorage } from '@/infra/storage/AsyncStorageCartStorage';
import type { CartStorage } from '@/application/ports/CartStorage';

class Container {
  private _cartStorage?: CartStorage;

  get cartStorage(): CartStorage {
    if (!this._cartStorage) this._cartStorage = new AsyncStorageCartStorage();
    return this._cartStorage;
  }
}

export const container = new Container();
