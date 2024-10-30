import { z } from "zod";

export const eventSchema = z.object({
  name: z.string().min(1, "Event name must be provided"),
  description: z.string().optional(),
  category: z.string().min(1, "Category must be provided"),
  price: z.number().positive("Price must be greater than 0"),
  stock: z.number().int().nonnegative("Stock cannot be negative"),
  image: z.string().url("Invalid image URL"),
});
