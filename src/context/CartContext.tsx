import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { MenuItem } from "../data/menu";

export interface CartLine { item: MenuItem; quantity: number }
export interface LocalOrder { id: string; createdAt: string; lines: CartLine[]; total: number; customer: string; fulfillment: string }
interface CartContextValue {
  lines: CartLine[];
  count: number;
  total: number;
  add: (item: MenuItem) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  orders: LocalOrder[];
  placeOrder: (customer: string, fulfillment: string) => LocalOrder;
}

const CartContext = createContext<CartContextValue | null>(null);
const CART_KEY = "barista-cart-v1";
const ORDERS_KEY = "barista-orders-v1";
function read<T>(key: string, fallback: T): T {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback; }
  catch { return fallback; }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => read(CART_KEY, []));
  const [orders, setOrders] = useState<LocalOrder[]>(() => read(ORDERS_KEY, []));
  useEffect(() => { localStorage.setItem(CART_KEY, JSON.stringify(lines)); }, [lines]);
  useEffect(() => { localStorage.setItem(ORDERS_KEY, JSON.stringify(orders)); }, [orders]);
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  const total = lines.reduce((sum, line) => sum + line.item.price * line.quantity, 0);
  const value = useMemo<CartContextValue>(() => ({
    lines, count, total,
    add: (item) => setLines((current) => {
      const existing = current.find((line) => line.item.id === item.id);
      return existing
        ? current.map((line) => line.item.id === item.id ? { ...line, quantity: line.quantity + 1 } : line)
        : [...current, { item, quantity: 1 }];
    }),
    setQuantity: (id, quantity) => setLines((current) => quantity <= 0 ? current.filter((line) => line.item.id !== id) : current.map((line) => line.item.id === id ? { ...line, quantity } : line)),
    clear: () => setLines([]),
    orders,
    placeOrder: (customer, fulfillment) => {
      const order = { id: `B-${Date.now().toString(36).toUpperCase()}`, createdAt: new Date().toISOString(), lines: [...lines], total, customer, fulfillment };
      setOrders((current) => [order, ...current]);
      setLines([]);
      return order;
    },
  }), [lines, count, total, orders]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
