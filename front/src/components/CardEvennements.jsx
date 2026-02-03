import React from "react";

function CardEvennements({ data }) {
  const percentage = 80;
  console.log(data);
  return (
    <div className="p-[30px] w-[300px] bg-white/2 text-white border border-white/5 rounded-[32px]">
      <div className="flex h-[0px] w-full justify-end">
        
        <img src="/src/assets/CardEvennements_svg/Icon.svg" alt=""  style={{ zIndex: 0 }}
          className="relative h-[150px] w-[150px]" />
      </div>


      <div className="relative" style={{ zIndex: 1 }}>
        <div className="flex justify-between items-center">
          <h2 className="bg-[rgba(43,127,255,0.1)] text-[#51A2FF] uppercase tracking-[1px] border border-[rgba(43,127,255,0.2)] px-[20px] py-[7px] rounded-[14px]">upcoming</h2>
          <h2 className="p-[10px] bg-white/5 border border-white/10 p-[5px]">:</h2>
        </div>

        <div className="flex">
          <h2>L</h2>
          <h2>masterclass</h2>
        </div>

        <h2>MASTERCLASS SORA</h2>

        <div>
          <div className="flex">
            <h1>L</h1>
            <h2>20 juin</h2>
          </div>

          <div className="flex">
            <h2>L</h2>
            <h2>20:30 - 23:30</h2>
          </div>

          <div className="flex">
            <h2>L</h2>
            <h2>
              <thead>tre de lamer</thead>
            </h2>
          </div>
        </div>

        <div>
          <div className="flex">
            <h2>remplissage</h2>
            <div className="flex">
              <h2 className="">185</h2>
              <h2 className="">200</h2>
            </div>
          </div>

          <div className="bg-black h-[10px] w-full">
            <div style={{ width: `${percentage}%` }} className="bg-grey"></div>
          </div>
        </div>

        <div className="flex">
          <button>DETAILS</button>

          <button>L</button>
        </div>
      </div>
    </div>
  );
}

export default CardEvennements;
