import { useState } from "react";
import { Link } from "react-router";
import { Search, Home, Trophy, Calendar, User } from "lucide-react";

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

  return (
    <nav className="bg-black p-4 md:p-5">
      <div className="flex bg-white/5 text-white border border-white/10 rounded-full justify-between items-center px-6 h-16">
        {/* Logo */}
        <Link to="/" className="flex font-bold gap-1 px-3 text-xl flex-shrink-0">
          <span>MARS</span>
          <span className="bg-[linear-gradient(180deg,rgba(81,162,255,1)_0%,rgba(173,70,255,1)_50%,rgba(255,43,127,1)_100%)] bg-clip-text text-transparent">
            AI
          </span>
        </Link>

        {/* Center icons - desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/films" className="text-white/70 hover:text-white transition-colors" title="Films">
            <Search className="w-5 h-5" />
          </Link>
          <Link to="/" className="text-white/70 hover:text-white transition-colors" title="Accueil">
            <Home className="w-5 h-5" />
          </Link>
          <Link to="/palmares" className="text-white/70 hover:text-white transition-colors" title="Palmarès">
            <Trophy className="w-5 h-5" />
          </Link>
          <Link to="/agenda" className="text-white/70 hover:text-white transition-colors" title="Agenda">
            <Calendar className="w-5 h-5" />
          </Link>
          <Link to="/contact" className="text-white/70 hover:text-white transition-colors" title="Contact">
            <User className="w-5 h-5" />
          </Link>
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          {firstName ? (
            <>
              {role === "ADMIN" && (
                <Link to="/admin/films" className="tracking-wide font-bold text-xs text-purple-400 hover:text-purple-300">
                  ADMIN
                </Link>
              )}
              {role === "JURY" && (
                <Link to="/jury/mes-films" className="tracking-wide font-bold text-xs text-purple-400 hover:text-purple-300">
                  MES FILMS
                </Link>
              )}
              <span className="text-white/60 text-xs">{firstName}</span>
              <button onClick={handleLogout} className="tracking-wide font-bold text-xs text-white/80 hover:text-white">
                DÉCONNEXION
              </button>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="tracking-wide font-bold text-xs text-white/80 hover:text-white">
                CONNEXION
              </Link>
              <Link to="/auth/register" className="tracking-wide font-bold text-xs bg-[linear-gradient(180deg,rgba(81,162,255,1)_0%,rgba(152,16,250,1)_100%)] px-5 py-2 rounded-full">
                INSCRIPTION
              </Link>
            </>
          )}
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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 bg-white/5 border border-white/10 rounded-2xl text-white">
          <div className="flex flex-col gap-4 px-6 py-6">
            <Link to="/" onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-white text-sm">ACCUEIL</Link>
            <Link to="/films" onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-white text-sm">FILMS</Link>
            <Link to="/palmares" onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-white text-sm">PALMARÈS</Link>
            <Link to="/agenda" onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-white text-sm">AGENDA</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-white text-sm">CONTACT</Link>
            {role !== "ADMIN" && role !== "JURY" && (
              <Link to="/soumettre" onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-white text-sm">SOUMETTRE</Link>
            )}
            {firstName ? (
              <>
                {role === "ADMIN" && (
                  <Link to="/admin/films" onClick={() => setMenuOpen(false)} className="text-purple-400 text-sm">ADMIN</Link>
                )}
                {role === "JURY" && (
                  <Link to="/jury/mes-films" onClick={() => setMenuOpen(false)} className="text-purple-400 text-sm">MES FILMS</Link>
                )}
                <button onClick={handleLogout} className="text-white/60 hover:text-white text-sm text-left">
                  Déconnexion ({firstName})
                </button>
              </>
            ) : (
              <>
                <Link to="/auth/login" onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-white text-sm">CONNEXION</Link>
                <Link to="/auth/register" onClick={() => setMenuOpen(false)} className="text-white bg-[linear-gradient(180deg,rgba(81,162,255,1)_0%,rgba(152,16,250,1)_100%)] px-5 py-2 rounded-full text-sm text-center font-bold">
                  INSCRIPTION
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
