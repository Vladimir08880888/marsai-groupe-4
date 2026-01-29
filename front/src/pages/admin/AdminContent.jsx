import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contentApi } from "../../services/api.js";

const CONTENT_KEYS = [
  { key: "banner_title", label: "Titre du bannière", type: "text" },
  { key: "banner_subtitle", label: "Sous-titre du bannière", type: "text" },
  { key: "banner_bg", label: "Image de fond bannière (URL)", type: "text" },
  { key: "banner_cta_text", label: "Texte CTA principal", type: "text" },
  { key: "banner_cta_link", label: "Lien CTA principal", type: "text" },
  { key: "kpi_films_count", label: "Nombre de films", type: "text" },
  { key: "kpi_prize_fund", label: "Prizefond (ex: 5000€)", type: "text" },
  { key: "countdown_date", label: "Date countdown (ISO)", type: "text" },
  { key: "festival_phase", label: "Phase (inscription/vote/palmares)", type: "text" },
  { key: "sponsors", label: "Sponsors (JSON: [{name, image_url}])", type: "json" },
];

export default function AdminContent() {
  const queryClient = useQueryClient();
  const { data: content, isLoading } = useQuery({ queryKey: ["site-content"], queryFn: contentApi.getAll });
  const [values, setValues] = useState({});
  const [initialized, setInitialized] = useState(false);

  if (content && !initialized) {
    const v = {};
    CONTENT_KEYS.forEach((k) => { v[k.key] = content[k.key]?.value || ""; });
    setValues(v);
    setInitialized(true);
  }

  const saveMutation = useMutation({
    mutationFn: async ({ key, value, type }) => contentApi.upsert(key, value, type),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["site-content"] }),
  });

  if (isLoading) return <div className="p-8 text-white/60">Chargement...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-6">Contenu du site</h1>
      <div className="space-y-4 max-w-2xl">
        {CONTENT_KEYS.map(({ key, label, type }) => (
          <div key={key} className="bg-gray-900 border border-white/10 rounded-lg p-4">
            <label className="text-white/60 text-sm block mb-2">{label}</label>
            {type === "json" ? (
              <textarea rows={4}
                className="w-full bg-gray-800 border border-white/10 rounded px-3 py-2 text-white text-sm font-mono"
                value={values[key] || ""} onChange={(e) => setValues({ ...values, [key]: e.target.value })} />
            ) : (
              <input type="text"
                className="w-full bg-gray-800 border border-white/10 rounded px-3 py-2 text-white text-sm"
                value={values[key] || ""} onChange={(e) => setValues({ ...values, [key]: e.target.value })} />
            )}
            <button
              onClick={() => saveMutation.mutate({ key, value: values[key], type })}
              className="mt-2 bg-purple-600 text-white px-4 py-1.5 rounded text-sm hover:bg-purple-700"
            >
              {saveMutation.isPending ? "..." : "Sauvegarder"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
