import React from 'react'
import CardEvennements from '../components/CardEvennements.jsx'
import { Search } from "lucide-react";

const DataEvennements = {
  id: 1,
  type: "MASTERCLASS",
  title: "MASTERCLASS SORA : L'AVENIR DU CINÉMA",
  date: "2026-06-20",
  time: "10:30 — 12:30",
  location: "Auditorium J4",
  capacity: 200,
  enrolled: 185,
  status: "UPCOMING"
};


function Evennements() {
  return (
    <section className='bg-black text-white'>

        <div className='flex'>
            <h2>V</h2>
            <h2>RETOUR AU DASHBOARD</h2>
        </div>

        <h2>Gestion des Événements</h2>

        <h2>Contrôle du protocole marsAI 2026</h2>


        <div className='w-full h-[100px]'>

        </div>

        <div className='flex gap-[16px]'>
            
            <div className='flex items-center '>
                <Search size={20}  className="text-white/20 px-[20px]" />
                <input placeholder='Rechercher par titre ou lieu' type="search" name="" id="" />
            </div>

            <button className='bg-white/2 text-[10px] border border-white/10 rounded-[16px] text-white/40 font-bold tracking-[2px] h-[54px] px-[20px]'>TOUS</button>

            <button className='bg-white/2 text-[10px] border border-white/10 rounded-[16px] text-white/40 font-bold tracking-[2px] h-[54px] px-[20px]'>SCREENIGN</button>

            <button className='bg-white/2 text-[10px] border border-white/10 rounded-[16px] text-white/40 font-bold tracking-[2px] h-[54px] px-[20px]'>WORKSHOP</button>

            <button className='bg-white/2 text-[10px] border border-white/10 rounded-[16px] text-white/40 font-bold tracking-[2px] h-[54px] px-[20px]'>MASTERCLASS</button>

            <button className='bg-white/2 text-[10px] border border-white/10 rounded-[16px] text-white/40 font-bold tracking-[2px] h-[54px] px-[20px]'>CONCERT</button>

            <button className='bg-white/2 text-[10px] border border-white/10 rounded-[16px] text-white/40 font-bold tracking-[2px] h-[54px] px-[20px]'>PARTY</button>

        </div>




        <div className='bg-black grid grid-cols-3 p-[24px] gap-[32px]'>

            <CardEvennements data={DataEvennements}/>
            <CardEvennements data={DataEvennements}/>
            <CardEvennements data={DataEvennements}/>
            <CardEvennements data={DataEvennements}/>
            <CardEvennements data={DataEvennements}/>
            <CardEvennements data={DataEvennements}/>
        </div>
        

    </section>
  )
}

export default Evennements