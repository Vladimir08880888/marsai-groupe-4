import { Link, useNavigate } from "react-router";
import Button from "./Button";
import search from "../assets/navbar_svg/search.svg";
import home from "../assets/navbar_svg/home.svg";
import win from "../assets/navbar_svg/win3.svg";
import callendrier from "../assets/navbar_svg/callendrier.svg";
import user from "../assets/navbar_svg/user.svg";


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

  
  <section className="bg-black p-[20px]">


      {" "}
      <div className="flex bg-white/5 text-white border border-white/10 h-[50px] rounded-[30px] justify-between items-center px-[24px] h-[66px]">
        {" "}
        <div className="flex font-bold gap-[4px] px-[12px] text-[20px]">
          {" "}
          <span>MARS</span>{" "}
          <span className="bg-[linear-gradient(180deg,rgba(81,162,255,1)_0%,rgba(173,70,255,1)_50%,rgba(255,43,127,1)_100%)] bg-clip-text text-transparent">
            {" "}
            AI{" "}
          </span>{" "}
        </div>{" "}
        <div>
          {" "}
          <div className="grid grid-cols-5 gap-[32px] ">
            {" "}
            <img className="w-full" src={search} alt="" />{" "}
            <img className="w-full" src={home} alt="" />{" "}
            <img className="w-full" src={win} alt="" />{" "}
            <img className="w-full" src={callendrier} alt="" />{" "}
            <img
              className="relative right-[0.5px] w-full"
              src={user}
              alt=""
            />{" "}
          </div>{" "}
          <div className="hidden grid-cols-5 gap-[32px] text-[10px] text-center h-[0px] relative bottom-[7px]">
            {" "}
            <h1>●</h1> <h1>●</h1> <h1>●</h1> <h1>●</h1> <h1>●</h1>{" "}
          </div>{" "}
        </div>{" "}
        <span className="flex gap-[15px]">
          {" "}
          <button className="tracking-[0.3px] font-bold text-[12px] text-white/80">
            CONNEXION
          </button>{" "}
          <button className="tracking-[0.3px] font-bold text-[12px] bg-[linear-gradient(180deg,rgba(81,162,255,1)_0%,rgba(152,16,250,1)_100%)] px-[20px] py-[7px] rounded-[30px] gap-[20px]">
            INSCRIPTON
          </button>{" "}
        </span>{" "}
      </div>{" "}
    </section>
  );
}