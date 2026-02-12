import fs from "fs";
import path from "path";
import crypto from "crypto";
import dotenv from "dotenv";
import { google } from "googleapis";
import YoutubeToken from "../models/YoutubeTokens.js";

dotenv.config();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } = process.env;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI) {
  throw new Error("Missing Google API credentials in environment variables");
}

const SCOPES = ["https://www.googleapis.com/auth/youtube.upload"];

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);

let lastOAuthState = null;


async function loadTokens() {
  try {
    const tokenRecord = await YoutubeToken.findOne(); 
    if (!tokenRecord) return null;

    return {
      access_token: tokenRecord.access_token,
      refresh_token: tokenRecord.refresh_token,
      scope: tokenRecord.scope,
      token_type: tokenRecord.token_type,
      expiry_date: tokenRecord.expiry_date,
    };
  } catch (err) {
    console.error("Erreur loadTokens:", err);
    return null;
  }
}


async function saveTokens(tokens) {
  try {
    await YoutubeToken.upsert({
      id: 1, 
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token || null,
      scope: tokens.scope || null,
      token_type: tokens.token_type || null,
      expiry_date: tokens.expiry_date || null,
    });
  } catch (err) {
    console.error("Erreur saveTokens:", err);
    throw err;
  }
}

async function googleAuth(req, res) {
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

async function googleAuthCallback(req, res) {
  const { code, state } = req.query;

  if (!state || state !== lastOAuthState) {
    return res.status(400).json({ error: "Invalid state parameter" });
  }

  if (!code) {
    return res.status(400).json({ error: "Missing code parameter" });
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);

    await saveTokens(tokens);

    res.redirect("http://localhost:5173/admin"); 
  } catch (error) {
    console.error("Erreur auth callback:", error);
    res.status(500).send("Erreur lors de l'authentification");
  }
}

async function uploadVideoToYoutube(req, res) {
  const tokens = await loadTokens();
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
      success: true,
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