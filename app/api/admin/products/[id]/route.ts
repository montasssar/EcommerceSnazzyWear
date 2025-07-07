import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/firebase";
import { doc, deleteDoc, updateDoc, getDoc, serverTimestamp } from "firebase/firestore";

interface ProductData {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: "Men" | "Women" | "Accessories";
  subCategory?: string;
}

function validateProduct(data: unknown): data is ProductData {
  if (
    typeof data === "object" &&
    data !== null &&
    "name" in data &&
    "description" in data &&
    "price" in data &&
    "imageUrl" in data &&
    "category" in data
  ) {
    const d = data as ProductData;
    return (
      typeof d.name === "string" &&
      typeof d.description === "string" &&
      typeof d.price === "number" &&
      typeof d.imageUrl === "string" &&
      ["Men", "Women", "Accessories"].includes(d.category)
    );
  }
  return false;
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productDoc = doc(db, "products", params.id);
    await deleteDoc(productDoc);
    return NextResponse.json({ message: "Product deleted" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();

    if (!validateProduct(data)) {
      return NextResponse.json(
        { error: "Invalid product data" },
        { status: 400 }
      );
    }

    const productDoc = doc(db, "products", params.id);
    const docSnap = await getDoc(productDoc);
    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await updateDoc(productDoc, {
      ...data,
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json({ message: "Product updated" });
  } catch {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
