import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { authApi } from "../../services/api.js";

export function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", password: "", rgpd_accepte: false });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (localStorage.getItem("username")) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white">Déjà connecté en tant que {localStorage.getItem("username")}</h1>
          <Link to="/" className="text-purple-400 hover:underline mt-4 block">Accueil</Link>
        </div>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await authApi.register(formData);
      alert("Inscription réussie !");
      navigate("/auth/login");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 pt-24">
      <form onSubmit={handleSubmit} className="bg-gray-900 rounded-xl p-8 border border-white/10 w-full max-w-sm space-y-4">
        <h1 className="text-xl font-bold text-white text-center">INSCRIPTION</h1>
        <p className="text-white/40 text-sm text-center">Créez votre compte producteur</p>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <input type="text" placeholder="Nom d'utilisateur" required
          className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30"
          value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />

        <input type="email" placeholder="Email"
          className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30"
          value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

        <input type="password" placeholder="Mot de passe" required
          className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30"
          value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

        <label className="flex items-start gap-2 cursor-pointer">
          <input type="checkbox" className="mt-1"
            checked={formData.rgpd_accepte} onChange={(e) => setFormData({ ...formData, rgpd_accepte: e.target.checked })} />
          <span className="text-white/50 text-xs">J'accepte le traitement de mes données conformément au RGPD *</span>
        </label>

        <button type="submit" disabled={loading || !formData.rgpd_accepte}
          className="w-full bg-purple-600 text-white py-2.5 rounded-lg hover:bg-purple-700 disabled:opacity-50">
          {loading ? "..." : "S'inscrire"}
        </button>

        <p className="text-white/40 text-sm text-center">
          Déjà inscrit ? <Link to="/auth/login" className="text-purple-400 hover:underline">Connexion</Link>
        </p>
      </form>
    </div>
  );
}
