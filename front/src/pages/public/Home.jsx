import { useQuery } from "@tanstack/react-query";
import { filmsApi, contentApi } from "../../services/api.js";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import "./Home.css";

const API_URL = "http://localhost:3000";

function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) { setTimeLeft({ j: 0, h: 0, m: 0, s: 0 }); return; }
      setTimeLeft({
        j: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4">
      {Object.entries(timeLeft).map(([k, v]) => (
        <div key={k} className="text-center">
          <span className="text-3xl font-bold text-white">{v}</span>
          <span className="text-white/40 text-xs block uppercase">{k}</span>
        </div>
      ))}
    </div>
  );
}

function Home() {
  const { data: filmsData } = useQuery({
    queryKey: ["films", "public"],
    queryFn: filmsApi.getPublic,
  });

  const { data: siteContent } = useQuery({
    queryKey: ["site-content"],
    queryFn: contentApi.getAll,
  });

  const films = filmsData || [];
  const c = siteContent || {};
  const phase = c.festival_phase?.value || "inscription";
  const sponsors = (() => {
    try { return JSON.parse(c.sponsors?.value || "[]"); } catch { return []; }
  })();

  return (
    <>
      {/* Hero Section */}
      <section className="hero" style={c.banner_bg?.value ? { backgroundImage: `url(${c.banner_bg.value})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="logo-title">
            {c.banner_title?.value || <>MARS<span className="gradient-text">AI</span></>}
          </h1>

          <h2 className="tagline">
            {c.banner_subtitle?.value || <>IMAGINEZ DES<span className="highlight">FUTURS</span> SOUHAITABLES</>}
          </h2>

          <p className="subtitle">
            Le festival de courts-métrages de 60 secondes réalisés par IA.
          </p>

          {/* KPIs + Countdown */}
          <div className="flex items-center gap-8 justify-center my-8 flex-wrap">
            <div className="text-center">
              <span className="text-3xl font-bold text-purple-400">{c.kpi_films_count?.value || films.length || "0"}</span>
              <span className="text-white/40 text-xs block">FILMS</span>
            </div>
            <div className="text-center">
              <span className="text-3xl font-bold text-green-400">{c.kpi_prize_fund?.value || "---"}</span>
              <span className="text-white/40 text-xs block">PRIX</span>
            </div>
            {c.countdown_date?.value && <Countdown targetDate={c.countdown_date.value} />}
          </div>

          <div className="cta-buttons">
            {phase === "inscription" && (
              <Link to="/soumettre" className="btn-primary">
                INSCRIRE MON FILM
                <svg className="btn-arrow" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            )}
            {phase === "vote" && (
              <Link to="/films" className="btn-primary">
                VOIR LES FILMS
                <svg className="btn-arrow" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            )}
            {phase === "palmares" && (
              <Link to="/palmares" className="btn-primary">
                VOIR LE PALMARÈS
                <svg className="btn-arrow" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            )}
            {!["inscription", "vote", "palmares"].includes(phase) && (
              <Link to="/soumettre" className="btn-primary">
                INSCRIRE MON FILM
                <svg className="btn-arrow" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            )}
          </div>
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
                <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/></svg>
              </div>
              <h3 className="objective-name">L'HUMAIN AU CENTRE</h3>
              <p className="objective-description">Mettre l'humain au cœur de la création pour ne pas perdre l'émotion.</p>
            </div>
            <div className="objective-card">
              <div className="objective-icon">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h3 className="objective-name">CHALLENGE CRÉATIF</h3>
              <p className="objective-description">Challenger la créativité grâce à un format ultra-court de 60s.</p>
            </div>
            <div className="objective-card">
              <div className="objective-icon">
                <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/><path d="M2 12H22" stroke="currentColor" strokeWidth="1.5"/><path d="M12 2C14.5 4.74 16 8.29 16 12C16 15.71 14.5 19.26 12 22C9.5 19.26 8 15.71 8 12C8 8.29 9.5 4.74 12 2Z" stroke="currentColor" strokeWidth="1.5"/></svg>
              </div>
              <h3 className="objective-name">FUTURS SOUHAITABLES</h3>
              <p className="objective-description">Explorer les futurs désirables via les technologies émergentes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Films Section */}
      <section className="films-section">
        <div className="films-container">
          <div className="films-header">
            <div className="films-header-left">
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
              <Link to="/films" className="btn-selection">
                <span>VOIR LA SÉLECTION</span>
                <div className="btn-selection-arrow">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </Link>
            </div>
          </div>

          <div className="films-grid">
            {films.slice(0, 3).map((film, index) => (
              <div key={film.id_film} className="film-card">
                <div className="film-image" style={{ aspectRatio: "16/9" }}>
                  {film.image_principale ? (
                    <img src={`${API_URL}${film.image_principale}`} alt={film.titre} className="film-thumbnail" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div className={`film-placeholder film-placeholder-${(index % 3) + 1}`}></div>
                  )}
                </div>
                <div className="film-info">
                  <h3 className="film-title">{film.titre}</h3>
                  <p className="film-director">{film.user?.username || ""}</p>
                </div>
              </div>
            ))}
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
            {sponsors.length > 0 ? sponsors.map((s, i) => (
              <div key={i} className="sponsor-card">
                {s.image_url ? (
                  <img src={s.image_url} alt={s.name || ""} style={{ maxWidth: "100%", maxHeight: "60px", objectFit: "contain" }} />
                ) : (
                  <span className="sponsor-placeholder">{s.name || "SPONSOR"}</span>
                )}
              </div>
            )) : (
              [...Array(6)].map((_, i) => (
                <div key={i} className="sponsor-card">
                  <span className="sponsor-placeholder">SPONSOR</span>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="location-section">
        <div className="location-container">
          <div className="location-badge">
            <svg viewBox="0 0 24 24" fill="none"><path d="M12 21C12 21 5 13.5 5 9C5 5.13 8.13 2 12 2C15.87 2 19 5.13 19 9C19 13.5 12 21 12 21Z" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="1.5"/></svg>
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
        </div>
      </section>
    </>
  );
}

export default Home;
