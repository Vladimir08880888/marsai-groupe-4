import express from "express";
import {
  getAllFilms,
  getFilmsByStatus,
  getFilmById,
  createFilm,
  updateFilm,
  deleteFilm,
} from "../controllers/FilmController.js";

const router = express.Router();

router.get("/", getAllFilms);
router.get("/status/:status", getFilmsByStatus);
router.get("/:id", getFilmById);
router.post("/", createFilm);
router.put("/:id", updateFilm);
router.delete("/:id", deleteFilm);

export default router;
