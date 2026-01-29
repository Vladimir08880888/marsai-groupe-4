import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { juryApi } from "../../services/api.js";

const API_URL = "http://localhost:3000";

export default function MyFilms() {
  const queryClient = useQueryClient();
  const [voteModal, setVoteModal] = useState(null);
  const [comment, setComment] = useState("");

  const { data: assignments, isLoading } = useQuery({
    queryKey: ["my-jury-assignments"],
    queryFn: juryApi.getMyAssignments,
  });

  const voteMutation = useMutation({
    mutationFn: ({ id_film, vote }) => juryApi.vote(id_film, vote, comment),
    onSuccess: () => {
      setVoteModal(null);
      setComment("");
      queryClient.invalidateQueries({ queryKey: ["my-jury-assignments"] });
    },
  });

  if (isLoading) return <div className="min-h-screen bg-gray-950 py-12 px-4 sm:px-6 lg:px-8"><p className="text-white/60">Chargement...</p></div>;

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">MES FILMS À ÉVALUER</h1>
        <p className="text-white/60 mb-8">Visionnez et votez pour les films qui vous ont été assignés</p>

        {(!assignments || assignments.length === 0) ? (
          <p className="text-white/40 text-center py-20">Aucun film assigné pour le moment.</p>
        ) : (
          <div className="space-y-6">
            {assignments.map((a) => {
              const film = a.film;
              if (!film) return null;
              return (
                <div key={a.id} className="bg-gray-900 border border-white/10 rounded-xl overflow-hidden">
                  {/* Video player */}
                  <div className="aspect-video bg-gray-800">
                    {film.video_file ? (
                      <video controls className="w-full h-full" src={`${API_URL}${film.video_file}`} />
                    ) : film.url_youtube ? (
                      <iframe
                        className="w-full h-full"
                        src={film.url_youtube.replace("watch?v=", "embed/")}
                        allowFullScreen
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20">Pas de vidéo</div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-white">{film.titre}</h2>
                        {film.titre_original && <p className="text-white/40 text-sm">{film.titre_original}</p>}
                        <p className="text-white/50 text-sm mt-1">{film.langue} | {film.duree ? `${film.duree}s` : ""} | {film.type}</p>
                      </div>
                      {a.vote ? (
                        <span className={`px-3 py-1 rounded text-sm ${a.vote.vote === "aime" ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"}`}>
                          {a.vote.vote === "aime" ? "J'aime" : "J'aime pas"}
                        </span>
                      ) : (
                        <span className="text-white/30 text-sm">Non voté</span>
                      )}
                    </div>

                    {film.synopsis_original && (
                      <p className="text-white/60 text-sm mt-3">{film.synopsis_original}</p>
                    )}

                    {film.processus_creatif && (
                      <div className="mt-3">
                        <p className="text-white/40 text-xs uppercase">Processus créatif</p>
                        <p className="text-white/50 text-sm">{film.processus_creatif}</p>
                      </div>
                    )}

                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => { setVoteModal(film.id_film); setComment(a.vote?.comment || ""); }}
                        className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 text-sm"
                      >
                        {a.vote ? "Modifier mon vote" : "Voter"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {voteModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setVoteModal(null)}>
            <div className="bg-gray-900 rounded-xl p-6 border border-white/10 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-lg font-semibold text-white mb-4">Votre vote</h2>
              <textarea rows={3} placeholder="Commentaire (optionnel)"
                className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm mb-4"
                value={comment} onChange={(e) => setComment(e.target.value)} />
              <div className="flex gap-3">
                <button
                  onClick={() => voteMutation.mutate({ id_film: voteModal, vote: "aime" })}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                >
                  J'aime
                </button>
                <button
                  onClick={() => voteMutation.mutate({ id_film: voteModal, vote: "aime_pas" })}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                >
                  J'aime pas
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
