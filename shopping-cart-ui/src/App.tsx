import { useEffect, useState } from "react";
import ProductList from "./components/product-list";
import type { Product } from "./types/product";

const App = () => {
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

  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">🛒 Product Catalog</h1>

      {loading && <p>Loading...</p>}
      {error && <div className="error">❌ {error}</div>}

      <div className="grid gris-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <ProductList products={products} />      
      </div>
    </div>
  );
}

export default App;