import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { evenementsApi, reservationsApi } from "../../services/api.js";
import "./Agenda.css";

function Agenda() {
  const queryClient = useQueryClient();
  const [reservationModal, setReservationModal] = useState(null);
  const [formData, setFormData] = useState({ nom: "", prenom: "", email: "", profession: "" });
  const [reservationMessage, setReservationMessage] = useState(null);

  // Fetch conferences from API
  const { data: conferencesData } = useQuery({
    queryKey: ["evenements", "conference"],
    queryFn: () => evenementsApi.getByType("conference"),
  });

  // Fetch workshops from API
  const { data: workshopsData } = useQuery({
    queryKey: ["workshops"],
    queryFn: () => evenementsApi.getWorkshops(),
  });

  // Mutation for creating reservation
  const reservationMutation = useMutation({
    mutationFn: reservationsApi.create,
    onSuccess: () => {
      setReservationMessage({ type: "success", text: "Réservation confirmée !" });
      setReservationModal(null);
      setFormData({ nom: "", prenom: "", email: "", profession: "" });
      queryClient.invalidateQueries(["workshops"]);
    },
    onError: (error) => {
      setReservationMessage({ type: "error", text: error.message });
    },
  });

  const handleReservation = (e) => {
    e.preventDefault();
    reservationMutation.mutate({
      ...formData,
      id_evenement: reservationModal.id_evenement,
    });
  };

  // Default schedule data
  const defaultSchedule = [
    { time: "09:30", type: "SOCIAL", label: "Accueil & Café Networking" },
    { time: "10:30", type: "KEYNOTE", label: "Conférence d'ouverture : L'IA au service du Cinéma" },
    { time: "13:00", type: "BREAK", label: "Déjeuner Libre" },
    { time: "14:30", type: "CINÉMA", label: "Projection Sélection Officielle" },
    { time: "16:30", type: "TALK", label: "Table Ronde : Futurs Souhaitables" },
    { time: "19:00", type: "AWARDS", label: "Grand Prix & Cérémonie de Clôture", highlight: true },
    { time: "21:00", type: "PARTY", label: "MARS.A.I Night - DJ Set Immersif", highlight: true },
  ];

  const defaultWorkshops = [
    { id_evenement: 1, heure: "14h30", titre: "GÉNÉRATION VIDÉO : LES BASES", coach: "THOMAS AUBERT", places_restantes: 10 },
    { id_evenement: 2, heure: "15h45", titre: "IA & SCÉNARIO : CO-ÉCRITURE", coach: "THOMAS AUBERT", places_restantes: 8 },
    { id_evenement: 3, heure: "17h00", titre: "POST-PROD IA & EFFETS SPÉCIAUX", coach: "THOMAS AUBERT", places_restantes: 12 },
    { id_evenement: 4, heure: "18h15", titre: "ÉTHIQUE & DROIT DE L'IA", coach: "NICOLAS LAMBERT", places_restantes: 5 },
  ];

  // Map API data to schedule format or use defaults
  const schedule = conferencesData?.length > 0
    ? conferencesData.map(e => ({
        time: e.heure || "00:00",
        type: e.type?.toUpperCase() || "EVENT",
        label: e.titre,
        highlight: e.type === "awards" || e.type === "party",
      }))
    : defaultSchedule;

  // Workshop time mapping based on index
  const workshopTimes = ["14h30", "15h45", "17h00", "18h15"];
  const workshopCoaches = ["THOMAS AUBERT", "THOMAS AUBERT", "THOMAS AUBERT", "NICOLAS LAMBERT"];

  const workshops = workshopsData?.length > 0
    ? workshopsData.map((w, index) => ({
        id_evenement: w.id_evenement,
        time: workshopTimes[index] || "14h00",
        title: w.titre,
        coach: workshopCoaches[index] || "MARS.AI",
        places: w.places_restantes ?? 15,
      }))
    : defaultWorkshops.map(w => ({
        id_evenement: w.id_evenement,
        time: w.heure,
        title: w.titre,
        coach: w.coach,
        places: w.places_restantes,
      }));

  return (
    <div className="agenda-page">
      {/* Hero Header */}
      <section className="agenda-hero">
        <div className="agenda-hero-content">
          <div className="agenda-badge">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M3 10H21" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M16 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            INFOS PRATIQUES
          </div>
          <h1 className="agenda-date">13 JUIN 2026</h1>
          <h2 className="agenda-city">MARSEILLE</h2>
        </div>
      </section>

      {/* La Plateforme Card */}
      <section className="plateforme-section">
        <div className="plateforme-card">
          <div className="plateforme-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21C12 21 5 13.5 5 9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9C19 13.5 12 21 12 21Z" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </div>
          <div className="plateforme-content">
            <h3 className="plateforme-title">LA PLATEFORME<span className="underscore">_</span></h3>
            <p className="plateforme-description">
              L'épicentre de la révolution créative marseillaise. 4000m² dédiés à l'image et au futur.
            </p>
          </div>
        </div>
      </section>

      {/* Programme des Conférences */}
      <section className="programme-section">
        <div className="section-header">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h2>PROGRAMME DES CONFÉRENCES</h2>
        </div>
        <div className="programme-list">
          {schedule.map((item, index) => (
            <div key={index} className={`programme-item ${item.highlight ? 'highlight' : ''}`}>
              <span className={`programme-time ${item.highlight ? 'highlight' : ''}`}>{item.time}</span>
              <div className="programme-info">
                <span className="programme-type">{item.type}</span>
                <span className="programme-label">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Accès Section */}
      <section className="acces-section">
        <div className="section-header">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 2L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h2>ACCÈS</h2>
        </div>

        <div className="acces-grid">
          <div className="acces-item">
            <div className="acces-icon transport">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M4 15H20" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="8" cy="18" r="1" fill="currentColor"/>
                <circle cx="16" cy="18" r="1" fill="currentColor"/>
                <path d="M8 8H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M8 11H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="acces-content">
              <h3>Transports en commun</h3>
              <p>Tram T2 / T3 - Arrêt Arenc Le Silo.</p>
              <p>Métro M2 - Station Désirée Clary.</p>
            </div>
          </div>

          <div className="acces-item">
            <div className="acces-icon car">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 17H19M5 17C3.89543 17 3 16.1046 3 15V11L5 6H19L21 11V15C21 16.1046 20.1046 17 19 17M5 17C5 18.1046 5.89543 19 7 19C8.10457 19 9 18.1046 9 17M19 17C19 18.1046 18.1046 19 17 19C15.8954 19 15 18.1046 15 17M9 17H15M3 11H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="acces-content">
              <h3>Voiture</h3>
              <p>Autoroute A55 - Sortie 2.</p>
              <p>Parking Indigo Quai du Lazaret à 200m.</p>
            </div>
          </div>

          <div className="acces-item">
            <div className="acces-icon location">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21C12 21 5 13.5 5 9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9C19 13.5 12 21 12 21Z" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className="acces-content">
              <h3>Adresse</h3>
              <p>12 Rue d'Uzes, 13002 Marseille (Entrée Principale).</p>
            </div>
          </div>
        </div>

        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2903.889!2d5.3659!3d43.3108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c9c0b5b5b5b5b5%3A0x0!2sLa%20Plateforme%2C%20Marseille!5e0!3m2!1sfr!2sfr!4v1234567890"
            width="100%"
            height="350"
            style={{ border: 0, borderRadius: '1rem' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="La Plateforme Marseille"
          ></iframe>
        </div>
      </section>

      {/* Ateliers Pratiques */}
      <section className="ateliers-section">
        <div className="section-header">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h2>ATELIERS PRATIQUES</h2>
        </div>

        <div className="workshops-card">
          <div className="workshops-header">
            <div className="workshops-titles">
              <h3 className="workshops-title">WORKSHOPS</h3>
              <h4 className="workshops-subtitle">IA CRÉATIVE</h4>
            </div>
            <div className="workshops-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="15" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M3 21V19C3 16.7909 4.79086 15 7 15H11C13.2091 15 15 16.7909 15 19V21" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M15 15H17C19.2091 15 21 16.7909 21 19V21" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
          </div>
          <p className="workshops-description">
            PASSEZ DE LA THÉORIE À LA PRATIQUE AVEC LES MEILLEURS EXPERTS INTERNATIONAUX. ATTENTION, PLACES LIMITÉES (MAX 15 PAR SESSION).
          </p>

          <div className="workshops-grid">
            {workshops.map((workshop, index) => (
              <div key={index} className="workshop-item">
                <span className="workshop-time">{workshop.time}</span>
                <h4 className="workshop-title">{workshop.title}</h4>
                <p className="workshop-coach">COACH : {workshop.coach}</p>
                <p className="workshop-places">
                  DISPONIBILITÉ <span className="places-count">{workshop.places} PLACES RESTANTES</span>
                </p>
                <button
                  className="workshop-btn"
                  onClick={() => setReservationModal(workshop)}
                  disabled={workshop.places <= 0}
                >
                  {workshop.places > 0 ? "RÉSERVER MA PLACE" : "COMPLET"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation Modal */}
      {reservationModal && (
        <div className="modal-overlay" onClick={() => setReservationModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setReservationModal(null)}>×</button>
            <h3 className="modal-title">Réserver une place</h3>
            <p className="modal-workshop">{reservationModal.title}</p>

            <form onSubmit={handleReservation} className="reservation-form">
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Prénom"
                  value={formData.prenom}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Nom"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  required
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Profession (optionnel)"
                value={formData.profession}
                onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
              />
              <button type="submit" className="submit-btn" disabled={reservationMutation.isPending}>
                {reservationMutation.isPending ? "EN COURS..." : "CONFIRMER"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success/Error Message */}
      {reservationMessage && (
        <div className={`toast-message ${reservationMessage.type}`}>
          {reservationMessage.text}
          <button onClick={() => setReservationMessage(null)}>×</button>
        </div>
      )}
    </div>
  );
}

export default Agenda;
