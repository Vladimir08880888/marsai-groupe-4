import { z } from "zod";

export const createUserSchema = z.object({
  first_name: z.string().min(1, "Le prénom est requis").max(100),
  last_name: z.string().min(1, "Le nom est requis").max(100),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  role: z.enum(["ADMIN", "JURY", "PRODUCER"]).default("PRODUCER"),
});

export const updateUserSchema = z.object({
  first_name: z.string().min(1).max(100).optional(),
  last_name: z.string().min(1).max(100).optional(),
  email: z.string().email("Email invalide").optional(),
  password: z.string().min(6).optional(),
  role: z.enum(["ADMIN", "JURY", "PRODUCER"]).optional(),
}).passthrough();
