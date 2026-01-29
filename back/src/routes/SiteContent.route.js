import express from "express";
import { getAll, getByKey, upsert } from "../controllers/SiteContentController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:key", getByKey);
router.put("/", (req, res, next) => AuthMiddleware(req, res, next, ["ADMIN"]), upsert);

export default router;
