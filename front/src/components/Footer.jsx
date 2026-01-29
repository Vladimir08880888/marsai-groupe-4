import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <h3 className="footer-logo">
              MARS <span className="footer-logo-gradient">AI</span>
            </h3>
            <p className="footer-tagline">
              "La plateforme mondiale de la narration générative, ancrée dans la lumière de Marseille."
            </p>
            <div className="footer-socials">
              <a href="#" className="social-link" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z"/></svg>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="4"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
              </a>
            </div>
          </div>

          <div className="footer-nav">
            <div className="footer-nav-col">
              <h4 className="footer-nav-title">NAVIGATION</h4>
              <a href="#" className="footer-link">Galerie</a>
              <a href="#" className="footer-link">Programme</a>
              <a href="#" className="footer-link">Top 50</a>
              <a href="#" className="footer-link">Billetterie</a>
            </div>
            <div className="footer-nav-col">
              <h4 className="footer-nav-title">LÉGAL</h4>
              <a href="#" className="footer-link">Partenaires</a>
              <a href="#" className="footer-link">FAQ</a>
              <a href="#" className="footer-link">Contact</a>
            </div>
          </div>

          <div className="footer-newsletter">
            <h4 className="newsletter-title">RESTEZ<br />CONNECTÉ</h4>
            <div className="newsletter-form">
              <input type="email" placeholder="Email Signal" className="newsletter-input" />
              <button className="newsletter-btn">OK</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span>© 2026 MARS.A.I PROTOCOL</span>
            <span className="footer-dot">•</span>
            <span>MARSEILLE HUB</span>
          </div>
          <div className="footer-bottom-right">
            <span>DESIGN SYSTÈME CYBER-PREMIUM</span>
            <a href="#" className="footer-bottom-link">LÉGAL</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
