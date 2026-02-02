/**
 * Middleware de validation Zod.
 * Prend un schéma Zod et valide req.body avant de passer au controller.
 */
export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      return res.status(400).json({ error: "Validation échouée", details: errors });
    }
    req.body = result.data;
    next();
  };
}
