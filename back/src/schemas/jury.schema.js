import { z } from "zod";

export const assignFilmSchema = z.object({
  film_id: z.coerce.number().int().positive("film_id invalide"),
  jury_id: z.coerce.number().int().positive("jury_id invalide"),
});

export const voteSchema = z.object({
  film_id: z.coerce.number().int().positive("film_id invalide"),
  vote: z.enum(["aime", "aime_pas"], { errorMap: () => ({ message: "Le vote doit être 'aime' ou 'aime_pas'" }) }),
  comment: z.string().max(1000).optional().nullable(),
});
