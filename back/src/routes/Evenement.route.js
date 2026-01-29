import express from "express";
import {
  getAllEvenements,
  getEvenementsByType,
  getEvenementById,
  getWorkshopsWithPlaces,
  createEvenement,
  updateEvenement,
  deleteEvenement,
} from "../controllers/EvenementController.js";

const router = express.Router();

router.get("/", getAllEvenements);
router.get("/workshops", getWorkshopsWithPlaces);
router.get("/type/:type", getEvenementsByType);
router.get("/:id", getEvenementById);
router.post("/", createEvenement);
router.put("/:id", updateEvenement);
router.delete("/:id", deleteEvenement);

export default router;
