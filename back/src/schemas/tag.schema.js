import { z } from "zod";

export const createTagSchema = z.object({
  name: z.string().min(1, "Le nom du tag est requis").max(100),
});
