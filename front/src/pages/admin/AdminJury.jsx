import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { juryApi } from "../../services/api.js";

export default function AdminJury() {
  const queryClient = useQueryClient();
  const { data: assignments, isLoading } = useQuery({ queryKey: ["jury-assignments"], queryFn: juryApi.getAssignments });
  const { data: votes } = useQuery({ queryKey: ["jury-votes"], queryFn: juryApi.getVotes });

  const removeMutation = useMutation({
    mutationFn: (id) => juryApi.removeAssignment(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["jury-assignments"] }),
  });

  if (isLoading) return <div className="p-8 text-white/60">Chargement...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-6">Jury & Votes</h1>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Assignments</h2>
        {assignments?.length ? (
          <div className="space-y-2">
            {assignments.map((a) => (
              <div key={a.id} className="bg-gray-900 border border-white/10 rounded-lg p-3 flex items-center justify-between">
                <div>
                  <span className="text-white">{a.film?.title || `Film #${a.film_id}`}</span>
                  <span className="text-white/40 mx-2">→</span>
                  <span className="text-purple-400">{a.jury ? `${a.jury.first_name} ${a.jury.last_name}` : `Jury #${a.jury_id}`}</span>
                </div>
                <button onClick={() => removeMutation.mutate(a.id)}
                  className="text-red-400 text-sm hover:text-red-300">Retirer</button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white/40">Aucun assignment</p>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Votes</h2>
        {votes?.length ? (
          <div className="space-y-2">
            {votes.map((v) => (
              <div key={v.id} className="bg-gray-900 border border-white/10 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <span className={`text-sm px-2 py-0.5 rounded ${v.vote === "aime" ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"}`}>
                    {v.vote === "aime" ? "J'aime" : "J'aime pas"}
                  </span>
                  <span className="text-white">{v.film?.title || `Film #${v.film_id}`}</span>
                  <span className="text-white/40">par</span>
                  <span className="text-purple-400">{v.jury ? `${v.jury.first_name} ${v.jury.last_name}` : `Jury #${v.jury_id}`}</span>
                </div>
                {v.comment && <p className="text-white/50 text-sm mt-1 ml-16">{v.comment}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white/40">Aucun vote</p>
        )}
      </div>
    </div>
  );
}
