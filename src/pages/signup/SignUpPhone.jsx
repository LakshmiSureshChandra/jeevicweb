import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useRequestAccountAccess } from "../../services/mutations/AuthMutations";

const SignUpPhone = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("91");

  const requestAccountAccessMutation = useRequestAccountAccess();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber) {
      localStorage.setItem("countryCode", countryCode);
      localStorage.setItem("phoneNumber", phoneNumber);

      requestAccountAccessMutation.mutate({
        country_code: countryCode,
        phone_number: phoneNumber,
      });
    }
  };

  if (requestAccountAccessMutation.isSuccess) {
    return <Navigate to="/sign-up/verification" />;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      {" "}
      <div>
        <div className="flex items-center gap-6">
          <div className="flex aspect-square items-center justify-center rounded-full border-[0.5px] border-black bg-transparent p-2.5 text-sm font-bold">
            logo
          </div>
          <h2 className="text-3xl font-bold">Jeevic</h2>
        </div>
        <p className="text-xl font-semibold text-[#1a1a1a]">
          Nice to see you again
        </p>
        <div className="font-roboto mt-12 w-full rounded-[6px] border-[0.5px] border-[#e5e5e5] bg-[#f2f2f2] p-2.5 pl-4 placeholder:text-[#808080]">
          +
          <input
            type="tel"
            maxLength={3}
            value={countryCode}
            onChange={(e) => {
              const newValue = e.target.value.replace(/[^0-9]/g, "");
              setCountryCode(newValue);
            }}
            required
            className="border-r-0.5 mr-2 ml-0.5 w-10 border-r border-r-[#cec7c7] outline-none"
          />
          <input
            type="tel"
            placeholder="Phone number"
            aria-label="Phone number"
            maxLength={13}
            value={phoneNumber}
            onChange={(e) => {
              const newValue = e.target.value.replace(/[^0-9]/g, "");
              setPhoneNumber(newValue);
            }}
            required
            className="outline-none placeholder:text-[#808080]"
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          className={`font-roboto flex w-full items-center justify-center rounded-[6px] py-2.5 text-[15px] font-bold tracking-[0.4px] ${
            !phoneNumber || requestAccountAccessMutation.isPending
              ? "cursor-default bg-[#F0F0F0] text-[#D9D9D9]"
              : "bg-blue cursor-pointer text-white"
          }`}
          disabled={requestAccountAccessMutation.isPending}
        >
          {requestAccountAccessMutation.isPending ? "loading..." : "Continue"}
        </button>

        <div className="mt-5 flex items-center border-b border-[#e5e5e5] pb-2">
          <p className="font-inter text-[13px]">
            By clicking continue you agree to our {""}
            <button className="text-blue font-semibold underline underline-offset-3">
              Terms & Conditions
            </button>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <button className="flex w-full cursor-pointer items-center justify-center gap-5 rounded-[6px] bg-[#F0F0F0] py-3.5">
          <img
            src="/images/apple-icon.svg"
            className="aspect-square w-6"
            alt="apple"
          />
          <span className="font-semibold text-[#2a2a2a]">
            Continue with Apple
          </span>
        </button>
        <button className="flex w-full cursor-pointer items-center justify-center gap-5 rounded-[6px] bg-[#F0F0F0] py-3.5">
          <img
            src="/images/google-icon.svg"
            className="mt-0.5 aspect-square w-6"
            alt="google"
          />
          <span className="font-semibold text-[#2a2a2a]">
            Continue with Google
          </span>
        </button>
      </div>
    </form>
  );
};

export default SignUpPhone;
