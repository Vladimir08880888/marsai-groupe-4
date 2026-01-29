import express from "express";
import {
  getAllFilms,
  getPublicFilms,
  getFilmsByStatus,
  getFilmById,
  createFilm,
  updateFilm,
  deleteFilm,
} from "../controllers/FilmController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import { uploadFilm } from "../middlewares/upload.js";

const router = express.Router();

// Public
router.get("/public", getPublicFilms);
router.get("/status/:status", getFilmsByStatus);
router.get("/:id", getFilmById);

// Authenticated
router.get("/", (req, res, next) => AuthMiddleware(req, res, next, ["ADMIN"]), getAllFilms);
router.post("/", (req, res, next) => AuthMiddleware(req, res, next, ["PRODUCER", "ADMIN"]), uploadFilm, createFilm);
router.put("/:id", (req, res, next) => AuthMiddleware(req, res, next, ["ADMIN"]), uploadFilm, updateFilm);
router.delete("/:id", (req, res, next) => AuthMiddleware(req, res, next, ["ADMIN"]), deleteFilm);

export default router;
