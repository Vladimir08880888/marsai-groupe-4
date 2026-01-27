import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function PublicLayout() {
  return (
    <div>
      <Navbar class />

      <main>
        <Outlet />
      </main>

      <footer className="bg-black">
        <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-4">
              <h1 className="text-white text-[36px]">MARS <span className="text-blue-600">AI</span></h1>

              <h1 className="text-white/30 text-start ">"La plateforme mondiale de la narration générative, ancrée dans la lumière de Marseille."</h1>

              <div className="flex gap-4">
                <img src="src/assets/login_png/Button.svg" alt="" />
                <img src="src/assets/login_png/Button (1).svg" alt="" />
                <img src="src/assets/login_png/Button (2).svg" alt="" />
                <img src="src/assets/login_png/Button (3).svg" alt="" />
              </div>
            </div>

            <div className="flex">
              <div>
              <h2 className="text-[#AD46FF]">Navigation</h2>
              <h2>Galerie</h2>
              <h2>Programme</h2>
              <h2>Top 50</h2>
              <h2>Billetterie</h2>
              </div>
              

              <div>
                <h2>Légal</h2>
                <h2>Partenaires</h2>
                <h2>FAQ</h2>
                <h2>Contact</h2>
              </div>


            </div>
            <div>3</div>
        </div>


      </footer>
    </div>
  );
}
