import express from "express";
import {
  getAllReservations,
  getReservationsByEvenement,
  createReservation,
  deleteReservation,
} from "../controllers/ReservationController.js";

const router = express.Router();

router.get("/", getAllReservations);
router.get("/evenement/:evenementId", getReservationsByEvenement);
router.post("/", createReservation);
router.delete("/:id", deleteReservation);

export default router;
