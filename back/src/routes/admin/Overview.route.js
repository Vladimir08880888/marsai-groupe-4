import express from "express";
import AuthMiddleware from "../../middlewares/AuthMiddleware.js";
import OverviewController from "../../controllers/OverviewController.js";

const overviewRouter = express.Router();

overviewRouter.get("/", OverviewController.getStats); // Admin


export default overviewRouter;
