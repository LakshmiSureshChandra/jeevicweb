import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  InputOTP,
  InputOTPSlot,
  InputOTPGroup,
} from "../../components/ui/InputOtp";
import { useVerifyAccountAccess } from "../../services/mutations/AuthMutations";

const SignUpVerification = () => {
  let savedPhoneNumber = localStorage.getItem("phoneNumber");
  let savedCountryCode = localStorage.getItem("countryCode");
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const verifyAccountAccessMutation = useVerifyAccountAccess();

  console.log(verifyAccountAccessMutation.isSuccess);

  const handleSubmit = async () => {
    const response = await verifyAccountAccessMutation.mutateAsync({
      otp,
      country_code: savedCountryCode,
      phone_number: savedPhoneNumber,
    });

    if (response.data.access_token) {
      localStorage.removeItem("countryCode");
      localStorage.removeItem("phoneNumber");
      console.log("here");
      navigate("/sign-up/details");
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-3">
        <h2 className="text-center text-xl font-semibold text-[#2a2a2a]">
          Verify Your Phone
        </h2>
        <p className="font-inter max-w-[26em] text-center text-sm/snug text-[#8a8a8a]">
          We’ve sent a 6 digit code to{" "}
          <span className="font-semibold text-[#2a2a2a]">
            +
            {savedPhoneNumber
              ? savedCountryCode + " " + savedPhoneNumber
              : "999 999 999"}
          </span>{" "}
          please enter it below
        </p>
      </div>

      <div className="flex w-full items-center justify-center">
        <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <div className="flex flex-col items-center gap-6">
        <button
          onClick={() => handleSubmit()}
          disabled={otp.length !== 6 || verifyAccountAccessMutation.isPending}
          className={`font-roboto flex w-full items-center justify-center rounded-[6px] py-2.5 text-[15px] font-bold tracking-[0.4px] transition-all ${otp.length === 6 || verifyAccountAccessMutation.isPending ? "bg-blue cursor-pointer text-white" : "cursor-default bg-[#F0F0F0] text-[#D9D9D9]"}`}
        >
          {verifyAccountAccessMutation.isPending ? "Verifying..." : "Verify"}
        </button>
        <button className="text-blue font-inter cursor-pointer font-semibold">
          Resend Code
        </button>
      </div>
    </div>
  );
};

export default SignUpVerification;
