"use client";

import { Product } from "@/lib/types";

interface ProductTableProps {
  products: Product[];
  onDelete: (id: string) => void;
  onEdit: (product: Product) => void;
  loading: boolean;
  error: string | null;
}

export default function ProductTable({
  products,
  onDelete,
  onEdit,
  loading,
  error,
}: ProductTableProps) {
  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <table className="w-full border-collapse border border-gray-300 text-left">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">Name</th>
          <th className="border border-gray-300 p-2">Category</th>
          <th className="border border-gray-300 p-2">Subcategory</th>
          <th className="border border-gray-300 p-2">Price</th>
          <th className="border border-gray-300 p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id}>
            <td className="border border-gray-300 p-2">{p.name}</td>
            <td className="border border-gray-300 p-2">{p.category}</td>
            <td className="border border-gray-300 p-2">{p.subCategory || "-"}</td>
            <td className="border border-gray-300 p-2">${p.price.toFixed(2)}</td>
            <td className="border border-gray-300 p-2 space-x-2">
              <button
                className="text-blue-600 hover:underline"
                onClick={() => onEdit(p)}
              >
                Edit
              </button>
              <button
                className="text-red-600 hover:underline"
                onClick={() => {
                  if (p.id && confirm("Are you sure to delete this product?")) {
                    onDelete(p.id);
                  }
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
