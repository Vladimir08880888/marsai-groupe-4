import { Link, Outlet, useLocation } from "react-router";

const NAV_ITEMS = [
  { path: "/admin/films", label: "Films" },
  { path: "/admin/jury", label: "Jury" },
  { path: "/admin/awards", label: "Prix" },
  { path: "/admin/content", label: "Contenu" },
];

export default function AdminLayout() {
  const location = useLocation();

  function handleLogout() {
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <aside className="w-56 bg-gray-900 border-r border-white/10 p-4 flex flex-col">
        <Link to="/" className="text-white text-xl font-bold mb-8 block">
          MARS<span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">AI</span>
          <span className="text-white/40 text-xs block">Administration</span>
        </Link>
        <nav className="space-y-1 flex-1">
          {NAV_ITEMS.map(({ path, label }) => (
            <Link key={path} to={path}
              className={`block px-3 py-2 rounded text-sm ${location.pathname === path ? "bg-purple-600/20 text-purple-400" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
              {label}
            </Link>
          ))}
        </nav>
        <button onClick={handleLogout} className="text-white/40 hover:text-white text-sm text-left px-3 py-2">
          Déconnexion
        </button>
      </aside>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
