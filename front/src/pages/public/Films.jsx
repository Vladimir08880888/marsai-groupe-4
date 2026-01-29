import { useQuery } from "@tanstack/react-query";
import { filmsApi } from "../../services/api.js";

const API_URL = "http://localhost:3000";

export default function Films() {
  const { data: films, isLoading } = useQuery({
    queryKey: ["films", "public"],
    queryFn: filmsApi.getPublic,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-white/60">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">SÉLECTION OFFICIELLE</h1>
        <p className="text-white/60 mb-12">Films retenus et finalistes du festival Mars.A.I</p>

        {(!films || films.length === 0) ? (
          <p className="text-white/40 text-center py-20">Aucun film publié pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {films.map((film) => (
              <div key={film.id} className="bg-gray-900 rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all">
                <div className="aspect-video bg-gray-800 relative">
                  {film.thumbnail ? (
                    <img src={`${API_URL}${film.thumbnail}`} alt={film.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20">16:9</div>
                  )}
                  {film.status === "finalist" && (
                    <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">FINALISTE</span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold">{film.title}</h3>
                  <p className="text-white/50 text-sm mt-1">{film.language || ""}</p>
                  {film.tags && film.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {film.tags.map((tag) => (
                        <span key={tag.id} className="text-xs bg-white/10 text-white/60 px-2 py-0.5 rounded">{tag.name}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
