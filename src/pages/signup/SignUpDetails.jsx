import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpDetails = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.email !== formData.confirmEmail) {
      return alert("Please enter same email address");
    }
    const { confirmEmail, ...userData } = formData;
    localStorage.setItem("userData", JSON.stringify(userData));

    navigate("/");
  };

  return (
    <div className="flex w-[90%] max-w-[450px] flex-col gap-8">
      <h2 className="text-center text-xl font-semibold text-[#2a2a2a]">
        Continue Sign up
      </h2>
      <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
        <div>
          <div className="flex grow flex-col gap-5">
            <div className="flex gap-5">
              <div className="flex w-full flex-col">
                <label
                  className={`text-blue 3xl:text-sm -my-1 px-2 text-xs transition-all duration-100 ${
                    formData.firstName ? "opacity-100" : "opacity-0"
                  }`}
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  className="xs:text-base focus:border-blue flex h-8 w-full items-center border-b-[1.2px] border-[#969696] bg-transparent px-2 text-sm text-[#2A2A2A] outline-none placeholder:text-[#969696]"
                  type="text"
                  maxLength={16}
                  id="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex w-full flex-col">
                <label
                  className={`text-blue 3xl:text-sm -my-1 px-2 text-xs transition-all duration-100 ${
                    formData.lastName ? "opacity-100" : "opacity-0"
                  }`}
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  className="xs:text-base focus:border-blue flex h-8 w-full items-center border-b-[1.2px] border-[#969696] bg-transparent px-2 text-sm text-[#2A2A2A] outline-none placeholder:text-[#969696]"
                  type="text"
                  maxLength={16}
                  id="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                className={`text-blue 3xl:text-sm -my-1 px-2 text-xs transition-all duration-100 ${
                  formData.email ? "opacity-100" : "opacity-0"
                }`}
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="xs:text-base focus:border-blue flex h-8 w-full items-center border-b-[1.2px] border-[#969696] bg-transparent px-2 text-sm text-[#2A2A2A] outline-none placeholder:text-[#969696]"
                type="email"
                id="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="relative flex flex-col justify-center">
              <label
                className={`text-blue 3xl:text-sm -my-1 px-2 text-xs transition-all duration-100 ${
                  formData.confirmEmail ? "opacity-100" : "opacity-0"
                }`}
                htmlFor="confirmEmail"
              >
                Verify Email Address
              </label>
              <input
                className="xs:text-base focus:border-blue flex h-8 w-full items-center border-b-[1.2px] border-[#969696] bg-transparent px-2 pr-20 text-sm text-[#2A2A2A] outline-none placeholder:text-[#969696]"
                type="email"
                id="confirmEmail"
                placeholder="Verify Email Address"
                value={formData.confirmEmail}
                onChange={handleInputChange}
                required
              />
              <button className="text-blue font-inter absolute mt-1.5 cursor-pointer self-end p-2 text-sm font-semibold">
                Send OTP
              </button>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-1">
            <input type="checkbox" />
            <p className="font-inter text-[13px] text-[#969696]">
              Sign me up for latest offers, Sales and Trending items
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-inter text-center text-[13px]/relaxed text-[#969696]">
            By selecting Agree and Continue below, I agree to Jeevic Business{" "}
            <button className="text-blue cursor-pointer font-semibold underline underline-offset-3">
              Terms & Conditions
            </button>{" "}
            and{" "}
            <button className="text-blue cursor-pointer font-semibold underline underline-offset-3">
              Privacy Policy
            </button>
          </p>
          <button
            type="submit"
            className={`font-roboto bg-blue flex w-full cursor-pointer items-center justify-center rounded-[6px] py-2.5 text-[15px] font-bold tracking-[0.4px] text-white transition-all`}
          >
            Agree and Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpDetails;
