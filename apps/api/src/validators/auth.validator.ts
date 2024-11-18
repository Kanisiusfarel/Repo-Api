import { z as validate } from "zod";

export const authSchema = validate.object({
  email: validate.string().email("Invalid email address"),
  password: validate
    .string()
    .min(6, "Password must be at least 6 characters long"),
});
