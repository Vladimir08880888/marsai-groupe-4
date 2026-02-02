import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { filmsApi, usersApi, juryApi } from "../../services/api.js";

const API_URL = "http://localhost:3000";
const STATUSES = ["submitted", "under_review", "rejected", "selected", "finalist"];
const STATUS_LABELS = {
  submitted: "Soumis",
  under_review: "À discuter",
  rejected: "Refusé",
  selected: "Retenu",
  finalist: "Finaliste",
};

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
    mutationFn: ({ film_id, jury_id }) => juryApi.assign(film_id, jury_id),
    onSuccess: () => { setAssignModal(null); queryClient.invalidateQueries({ queryKey: ["admin-films"] }); },
  });

  const filtered = films?.filter((f) => !filterStatus || f.status === filterStatus) || [];

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
            {STATUS_LABELS[s]} ({films?.filter((f) => f.status === s).length || 0})
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((film) => (
          <div key={film.id} className="bg-gray-900 border border-white/10 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="w-20 h-12 bg-gray-800 rounded overflow-hidden flex-shrink-0">
              {film.thumbnail ? (
                <img src={`${API_URL}${film.thumbnail}`} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/20 text-xs">-</div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium truncate">{film.title}</h3>
              <p className="text-white/40 text-xs">ID: {film.id} | User: {film.user_id}</p>
            </div>
            <select
              value={film.status}
              onChange={(e) => updateMutation.mutate({ id: film.id, data: { status: e.target.value } })}
              className="bg-gray-800 border border-white/10 rounded px-2 py-1 text-white text-sm"
            >
              {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
            </select>
            <button
              onClick={() => setAssignModal(film.id)}
              className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded text-sm hover:bg-blue-600/30"
            >
              Jury
            </button>
            <button
              onClick={() => { if (confirm("Supprimer ?")) deleteMutation.mutate(film.id); }}
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
                    onClick={() => assignMutation.mutate({ film_id: assignModal, jury_id: u.id })}
                    className="w-full text-left bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded">
                    {u.first_name} {u.last_name}
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
