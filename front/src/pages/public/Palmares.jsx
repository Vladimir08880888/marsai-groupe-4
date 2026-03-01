import { Trophy, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getAwards } from "../../api/awards";

export default function Palmares() {
  const { t } = useTranslation();

  const { data, isLoading, error } = useQuery({
    queryKey: ["awards"],
    queryFn: () => getAwards().then((res) => res.data),
  });

  const awards = data || [];

  const today = new Date();
  const formattedDate = today
    .toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .toUpperCase();

  // Split awards: top 3 by id order, rest as special mentions
  const topWinners = awards.slice(0, 3);
  const otherWinners = awards.slice(3);

  return (
    <div className="bg-black text-white min-h-screen px-6">

      {/* HERO */}
      <section className="text-center py-20 ">
        <div className="flex justify-center mb-6">
          <div className="bg-yellow-400 text-black p-4 rounded-2xl">
            <Trophy size={32} />
          </div>
        </div>

        <h1 className="text-5xl font-bold tracking-wide">PALMARES</h1>
        <p className="text-gray-400 mt-3 tracking-widest text-sm">
          {t("palmares.edition_title")}
        </p>

        <p className="text-yellow-400 mt-2 font-semibold">{formattedDate}</p>

        <div className="flex justify-center gap-16 mt-10 text-center">
          <div>
            <p className="text-3xl font-bold">{awards.length}</p>
            <p className="text-gray-500 text-sm">{t("palmares.laureat")}</p>
          </div>
        </div>
      </section>

      {/* LOADING / ERROR */}
      {isLoading && (
        <div className="text-center text-gray-400 py-12">Loading...</div>
      )}
      {error && (
        <div className="text-center text-red-400 py-12">
          Error loading awards
        </div>
      )}

      {/* TOP WINNERS */}
      {topWinners.length > 0 && (
        <section className="max-w-6xl mx-auto mb-24">
          <h2 className="text-xl mb-8 font-semibold">
            {t("palmares.winners")}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {topWinners.map((award, idx) => (
              <div
                key={award.id}
                className={`bg-white/5 p-6 rounded-3xl border border-white/10 ${
                  idx === 0 ? "ring-2 ring-yellow-400" : ""
                }`}
              >
                <div className="text-yellow-400 font-bold text-xl mb-2">
                  #{idx + 1}
                </div>

                {award.film?.thumbnail ? (
                  <img
                    src={`http://localhost:3000${award.film.thumbnail}`}
                    alt={award.film.title}
                    className="h-40 w-full object-cover rounded-xl mb-4"
                  />
                ) : (
                  <div className="h-40 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl mb-4" />
                )}

                <h3 className="text-lg font-bold">
                  {award.film?.title || award.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  {award.film?.user
                    ? `${award.film.user.first_name} ${award.film.user.last_name}`
                    : ""}
                </p>
                <p className="text-pink-400 text-sm mt-2">{award.prize}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* OTHER WINNERS */}
      {otherWinners.length > 0 && (
        <section className="max-w-6xl mx-auto mb-32">
          <h2 className="text-3xl font-bold text-center mb-12 text-purple-400 flex items-center justify-center gap-3">
            <Sparkles className="text-pink-400" /> {t("palmares.honorable_mention")}
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {otherWinners.map((award) => (
              <div
                key={award.id}
                className="bg-white/5 p-4 rounded-2xl border border-white/10"
              >
                {award.film?.thumbnail ? (
                  <img
                    src={`http://localhost:3000${award.film.thumbnail}`}
                    alt={award.film.title}
                    className="h-40 w-full object-cover rounded-xl mb-3"
                  />
                ) : (
                  <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-3" />
                )}
                <h3 className="font-semibold text-sm">
                  {award.film?.title || award.name}
                </h3>
                <p className="text-gray-400 text-xs">{award.prize}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EMPTY STATE */}
      {!isLoading && awards.length === 0 && (
        <div className="text-center text-gray-500 py-20">
          {t("palmares.edition_title")}
        </div>
      )}
    </div>
  );
}
