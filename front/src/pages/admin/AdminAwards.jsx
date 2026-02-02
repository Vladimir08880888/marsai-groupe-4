import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { awardsApi, filmsApi } from "../../services/api.js";

export default function AdminAwards() {
  const queryClient = useQueryClient();
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [assignModal, setAssignModal] = useState(null);

  const { data: awards, isLoading } = useQuery({ queryKey: ["awards"], queryFn: awardsApi.getAll });
  const { data: films } = useQuery({ queryKey: ["admin-films"], queryFn: filmsApi.getAll });

  const createMutation = useMutation({
    mutationFn: () => awardsApi.create({ name: newName, description: newDesc }),
    onSuccess: () => { setNewName(""); setNewDesc(""); queryClient.invalidateQueries({ queryKey: ["awards"] }); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => awardsApi.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["awards"] }),
  });

  const assignMutation = useMutation({
    mutationFn: ({ awardId, filmId }) => awardsApi.assignFilm(awardId, filmId),
    onSuccess: () => { setAssignModal(null); queryClient.invalidateQueries({ queryKey: ["awards"] }); },
  });

  const removeMutation = useMutation({
    mutationFn: ({ awardId, filmId }) => awardsApi.removeFilm(awardId, filmId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["awards"] }),
  });

  if (isLoading) return <div className="p-8 text-white/60">Chargement...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-6">Prix & Récompenses</h1>

      <div className="bg-gray-900 border border-white/10 rounded-lg p-4 mb-6 max-w-lg">
        <h2 className="text-white font-semibold mb-3">Nouveau prix</h2>
        <input type="text" placeholder="Nom du prix" className="w-full bg-gray-800 border border-white/10 rounded px-3 py-2 text-white text-sm mb-2"
          value={newName} onChange={(e) => setNewName(e.target.value)} />
        <input type="text" placeholder="Description" className="w-full bg-gray-800 border border-white/10 rounded px-3 py-2 text-white text-sm mb-2"
          value={newDesc} onChange={(e) => setNewDesc(e.target.value)} />
        <button onClick={() => createMutation.mutate()} disabled={!newName}
          className="bg-purple-600 text-white px-4 py-1.5 rounded text-sm hover:bg-purple-700 disabled:opacity-50">Créer</button>
      </div>

      <div className="space-y-4">
        {awards?.map((award) => (
          <div key={award.id} className="bg-gray-900 border border-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-white font-semibold">{award.name}</h3>
                {award.description && <p className="text-white/40 text-sm">{award.description}</p>}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setAssignModal(award.id)}
                  className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded text-sm">+ Film</button>
                <button onClick={() => { if (confirm("Supprimer ?")) deleteMutation.mutate(award.id); }}
                  className="bg-red-600/20 text-red-400 px-3 py-1 rounded text-sm">Suppr.</button>
              </div>
            </div>
            {award.films?.length > 0 && (
              <div className="space-y-1">
                {award.films.map((film) => (
                  <div key={film.id} className="flex items-center justify-between bg-gray-800 rounded px-3 py-2">
                    <span className="text-white text-sm">{film.title}</span>
                    <button onClick={() => removeMutation.mutate({ awardId: award.id, filmId: film.id })}
                      className="text-red-400 text-xs hover:text-red-300">Retirer</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {assignModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setAssignModal(null)}>
          <div className="bg-gray-900 rounded-xl p-6 border border-white/10 w-full max-w-md max-h-96 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold text-white mb-4">Assigner un film</h2>
            <div className="space-y-2">
              {films?.filter((f) => f.status === "selected" || f.status === "finalist").map((film) => (
                <button key={film.id}
                  onClick={() => assignMutation.mutate({ awardId: assignModal, filmId: film.id })}
                  className="w-full text-left bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm">
                  {film.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
