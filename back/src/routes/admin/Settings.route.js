import express from "express";
import AuthMiddleware from "../../middlewares/AuthMiddleware.js";
import SettingsController from "../../controllers/SettingsController.js";

const settingsRouter = express.Router();

settingsRouter.use((req, res, next) => AuthMiddleware(req, res, next, ["ADMIN"]));

settingsRouter.get("/smtp", SettingsController.getSmtp);
settingsRouter.put("/smtp", SettingsController.updateSmtp);
settingsRouter.post("/smtp/test", SettingsController.testSmtp);

export default settingsRouter;
