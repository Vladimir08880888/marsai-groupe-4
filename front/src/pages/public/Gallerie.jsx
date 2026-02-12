import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import FilmCard from "../../components/FilmCard";
import { listFilms } from "../../api/films";

export default function GalerieDesFilmsPage() {
  const [typeIA, setTypeIA] = useState("");
  const [pays, setPays] = useState(""); 
  const [statut, setStatut] = useState("");
  

  const [currentPage, setCurrentPage] = useState(1);
  	const limit = 6;

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

//passerà la page 1 à chaque fois que la liste de films change (ex: après un filtre) pour éviter d’avoir une page vide
  

  const filteredFilms = useMemo(() => {
    const wantedAI = typeIA.trim().toLowerCase();
    const wantedStatus = statut.trim();

    return films.filter((f) => {
      const aiTools = (f.ai_tools ?? "").toLowerCase();
      const status = f.status ?? "";

      const okAI = wantedAI ? aiTools.includes(wantedAI) : true;
      const okStatus = wantedStatus ? status === wantedStatus : true;

      //pays nul pour l'instant
      const okPays = true;

      return okAI && okStatus && okPays;
    });
  }, [films, typeIA, statut]);

  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(filteredFilms.length / pageSize));

  const visibleFilms = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredFilms.slice(start, start + pageSize);
  }, [filteredFilms, page]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        Erreur de chargement
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans p-4">
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
            <option value="chatgpt">ChatGPT</option>
            <option value="midjourney">Midjourney</option>
            <option value="runway">Runway</option>
          </select>

          {/* Pays d'origine -> nul pour l'instant*/}
          <select
            className="rounded-2xl px-4 py-4 pr-10 text-sm font-bold text-white outline-none bg-gradient-to-r from-[#7b2cff] to-[#FF2B7F]"
            value={pays}
            onChange={(e) => setPays(e.target.value)}
            disabled
            title="Pas de champ 'pays' dans la table films (pour l’instant)"
          >
            <option value="">Pays d’origine (désactivé)</option>
            <option value="France">France</option>
            <option value="USA">USA</option>
          </select>

          <select
            className="rounded-2xl px-4 py-4 pr-10 text-sm font-bold text-white outline-none bg-gradient-to-r from-[#7b2cff] to-[#FF2B7F]"
            value={statut}
            onChange={(e) => setStatut(e.target.value)}
          >
            <option value="">Statut</option>
            <option value="submitted">submitted</option>
            <option value="under_review">under_review</option>
            <option value="rejected">rejected</option>
            <option value="selected">selected</option>
            <option value="finalist">finalist</option>
          </select>
        </section>

        {/* Gallery */}
        <section className="grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-3">
          {visibleFilms.length === 0 ? (
            <div className="text-white/60 text-sm">
              Il n&apos;y a pas encore de films..
            </div>
          ) : (
            visibleFilms.map((film) => <FilmCard key={film.id} film={film} />)
          )}
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
                className={`grid h-9 w-9 place-items-center rounded-xl text-sm font-black transition ${
                  page === n
                    ? "bg-[#7b2cff] text-white"
                    : "text-black/70 hover:bg-black/5"
                }`}
              >
                {n}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="grid h-9 w-9 place-items-center rounded-xl text-black/70 transition hover:bg-black/5 disabled:opacity-40"
              disabled={page === totalPages}
            >
              ›
            </button>
          </div>

          <div className="text-[11px] font-black tracking-widest text-white/50">
            PAGE {page} SUR {totalPages} — {filteredFilms.length} FILMS TROUVÉS
          </div>
        </section>
      </main>
    </div>
  );
}
