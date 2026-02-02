import { z } from "zod";

export const upsertContentSchema = z.object({
  key: z.string().min(1, "La clé est requise").max(255),
  value: z.string().optional().nullable(),
  type: z.string().max(50).default("text"),
});
