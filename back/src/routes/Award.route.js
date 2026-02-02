import express from "express";
import { getAllAwards, createAward, updateAward, deleteAward, assignFilm, removeFilm } from "../controllers/AwardController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { createAwardSchema, assignFilmToAwardSchema } from "../schemas/award.schema.js";

const router = express.Router();

router.get("/", getAllAwards);
router.post("/", (req, res, next) => AuthMiddleware(req, res, next, ["ADMIN"]), validate(createAwardSchema), createAward);
router.put("/:id", (req, res, next) => AuthMiddleware(req, res, next, ["ADMIN"]), updateAward);
router.delete("/:id", (req, res, next) => AuthMiddleware(req, res, next, ["ADMIN"]), deleteAward);
router.post("/:id/films", (req, res, next) => AuthMiddleware(req, res, next, ["ADMIN"]), validate(assignFilmToAwardSchema), assignFilm);
router.delete("/:id/films/:filmId", (req, res, next) => AuthMiddleware(req, res, next, ["ADMIN"]), removeFilm);

export default router;
