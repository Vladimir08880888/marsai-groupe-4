import React from 'react'
import CardEvennements from '../components/CardEvennements.jsx'

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
    <section>

        <div className='flex'>
            <h2>V</h2>
            <h2>RETOUR AU DASHBOARD</h2>
        </div>

        <h2>Gestion des Événements</h2>

        <h2>Contrôle du protocole marsAI 2026</h2>


        <div className='w-full h-[100px]'>

        </div>

        <div>
            
            <div>
                <h2>L</h2>
                <input placeholder='Rechercher par titre ou lieu' type="search" name="" id="" />
            </div>

            <button>TOUS</button>

            <button>SCREENIGN</button>

            <button>WORKSHOP</button>

            <button>MASTERCLASS</button>

            <button>CONCERT</button>

            <button>PARTY</button>

        </div>




        <div className='bg-black'>

            <CardEvennements data={DataEvennements}/>
        </div>
        

    </section>
  )
}

export default Evennements