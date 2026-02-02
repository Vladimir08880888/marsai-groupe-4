import { z } from "zod";

export const createAwardSchema = z.object({
  name: z.string().min(1, "Le nom du prix est requis").max(255),
  description: z.string().optional().nullable(),
});

export const assignFilmToAwardSchema = z.object({
  film_id: z.coerce.number().int().positive("film_id invalide").optional(),
  id_film: z.coerce.number().int().positive("id_film invalide").optional(),
}).refine((data) => data.film_id || data.id_film, {
  message: "film_id ou id_film est requis",
});
