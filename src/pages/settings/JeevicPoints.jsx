import React from "react";

const JeevicPoints = () => {
  return (
    <section className="flex w-full flex-col items-center gap-10 rounded-[8px] bg-[rgba(9,102,178,0.1)] p-6">
      <div className="relative">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-medium">Jeevic points</h2>
          <span className="text-center text-lg font-medium">
            10 points - 1 INR
          </span>
        </div>

        <div
          className="absolute top-1/2 right-[130%] flex aspect-square w-[70px] -translate-y-1/2 items-center justify-center bg-cover bg-center bg-no-repeat"
        >
          <img src="/images/categories/jeeviccoin.png" alt="jeevic" />
        </div>
      </div>

      <div className="flex w-[90%] max-w-[600px] flex-col gap-2">
        <div className="bg-blue/70 flex w-full justify-between rounded-[10px] px-10 py-5 text-lg font-medium">
          <span>Total points</span>
          <span>100</span>
        </div>
        <div className="flex items-center gap-4 px-1">
          <div className="flex aspect-square w-[20px] items-center justify-center rounded-full border border-black bg-transparent text-sm">
            i
          </div>
          <p className="text-sm">Use points at checkout</p>
        </div>
      </div>
    </section>
  );
};

export default JeevicPoints;
