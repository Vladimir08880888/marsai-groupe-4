import fs from "fs";
import path from "path";
import crypto from "crypto";
import dotenv from "dotenv";
import { google } from "googleapis";

dotenv.config();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } =
  process.env;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI) {
  throw new Error("Missing Google API credentials in environment variables");
}

// Scope upload Youtube

const SCOPES = ["https://www.googleapis.com/auth/youtube.upload"];

// OAtuh2 client
const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
);

// Stockage tokens cote serveur
const TOKENS_PATH = path.join(process.cwd(), "youtube_tokens.json");

function loadTokens() {
  if (!fs.existsSync(TOKENS_PATH)) return null;
  return JSON.parse(fs.readFileSync(TOKENS_PATH, "utf-8"));
}

function saveTokens(tokens) {
  fs.writeFileSync(TOKENS_PATH, JSON.stringify(tokens));
}

let lastOAuthState = null;

async function googleAuthCallback(req, res) {
  try {
    const { code, state } = req.query;

    if (!state || state !== lastOAuthState) {
      return res.status(400).json({ error: "Invalid state parameter" });
    }
    if (!code) return res.status(400).send("Missing code parameter");
    const { tokens } = await oauth2Client.getToken(code);

    saveTokens(tokens);
    res.send("Authentication successful!");
    res.redirect("/");
  } catch (error) {
    res.status(500).send(String(error?.message || error));
  }
}

function googleAuth(req, res) {
  const state = crypto.randomBytes(16).toString("hex");
  lastOAuthState = state;

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: SCOPES,
    state,
  });
  res.redirect(url);
}

async function uploadVideoToYoutube(req, res) {
  const tokens = loadTokens();
  if (!tokens) {
    return res.status(401).json({ error: "Authentification Google requise" });
  }

  if (!req.file?.path) {
    return res.status(400).json({ error: "Aucune vidéo uploadée" });
  }

  const filePath = req.file.path;

  try {
    oauth2Client.setCredentials(tokens);
    await oauth2Client.getAccessToken(); 
    const youtube = google.youtube({ version: "v3", auth: oauth2Client });

    const tags = req.body.tags
      ? req.body.tags.split(",").map(t => t.trim()).filter(Boolean)
      : undefined;

    const response = await youtube.videos.insert({
      part: "snippet,status",
      requestBody: {
        snippet: {
          title: req.body.title || "Vidéo sans titre",
          description: req.body.description || "",
          tags,
          categoryId: "22", 
        },
        status: {
          privacyStatus: req.body.privacyStatus || "private",
        },
      },
      media: { body: fs.createReadStream(filePath) },
    });


    res.json({
      videoId: response.data.id,
      license: response.data.contentDetails?.licensedContent,
    });
  } catch (error) {
    console.error("Erreur upload YouTube:", error);
    res.status(500).json({
      error: "Échec upload YouTube",
      details: error.message || error.response?.data || "Erreur inconnue",
    });
  }
}
export { googleAuth, googleAuthCallback, uploadVideoToYoutube };
