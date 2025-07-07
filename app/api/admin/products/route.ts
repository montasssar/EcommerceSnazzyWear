import { NextResponse } from "next/server";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

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

export async function GET() {
  try {
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(products);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!validateProduct(data)) {
      return NextResponse.json(
        { error: "Invalid product data" },
        { status: 400 }
      );
    }

    const productsRef = collection(db, "products");
    const newDoc = await addDoc(productsRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json({ id: newDoc.id, ...data });
  } catch {
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}
