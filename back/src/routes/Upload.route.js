import express from "express";
import UploadController from "../controllers/UploadController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/videos/"); 
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["video/mp4", "video/quicktime", "video/webm"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Format non autorisé. Seules les vidéos MP4, MOV, WebM sont acceptées."), false);
    }
  },
});

const uploadRouter = express.Router();

uploadRouter.use((req, res, next) => {
  AuthMiddleware(req, res, next, ["ADMIN", "JURY", "PRODUCER"]);
});


uploadRouter.get("/", (req, res, next) => {
  AuthMiddleware(req, res, next, ["ADMIN", "JURY"]);
}, UploadController.getUploads);

uploadRouter.get("/:id", (req, res, next) => {
  AuthMiddleware(req, res, next, ["ADMIN", "JURY", "PRODUCER"]);
}, UploadController.getUploadbyId);

uploadRouter.post(
  "/",
  (req, res, next) => {
    AuthMiddleware(req, res, next, ["PRODUCER", "ADMIN"]);
  },
  upload.single("video"), // ← ICI ! multer est appliqué uniquement sur POST
  UploadController.createUpload
);

uploadRouter.put("/:id", (req, res, next) => {
  AuthMiddleware(req, res, next, ["ADMIN", "PRODUCER"]);
}, UploadController.updateUpload);

uploadRouter.delete("/:id", (req, res, next) => {
  AuthMiddleware(req, res, next, ["ADMIN", "PRODUCER"]);
}, UploadController.deleteUpload);

export default uploadRouter; 