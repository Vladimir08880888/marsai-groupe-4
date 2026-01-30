import React, { useState } from "react";
import { Train, Car, MapPin } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    subject: "",
    message: "",
  });

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

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center px-6 py-16">

      <h1 className="text-4xl font-bold mb-12 text-center">ACCÈS</h1>

      {/* БЛОКИ С ИНФОРМАЦИЕЙ */}
      <div className="max-w-xl w-full space-y-10 mb-16">

        <div className="flex items-start gap-5">
          <div className="bg-blue-600/20 p-4 rounded-2xl">
            <Train className="text-blue-400" size={30} />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Transports en commun</h3>
            <p className="text-gray-400">Tram T2 / T3 – Arrêt Arenc Le Silo.</p>
            <p className="text-gray-400">Métro M2 – Station Désirée Clary.</p>
          </div>
        </div>

        <div className="flex items-start gap-5">
          <div className="bg-green-600/20 p-4 rounded-2xl">
            <Car className="text-green-400" size={30} />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Voiture</h3>
            <p className="text-gray-400">Autoroute A55 – Sortie 2.</p>
            <p className="text-gray-400">Parking Indigo Quai du Lazaret à 200m.</p>
          </div>
        </div>

        <div className="flex items-start gap-5">
          <div className="bg-purple-600/20 p-4 rounded-2xl">
            <MapPin className="text-purple-400" size={30} />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Adresse</h3>
            <p className="text-gray-400">
              155 Rue Peyssonnel, 13002 Marseille (Entrée principale)
            </p>
          </div>
        </div>

      </div>

      {/* КАРТА */}
      <div className="w-[350px] h-[350px] rounded-3xl overflow-hidden shadow-2xl mb-24">
        <iframe
          title="Google Map Marseille"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2903.0039725154948!2d5.366207076332768!3d43.31417627112024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c9c0f3f2295ed9%3A0xe8332bddf8f8ffdb!2s155%20Rue%20Peyssonnel%2C%2013002%20Marseille!5e0!3m2!1sru!2sfr!4v1769764213092!5m2!1sru!2sfr"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* ФОРМА ОБРАТНОЙ СВЯЗИ */}
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/10">
        <h2 className="text-3xl font-bold text-center mb-8">Formulaire de contact</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm text-gray-300">Votre email</label>
            <input type="email" name="email" required onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"/>
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">Comment devons-nous vous appeler ?</label>
            <input type="text" name="name" required onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"/>
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">Sujet de votre message</label>
            <input type="text" name="subject" required onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"/>
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">Votre message</label>
            <textarea name="message" rows="5" required onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
          </div>

          <button type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-xl font-semibold text-white hover:opacity-90 transition">
            Envoyer le message
          </button>
        </form>
      </div>

    </div>
  );
}
