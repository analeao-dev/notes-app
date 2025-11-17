import { useEffect, useState } from "react";
import ProductList from "./components/product-list";
import type { Product } from "./types/product";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">🛒 Product Catalog</h1>
      <div className="grid gris-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <ProductList />      
      </div>
    </div>
  );
}

export default App;