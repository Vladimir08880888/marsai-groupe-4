import { Link,useNavigate } from "react-router";
export default function Navbar() {
  const navigate = useNavigate();
  const firstName = localStorage.getItem("first_name") || "Utilisateur";

  const isLoggedIn = !!localStorage.getItem("token"); 

  function handleLogout() {
    localStorage.removeItem("first_name");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow">
      {/* Logo */}
      

      <div className="flex items-center gap-6">
        {isLoggedIn ? (
          <>
            <span className="text-gray-700 font-medium">
              Bonjour, {firstName}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Déconnexion
            </button>
          </>
        ) : (
          <Link
            to="/auth/login"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Connexion
          </Link>
        )}
      </div>
    </div>
  );
}