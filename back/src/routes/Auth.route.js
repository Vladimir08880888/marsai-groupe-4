import express from "express";
import AuthController from "../controllers/AuthController.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const authRouter = express.Router();

authRouter.post("/login", validate(loginSchema), AuthController.login);

authRouter.post("/register", validate(registerSchema), AuthController.register);

export default authRouter;
