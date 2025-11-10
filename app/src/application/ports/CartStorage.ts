/**
 * Porta de persistência do carrinho (camada de aplicação).
 *
 * Este contrato define como o estado do carrinho deve ser carregado e salvo
 * por implementações de armazenamento. Exemplos de implementações possíveis:
 * - AsyncStorage (React Native) → ver `infra/storage/AsyncStorageCartStorage.ts`.
 * - SecureStorage, SQLite, armazenamento remoto, etc.
 *
 * Requisitos gerais:
 * - O armazenamento deve ser resiliente: falhas de leitura/escrita devem ser
 *   propagadas como erros para que a UI possa tratá-las.
 * - O formato persistido deve ser compatível com `CartItem`.
 * - Operação de `save` deve substituir completamente o estado atual do
 *   carrinho (não é merge incremental neste contrato).
 */
import type { CartItem } from '@/domain/cart/models'; // Importa o tipo de item do carrinho usado nas assinaturas abaixo

export interface CartStorage { // Contrato de persistência do carrinho a ser implementado pela camada de infraestrutura
  /**
   * Carrega todos os itens do carrinho a partir do armazenamento.
   *
   * Retornos:
   * - Promise<CartItem[]>: lista de itens; se nada estiver salvo, deve
   *   retornar um array vazio `[]`.
   *
   * Erros esperados:
   * - Pode rejeitar se houver falha de I/O, permissão, corrupção de dados ou
   *   problema de desserialização.
   */
  load(): Promise<CartItem[]>; // Carrega e retorna todos os itens persistidos (ou [] se vazio)

  /**
   * Persiste integralmente o estado do carrinho.
   *
   * Parâmetros:
   * - items: CartItem[] — coleção completa a ser armazenada. A operação deve
   *   ser tratada como substituição (overwrite) do estado anterior.
   *
   * Garantias desejáveis (se possível pela implementação):
   * - Atomicidade (evitar estados parciais em caso de falha).
   * - Idempotência (salvar o mesmo conteúdo repetidas vezes não deve causar
   *   efeitos colaterais).
   *
   * Erros esperados:
   * - Pode rejeitar em cenários de I/O, permissão ou serialização inválida.
   */
  save(items: CartItem[]): Promise<void>; // Sobrescreve o estado do carrinho persistindo a lista completa de itens
}
