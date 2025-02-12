import React from "react";
import ProductCard from "./ProductCard";

import { Database } from "@/types/schema";

type Product = Database["public"]["Tables"]["products"]["Row"];

interface ProductGridProps {
  products?: Product[];
  onQuantityChange?: (productId: string, quantity: number) => void;
  onAddToCart?: (productId: string) => void;
}

const ProductGrid = ({
  products = [],
  onQuantityChange = () => {},
  onAddToCart = () => {},
}: ProductGridProps) => {
  return (
    <div className="bg-gray-50 p-6 w-full min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            stock={product.stock_status}
            onQuantityChange={(quantity) =>
              onQuantityChange(product.id, quantity)
            }
            onAddToCart={() => onAddToCart(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
