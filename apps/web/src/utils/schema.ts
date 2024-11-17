import { z as zod } from "zod";

// Mengupdate tipe email menjadi array string yang benar
export const eventSchema = zod.object({
  name: zod.string().min(1, "Event name is required"),
  price: zod.string().min(1, "Price must be greater than 0"),
  description: zod.string().optional(),
  stock: zod.string().min(1, "Stock must be greater than 0"),
  category: zod.enum(["Konser", "Live Musical", "Festival"]),
  email: zod.array(zod.string().email("Invalid email format")),  // Perhatikan ini
  image: zod
    .instanceof(File)
    .refine((file: File) => file.size <= 2 * 1024 * 1024, {
      message: "File size exceeds 2 MB limit",
    }),
});

export type EventData = zod.infer<typeof eventSchema>;
