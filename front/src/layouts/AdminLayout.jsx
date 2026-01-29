import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function AdminLayout() {
  return (
    <div>
      <Navbar />
      <aside>Sidebar</aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
