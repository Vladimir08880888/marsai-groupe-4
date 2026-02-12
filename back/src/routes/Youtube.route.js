import express from 'express';
import multer from 'multer'; 
import YoutubeController from '../controllers/YoutubeController.js';
import path from 'path';
import fs from 'fs';

const youtubeRouter = express.Router();
const UploadDir = path.join(process.cwd(), "uploads/videos");
if (!fs.existsSync(UploadDir)) fs.mkdirSync(UploadDir, { recursive: true });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UploadDir);
  },
  filename: (req, file, cb) => {
    console.log(req);
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

youtubeRouter.get("/auth", YoutubeController.googleAuth);
youtubeRouter.get("/auth/callback", YoutubeController.googleAuthCallback);
youtubeRouter.post("/upload", upload.single("video"), YoutubeController.uploadVideoToYoutube);

export default youtubeRouter;