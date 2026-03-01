import { useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getFilmById } from "../../api/films";
import { API_URL } from "../../api/config";

function getYoutubeEmbedUrl(link) {
  if (!link) return "";

  try {
    if (link.includes("youtu.be/")) {
      const id = link.split("youtu.be/")[1].split(/[?&]/)[0];
      return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`;
    }

    if (link.includes("youtube.com/watch")) {
      const url = new URL(link);
      const id = url.searchParams.get("v");
      return id
        ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`
        : "";
    }

    if (link.includes("youtube.com/embed/")) {
      const id = link.split("embed/")[1].split(/[?&]/)[0];
      return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`;
    }
  } catch {}

  if (/^[a-zA-Z0-9_-]{6,}$/.test(link)) {
    return `https://www.youtube.com/embed/${link}?rel=0&modestbranding=1&playsinline=1`;
  }

  return "";
}

export default function Film() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: film, isLoading, error } = useQuery({
    queryKey: ["film", id],
    queryFn: () => getFilmById(id).then((res) => res.data),
    enabled: !!id,
  });

  const embedUrl = useMemo(() => {
    const link = film?.youtube_link || "";
    return getYoutubeEmbedUrl(link);
  }, [film]);

  if (isLoading) return <div className="p-6 text-white">Loading...</div>;
  if (error) return <div className="p-6 text-red-400">Film not found</div>;
  if (!film) return <div className="p-6 text-white">Film not found</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 rounded-full border border-white/20 px-4 py-2 hover:bg-white/10"
      >
        &larr; Back
      </button>

      <div className="mx-auto max-w-5xl">
        {/* Thumbnail */}
        {film.thumbnail && (
          <div className="mb-8">
            <img
              src={`${API_URL}/uploads/images/${film.thumbnail}`}
              alt={film.title}
              className="w-full max-h-[400px] object-cover rounded-2xl border border-white/10"
            />
          </div>
        )}

        <h1 className="text-4xl font-black">{film.title}</h1>

        {film.translated_title && (
          <div className="mt-2 text-white/70">{film.translated_title}</div>
        )}

        {/* Metadata */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/60">
          {film.user && (
            <span>
              By {film.user.first_name} {film.user.last_name}
            </span>
          )}
          {film.language && <span>Language: {film.language}</span>}
          {film.duration && <span>Duration: {film.duration}</span>}
          {film.ai_tools && <span>AI Tools: {film.ai_tools}</span>}
        </div>

        {film.synopsis && (
          <div className="mt-6 text-white/80">{film.synopsis}</div>
        )}

        {embedUrl ? (
          <div className="mt-8 flex justify-center">
            <div className="w-full max-w-3xl aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black">
              <iframe
                src={embedUrl}
                title={film.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        ) : (
          <div className="mt-8 text-white/60">No YouTube link</div>
        )}
      </div>
    </div>
  );
}
