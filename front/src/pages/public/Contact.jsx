import React, { useState, useEffect } from "react";
import {
  Train,
  Car,
  MapPin,
  CalendarDays,
  Clock,
  Navigation,
} from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    subject: "",
    message: "",
  });

  const [schedule, setSchedule] = useState([]);

  // ===== FETCH SCHEDULE FROM DB =====
  useEffect(() => {
    fetch("/api/schedule/today")
      .then((res) => res.json())
      .then((data) => setSchedule(data))
      .catch(() => setSchedule([]));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Demande: ${form.subject}`);
    const body = encodeURIComponent(
      `Nom: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );

    window.location.href = `mailto:tonemail@example.com?subject=${subject}&body=${body}`;
  };

  const today = new Date();

  const formattedDate = today
    .toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    .toUpperCase();

  const tagColors = {
    SOCIAL: "text-green-400",
    KEYNOTE: "text-purple-400",
    BREAK: "text-gray-400",
    CINÉMA: "text-pink-400",
    TALK: "text-white",
    AWARDS: "text-yellow-400",
    PARTY: "text-blue-400",
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center px-6 py-16">
      {/* HERO */}
      <section className="w-full max-w-4xl mb-20">
        <div className="flex items-center gap-3 text-pink-500 mb-4">
          <CalendarDays size={18} />
          <span className="uppercase tracking-widest text-sm">
            Infos pratiques
          </span>
        </div>

        <h1 className="text-5xl font-bold">{formattedDate}</h1>
        <h2 className="text-3xl text-pink-500 font-semibold mb-8">
          MARSEILLE
        </h2>

        <div className="flex items-center gap-3 mb-6 mt-10">
          <Clock className="text-pink-500" />
          <h3 className="text-xl font-semibold">
            Programme des conférences
          </h3>
        </div>

        {/* SCHEDULE */}
        <div className="space-y-4">
          {schedule.length === 0 && (
            <p className="text-gray-500">Programme en cours de chargement…</p>
          )}

          {schedule.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-5 flex items-center gap-6 border border-white/10"
            >
              <div
                className={`text-2xl font-bold w-20 ${
                  tagColors[item.tag] || "text-pink-400"
                }`}
              >
                {item.time}
              </div>

              <div>
                <div
                  className={`text-xs tracking-widest ${
                    tagColors[item.tag] || "text-pink-400"
                  }`}
                >
                  {item.tag}
                </div>
                <div className="text-lg">{item.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ACCESS */}
      <div className="flex flex-col items-center mb-12">
        <div className="flex items-center gap-3">
          <Navigation className="text-blue-400" size={26} />
          <h1 className="text-4xl font-bold">ACCÈS</h1>
        </div>
        <div className="w-24 h-0.5 bg-blue-400 mt-2 rounded-full"></div>
      </div>

      {/* ACCESS BLOCKS */}
      <div className="max-w-xl w-full space-y-10 mb-16">
        <div className="flex items-start gap-5">
          <div className="bg-blue-600/20 p-4 rounded-2xl">
            <Train className="text-blue-400" size={30} />
          </div>
          <div>
            <h3 className="text-xl font-semibold">
              Transports en commun
            </h3>
            <p className="text-gray-400">
              Tram T2 / T3 – Arrêt Arenc Le Silo.
            </p>
            <p className="text-gray-400">
              Métro M2 – Station Désirée Clary.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-5">
          <div className="bg-green-600/20 p-4 rounded-2xl">
            <Car className="text-green-400" size={30} />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Voiture</h3>
            <p className="text-gray-400">
              Autoroute A55 – Sortie 2.
            </p>
            <p className="text-gray-400">
              Parking Indigo Quai du Lazaret à 200m.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-5">
          <div className="bg-purple-600/20 p-4 rounded-2xl">
            <MapPin className="text-purple-400" size={30} />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Adresse</h3>
            <p className="text-gray-400">
              155 Rue Peyssonnel, 13002 Marseille
            </p>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-lg p-10 rounded-3xl border border-white/10">
        <h2 className="text-3xl font-bold text-center mb-8">
          Formulaire de contact
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            name="email"
            placeholder="Votre email"
            required
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black/40 border border-gray-600"
          />

          <input
            type="text"
            name="name"
            placeholder="Votre nom"
            required
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black/40 border border-gray-600"
          />

          <input
            type="text"
            name="subject"
            placeholder="Sujet"
            required
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black/40 border border-gray-600"
          />

          <textarea
            name="message"
            placeholder="Message"
            rows="5"
            required
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black/40 border border-gray-600"
          />

          <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-xl">
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
