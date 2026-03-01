import express from "express";
import AwardController from "../controllers/AwardController.js";

const palmaresRouter = express.Router();

palmaresRouter.get("/", AwardController.listAwards);
palmaresRouter.get("/:id", AwardController.getAwardById);

export default palmaresRouter;
