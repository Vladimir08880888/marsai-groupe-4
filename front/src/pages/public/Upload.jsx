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

  async function handleFileChange(e) {
    setError(null);
    setDuration(null);

    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    try {
      const d = await getVideoDuration(selectedFile);

      if (d > MAX_SECONDS) {
        setError(
          `Vidéo trop longue (${Math.ceil(d)}s). Maximum autorisé : ${MAX_SECONDS}s`,
        );
        return;
      }

      setDuration(d);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={{ maxWidth: 400 }}>
      <h2>Upload vidéo</h2>

      <input type="file" accept="video/*" onChange={handleFileChange} />

      {duration !== null && <p>Durée : {Math.ceil(duration)} secondes</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

