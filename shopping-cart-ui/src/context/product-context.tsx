import React, { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "../types/product";

interface ProductContextProps {
    children: React.ReactNode;
}

interface ProductContextType {
    products: Product[];
    loading: boolean;
    error: string;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: ProductContextProps) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products");

                if (!response.ok)
                    throw new Error("Faild to fetch products");

                const data: Product[] = await response.json();
                console.log(data);
                setProducts(data);
            } catch (err) {
                if (err instanceof Error)
                    setError(err.message)
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();

    }, []);

    return (
        <ProductContext.Provider value={{ products, loading, error }} >
            {children}
        </ProductContext.Provider >
    )
}

export function useProducts() {
    const context = useContext(ProductContext);

    if (context === undefined) throw new Error('useProducts must be used within a ProductProvider');

    return context;
} 