import express from "express";
import { assignFilm, removeAssignment, getAssignments, getMyAssignments, vote, getVotes } from "../controllers/JuryController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

// Admin
router.get("/assignments", (req, res, next) => AuthMiddleware(req, res, next, ["ADMIN"]), getAssignments);
router.post("/assign", (req, res, next) => AuthMiddleware(req, res, next, ["ADMIN"]), assignFilm);
router.delete("/assignments/:id", (req, res, next) => AuthMiddleware(req, res, next, ["ADMIN"]), removeAssignment);
router.get("/votes", (req, res, next) => AuthMiddleware(req, res, next, ["ADMIN"]), getVotes);

// Jury
router.get("/my-assignments", (req, res, next) => AuthMiddleware(req, res, next, ["JURY"]), getMyAssignments);
router.post("/vote", (req, res, next) => AuthMiddleware(req, res, next, ["JURY"]), vote);

export default router;
