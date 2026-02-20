import { Trophy, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export default function Palmares() {
  const [topWinners, setTopWinners] = useState([]);
  const [specialMentions, setSpecialMentions] = useState([]);
  const [allWinners, setAllWinners] = useState([]);

  // FETCH DATA
  useEffect(() => {
    fetch("/api/palmares/top")
      .then((r) => r.json())
      .then(setTopWinners);

    fetch("/api/palmares/special")
      .then((r) => r.json())
      .then(setSpecialMentions);

    fetch("/api/palmares/all")
      .then((r) => r.json())
      .then(setAllWinners);
  }, []);

  const today = new Date();
  const formattedDate = today
    .toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .toUpperCase();

  return (
    <div className="bg-black text-white min-h-screen px-6">

      {/* HERO */}
      <section className="text-center py-20 ">
        <div className="flex justify-center mb-6">
          <div className="bg-yellow-400 text-black p-4 rounded-2xl">
            <Trophy size={32} />
          </div>
        </div>

        <h1 className="text-5xl font-bold">PALMARÈS</h1>
        <p className="text-gray-400 mt-3 text-sm">
          FESTIVAL MARSAI — ÉDITION INAUGURALE
        </p>

        <p className="text-yellow-400 mt-2 font-semibold">
          {formattedDate}
        </p>
      </section>

      {/* TOP WINNERS */}
      <section className="max-w-6xl mx-auto mb-24">
        <h2 className="text-xl mb-8 font-semibold">🏆 GAGNANTS</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {topWinners.map((film) => (
            <div
              key={film.title}
              className={`bg-white/5 p-6 rounded-3xl border border-white/10 ${
                film.place === 1 ? "ring-2 ring-yellow-400" : ""
              }`}
            >
              <div className="text-yellow-400 font-bold text-xl mb-2">
                #{film.place}
              </div>

              <div className="h-40 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl mb-4" />

              <h3 className="text-lg font-bold">{film.title}</h3>
              <p className="text-gray-400 text-sm">{film.studio}</p>
              <p className="text-pink-400 text-sm mt-2">
                {film.prize}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SPECIAL */}
      <section className="max-w-6xl mx-auto mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-purple-400 flex items-center justify-center gap-3">
          <Sparkles className="text-pink-400" />
          MENTIONS SPÉCIALES
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {specialMentions.map((item, i) => (
            <div
              key={i}
              className="bg-white/5 p-6 rounded-3xl border border-white/10"
            >
              <div className="h-36 bg-gradient-to-br from-pink-500 to-indigo-500 rounded-xl mb-4" />
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-gray-400 text-sm mt-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ALL */}
      <section className="max-w-6xl mx-auto mb-32">
        <h2 className="text-3xl font-bold text-center mb-12">
          TOUS LES LAURÉATS
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {allWinners.map((film, i) => (
            <div
              key={i}
              className="bg-white/5 p-4 rounded-2xl border border-white/10"
            >
              <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-3" />
              <h3 className="font-semibold text-sm">{film.title}</h3>
              <p className="text-gray-400 text-xs">
                {film.category}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
