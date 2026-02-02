import multer from "multer";
import path from "path";

const videoFilter = (req, file, cb) => {
  const allowed = [".mp4", ".mov"];
  const ext = path.extname(file.originalname).toLowerCase();
  cb(null, allowed.includes(ext));
};

const imageFilter = (req, file, cb) => {
  const allowed = [".jpg", ".jpeg", ".png", ".webp"];
  const ext = path.extname(file.originalname).toLowerCase();
  cb(null, allowed.includes(ext));
};

export const uploadFilm = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = file.fieldname === "video_file" ? "uploads/videos" : "uploads/images";
      cb(null, path.join(process.cwd(), dir));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`);
    },
  }),
  limits: { fileSize: 300 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "video_file") videoFilter(req, file, cb);
    else imageFilter(req, file, cb);
  },
}).fields([
  { name: "video_file", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
  { name: "subtitles", maxCount: 1 },
]);
