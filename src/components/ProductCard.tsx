import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import ProductDetails from "./ProductDetails";
import { Button } from "./ui/button";
import { MinusIcon, PlusIcon, ShoppingCart } from "lucide-react";
import { Badge } from "./ui/badge";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  name?: string;
  price?: number;
  image?: string;
  stock?: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
  quantity?: number;
  onQuantityChange?: (quantity: number) => void;
  onAddToCart?: () => void;
}

const ProductCard = ({
  className,
  id,
  name = "Fresh Apples",
  price = 4.99,
  image = "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6",
  stock = "IN_STOCK",
  quantity = 1,
  onQuantityChange = () => {},
  onAddToCart = () => {},
  ...props
}: ProductCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const stockColors = {
    IN_STOCK: "bg-green-100 text-green-800",
    LOW_STOCK: "bg-yellow-100 text-yellow-800",
    OUT_OF_STOCK: "bg-red-100 text-red-800",
  };

  const stockText = {
    IN_STOCK: "In Stock",
    LOW_STOCK: "Low Stock",
    OUT_OF_STOCK: "Out of Stock",
  };

  return (
    <>
      <Card
        onClick={() => (window.location.href = `/product/${id}`)}
        className={`w-[280px] bg-white overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer ${className || ""}`}
      >
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-full h-[200px] object-cover"
          />
          <Badge
            className={`absolute top-2 right-2 ${stockColors[stock]}`}
            variant="secondary"
          >
            {stockText[stock]}
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2">{name}</h3>
          <p className="text-xl font-bold mb-4">${price.toFixed(2)}</p>

          <div className="flex items-center gap-2 mb-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
              disabled={stock === "OUT_OF_STOCK"}
            >
              <MinusIcon className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onQuantityChange(quantity + 1)}
              disabled={stock === "OUT_OF_STOCK"}
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>

          <Button
            className="w-full"
            onClick={onAddToCart}
            disabled={stock === "OUT_OF_STOCK"}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardContent>
      </Card>
      <ProductDetails
        open={showDetails}
        onOpenChange={setShowDetails}
        product={{
          id,
          name,
          price,
          image,
          stock_status: stock,
        }}
      />
    </>
  );
};

export default ProductCard;
