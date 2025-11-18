import { createContext, useContext, useState } from "react";
import type { Product } from "../types/product";

interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    carts: CartItem[];
    totalItems: number;
    totalPrice: number;
    addToCart: (product: Product) => void;
    decreaseCartItem: (product: Product) => void;
}

interface CartProviderProps {
    children: React.ReactNode;
}
const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: CartProviderProps) {
    const [carts, setCarts] = useState<CartItem[]>([]);

    const addToCart = (product: Product) => {
        setCarts((prevCart) => {
            const itemExists = prevCart.find((item) => item.id === product.id);

            if (itemExists) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prevCart, { ...product, quantity: 1 }];
        })
        console.log(carts)
    }


    const decreaseCartItem = (product: Product) => {
        setCarts((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);

            if (!existingItem) return prevCart;

            if (existingItem.quantity === 1) {
                return prevCart.filter((item) => item.id !== product.id);
            }

            return prevCart.map((item) =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
        });
    };

    const totalItems = carts.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = carts.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ carts, addToCart, totalItems, totalPrice, decreaseCartItem }}>
            {children}
        </CartContext.Provider>)
}

export function useCart() {
    const context = useContext(CartContext);

    if (context === undefined) throw new Error('useCart must be used within a CartProvider');

    return context;
}