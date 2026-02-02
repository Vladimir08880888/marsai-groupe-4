import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const MAX_SECONDS = 60;
const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500 Mo
const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/quicktime", "video/webm"];

const uploadSchema = z.object({
  title: z.string()
    .min(3, "Le titre doit faire au moins 3 caractères")
    .max(255, "Le titre est trop long (max 255 caractères)"),
  translated_title: z.string()
    .max(255, "Le titre traduit est trop long (max 255 caractères)")
    .optional(),
  synopsis: z.string()
    .max(255, "Le synopsis est trop long (max 255 caractères)"),
  language: z.string()
    .max(100, "Le langage est trop long (max 100 caractères)"),
  synopsis_en: z.string()
    .max(255, "Le synopsis en anglais est trop long (max 255 caractères)")
    .optional(),
  ai_tools: z.string()
    .max(255, "Les outils IA sont trop longs (max 255 caractères)"),
  thumbnail: z.string(),
  Image_2: z.string(),
  Image_3: z.string(),
  video: z.any()
    .refine((file) => file instanceof File, "Veuillez sélectionner une vidéo")
    .refine((file) => file.size <= MAX_FILE_SIZE, "La vidéo ne doit pas dépasser 500 Mo")
    .refine((file) => ACCEPTED_VIDEO_TYPES.includes(file.type), "Format non autorisé (MP4, MOV, WebM seulement)")
    .refine(async (file) => {
      if (!(file instanceof File)) return false;
      try {
        const duration = await getVideoDuration(file);
        return duration <= MAX_SECONDS;
      } catch {
        return false;
      }
    }, `La vidéo ne doit pas dépasser ${MAX_SECONDS} secondes`),
});

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
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    trigger,
  } = useForm({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      title: "",
      translated_title: "",
      synopsis:"",
      language: "",
      synopsis_en: "",
      subtitles:"",
      ai_tools: "",
      thumbnail: "",
      Image_2: "",
      Image_3: "",
      video: null,
    },
  });

  const videoFile = watch("video");

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError(null);

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("video", data.video);

      const response = await fetch("http://localhost:3000/uploads", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de l'upload");
      }

      alert("Vidéo uploadée avec succès !");
      reset();
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: "20px" }}>
      <h2>Upload vidéo (max 1 minute)</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Titre */}
        <div style={{ marginBottom: "16px" }}>
          <label>Titre de la vidéo</label>
          <input
            type="text"
            {...register("title")}
            placeholder="Mon court métrage..."
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
          {errors.title && <p style={{ color: "red", marginTop: "4px" }}>{errors.title.message}</p>}
        </div>

        {/* Vidéo */}
        <div style={{ marginBottom: "16px" }}>
          <label>Vidéo (MP4, MOV, WebM)</label>
          <input
            type="file"
            accept={ACCEPTED_VIDEO_TYPES.join(",")}
            onChange={(e) => {
              const file = e.target.files?.[0];
              setValue("video", file, { shouldValidate: true }); // ← déclenche Zod
              trigger("video"); // force re-validation
            }}
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
          {errors.video && <p style={{ color: "red", marginTop: "4px" }}>{errors.video.message}</p>}
        </div>

        {/* Aperçu fichier */}
        {videoFile && (
          <p style={{ color: "green" }}>
            Fichier sélectionné : {videoFile.name}
          </p>
        )}

        {serverError && <p style={{ color: "red" }}>{serverError}</p>}

        <button
          type="submit"
          disabled={loading}
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