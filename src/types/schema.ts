export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
        };
      };
      subcategories: {
        Row: {
          id: string;
          name: string;
          category_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category_id: string;
          created_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          price: number;
          image: string;
          stock_status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
          category_id: string;
          subcategory_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          price: number;
          image: string;
          stock_status?: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
          category_id: string;
          subcategory_id: string;
          created_at?: string;
        };
      };
    };
  };
};
