import { NavLink, Outlet } from "react-router";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import Navbar from "@/components/Navbar";
import AdminSidebar from "@/components/admin/AdminSideBar";

export default function AdminLayout() {
  return (
	<>
    <SidebarProvider>
      <AdminSidebar />

      <SidebarInset>

        <main className="flex-1 p-4 md:p-6 " >
			    <Outlet />
		    </main>
        
      </SidebarInset>

    </SidebarProvider>
	</>
  )
}
