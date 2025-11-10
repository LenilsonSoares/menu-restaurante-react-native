/**
 * Contexto/Provider do carrinho.
 *
 * Responsável por:
 * - Manter o estado (itens) com um reducer puro.
 * - Expor operações de alto nível (add/remove/increment/decrement/clear).
 * - Hidratar do armazenamento ao montar e persistir em cada alteração.
 */
import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'; // Importa React e hooks necessários para gerenciar estado e contexto
import { container } from '@/container'; // Service locator para acessar dependências (cartStorage)
import type { CartItem } from '@/domain/cart/models'; // Tipagem dos itens do carrinho usados neste contexto
import { computeTotals } from '@/domain/cart/calculations'; // Função que calcula os agregados (subtotal, total, etc.)
import * as Cart from '@/application/usecases/cart'; // Conjunto de casos de uso puros sobre a lista de itens do carrinho

type CartState = { // Representa o estado mantido internamente pelo reducer
  items: CartItem[]; // Lista imutável de itens do carrinho
};

type Action = // União discriminada representando todas as ações possíveis no reducer
  | { type: 'ADD'; item: CartItem } // Adiciona um item (ou soma quantidade se já existir)
  | { type: 'REMOVE'; productId: string } // Remove item pelo productId
  | { type: 'INCREMENT'; productId: string } // Incrementa a quantidade do item
  | { type: 'DECREMENT'; productId: string } // Decrementa a quantidade (removendo se chegar a 0)
  | { type: 'CLEAR' } // Limpa completamente o carrinho
  | { type: 'HYDRATE'; items: CartItem[] }; // Carrega estado inicial a partir da persistência

const initialState: CartState = { items: [] }; // Estado inicial vazio

/**
 * Lida com as transições do estado do carrinho a partir das ações de domínio.
 */
function reducer(state: CartState, action: Action): CartState { // Função pura que recebe estado atual e ação e retorna novo estado
  switch (action.type) { // Verifica o tipo da ação
    case 'HYDRATE':
      return { items: action.items }; // Substitui os itens pelos carregados do storage
    case 'ADD':
      return { items: Cart.addItem(state.items, action.item) }; // Usa caso de uso para adicionar item de forma imutável
    case 'REMOVE':
      return { items: Cart.removeItem(state.items, action.productId) }; // Remove item alvo
    case 'INCREMENT':
      return { items: Cart.increment(state.items, action.productId) }; // Incrementa quantidade
    case 'DECREMENT':
      return { items: Cart.decrement(state.items, action.productId) }; // Decrementa quantidade e remove se zero
    case 'CLEAR':
      return { items: Cart.clear() }; // Limpa carrinho
    default:
      return state; // Ação desconhecida retorna estado inalterado (segurança)
  }
}

// computeTotals veio do domínio (calculations)

type CartContextType = { // Forma do valor exposto pelo contexto para os componentes consumidores
  items: CartItem[]; // Lista atual de itens
  subtotal: number; // Soma de preço * quantidade
  fee: number; // Taxa adicional (fixa 0 atualmente)
  total: number; // subtotal + fee
  count: number; // Quantidade total de unidades
  add: (item: CartItem) => void; // Adiciona item
  remove: (productId: string) => void; // Remove item
  increment: (productId: string) => void; // Incrementa quantidade de item
  decrement: (productId: string) => void; // Decrementa quantidade de item
  clear: () => void; // Limpa carrinho
};

const CartContext = createContext<CartContextType | undefined>(undefined); // Cria contexto com valor inicial indefinido para validação em hook

/**
 * Componente provider que injeta o estado e ações do carrinho via Context API.
 */
export function CartProvider({ children }: { children: React.ReactNode }) { // Provider que encapsula a lógica do carrinho
  const [state, dispatch] = useReducer(reducer, initialState); // Inicializa reducer com estado inicial vazio
  const totals = useMemo(() => computeTotals(state.items), [state.items]); // Recalcula agregados somente quando itens mudam
  const cartStorage = container.cartStorage; // Obtém implementação de persistência via container

  // Hidratar do armazenamento ao iniciar
  useEffect(() => { // Executa uma vez ao montar para carregar itens persistidos
    (async () => {
      try {
        const items = await cartStorage.load(); // Lê itens armazenados
        dispatch({ type: 'HYDRATE', items }); // Dispara ação para popular estado
      } catch (e) {
        // silencioso: falha de storage ignorada para não quebrar UX
      }
    })();
  }, []); // Dependências vazias garantem execução única

  // Salvar sempre que os itens mudarem
  useEffect(() => { // Persiste itens sempre que a lista muda
    (async () => {
      try {
        await cartStorage.save(state.items); // Salva lista completa
      } catch (e) {
        // silencioso: falha de escrita não interrompe fluxo
      }
    })();
  }, [state.items]); // Reexecuta quando items é atualizado

  const value = useMemo<CartContextType>( // Memoriza objeto de valor para evitar recriações desnecessárias
    () => ({
      items: state.items, // Lista atual
      ...totals, // subtotal, fee, total, count
      add: (item: CartItem) => dispatch({ type: 'ADD', item }), // Encapsula dispatch de ação ADD
      remove: (productId: string) => dispatch({ type: 'REMOVE', productId }), // Encapsula REMOÇÃO
      increment: (productId: string) => dispatch({ type: 'INCREMENT', productId }), // Incrementa quantidade
      decrement: (productId: string) => dispatch({ type: 'DECREMENT', productId }), // Decrementa quantidade
      clear: () => dispatch({ type: 'CLEAR' }), // Limpa carrinho
    }),
    [state.items, totals] // Recria apenas se items ou agregados mudarem
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>; // Injeta o contexto para subárvore de componentes
}

/**
 * Hook para acessar o carrinho. Deve ser usado dentro de `CartProvider`.
 */
export function useCart() { // Hook de conveniência para consumir o contexto
  const ctx = useContext(CartContext); // Obtém valor atual do contexto
  if (!ctx) throw new Error('useCart deve ser usado dentro de CartProvider'); // Garante que esteja dentro do provider
  return ctx; // Retorna objeto do carrinho (estado + ações)
}
