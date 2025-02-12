import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  MinusIcon,
  PlusIcon,
  ShoppingCart,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";

const ProductPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  // Mock data - replace with actual data fetching
  const product = {
    id: "1",
    name: "Fresh Apples",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6",
    stock_status: "IN_STOCK",
    nutrition: {
      calories: 95,
      protein: 0.5,
      carbs: 25,
      fat: 0.3,
      fiber: 4,
    },
    description:
      "Fresh, crisp apples picked at peak ripeness. Perfect for snacking, baking, or adding to your favorite recipes.",
  };

  const reviews = [
    {
      id: "1",
      userName: "John D.",
      rating: 5,
      comment: "Very fresh and crisp apples. Will buy again!",
      helpful: 12,
      unhelpful: 2,
      date: "2024-01-15",
    },
    {
      id: "2",
      userName: "Sarah M.",
      rating: 4,
      comment: "Good quality but a bit pricey.",
      helpful: 8,
      unhelpful: 1,
      date: "2024-01-10",
    },
  ];

  const relatedProducts = [];

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
    <div className="container mx-auto py-8 px-4">
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Product Image and Basic Info */}
        <div className="space-y-4">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-square object-cover rounded-lg"
            />
            <Badge
              className={`absolute top-4 right-4 ${stockColors[product.stock_status]}`}
              variant="secondary"
            >
              {stockText[product.stock_status]}
            </Badge>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <img
              src={product.image}
              alt="thumbnail"
              className="aspect-square object-cover rounded cursor-pointer"
            />
            {/* Add more thumbnail images here */}
          </div>
        </div>

        {/* Product Details and Add to Cart */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
          <p className="text-gray-600">{product.description}</p>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={product.stock_status === "OUT_OF_STOCK"}
              >
                <MinusIcon className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center text-lg">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                disabled={product.stock_status === "OUT_OF_STOCK"}
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>

            <Button
              size="lg"
              className="w-full"
              disabled={product.stock_status === "OUT_OF_STOCK"}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs for Additional Information */}
      <Tabs defaultValue="nutrition" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="related">Related Products</TabsTrigger>
        </TabsList>

        <TabsContent value="nutrition">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Nutrition Facts</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Calories</span>
                <span>{product.nutrition?.calories} kcal</span>
              </div>
              <div className="flex justify-between">
                <span>Protein</span>
                <span>{product.nutrition?.protein}g</span>
              </div>
              <div className="flex justify-between">
                <span>Carbohydrates</span>
                <span>{product.nutrition?.carbs}g</span>
              </div>
              <div className="flex justify-between">
                <span>Fat</span>
                <span>{product.nutrition?.fat}g</span>
              </div>
              <div className="flex justify-between">
                <span>Fiber</span>
                <span>{product.nutrition?.fiber}g</span>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{review.userName}</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-600 mb-2">{review.comment}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <button className="flex items-center space-x-1 hover:text-gray-700">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{review.helpful}</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-gray-700">
                  <ThumbsDown className="w-4 h-4" />
                  <span>{review.unhelpful}</span>
                </button>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="related">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductPage;
