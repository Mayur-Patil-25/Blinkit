import { useEffect, useState } from "react";
import { supabase, mockCategories, mockProducts } from "./supabase";
import { Database } from "@/types/schema";

type Category = Database["public"]["Tables"]["categories"]["Row"] & {
  subcategories: Database["public"]["Tables"]["subcategories"]["Row"][];
};

type Product = Database["public"]["Tables"]["products"]["Row"];

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      // Use mock data if no Supabase URL is provided
      if (import.meta.env.VITE_SUPABASE_URL === undefined) {
        setCategories(mockCategories);
        setLoading(false);
        return;
      }
      const { data: categoriesData, error: categoriesError } = await supabase
        .from("categories")
        .select("*");

      if (categoriesError) {
        console.error("Error fetching categories:", categoriesError);
        return;
      }

      const { data: subcategoriesData, error: subcategoriesError } =
        await supabase.from("subcategories").select("*");

      if (subcategoriesError) {
        console.error("Error fetching subcategories:", subcategoriesError);
        return;
      }

      const categoriesWithSubs = categoriesData.map((category) => ({
        ...category,
        subcategories: subcategoriesData.filter(
          (sub) => sub.category_id === category.id,
        ),
      }));

      setCategories(categoriesWithSubs);
      setLoading(false);
    };

    fetchCategories();

    const categoriesSubscription = supabase
      .channel("categories-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "categories" },
        fetchCategories,
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "subcategories" },
        fetchCategories,
      )
      .subscribe();

    return () => {
      categoriesSubscription.unsubscribe();
    };
  }, []);

  return { categories, loading };
}

export function useProducts(categoryId?: string,  search?:string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      // Use mock data if no Supabase URL is provided
      // if (import.meta.env.VITE_SUPABASE_URL === undefined) {
      //   setProducts(
      //     mockProducts.filter(
      //       (p) =>
      //         (!categoryId || p.category_id === categoryId) &&
      //         (!subcategoryId || p.subcategory_id === subcategoryId),
      //     ),
      //   );
      //   setLoading(false);
      //   return;
      // }
      let query = supabase.from("products").select("*");

      // if (categoryId) {
      //   query = query.eq("category_id", categoryId);
      // }
      if (categoryId) {
        query = query.eq("subcategory_id", categoryId);
      }

      if (search) {
        query = query.ilike("name", `%${search}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching products:", error);
        return;
      }

      console.log("Search", search);
      

      setProducts(data);
      setLoading(false);
    };

    fetchProducts();

    const productsSubscription = supabase
      .channel("products-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        fetchProducts,
      )
      .subscribe();

    return () => {
      productsSubscription.unsubscribe();
    };
  }, [categoryId,  search]);

  return { products, loading };
}
