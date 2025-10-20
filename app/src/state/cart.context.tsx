import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string | number;
};

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
    case 'ADD': {
      const existing = state.items.find(i => i.productId === action.item.productId);
      if (existing) {
        return {
          items: state.items.map(i =>
            i.productId === action.item.productId ? { ...i, quantity: i.quantity + action.item.quantity } : i
          ),
        };
      }
      return { items: [...state.items, action.item] };
    }
    case 'REMOVE':
      return { items: state.items.filter(i => i.productId !== action.productId) };
    case 'INCREMENT':
      return { items: state.items.map(i => (i.productId === action.productId ? { ...i, quantity: i.quantity + 1 } : i)) };
    case 'DECREMENT':
      return {
        items: state.items
          .map(i => (i.productId === action.productId ? { ...i, quantity: i.quantity - 1 } : i))
          .filter(i => i.quantity > 0),
      };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

function computeTotals(items: CartItem[]) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const fee = 0; // pode parametrizar taxa
  const total = subtotal + fee;
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  return { subtotal, fee, total, count };
}

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
  const STORAGE_KEY = 'cart:v1';

  // Hidratar do armazenamento ao iniciar
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as CartItem[];
          if (Array.isArray(parsed)) {
            dispatch({ type: 'HYDRATE', items: parsed });
          }
        }
      } catch (e) {
        // silencioso: não bloqueia app se falhar persistência
      }
    })();
  }, []);

  // Salvar sempre que os itens mudarem
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
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
