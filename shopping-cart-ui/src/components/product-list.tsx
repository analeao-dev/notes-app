import type { Product } from "../types/product";
import ProductCard from "./product-card";

interface ProductListProps {
    products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
    return (
        <>
            {products && (
                products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            )}
        </>
    );
}

export default ProductList;