import React from "react";
import { Outlet } from "react-router-dom";

const SignUpLayout = () => {
  return (
    <main className="flex">
      <img
        src="/images/registration-background.webp"
        className="max-h-[90vh] w-full object-cover"
        alt="online is better"
      />
      <div className="flex min-w-[600px] items-center justify-center">
        <Outlet />
      </div>
    </main>
  );
};

export default SignUpLayout;
