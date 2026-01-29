import { Link } from "react-router";

export default function Navbar() {
  const username = localStorage.getItem("username");

  function handleLogout() {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <nav className="flex justify-between items-center px-8 py-6">
      <div>
        <Link to="/" className="text-white text-2xl font-bold tracking-tight">
          MARS<span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">AI</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {username ? (
          <>
            <span className="text-white/80">Hello, {username}</span>
            <button
              onClick={handleLogout}
              className="text-white/80 hover:text-white transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/auth/login"
            className="px-6 py-2 border border-white/30 rounded-full text-white/90 hover:bg-white/10 transition-all"
          >
            Connexion
          </Link>
        )}
      </div>
    </nav>
  );
}
