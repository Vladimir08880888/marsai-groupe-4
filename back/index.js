import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import router from "./src/routes/index.js";
import { configDotenv } from "dotenv";

// Import models to initialize associations
import "./src/models/index.js";

configDotenv();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// Static file serving for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "MarsAI API is running" });
});

app.use("/", router);

app.listen(PORT, () => {
  console.log("-----------------------------");
  console.log("--        MARS.A.I         --");
  console.log("-----------------------------");
  console.log(`Le serveur est lancé sur http://localhost:${PORT}`);
});
