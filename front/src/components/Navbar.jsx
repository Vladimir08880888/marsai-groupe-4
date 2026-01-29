import { useState } from "react";
import { Link } from "react-router";

export default function Navbar() {
  const firstName = localStorage.getItem("first_name");
  const role = localStorage.getItem("role");
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("first_name");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/";
  }

  const navLinks = (
    <>
      <Link to="/films" onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-white transition-colors text-sm">FILMS</Link>
      <Link to="/palmares" onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-white transition-colors text-sm">PALMARÈS</Link>
      {role !== "ADMIN" && role !== "JURY" && (
        <Link to="/soumettre" onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-white transition-colors text-sm">SOUMETTRE</Link>
      )}
      {firstName ? (
        <>
          {role === "ADMIN" && (
            <Link to="/admin/films" onClick={() => setMenuOpen(false)} className="text-purple-400 hover:text-purple-300 transition-colors text-sm">ADMIN</Link>
          )}
          {role === "JURY" && (
            <Link to="/jury/mes-films" onClick={() => setMenuOpen(false)} className="text-purple-400 hover:text-purple-300 transition-colors text-sm">MES FILMS</Link>
          )}
          <span className="text-white/60 text-sm">{firstName}</span>
          <button onClick={handleLogout} className="text-white/60 hover:text-white transition-colors text-sm">
            Déconnexion
          </button>
        </>
      ) : null}
    </>
  );

  return (
    <nav className="bg-gray-950/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-white text-2xl font-bold tracking-tight flex-shrink-0">
            MARS<span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">AI</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks}
          </div>

          {/* Burger button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white/80 hover:text-white p-2"
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-gray-950/95 backdrop-blur-sm">
          <div className="flex flex-col gap-4 px-4 py-6">
            {navLinks}
          </div>
        </div>
      )}
    </nav>
  );
}
