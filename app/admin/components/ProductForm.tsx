"use client";

import React, { useState } from "react";
import { Product } from "@/lib/types";
import { uploadImage } from "@/lib/uploadImage";

const subCategoriesMap: Record<string, string[]> = {
  Men: ["Pants", "T-shirts", "Sneakers"],
  Women: ["Pants", "Dresses", "Sneakers"],
  Accessories: ["Bags", "Hats", "Watches"],
};

interface ProductFormProps {
  onAdd: (product: Omit<Product, "id">) => Promise<void>;
  onUpdate?: (id: string, product: Omit<Product, "id">) => Promise<void>;
  productToEdit?: Product | null;
  onCancelEdit?: () => void;
}

export default function ProductForm({
  onAdd,
  onUpdate,
  productToEdit,
  onCancelEdit,
}: ProductFormProps) {
  const [form, setForm] = useState<Omit<Product, "id">>({
    name: productToEdit?.name || "",
    description: productToEdit?.description || "",
    price: productToEdit?.price || 0,
    imageUrl: productToEdit?.imageUrl || "",
    category: productToEdit?.category || "Men",
    subCategory: productToEdit?.subCategory || "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = form.imageUrl;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const productData = { ...form, imageUrl };

      if (productToEdit && onUpdate && productToEdit.id) {
        await onUpdate(productToEdit.id, productData);
        if (onCancelEdit) onCancelEdit();
      } else {
        await onAdd(productData);
        setForm({
          name: "",
          description: "",
          price: 0,
          imageUrl: "",
          category: "Men",
          subCategory: "",
        });
        setImageFile(null);
      }
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-12 space-y-4">
      <div>
        <label className="block font-semibold mb-1" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={form.description}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="price">
          Price ($)
        </label>
        <input
          id="price"
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="imageUrl">
          Image URL (or upload below)
        </label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="url"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="Or upload image file below"
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="imageFile">
          Upload Image
        </label>
        <input
          id="imageFile"
          name="imageFile"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="category">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={form.category}
          onChange={(e) => {
            handleChange(e);
            setForm((prev) => ({ ...prev, subCategory: "" }));
          }}
          required
          className="border border-gray-300 rounded p-2 w-full"
        >
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="subCategory">
          Subcategory
        </label>
        <select
          id="subCategory"
          name="subCategory"
          value={form.subCategory}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 w-full"
        >
          <option value="">-- Select --</option>
          {subCategoriesMap[form.category].map((sc) => (
            <option key={sc} value={sc}>
              {sc}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition disabled:opacity-50"
      >
        {isSubmitting ? (productToEdit ? "Updating..." : "Adding...") : productToEdit ? "Update Product" : "Add Product"}
      </button>

      {productToEdit && onCancelEdit && (
        <button
          type="button"
          onClick={onCancelEdit}
          className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      )}
    </form>
  );
}
