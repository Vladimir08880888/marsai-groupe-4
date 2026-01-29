import express from "express";
import UploadController from "../controllers/UploadController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const uploadRouter = express.Router();

// Upload
uploadRouter.use((req, res, next) => {
  AuthMiddleware(req, res, next, ["PARTICIPANT", "ADMIN"]); 
});

uploadRouter.use((req, res, next) => AuthMiddleware(req, res, next, ["ADMIN"]));
uploadRouter.get("/", UploadController.getUploads); // Liste de tous les uploads
uploadRouter.get("/:id", UploadController.getUploadById); // Récupérer un upload par ID
uploadRouter.post("/", UploadController.createUpload); // Créer un nouvel upload
uploadRouter.delete("/:id", UploadController.deleteUpload); // Supprimer un upload par ID
uploadRouter.put(
  "/:id",
  // (req, res, next) => AuthMiddleware(req, res, next, ["PRODUCER"]),
  UploadController.updateUpload,
); // Modifier un upload par ID

export default uploadRouter;