import Setting from "../models/Setting.js";

const SMTP_KEYS = ["smtp_host", "smtp_port", "smtp_user", "smtp_pass", "smtp_from"];

async function getSmtp(req, res) {
  try {
    const rows = await Setting.findAll({ where: { key: SMTP_KEYS } });
    const settings = {};
    for (const row of rows) {
      settings[row.key] = row.key === "smtp_pass" ? "••••••••" : row.value;
    }
    for (const k of SMTP_KEYS) {
      if (!(k in settings)) settings[k] = "";
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch SMTP settings", details: error.message });
  }
}

async function updateSmtp(req, res) {
  try {
    const updates = req.body;
    for (const key of SMTP_KEYS) {
      if (updates[key] === undefined) continue;
      if (key === "smtp_pass" && updates[key] === "••••••••") continue;
      await Setting.upsert({ key, value: updates[key] });
    }
    res.json({ message: "SMTP settings updated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update SMTP settings", details: error.message });
  }
}

async function testSmtp(req, res) {
  try {
    const { createTransporterFromDB } = await import("../services/mailer.js");
    const transporter = await createTransporterFromDB();
    if (!transporter) {
      return res.status(400).json({ error: "SMTP not configured" });
    }
    await transporter.verify();
    res.json({ message: "SMTP connection successful" });
  } catch (error) {
    res.status(400).json({ error: "SMTP connection failed", details: error.message });
  }
}

export default { getSmtp, updateSmtp, testSmtp };
