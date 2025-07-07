export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: "Men" | "Women" | "Accessories";
  subCategory?: string;
  createdAt?: string;
  updatedAt?: string;
}
