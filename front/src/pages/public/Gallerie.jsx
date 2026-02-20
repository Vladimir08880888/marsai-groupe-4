import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { listFilms } from "../../api/films";

//shadcn components
import { YouTubePlayer, YouTubePlayerControls } from "@/components/ui/youtube-video-player.jsx";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";


export default function GalerieDesFilmsPage() {
  const [typeIA, setTypeIA] = useState("");
  const [pays, setPays] = useState(""); 
  const [statut, setStatut] = useState("");
  

  const [currentPage, setCurrentPage] = useState(1);
  	const limit = 6;
  const pageSize = 6;

  const totalPages = Math.max(1, Math.ceil(films.length / pageSize));

  const visibleFilms = useMemo(() => {
    const start = (page - 1) * pageSize;
    return films.slice(start, start + pageSize);
  }, [films, page]);

  return (
    <div className="min-h-screen bg-black text-white font-sans p-4 pt-[64px]">
      <main className="mx-auto max-w-[1180px] px-6 pb-10 pt-10">
        {/* Title */}
        <section className="mb-36">
          <h1 className="m-0 text-[56px] leading-[0.95] font-black tracking-[-1.5px]">
            LA GALERIE <br />
            DES{" "}
            <span className="bg-gradient-to-r from-[#ff4fd8] to-[#7b2cff] bg-clip-text text-transparent">
              FILMS
            </span>
          </h1>
        </section>

        {/* Filters */}
        <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <select
            className="rounded-2xl px-4 py-4 pr-10 text-sm font-bold text-white outline-none bg-gradient-to-r from-[#7b2cff] to-[#FF2B7F]"
            value={typeIA}
            onChange={(e) => setTypeIA(e.target.value)}
          >
            <option value="">Type d’IA</option>
            <option value="CHATGPT">CHATGPT</option>
            <option value="Midjourney">Midjourney</option>
            <option value="Runway">Runway</option>
          </select>

          <select
            className="rounded-2xl px-4 py-4 pr-10 text-sm font-bold text-white outline-none bg-gradient-to-r from-[#7b2cff] to-[#FF2B7F]"
            value={pays}
            onChange={(e) => setPays(e.target.value)}
          >
            <option value="">Pays d’origine</option>
            <option value="France">France</option>
            <option value="USA">USA</option>
          </select>

          <select
            className="rounded-2xl px-4 py-4 pr-10 text-sm font-bold text-white outline-none bg-gradient-to-r from-[#7b2cff] to-[#FF2B7F]"
            value={statut}
            onChange={(e) => setStatut(e.target.value)}
          >
            <option value="">Statut</option>
            <option value="published">Publié</option>
            <option value="pending">En attente</option>
          </select>
        </section>

        {/* Gallery */}
        <section className="grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-3">
          {visibleFilms.map((film) => (
            <FilmCard key={film.id} film={film} />
          ))}
        </section>

        {/* Pagination */}
        <section className="mt-12 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 rounded-2xl bg-white p-2 shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="grid h-9 w-9 place-items-center rounded-xl text-black/70 transition hover:bg-black/5 disabled:opacity-40"
              disabled={page === 1}
            >
              ‹
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`grid h-9 w-9 place-items-center rounded-xl text-sm font-black transition
                  ${page === n ? "bg-[#7b2cff] text-white" : "text-black/70 hover:bg-black/5"}`}
              >
                {n}
              </button>
            ))}

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["gallerie", currentPage, limit],
    queryFn: () => listFilms(currentPage, limit),
	  keepPreviousData: true,
  });

  if (isPending) {
    return <div>Chargement en cours...</div>;
  }

  if (isError) {
    return <div>Une erreur est survenue : {error.message}</div>;
  }



  return data.data.showVideos.length > 0 ? (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 p-8 max-w-7xl mx-auto">
        {data.data.showVideos.map((video) => (
          <div key={video.id || video.title}>
            <h2 className="text-2xl font-bold">{video.title}</h2>

            <YouTubePlayer
              videoId={video.youtube_link}
              title={video.title}
              customThumbnail={
                video.thumbnail
                  ? `http://localhost:3000/uploads/images/${video.thumbnail}`
                  : "http://localhost:3000/uploads/images/thumbnail-placeholder.png"
              }
              defaultExpanded={false}
              className="mb-8"
            />

            <div>
              <p>
                <strong>Propriétaire:</strong>{" "}
                {video.user ? `${video.user.first_name} ${video.user.last_name}` : "N/A"}
              </p>
              <p><strong>Email:</strong> {video.user?.email || "N/A"}</p>
              <p>{video.synopsis}</p>
              <label>{video.ai_tools}</label>
              <label><small>{video.created_at}</small></label>
            </div>
          </div>
        ))}
      </div>

      {data.data.totalPages > 1 && (
        <Pagination className="pb-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {Array.from({ length: data.data.totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((p) => Math.min(p + 1, data.data.totalPages))}
                className={currentPage === data.data.totalPagesages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  ) : (
    <div>Aucune vidéo à afficher.</div>
  );
}
