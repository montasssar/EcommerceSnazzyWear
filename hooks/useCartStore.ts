import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  addToCart: (item: CartItem) => {
    const cart = get().cart;
    const existing = cart.find((i) => i.id === item.id);
    if (existing) {
      set({
        cart: cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        ),
      });
    } else {
      set({ cart: [...cart, item] });
    }
  },
  removeFromCart: (id: string) =>
    set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
  increment: (id: string) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),
  decrement: (id: string) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    })),
  clearCart: () => set({ cart: [] }),
}));
