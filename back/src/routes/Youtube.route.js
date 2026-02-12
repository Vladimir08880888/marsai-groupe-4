import express from 'express';
import multer from 'multer'; 
import { googleAuth, googleAuthCallback, uploadVideoToYoutube } from '../controllers/YoutubeController.js';
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
youtubeRouter.get("/auth", googleAuth);

youtubeRouter.get("/auth/callback", googleAuthCallback);
youtubeRouter.post("/upload", upload.single("video"), uploadVideoToYoutube);

export default youtubeRouter;