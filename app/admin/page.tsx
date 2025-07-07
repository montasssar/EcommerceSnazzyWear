"use client";

import AdminGuard from "./AdminGuard";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import { useProducts } from "@/hooks/useProducts";
import { useState } from "react";
import { Product } from "@/lib/types";

export default function AdminPage() {
  return (
    <AdminGuard>
      <AdminContent />
    </AdminGuard>
  );
}

function AdminContent() {
  const { products, loading, error, addProduct, updateProduct, deleteProduct } = useProducts();
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  async function onAdd(product: Omit<Product, "id">) {
    await addProduct(product);
  }

  async function onUpdate(id: string, product: Omit<Product, "id">) {
    await updateProduct(id, product);
    setProductToEdit(null);
  }

  function onCancelEdit() {
    setProductToEdit(null);
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Admin Panel - Manage Products</h1>

      <ProductForm
        onAdd={onAdd}
        onUpdate={onUpdate}
        productToEdit={productToEdit}
        onCancelEdit={onCancelEdit}
      />

      <ProductTable
        products={products}
        loading={loading}
        error={error}
        onDelete={deleteProduct}
        onEdit={setProductToEdit}
      />
    </div>
  );
}
