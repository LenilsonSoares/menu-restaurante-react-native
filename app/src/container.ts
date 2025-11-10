/**
 * Container simples para injeção/acesso a dependências da aplicação.
 *
 * Atualmente expõe `cartStorage` como singleton lazy (instanciado sob demanda).
 */
import { AsyncStorageCartStorage } from '@/infra/storage/AsyncStorageCartStorage'; // Importa a implementação concreta de armazenamento do carrinho baseada em AsyncStorage
import type { CartStorage } from '@/application/ports/CartStorage'; // Importa o tipo/contrato que define as operações de persistência do carrinho

class Container { // Classe simples responsável por fornecer instâncias (singleton) de serviços usados na aplicação
  private _cartStorage?: CartStorage; // Campo privado opcional que armazenará a instância única de CartStorage após a primeira criação (lazy)

  /**
   * Retorna a implementação de `CartStorage` (singleton).
   * Substitua aqui caso deseje trocar o backend de persistência.
   */
  get cartStorage(): CartStorage { // Getter que retorna a instância singleton de CartStorage
    if (!this._cartStorage) this._cartStorage = new AsyncStorageCartStorage(); // Se ainda não foi instanciado, cria agora usando AsyncStorageCartStorage
    return this._cartStorage; // Retorna a instância (já existente ou recém criada)
  }
}

export const container = new Container(); // Exporta uma instância única de Container para uso global (padrão de service locator)
