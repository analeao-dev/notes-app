import { useEffect, useState } from "react";

interface Products {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  rating: number;
  image: string;
}

const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [products, setProducts] = useState<Products[]>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("");

        if (!response.ok)
          throw new Error("Faild to fetch products");

        const data: Products[] = await response.json();
        console.log(data);
        setProducts(data);
      } catch (err: unknown) {
        if (err instanceof Error)
          setError(err.message)
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

  }, [products])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">🛒 Product Catalog</h1>

      {loading && <p>Loading...</p>}
      {error && <div className="error">❌ {error}</div>}

      <div className="grid gris-cols-1">
      </div>
    </div>
  );
}

export default App;