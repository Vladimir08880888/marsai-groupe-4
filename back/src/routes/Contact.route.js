import express from "express";
import ContactController from "../controllers/ContactController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const contactRouter = express.Router();

// Public — anyone can send a message
contactRouter.post("/", ContactController.createContact);

// Admin — list all messages
contactRouter.get("/", (req, res, next) => AuthMiddleware(req, res, next, ["ADMIN"]), ContactController.listContacts);

export default contactRouter;
