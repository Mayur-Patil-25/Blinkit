import React, { useState } from "react";
import { useCategories, useProducts } from "@/lib/hooks";
import Header from "./Header";
import DeliveryBanner from "./DeliveryBanner";
import CategorySidebar from "./CategorySidebar";
import ProductGrid from "./ProductGrid";

interface HomeProps {
  location?: string;
  cartItemCount?: number;
  estimatedDeliveryTime?: string;
  deliveryAddress?: string;
  selectedCategory?: string;
  onLocationChange?: (location: string) => void;
  onSearch?: (query: string) => void;
  onCartClick?: () => void;
  onCategorySelect?: (category: string) => void;
  onQuantityChange?: (productId: string, quantity: number) => void;
  onAddToCart?: (productId: string) => void;
}

const Home = ({
  // Props remain the same but we'll use state and hooks internally

  location = "New York, NY",
  cartItemCount = 0,
  estimatedDeliveryTime = "15-20 minutes",
  deliveryAddress = "123 Main St, New York, NY",
  selectedCategory = "",
  onLocationChange = () => {},
  onSearch = () => {},
  onCartClick = () => {},
  onCategorySelect = () => {},
  onQuantityChange = () => {},
  onAddToCart = () => {},
}: HomeProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const { categories, loading: categoriesLoading } = useCategories();
  const { products, loading: productsLoading } =
    useProducts(selectedCategoryId);

  const handleCategorySelect = (subcategoryId: string) => {
    setSelectedCategoryId(subcategoryId);
    onCategorySelect(subcategoryId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        location={location}
        cartItemCount={cartItemCount}
        onLocationChange={onLocationChange}
        onSearch={onSearch}
        onCartClick={onCartClick}
      />
      <DeliveryBanner
        estimatedTime={estimatedDeliveryTime}
        location={deliveryAddress}
      />
      <div className="flex">
        <CategorySidebar
          categories={categories}
          selectedCategory={selectedCategoryId}
          onCategorySelect={handleCategorySelect}
        />
        <div className="flex-1">
          <ProductGrid
            products={products}
            onQuantityChange={onQuantityChange}
            onAddToCart={onAddToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
