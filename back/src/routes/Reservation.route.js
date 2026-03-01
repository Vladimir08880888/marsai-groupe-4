import express from "express";
import ReservationController from "../controllers/ReservationController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const reservationRouter = express.Router();

// Public — create a reservation
reservationRouter.post("/", ReservationController.createReservation);

// Admin — list all reservations
reservationRouter.get("/", (req, res, next) => AuthMiddleware(req, res, next, ["ADMIN"]), ReservationController.listReservations);

export default reservationRouter;
