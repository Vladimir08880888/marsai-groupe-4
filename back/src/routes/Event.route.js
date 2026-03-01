import express from 'express';
import EventController from "../controllers/EventController.js";

const router = express.Router();

router.get("/", EventController.getEvents);

router.get("/:id", EventController.getEventById);


export default router;
