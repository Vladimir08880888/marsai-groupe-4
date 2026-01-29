// UploadVideo.jsx
import { useState } from "react";
import { useNavigate } from "react-router";

export default function UploadVideo() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Choisissez une vidéo");

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("video", file);

    try {
      const res = await fetch("/api/uploads", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Erreur upload");

      alert("Vidéo envoyée avec succès !");
      navigate("/");
    } catch (err) {
      alert("Erreur : " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Uploader une vidéo</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Titre de la vidéo</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-3 rounded"
            placeholder="Mon super court-métrage"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Vidéo (MP4, max 500 Mo)</label>
          <input
            type="file"
            accept="video/mp4,video/quicktime"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border p-3 rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Envoi en cours..." : "Envoyer la vidéo"}
        </button>
      </form>
    </div>
  );
}