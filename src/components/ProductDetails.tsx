import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card } from "./ui/card";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import ProductCard from "./ProductCard";

interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  helpful: number;
  unhelpful: number;
  date: string;
}

interface ProductDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: {
    id: string;
    name: string;
    price: number;
    image: string;
    stock_status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
    nutrition?: NutritionInfo;
    description?: string;
  };
  reviews?: Review[];
  relatedProducts?: any[];
}

const ProductDetails = ({
  open,
  onOpenChange,
  product = {
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
  },
  reviews = [
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
  ],
  relatedProducts = [],
}: ProductDetailsProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-2xl font-bold mb-2">${product.price}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <h4 className="font-semibold mb-2">Related Products</h4>
                <div className="grid grid-cols-2 gap-4">
                  {relatedProducts.slice(0, 2).map((relatedProduct) => (
                    <ProductCard
                      key={relatedProduct.id}
                      {...relatedProduct}
                      className="w-full"
                    />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

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
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
