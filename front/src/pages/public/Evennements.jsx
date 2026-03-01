import React from "react";
import CardEvennements from "../../components/CardEvennements.jsx";
import { Search } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// const DataEvennements = {
//   id: 1,
//   type: "MASTERCLASS",
//   title: "MASTERCLASS SORA : L'AVENIR DU CINÉMA",
//   date: "2026-06-20",
//   time: "10:30 — 12:30",
//   location: "Auditorium J4",
//   capacity: 200,
//   enrolled: 185,
//   status: "UPCOMING",
// };




function Evennements() {

  const { t } = useTranslation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const EVENT_TYPES = ["SCREENING", "WORKSHOP", "MASTERCLASS", "CONCERT", "PARTY"];

  const filteredEvents = events.filter((e) => {
    if (typeFilter && e.type !== typeFilter) return false;
    if (search && !e.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/events`)
  .then(res => {
    if(!res.ok){
      throw new Error('loading error')
    }
    return res.json();
  })
  .then(data => {
    setEvents(data);
    setLoading(false);
  })
  .catch(err => {
    setError(err.message);
    setLoading(false);
  })
}, [])

 if (loading) return <div className="text-white p-6">loading...</div>;
 if (error) return <div className="text-white p-6">error: {error}</div>;

  return (
    <section className="bg-black text-white py-[154px]">
      <div className="flex flex-col sm:fmex-row items-start sm:items-end justify-between p-6 gap-4">
        <div className="w-full">
          <h2 className="bg-[linear-gradient(to_top,rgba(255,255,250,0.5)_35%,rgba(255,255,255,0.9)_70%)] font-bold tracking-[-2.4px]  text-4xl  sm:text-5xl bg-clip-text text-transparent uppercase">
            {t("evennements.management")}
          </h2>

          <h2 className="text-white/40 text-sm sm:text-[14px] uppercase tracking-[1.4px] ">
            {t("event.control_event")}
          </h2>
        </div>
      </div>

      {/* <div className="w-full h-[170px] px-[24px]"></div> */}

      <div className="flex gap-[16px] px-[24px] flex-wrap">
        <div className="flex items-center bg-white/2 text-[14px] border border-white/10 rounded-[16px] text-white/40 tracking-[0px] h-[54px] px-[20px]">
          <Search size={20} className="text-white/20 mr-[20px]" />
          <input
            className="w-[200px] placeholder-white/30 outline-none"
            placeholder={t("event.search_placeholder")}
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button
          onClick={() => setTypeFilter("")}
          className={`text-[10px] border rounded-[16px] font-bold tracking-[2px] h-[54px] px-[20px] ${!typeFilter ? "bg-white/10 text-white border-white/30" : "bg-white/2 text-white/40 border-white/10"}`}
        >
          {t("event_all_events")}
        </button>

        {EVENT_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setTypeFilter(typeFilter === type ? "" : type)}
            className={`text-[10px] border rounded-[16px] font-bold tracking-[2px] h-[54px] px-[20px] ${typeFilter === type ? "bg-white/10 text-white border-white/30" : "bg-white/2 text-white/40 border-white/10"}`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="bg-black grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-[24px] gap-[24px]">
        {filteredEvents.map(event => {
          return <CardEvennements key={event.id} data={event} />
        })}
      </div>
    </section>
  );
}

export default Evennements;