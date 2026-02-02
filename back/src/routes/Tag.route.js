import express from "express";
import { getAllTags, createTag, deleteTag } from "../controllers/TagController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { createTagSchema } from "../schemas/tag.schema.js";

const router = express.Router();

router.get("/", getAllTags);
router.post("/", (req, res, next) => AuthMiddleware(req, res, next, ["ADMIN"]), validate(createTagSchema), createTag);
router.delete("/:id", (req, res, next) => AuthMiddleware(req, res, next, ["ADMIN"]), deleteTag);

export default router;
