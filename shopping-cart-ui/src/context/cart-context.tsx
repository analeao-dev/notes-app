import { createContext, useContext, useEffect, useState } from 'react';
import type { Product } from '../types/product';

interface CartItem extends Product {
	quantity: number;
}

interface CartContextType {
	cart: CartItem[];
	totalItems: number;
	totalPrice: number;
	addToCart: (product: Product) => void;
	removeFromCart: (product: Product) => void;
	clearCart: () => void;
}

interface CartProviderProps {
	children: React.ReactNode;
}
const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: CartProviderProps) {
	const [cart, setCart] = useState<CartItem[]>(() => {
		const stored = localStorage.getItem('cart');
		return stored ? JSON.parse(stored) : [];
	});

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	const addToCart = (product: Product) => {
		setCart((prevCart) => {
			const itemExists = prevCart.find((item) => item.id === product.id);

			if (itemExists) {
				return prevCart.map((item) =>
					item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
				);
			}

			return [...prevCart, { ...product, quantity: 1 }];
		});
	};

	const removeFromCart = (product: Product) => {
		setCart((prevCart) => {
			const existingItem = prevCart.find((item) => item.id === product.id);

			if (!existingItem) return prevCart;

			if (existingItem.quantity === 1) {
				return prevCart.filter((item) => item.id !== product.id);
			}

			return prevCart.map((item) =>
				item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
			);
		});
	};

	const clearCart = () => setCart([]);

	const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
	const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

	return (
		<CartContext.Provider
			value={{ cart, addToCart, totalItems, totalPrice, removeFromCart, clearCart }}
		>
			{children}
		</CartContext.Provider>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
	const context = useContext(CartContext);

	if (context === undefined) throw new Error('useCart must be used within a CartProvider');

	return context;
}
