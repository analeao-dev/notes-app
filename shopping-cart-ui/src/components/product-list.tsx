import { useProducts } from "../context/product-context";
import ProductCard from "./product-card";

const ProductList = () => {
    const {products, loading, error} = useProducts();
    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <div className="error">❌ {error}</div>}
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </>
    );
}

export default ProductList;