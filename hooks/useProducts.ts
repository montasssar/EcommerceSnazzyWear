import { useState, useEffect, useCallback } from "react";
import { Product } from "@/lib/types";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data: Product[] = await res.json();
      setProducts(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  const addProduct = useCallback(
    async (product: Omit<Product, "id">): Promise<Product> => {
      try {
        const res = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        });
        if (!res.ok) throw new Error("Failed to add product");
        const newProduct: Product = await res.json();
        setProducts((prev) => [...prev, newProduct]);
        return newProduct;
      } catch (e: unknown) {
        throw e instanceof Error ? e : new Error("Unknown error");
      }
    },
    []
  );

  const updateProduct = useCallback(
    async (id: string, product: Omit<Product, "id">): Promise<void> => {
      try {
        const res = await fetch(`/api/admin/products/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        });
        if (!res.ok) throw new Error("Failed to update product");
        await res.json();
        await fetchProducts();
      } catch (e: unknown) {
        throw e instanceof Error ? e : new Error("Unknown error");
      }
    },
    [fetchProducts]
  );

  const deleteProduct = useCallback(
    async (id: string): Promise<void> => {
      try {
        const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to delete product");
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } catch (e: unknown) {
        throw e instanceof Error ? e : new Error("Unknown error");
      }
    },
    []
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, addProduct, updateProduct, deleteProduct };
}
