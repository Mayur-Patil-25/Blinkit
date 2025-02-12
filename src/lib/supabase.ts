import { createClient } from "@supabase/supabase-js";

// For development, use mock data if no Supabase credentials are provided
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase credentials");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mock data for development
export const mockCategories = [
  {
    id: "1",
    name: "Fruits & Vegetables",
    created_at: new Date().toISOString(),
    subcategories: [
      {
        id: "1-1",
        name: "Fresh Fruits",
        category_id: "1",
        created_at: new Date().toISOString(),
      },
      {
        id: "1-2",
        name: "Fresh Vegetables",
        category_id: "1",
        created_at: new Date().toISOString(),
      },
    ],
  },
  {
    id: "2",
    name: "Dairy & Eggs",
    created_at: new Date().toISOString(),
    subcategories: [
      {
        id: "2-1",
        name: "Milk",
        category_id: "2",
        created_at: new Date().toISOString(),
      },
      {
        id: "2-2",
        name: "Cheese",
        category_id: "2",
        created_at: new Date().toISOString(),
      },
    ],
  },
];

export const mockProducts = [
  {
    id: "1",
    name: "Fresh Apples",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6",
    stock_status: "IN_STOCK",
    category_id: "1",
    subcategory_id: "1-1",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Organic Bananas",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e",
    stock_status: "LOW_STOCK",
    category_id: "1",
    subcategory_id: "1-1",
    created_at: new Date().toISOString(),
  },
];
