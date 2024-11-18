import { z } from "zod";

// Mengupdate tipe email menjadi array string yang benar
export const eventSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  price: z.string().min(1, "Price must be greater than 0"),
  description: z.string().optional(),
  stock: z.string().min(1, "Stock must be greater than 0"),
  category: z.enum(["Konser", "Live Musical", "Festival"]),
  email: z.array(z.string().email("Invalid email format")),  // Email sebagai array string
  image: z
    .instanceof(File)
    .refine((file: File) => file.size <= 2 * 1024 * 1024, {
      message: "File size exceeds 2 MB limit",
    }),
});

export type EventData = z.infer<typeof eventSchema>;
