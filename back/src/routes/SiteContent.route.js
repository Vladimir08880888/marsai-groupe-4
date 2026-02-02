import express from "express";
import { getAll, getByKey, upsert } from "../controllers/SiteContentController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { upsertContentSchema } from "../schemas/content.schema.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:key", getByKey);
router.put("/", (req, res, next) => AuthMiddleware(req, res, next, ["ADMIN"]), validate(upsertContentSchema), upsert);

export default router;
