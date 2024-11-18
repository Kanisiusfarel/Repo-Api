// src/utils/types.ts

export interface EventData {
    name: string | "";
    price: number;
    description?: string;
    stock: number;
    category: "Live musical" | "Konser";
    email: string[]; // Pastikan ini adalah array dari string
    image: File; // Pastikan ini adalah file
  }