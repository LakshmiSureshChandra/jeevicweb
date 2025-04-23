import { ArrowRight01Icon } from "hugeicons-react";
import React from "react";
import settingsData from "../data/settingsData";
import { Link, Outlet, useLocation } from "react-router-dom";

const SettingsLayout = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <main className="flex w-full justify-center">
      <div className="flex w-[90%] max-w-[1300px] justify-between gap-24 py-16">
        <div className="z-20 mt-6 ml-4 w-[400px] shrink-0 rounded-[8px] bg-[#fff]">
          {Object.entries(settingsData).map(([section, items]) => (
            <div key={section}>
              <h2 className="mt-2 text-xl font-semibold text-[#202020]">
                {section}
              </h2>
              {items[0].map((item, index) => (
                <div key={index}>
                  <Link
                    to={item.location}
                    className={`flex cursor-pointer items-center justify-between rounded-[8px] px-2 py-4 font-medium outline-none ${location.pathname === item.location ? "bg-[#ff7a001a]" : "bg-transparent"}`}
                  >
                    <span className="px-2">{item.name}</span>
                    <ArrowRight01Icon />
                  </Link>
                  {<div className="h-px w-full bg-black opacity-10" />}
                </div>
              ))}
            </div>
          ))}
          <h2
            className="my-2 flex cursor-pointer items-center justify-between rounded text-xl font-semibold text-[#202020]"
            onClick={() => (window.location.href = "/about")}
          >
            About
            <ArrowRight01Icon />
          </h2>

          <span className="cursor-pointer text-sm text-[#FF0004] outline-none">
            Delete My account
          </span>
        </div>

        <Outlet />
      </div>
    </main>
  );
};

export default SettingsLayout;
