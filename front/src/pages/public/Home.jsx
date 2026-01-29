import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { filmsApi } from "../../services/api.js";
import "./Home.css";

function Home() {
  // Fetch films from API - only finalistes
  const { data: filmsData, isLoading, error } = useQuery({
    queryKey: ["films", "finaliste"],
    queryFn: () => filmsApi.getByStatus("finaliste"),
  });

  // Fallback data if no films in database
  const defaultFilms = [
    { id_film: 1, titre: "PROTOCOL ALPHA", synopsis: "", id_utilisateur: 1 },
    { id_film: 2, titre: "NEURAL DREAM", synopsis: "", id_utilisateur: 2 },
    { id_film: 3, titre: "CYBER MARSEILLE", synopsis: "", id_utilisateur: 3 },
  ];

  const films = filmsData?.length > 0 ? filmsData : defaultFilms;

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="badge">
            <svg className="badge-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L13.09 8.26L19 7L14.74 11.27L21 12L14.74 12.73L19 17L13.09 15.74L12 22L10.91 15.74L5 17L9.26 12.73L3 12L9.26 11.27L5 7L10.91 8.26L12 2Z" fill="currentColor"/>
            </svg>
            <span>LE PROTOCOLE TEMPOREL 2026</span>
          </div>

          <h1 className="logo-title">
            MARS<span className="gradient-text">AI</span>
          </h1>

          <h2 className="tagline">
            IMAGINEZ DES<span className="highlight">FUTURS</span> SOUHAITABLES
          </h2>

          <p className="subtitle">
            Le festival de courts-métrages de 60 secondes réalisés par IA.
          </p>

          <p className="immersion-text">
            2 jours d'immersion au cœur de Marseille.
          </p>

          <div className="cta-buttons">
            <button className="btn-primary">
              VOIR LES FILMS
              <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="btn-secondary">
              MON ESPACE AI <span className="plus">+</span>
            </button>
          </div>
        </div>
      </section>

      {/* Immersion Section */}
      <section className="immersion-section">
        <div className="immersion-container">
          <div className="immersion-label">
            <span className="immersion-label-line"></span>
            <span className="immersion-label-text">IMMERSION TOTALE</span>
            <span className="immersion-label-line"></span>
          </div>

          <h2 className="immersion-title">
            LE PROTOCOLE<br />TEMPOREL
          </h2>

          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-value stat-green">2 MOIS</span>
            </div>
            <div className="stat-item">
              <span className="stat-value stat-emerald">50 FILMS</span>
            </div>
            <div className="stat-item">
              <span className="stat-value stat-pink">WEB 3.0</span>
            </div>
            <div className="stat-item">
              <span className="stat-value stat-cyan">J4</span>
            </div>
          </div>

          <button className="btn-aventure">
            REJOINDRE L'AVENTURE
          </button>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="objectives-section">
        <div className="objectives-container">
          <h2 className="objectives-title">
            OBJECTIFS DU<br />
            <span className="objectives-title-gradient">FESTIVAL</span>
          </h2>

          <div className="objectives-grid">
            <div className="objective-card">
              <div className="objective-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <h3 className="objective-name">L'HUMAIN AU CENTRE</h3>
              <p className="objective-description">
                Mettre l'humain au cœur de la création pour ne pas perdre l'émotion.
              </p>
            </div>

            <div className="objective-card">
              <div className="objective-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="objective-name">CHALLENGE CRÉATIF</h3>
              <p className="objective-description">
                Challenger la créativité grâce à un format ultra-court de 60s.
              </p>
            </div>

            <div className="objective-card">
              <div className="objective-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <h3 className="objective-name">FUTURS SOUHAITABLES</h3>
              <p className="objective-description">
                Explorer les futurs désirables via les technologies émergentes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Films Section */}
      <section className="films-section">
        <div className="films-container">
          {/* Header */}
          <div className="films-header">
            <div className="films-header-left">
              <div className="films-label">
                <span className="label-line"></span>
                <span className="label-text">LE PROJET MARS.A.I</span>
              </div>
              <h2 className="films-title">
                FILMS EN<br />
                <span className="films-title-gradient">COMPÉTITION</span>
              </h2>
              <p className="films-description">
                Découvrez une sélection d'œuvres pionnières explorant les<br />
                nouvelles frontières de l'imaginaire assisté par l'IA.
              </p>
            </div>
            <div className="films-header-right">
              <button className="btn-selection">
                <span>VOIR LA SÉLECTION</span>
                <div className="btn-selection-arrow">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
            </div>
          </div>

          {/* Films Grid */}
          <div className="films-grid">
            {films.slice(0, 3).map((film, index) => (
              <div key={film.id_film} className="film-card">
                <div className="film-image">
                  {film.vignette ? (
                    <img src={film.vignette} alt={film.titre} className="film-thumbnail" />
                  ) : (
                    <div className={`film-placeholder film-placeholder-${(index % 3) + 1}`}></div>
                  )}
                </div>
                <div className="film-info">
                  <h3 className="film-title">
                    {film.titre?.split(" ").slice(0, 1).join(" ")}<br />
                    {film.titre?.split(" ").slice(1).join(" ") || film.traduction}
                  </h3>
                  <p className="film-director">DIR. {film.realisateur || "MARS.AI"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Night Section */}
      <section className="night-section">
        <div className="night-container">
          <div className="night-content">
            <div className="night-badge">SOIRÉE DE CLÔTURE</div>
            <h2 className="night-title">
              <span className="night-title-outline">MARS.A.I</span>
              <span className="night-title-bold">NIGHT</span>
            </h2>
            <p className="night-description">
              Fête Électro mêlant IA et futurs souhaitables.<br />
              Une expérience immersive sonore et visuelle.
            </p>
          </div>

          <div className="night-card">
            <div className="night-card-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <button className="night-card-btn">RÉSERVER</button>
          </div>
        </div>
      </section>

      {/* Conferences Section */}
      <section className="conferences-section">
        <div className="conferences-container">
          <div className="conferences-content">
            <h2 className="conferences-title">
              DEUX JOURNÉES DE<br />
              <span className="conferences-title-gradient">CONFÉRENCES GRATUITES</span>
            </h2>

            <ul className="conferences-list">
              <li>Débats engagés sur l'éthique et le future</li>
              <li>Confrontations d'idées entre artistes et tech</li>
              <li>Interrogations stimulantes sur la création</li>
            </ul>

            <button className="btn-agenda">
              <svg className="btn-agenda-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M3 10H21" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M16 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              AGENDA COMPLET
            </button>
          </div>

          <div className="events-grid">
            <div className="event-card event-card-light">
              <div className="event-icon event-icon-purple">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 4L19 12L5 20V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="event-name">PROJECTIONS</h3>
              <p className="event-description">
                Diffusion sur écran géant en présence des réalisateurs.
              </p>
            </div>

            <div className="event-card event-card-dark">
              <div className="event-icon event-icon-pink">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="15" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M3 21V19C3 16.7909 4.79086 15 7 15H11C13.2091 15 15 16.7909 15 19V21" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M15 15H17C19.2091 15 21 16.7909 21 19V21" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <h3 className="event-name">WORKSHOPS</h3>
              <p className="event-description">
                Sessions pratiques pour maîtriser les outils IA.
              </p>
            </div>

            <div className="event-card event-card-dark">
              <div className="event-icon event-icon-green">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M12 13V21" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M9 18L12 21L15 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="event-name">AWARDS</h3>
              <p className="event-description">
                Cérémonie de clôture récompensant l'audace.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Sponsors Section */}
      <section className="sponsors-section">
        <div className="sponsors-container">
          <div className="sponsors-label">
            <span className="sponsors-line"></span>
            <span>NOS SOUTIENS</span>
            <span className="sponsors-line"></span>
          </div>
          <h2 className="sponsors-title">
            ILS SOUTIENNENT <span className="sponsors-title-gradient">LE FUTUR</span>
          </h2>
          <div className="sponsors-grid">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="sponsor-card">
                <span className="sponsor-placeholder">SPONSOR</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="location-section">
        <div className="location-container">
          <div className="location-badge">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21C12 21 5 13.5 5 9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9C19 13.5 12 21 12 21Z" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            LE LIEU
          </div>

          <h2 className="location-title">
            LA<span className="location-title-outline">PLATEFORME</span>
          </h2>

          <div className="location-info">
            <div className="location-info-item">
              <span className="location-hub">MARSEILLE, HUB CRÉATIF</span>
            </div>
            <div className="location-info-item">
              <span className="location-address">12 Rue d'Uzes, 13002<br />Marseille</span>
            </div>
            <div className="location-info-item">
              <span className="location-access">ACCÈS TRAM T2/T3 ARRÊT ARENC LE SILO</span>
            </div>
          </div>

          <div className="venues-grid">
            <div className="venue-card">
              <h3 className="venue-name">SALLE DES SUCRES</h3>
              <p className="venue-description">
                Futur sanctuaire des conférences et de la remise des prix de Mars.A.I. Un espace majestueux alliant patrimoine et technologie.
              </p>
            </div>
            <div className="venue-card">
              <h3 className="venue-name">SALLE PLAZA</h3>
              <p className="venue-description">
                L'épicentre du festival : accueil, animations, workshops et restauration. Le point de rencontre de tous les participants.
              </p>
            </div>
          </div>

          <div className="location-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2903.889!2d5.3659!3d43.3108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c9c0b5b5b5b5b5%3A0x0!2sLa%20Plateforme%2C%20Marseille!5e0!3m2!1sfr!2sfr!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '1rem' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="La Plateforme Marseille"
            ></iframe>
          </div>
        </div>
      </section>
</>
  );
}

export default Home;
