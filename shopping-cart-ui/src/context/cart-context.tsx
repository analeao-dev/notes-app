import { createContext, useContext, useState } from "react";
import type { Product } from "../types/product";

interface CartContextType {
    products: number;
}

interface CartProviderProps {
    children: React.ReactNode;
}
const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: CartProviderProps) {
    const [products, setProducts] = useState(5);
    return (
        <CartContext.Provider value={{ products }}>
            {children}
        </CartContext.Provider>)
}

export function useCart() {
    const context = useContext(CartContext);

    if (context === undefined) throw new Error('useCart must be used within a CartProvider');

    return context;
}