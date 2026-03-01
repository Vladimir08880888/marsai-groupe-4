import instance from "./config";

export function getSmtpSettings() {
  return instance.get("/admin/settings/smtp");
}

export function updateSmtpSettings(data) {
  return instance.put("/admin/settings/smtp", data);
}

export function testSmtpConnection() {
  return instance.post("/admin/settings/smtp/test");
}
