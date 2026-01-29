import { useState } from "react";
import { useNavigate } from "react-router";
import { authApi } from "../../services/api.js";

export default function AdminAccess() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await authApi.login(email, password);
      if (data.role !== "ADMIN") {
        setError("Accès réservé aux administrateurs");
        setLoading(false);
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("first_name", data.first_name);
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.id);
      window.location.href = "/admin/films";
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-gray-900 rounded-xl p-8 border border-white/10 w-full max-w-sm space-y-4">
        <h1 className="text-xl font-bold text-white text-center">Administration</h1>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <input type="email" placeholder="Email" required
          className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Mot de passe" required
          className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" disabled={loading}
          className="w-full bg-purple-600 text-white py-2.5 rounded-lg hover:bg-purple-700 disabled:opacity-50">
          {loading ? "..." : "Connexion"}
        </button>
      </form>
    </div>
  );
}
