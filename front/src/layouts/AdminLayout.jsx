import { Link, Outlet, useLocation } from "react-router";
import {
  LayoutDashboard,
  Clapperboard,
  Users,
  Trophy,
  FileText,
  CalendarCheck,
  ArrowLeftFromLine,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { path: "/admin/films", label: "Films", icon: Clapperboard },
  { path: "/admin/jury", label: "Jury", icon: Users },
  { path: "/admin/awards", label: "Prix", icon: Trophy },
  { path: "/admin/content", label: "Contenu", icon: FileText },
];

export default function AdminLayout() {
  const location = useLocation();

  function handleLogout() {
    localStorage.removeItem("first_name");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <aside className="w-56 bg-gray-900 border-r border-white/10 p-4 flex flex-col">
        <Link to="/admin/films" className="flex items-center gap-2 text-white text-xl font-bold mb-8 px-3">
          <LayoutDashboard className="w-5 h-5 text-purple-400" />
          <div>
            MARS<span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">AI</span>
            <span className="text-white/40 text-xs block">Administration</span>
          </div>
        </Link>
        <nav className="space-y-1 flex-1">
          {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
            <Link key={path} to={path}
              className={`flex items-center gap-2 px-3 py-2 rounded text-sm ${location.pathname === path ? "bg-purple-600/20 text-purple-400" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="space-y-1 border-t border-white/10 pt-3">
          <Link to="/" className="flex items-center gap-2 text-white/40 hover:text-white text-sm px-3 py-2">
            <ArrowLeftFromLine className="w-4 h-4" />
            Retour au site
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-2 text-white/40 hover:text-white text-sm text-left px-3 py-2 w-full">
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
