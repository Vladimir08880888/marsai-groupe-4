import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

export const registerSchema = z.object({
  first_name: z.string().min(1, "Le prénom est requis").max(100),
  last_name: z.string().min(1, "Le nom est requis").max(100),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  rgpd_accepted: z.preprocess(
    (val) => val === true || val === "true",
    z.literal(true, { errorMap: () => ({ message: "Vous devez accepter les conditions RGPD" }) })
  ),
});
