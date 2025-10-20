import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { container } from '@/container';
import type { CartItem } from '@/domain/cart/models';
import { computeTotals } from '@/domain/cart/calculations';
import * as Cart from '@/application/usecases/cart';

type CartState = {
  items: CartItem[];
};

type Action =
  | { type: 'ADD'; item: CartItem }
  | { type: 'REMOVE'; productId: string }
  | { type: 'INCREMENT'; productId: string }
  | { type: 'DECREMENT'; productId: string }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE'; items: CartItem[] };

const initialState: CartState = { items: [] };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'HYDRATE':
      return { items: action.items };
    case 'ADD':
      return { items: Cart.addItem(state.items, action.item) };
    case 'REMOVE':
      return { items: Cart.removeItem(state.items, action.productId) };
    case 'INCREMENT':
      return { items: Cart.increment(state.items, action.productId) };
    case 'DECREMENT':
      return { items: Cart.decrement(state.items, action.productId) };
    case 'CLEAR':
      return { items: Cart.clear() };
    default:
      return state;
  }
}

// computeTotals veio do domínio (calculations)

type CartContextType = {
  items: CartItem[];
  subtotal: number;
  fee: number;
  total: number;
  count: number;
  add: (item: CartItem) => void;
  remove: (productId: string) => void;
  increment: (productId: string) => void;
  decrement: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const totals = useMemo(() => computeTotals(state.items), [state.items]);
  const cartStorage = container.cartStorage;

  // Hidratar do armazenamento ao iniciar
  useEffect(() => {
    (async () => {
      try {
        const items = await cartStorage.load();
        dispatch({ type: 'HYDRATE', items });
      } catch (e) {
        // silencioso: não bloqueia app se falhar persistência
      }
    })();
  }, []);

  // Salvar sempre que os itens mudarem
  useEffect(() => {
    (async () => {
      try {
        await cartStorage.save(state.items);
      } catch (e) {
        // silencioso
      }
    })();
  }, [state.items]);

  const value = useMemo<CartContextType>(
    () => ({
      items: state.items,
      ...totals,
  add: (item: CartItem) => dispatch({ type: 'ADD', item }),
  remove: (productId: string) => dispatch({ type: 'REMOVE', productId }),
  increment: (productId: string) => dispatch({ type: 'INCREMENT', productId }),
  decrement: (productId: string) => dispatch({ type: 'DECREMENT', productId }),
      clear: () => dispatch({ type: 'CLEAR' }),
    }),
    [state.items, totals]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart deve ser usado dentro de CartProvider');
  return ctx;
}
