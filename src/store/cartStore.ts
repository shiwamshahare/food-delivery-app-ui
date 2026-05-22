/**
 * Cart store — no React Context.
 * Uses a simple pub/sub so any component calling useCart() re-renders on change.
 */
import { useEffect, useState } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurantId: string;
  restaurantName: string;
}

interface CartState {
  items: CartItem[];
}

let state: CartState = { items: [] };

type Listener = (s: CartState) => void;
const listeners = new Set<Listener>();

function setState(partial: Partial<CartState>) {
  state = { ...state, ...partial };
  listeners.forEach(l => l(state));
}

// ── Public API ──────────────────────────────────────────────────────────────

export function addItem(item: Omit<CartItem, 'quantity'>) {
  const existing = state.items.find(i => i.id === item.id);
  if (existing) {
    setState({
      items: state.items.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      ),
    });
  } else {
    // Clear cart if from different restaurant
    const fromDifferentRestaurant =
      state.items.length > 0 && state.items[0].restaurantId !== item.restaurantId;
    setState({
      items: fromDifferentRestaurant
        ? [{ ...item, quantity: 1 }]
        : [...state.items, { ...item, quantity: 1 }],
    });
  }
}

export function updateQuantity(id: string, quantity: number) {
  if (quantity <= 0) {
    setState({ items: state.items.filter(i => i.id !== id) });
  } else {
    setState({
      items: state.items.map(i => (i.id === id ? { ...i, quantity } : i)),
    });
  }
}

export function removeItem(id: string) {
  setState({ items: state.items.filter(i => i.id !== id) });
}

export function clearCart() {
  setState({ items: [] });
}

// ── Hook ────────────────────────────────────────────────────────────────────

export function useCart() {
  const [s, setS] = useState<CartState>(state);

  useEffect(() => {
    const listener: Listener = newState => setS({ ...newState });
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, []);

  const totalItems = s.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = s.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return {
    items: s.items,
    totalItems,
    totalPrice,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  };
}
