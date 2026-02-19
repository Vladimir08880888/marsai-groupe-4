import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ConfirmModal from "@/components/ConfirmModal";
import { Sparkles } from "lucide-react";
import { Film } from "lucide-react";
import { CircleCheck } from "lucide-react";

const MAX_SECONDS = 60;
const MAX_FILE_SIZE = 500 * 1024 * 1024;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];
const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/quicktime", "video/webm"];

const uploadSchema = z.object({
  title: z.string().min(3).max(255),
  translated_title: z.string().max(255).optional(),
  synopsis: z.string().max(2000).optional(),
  language: z.string().max(100).optional(),
  synopsis_en: z.string().max(2000).optional(),
  youtube_link: z.string().url().optional().or(z.literal("")),
  ai_tools: z.string().max(1000).optional(),
  subtitles: z
    .any()
    .refine(
      (val) => !val || val instanceof File,
      "Veuillez sélectionner un fichier .srt",
    )
    .refine(
      (val) => !val || val.name.toLowerCase().endsWith(".srt"),
      "Seul le format .srt est autorisé",
    )
    .optional(),
  thumbnail: z
    .any()
    .refine(
      (val) => !val || val instanceof File,
      "Veuillez sélectionner une image",
    )
    .refine((val) => !val || val.size <= MAX_IMAGE_SIZE, "Max 5 Mo")
    .refine(
      (val) => !val || ACCEPTED_IMAGE_TYPES.includes(val.type),
      "jpg, png, webp, gif",
    )
    .optional(),
  image_2: z
    .any()
    .refine(
      (val) => !val || val instanceof File,
      "Veuillez sélectionner une image",
    )
    .refine((val) => !val || val.size <= MAX_IMAGE_SIZE, "Max 5 Mo")
    .refine(
      (val) => !val || ACCEPTED_IMAGE_TYPES.includes(val.type),
      "jpg, png, webp, gif",
    )
    .optional(),
  image_3: z
    .any()
    .refine(
      (val) => !val || val instanceof File,
      "Veuillez sélectionner une image",
    )
    .refine((val) => !val || val.size <= MAX_IMAGE_SIZE, "Max 5 Mo")
    .refine(
      (val) => !val || ACCEPTED_IMAGE_TYPES.includes(val.type),
      "jpg, png, webp, gif",
    )
    .optional(),
  video: z
    .any()
    .refine((val) => val instanceof File, "Veuillez sélectionner une vidéo")
    .refine((val) => val.size <= MAX_FILE_SIZE, "Max 500 Mo")
    .refine(
      (val) => ACCEPTED_VIDEO_TYPES.includes(val.type),
      "MP4, MOV, WebM seulement",
    )
    .refine(async (val) => {
      if (!val || !(val instanceof File)) return true;
      try {
        const duration = await getVideoDuration(val);
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
      resolve(video.duration);
    };

    video.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Fichier invalide"));
    };
  });
}

export default function Upload() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempData, setTempData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      title: "",
      translated_title: "",
      synopsis: "",
      language: "",
      synopsis_en: "",
      youtube_link: "",
      ai_tools: "",
      subtitles: null,
      thumbnail: null,
      image_2: null,
      image_3: null,
      video: null,
    },
  });

  const onSubmit = (data) => {
    setTempData(data);
    setIsModalOpen(true);
  };

  const confirmSubmit = async () => {
    setIsModalOpen(false);
    setLoading(true);
    setServerError(null);

    try {
      const formData = new FormData();
      formData.append("title", tempData.title);
      formData.append("translated_title", tempData.translated_title || "");
      formData.append("synopsis", tempData.synopsis || "");
      formData.append("language", tempData.language || "");
      formData.append("synopsis_en", tempData.synopsis_en || "");
      formData.append("youtube_link", tempData.youtube_link || "");
      formData.append("ai_tools", tempData.ai_tools || "");
      if (tempData.subtitles) formData.append("subtitles", tempData.subtitles);
      if (tempData.thumbnail) formData.append("thumbnail", tempData.thumbnail);
      if (tempData.image_2) formData.append("image_2", tempData.image_2);
      if (tempData.image_3) formData.append("image_3", tempData.image_3);
      formData.append("video", tempData.video);

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

      alert("Tout a été envoyé avec succès !");
      reset();
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="py-[140px] bg-black text-white p-10">
      <div>
        <div className="flex items-center gap-[5px] text-[#f6339a]">
          <Sparkles size={36} />
          <h2 className="uppercase  text-[24px] font-bold">
            Appel à projets 2026
          </h2>
          <Sparkles size={36} />
        </div>

        <span className="uppercase text-[54px] font-bold">Déposer UN </span>
        <span className="uppercase text-[54px] font-bold text-[#2b7fff]">
          FILM
        </span>
      </div>
      <div className="bg-[#1b1b1b] p-10 rounded-[25px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Titre */}
          <div className="grid grid-cols-[40px_1fr] gap-4 items-center">
            <CircleCheck size={40} className="text-[#2b7fff]" />
            <h2 className="uppercase text-[16px] tracking-[0.06em]">
              Transmettez les éléments techniques, l'usage de l'IA et la
              composition de votre équipe. Tous les champs marqués d'une étoile
              (*) sont obligatoires.
            </h2>
          </div>

          <div className="grid grid-cols-[40px_1fr] gap-4 items-center">
            <Film size={39} className="text-[#c27aff] min-w-[39px]" />
            <h2 className="text-[32px] text-[#c27aff] uppercase">
              01.Identitée du film
            </h2>
          </div>
          <div>
            <div className="grid grid-cols-[40px_1fr] gap-4 items-center">
              <div className="none"></div>

              <div>
                <div className="grid grid-cols-2 gap-10">
                  <div className="flex flex-col">
                    <label className="uppercase text-[24px]">
                      titre du court métrage * :
                    </label>
                    <input
                      className="bg-white/2 border-white/5 border-[1px] rounded-[10px] p-[10px]"
                      {...register("title")}
                      placeholder="Titre de la vidéo"
                    />
                    {errors.title && <p>{errors.title.message}</p>}
                  </div>

                  {/* Titre traduit */}
                  <div className="flex flex-col">
                    <label className="uppercase text-[26px]">
                      traduction anglaise * :
                    </label>
                    <input
                      className="bg-white/2 border-white/5 border-[1px] rounded-[10px] p-[10px]"
                      {...register("translated_title")}
                      placeholder="Translated title"
                    />
                    {errors.translated_title && (
                      <p>{errors.translated_title.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col">
                  <label>Langue (optionnel)</label>
                  <input
                    {...register("language")}
                    placeholder="Français, Anglais, etc."
                  />
                  {errors.language && <p>{errors.language.message}</p>}
                </div>

                {/* Synopsis */}
                <div className="flex flex-col">
                  <label>Synopsis (optionnel)</label>
                  <textarea
                    {...register("synopsis")}
                    rows={4}
                    placeholder="Description du film"
                  />
                  {errors.synopsis && <p>{errors.synopsis.message}</p>}
                </div>

                {/* Langue */}

                {/* Synopsis anglais */}
                <div className="flex flex-col">
                  <label>Synopsis en anglais (optionnel)</label>
                  <textarea
                    {...register("synopsis_en")}
                    rows={4}
                    placeholder="English synopsis"
                  />
                  {errors.synopsis_en && <p>{errors.synopsis_en.message}</p>}
                </div>
              </div>
            </div>
          </div>
          {/* Outils IA */}
          <div className="flex flex-col">
            <label>Outils IA (optionnel)</label>
            <textarea
              {...register("ai_tools")}
              rows={3}
              placeholder="Midjourney, Runway, Luma, etc."
            />
            {errors.ai_tools && <p>{errors.ai_tools.message}</p>}
          </div>

          {/* Sous-titres */}
          <div className="flex flex-col">
            <label>Sous-titres (.srt) (optionnel)</label>
            <input
              type="file"
              accept=".srt"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setValue("subtitles", file, { shouldValidate: true });
                }
              }}
            />
            {errors.subtitles && <p>{errors.subtitles.message}</p>}
            {watch("subtitles") && (
              <p>Fichier sélectionné : {watch("subtitles").name}</p>
            )}
          </div>

          {/* Vidéo */}
          <div className="flex flex-col">
            <label>Vidéo *</label>
            <input
              type="file"
              accept={ACCEPTED_VIDEO_TYPES.join(",")}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setValue("video", file, { shouldValidate: true });
              }}
            />
            {errors.video && <p>{errors.video.message}</p>}
          </div>

          {/* Thumbnail */}
          <div className="flex flex-col">
            <label>Thumbnail (optionnel)</label>
            <input
              type="file"
              accept={ACCEPTED_IMAGE_TYPES.join(",")}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setValue("thumbnail", file, { shouldValidate: true });
              }}
            />
            {errors.thumbnail && <p>{errors.thumbnail.message}</p>}
          </div>

          {/* Image 2 */}
          <div className="flex flex-col">
            <label>Image 2 (optionnel)</label>
            <input
              type="file"
              accept={ACCEPTED_IMAGE_TYPES.join(",")}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setValue("image_2", file, { shouldValidate: true });
              }}
            />
            {errors.image_2 && <p>{errors.image_2.message}</p>}
          </div>

          {/* Image 3 */}
          <div className="flex flex-col">
            <label>Image 3 (optionnel)</label>
            <input
              type="file"
              accept={ACCEPTED_IMAGE_TYPES.join(",")}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setValue("image_3", file, { shouldValidate: true });
              }}
            />
            {errors.image_3 && <p>{errors.image_3.message}</p>}
          </div>

          {serverError && <p>{serverError}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Envoi en cours..." : "Uploader"}
          </button>
        </form>

        <ConfirmModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={confirmSubmit}
          data={tempData}
        />
      </div>
    </section>
  );
}
