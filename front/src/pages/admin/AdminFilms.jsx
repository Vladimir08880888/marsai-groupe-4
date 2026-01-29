import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { filmsApi, usersApi, juryApi } from "../../services/api.js";

const API_URL = "http://localhost:3000";
const STATUSES = ["soumis_selection", "a_discuter", "refuse", "retenu", "finaliste"];

export default function AdminFilms() {
  const queryClient = useQueryClient();
  const [filterStatus, setFilterStatus] = useState("");
  const [assignModal, setAssignModal] = useState(null);

  const { data: films, isLoading } = useQuery({ queryKey: ["admin-films"], queryFn: filmsApi.getAll });
  const { data: juryUsers } = useQuery({ queryKey: ["jury-users"], queryFn: usersApi.getJury });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => filmsApi.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-films"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => filmsApi.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-films"] }),
  });

  const assignMutation = useMutation({
    mutationFn: ({ id_film, id_jury }) => juryApi.assign(id_film, id_jury),
    onSuccess: () => { setAssignModal(null); queryClient.invalidateQueries({ queryKey: ["admin-films"] }); },
  });

  const filtered = films?.filter((f) => !filterStatus || f.statut === filterStatus) || [];

  if (isLoading) return <div className="p-8 text-white/60">Chargement...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-6">Gestion des films</h1>

      <div className="flex gap-2 mb-6 flex-wrap">
        <button onClick={() => setFilterStatus("")}
          className={`px-3 py-1.5 rounded text-sm ${!filterStatus ? "bg-purple-600 text-white" : "bg-gray-800 text-white/60"}`}>
          Tous ({films?.length || 0})
        </button>
        {STATUSES.map((s) => (
          <button key={s} onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded text-sm ${filterStatus === s ? "bg-purple-600 text-white" : "bg-gray-800 text-white/60"}`}>
            {s} ({films?.filter((f) => f.statut === s).length || 0})
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((film) => (
          <div key={film.id_film} className="bg-gray-900 border border-white/10 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="w-20 h-12 bg-gray-800 rounded overflow-hidden flex-shrink-0">
              {film.image_principale ? (
                <img src={`${API_URL}${film.image_principale}`} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/20 text-xs">-</div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium truncate">{film.titre}</h3>
              <p className="text-white/40 text-xs">ID: {film.id_film} | User: {film.id_utilisateur}</p>
            </div>
            <select
              value={film.statut}
              onChange={(e) => updateMutation.mutate({ id: film.id_film, data: { statut: e.target.value } })}
              className="bg-gray-800 border border-white/10 rounded px-2 py-1 text-white text-sm"
            >
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <button
              onClick={() => setAssignModal(film.id_film)}
              className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded text-sm hover:bg-blue-600/30"
            >
              Jury
            </button>
            <button
              onClick={() => { if (confirm("Supprimer ?")) deleteMutation.mutate(film.id_film); }}
              className="bg-red-600/20 text-red-400 px-3 py-1 rounded text-sm hover:bg-red-600/30"
            >
              Suppr.
            </button>
          </div>
        ))}
      </div>

      {assignModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setAssignModal(null)}>
          <div className="bg-gray-900 rounded-xl p-6 border border-white/10 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold text-white mb-4">Assigner au jury</h2>
            {juryUsers?.length ? (
              <div className="space-y-2">
                {juryUsers.map((u) => (
                  <button key={u.id}
                    onClick={() => assignMutation.mutate({ id_film: assignModal, id_jury: u.id })}
                    className="w-full text-left bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded">
                    {u.username}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-white/40">Aucun membre du jury</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
