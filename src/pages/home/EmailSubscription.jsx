import { SentIcon } from "hugeicons-react";
import React from "react";

const EmailSubscription = () => {
  return (
    <section className="mt-24 hidden md:block">
      <div className="relative flex flex-col items-end justify-end">
        <div className="min-h-[120px] w-full grow self-stretch bg-[#fff]"></div>

        <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-1/2 flex-col items-center gap-6 rounded-[8px] bg-[#7296AB] px-16 py-8">
          <h2 className="flex gap-2 text-[34px] font-bold text-white">
            <span>Jeevic</span> <span className="text-[#d1e2eb]"> Store</span>
          </h2>
          <p className="max-w-[30em] text-center text-lg/tight text-white">
            Register your email not to miss the last minutes off+ Free delivery
          </p>
          <div className="flex w-[300px] justify-between rounded-[4px] bg-white px-3 py-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="pr-1 outline-none"
            />
            <SentIcon />
          </div>
        </div>
      </div>
      <div className="min-h-[125px] w-full grow self-stretch bg-[#0966B280]"></div>
    </section>
  );
};

export default EmailSubscription;
