import nodemailer from "nodemailer";
import Setting from "../models/Setting.js";

const SMTP_KEYS = ["smtp_host", "smtp_port", "smtp_user", "smtp_pass", "smtp_from"];

async function getSmtpConfig() {
  try {
    const rows = await Setting.findAll({ where: { key: SMTP_KEYS } });
    const db = {};
    for (const row of rows) db[row.key] = row.value;

    const host = db.smtp_host || process.env.SMTP_HOST || "smtp.gmail.com";
    const port = Number(db.smtp_port || process.env.SMTP_PORT) || 587;
    const user = db.smtp_user || process.env.SMTP_USER;
    const pass = db.smtp_pass || process.env.SMTP_PASS;
    const from = db.smtp_from || process.env.SMTP_FROM || "noreply@marsai-festival.com";

    return { host, port, user, pass, from };
  } catch {
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = Number(process.env.SMTP_PORT) || 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || "noreply@marsai-festival.com";
    return { host, port, user, pass, from };
  }
}

export async function createTransporterFromDB() {
  const { host, port, user, pass } = await getSmtpConfig();
  if (!user || !pass) return null;
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

async function sendMail(to, subject, html) {
  const config = await getSmtpConfig();

  if (!config.user || !config.pass) {
    console.log(`[mailer] SKIP (no SMTP creds) → ${to}: ${subject}`);
    return null;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: { user: config.user, pass: config.pass },
    });
    const info = await transporter.sendMail({ from: config.from, to, subject, html });
    console.log(`[mailer] SENT → ${to}: ${subject} (${info.messageId})`);
    return info;
  } catch (err) {
    console.error(`[mailer] ERROR → ${to}: ${subject}`, err.message);
    return null;
  }
}

export default sendMail;
