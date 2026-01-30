import { useState } from "react";

const MAX_SECONDS = 60; // durée max autorisée

function getVideoDuration(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");

    video.preload = "metadata";
    video.src = url;

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      if (Number.isFinite(video.duration)) {
        resolve(video.duration);
      } else {
        reject(new Error("Durée non lisible"));
      }
    };

    video.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Fichier vidéo invalide"));
    };
  });
}

export default function Upload() {
  const [error, setError] = useState(null);
  const [duration, setDuration] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleFileChange(e) {
    setError(null);
    setDuration(null);

    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    try {
      const d = await getVideoDuration(selectedFile);

      if (d > MAX_SECONDS) {
        setError(
          `Vidéo trop longue (${Math.ceil(d)}s). Maximum autorisé : ${MAX_SECONDS}s`
        );
        return;
      }

      setDuration(d);
      // Optionnel : stocke le fichier validé dans un state
      setVideoFile(selectedFile);
    } catch (err) {
      setError(err.message);
    }
  }

  const [videoFile, setVideoFile] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!videoFile) {
      setError("Choisissez une vidéo d'abord");
      return;
    }

    if (!title.trim()) {
      setError("Le titre est obligatoire");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("video", videoFile); // ← le fichier validé
      // Ajoute d'autres champs si besoin : formData.append("synopsis", synopsis);

      const response = await fetch("http://localhost:3000/uploads", { // ← ton endpoint
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // ton JWT
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'upload");
      }

      alert("Vidéo uploadée avec succès !");
      // Reset form
      setTitle("");
      setVideoFile(null);
      setDuration(null);
      e.target.reset();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: "20px" }}>
      <h2>Upload vidéo (max 1 minute)</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "16px" }}>
          <label>Titre de la vidéo</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Mon court métrage..."
            required
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label>Vidéo (MP4, MOV, WebM)</label>
          <input
            type="file"
            accept="video/mp4,video/quicktime,video/webm"
            onChange={handleFileChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>

        {duration !== null && (
          <p style={{ color: "green" }}>
            Durée : {Math.ceil(duration)} secondes (OK)
          </p>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          type="submit"
          disabled={loading || !videoFile || !title.trim()}
          style={{
            padding: "10px 20px",
            background: loading ? "#ccc" : "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Envoi en cours..." : "Uploader la vidéo"}
        </button>
      </form>
    </div>
  );
}