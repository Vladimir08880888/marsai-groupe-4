import express from "express";
import UserController from "../../controllers/UserController.js";
import AuthMiddleware from "../../middlewares/AuthMiddleware.js";
import { validate } from "../../middlewares/validate.js";
import { createUserSchema, updateUserSchema } from "../../schemas/user.schema.js";

const userRouter = express.Router();

// Admin
userRouter.use((req, res, next) => AuthMiddleware(req, res, next, ["ADMIN"]));

userRouter.get("/", UserController.getUsers);
userRouter.get("/:id", UserController.getUserById);
userRouter.post("/", validate(createUserSchema), UserController.createUser);
userRouter.delete("/:id", UserController.deleteUser);
userRouter.put("/:id", validate(updateUserSchema), UserController.updateUser);

export default userRouter;
