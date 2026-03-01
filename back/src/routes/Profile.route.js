import express from "express";
import UserController from "../controllers/UserController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const profileRouter = express.Router();

// Any authenticated user can access their profile
profileRouter.use((req, res, next) =>
  AuthMiddleware(req, res, next, ["ADMIN", "JURY", "PRODUCER"])
);

profileRouter.get("/me", UserController.getMe);
profileRouter.put("/me", UserController.updateMe);

export default profileRouter;
