import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { getSmtpSettings, updateSmtpSettings, testSmtpConnection } from "../../api/settings.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle, XCircle, Loader2 } from "lucide-react";

function Settings() {
  const [smtp, setSmtp] = useState({
    smtp_host: "", smtp_port: "587", smtp_user: "", smtp_pass: "", smtp_from: "",
  });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    getSmtpSettings().then((res) => setSmtp(res.data)).catch(() => {});
  }, []);

  const saveMutation = useMutation({
    mutationFn: () => updateSmtpSettings(smtp),
    onSuccess: () => setStatus({ type: "success", message: "SMTP settings saved" }),
    onError: (err) => setStatus({ type: "error", message: err.response?.data?.error || "Failed to save" }),
  });

  const testMutation = useMutation({
    mutationFn: () => testSmtpConnection(),
    onSuccess: () => setStatus({ type: "success", message: "SMTP connection successful!" }),
    onError: (err) => setStatus({ type: "error", message: err.response?.data?.details || err.response?.data?.error || "Connection failed" }),
  });

  function handleChange(key, value) {
    setSmtp((prev) => ({ ...prev, [key]: value }));
    setStatus(null);
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Mail className="size-6 text-gray-700" />
          <h2 className="text-2xl font-bold text-gray-800">SMTP Email Settings</h2>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Configure SMTP credentials to enable email notifications (contact confirmations, reservation confirmations, welcome emails).
        </p>
        {status && (
          <div className={`flex items-center gap-2 px-4 py-3 rounded mb-6 ${status.type === "success" ? "bg-green-50 border border-green-200 text-green-700" : "bg-red-50 border border-red-200 text-red-700"}`}>
            {status.type === "success" ? <CheckCircle className="size-4" /> : <XCircle className="size-4" />}
            {status.message}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Host</label>
            <Input value={smtp.smtp_host} onChange={(e) => handleChange("smtp_host", e.target.value)} placeholder="smtp.gmail.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Port</label>
            <Input value={smtp.smtp_port} onChange={(e) => handleChange("smtp_port", e.target.value)} placeholder="587" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SMTP User (email)</label>
            <Input value={smtp.smtp_user} onChange={(e) => handleChange("smtp_user", e.target.value)} placeholder="your-email@gmail.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Password</label>
            <Input type="password" value={smtp.smtp_pass} onChange={(e) => handleChange("smtp_pass", e.target.value)} placeholder="App password" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">From Address</label>
            <Input value={smtp.smtp_from} onChange={(e) => handleChange("smtp_from", e.target.value)} placeholder="noreply@marsai-festival.com" />
          </div>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
            {saveMutation.isPending && <Loader2 className="size-4 mr-2 animate-spin" />}Save Settings
          </Button>
          <Button variant="outline" onClick={() => testMutation.mutate()} disabled={testMutation.isPending}>
            {testMutation.isPending && <Loader2 className="size-4 mr-2 animate-spin" />}Test Connection
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Settings;
