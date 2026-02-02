import { z } from "zod";

export const createFilmSchema = z.object({
  title: z.string().min(1, "Le titre est requis").max(255),
  original_title: z.string().max(255).optional().nullable(),
  translated_title: z.string().max(255).optional().nullable(),
  duration: z.coerce.number().int().positive().optional().nullable(),
  type: z.enum(["hybride", "total_ia"]).optional().nullable(),
  language: z.string().max(100).optional().nullable(),
  synopsis: z.string().optional().nullable(),
  synopsis_en: z.string().optional().nullable(),
  creative_process: z.string().optional().nullable(),
  ai_tools: z.string().optional().nullable(),
  youtube_link: z.string().url("Lien YouTube invalide").optional().nullable().or(z.literal("")),
  rgpd_accepted: z.preprocess(
    (val) => val === true || val === "true",
    z.literal(true, { errorMap: () => ({ message: "Vous devez accepter les conditions RGPD" }) })
  ),
  tags: z.union([z.string(), z.array(z.string())]).optional(),
}).passthrough();

export const updateFilmSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  original_title: z.string().max(255).optional().nullable(),
  translated_title: z.string().max(255).optional().nullable(),
  duration: z.coerce.number().int().positive().optional().nullable(),
  type: z.enum(["hybride", "total_ia"]).optional().nullable(),
  language: z.string().max(100).optional().nullable(),
  synopsis: z.string().optional().nullable(),
  synopsis_en: z.string().optional().nullable(),
  creative_process: z.string().optional().nullable(),
  ai_tools: z.string().optional().nullable(),
  youtube_link: z.string().url("Lien YouTube invalide").optional().nullable().or(z.literal("")),
  status: z.enum(["submitted", "under_review", "rejected", "selected", "finalist"]).optional(),
  tags: z.union([z.string(), z.array(z.string())]).optional(),
}).passthrough();
