import { UserIcon } from "hugeicons-react";
import React from "react";

const ContactUs = () => {
  return (
    <section className="my-15 flex w-full">
      <div className="bg-dark flex w-[50%] flex-col gap-8 p-13">
        <h2 className="text-5xl leading-[120%] font-semibold text-white">
          Tell us about your <span className="text-[#FFC94B]">Concerns</span>
        </h2>

        <form>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <label
                htmlFor="contact-name"
                className="font-semibold text-white"
              >
                Your Name
              </label>
              <div className="flex gap-3 rounded-[4px] border border-[#D9D9D9] px-2.5 py-4">
                <UserIcon className="text-[#9D9D9D]" />
                <input
                  type="text"
                  placeholder="Enter your name"
                  id="contact-name"
                  className="w-full text-[#9D9D9D] outline-none placeholder:text-[#9D9D9D90]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label
                htmlFor="contact-email"
                className="font-semibold text-white"
              >
                Email
              </label>
              <div className="flex gap-3 rounded-[4px] border border-[#D9D9D9] px-2.5 py-4">
                <UserIcon className="text-[#9D9D9D]" />
                <input
                  type="email"
                  id="contact-email"
                  placeholder="Enter your email"
                  className="w-full text-[#9D9D9D] outline-none placeholder:text-[#9D9D9D90]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label
                htmlFor="contact-description"
                className="font-semibold text-white"
              >
                Description
              </label>
              <div className="flex gap-3 rounded-[4px] border border-[#D9D9D9] px-2.5 py-4">
                <textarea
                  type="text"
                  id="contact-description"
                  placeholder="Enter your description"
                  className="min-h-[130px] w-full resize-none text-[#9D9D9D] outline-none placeholder:text-[#9D9D9D90]"
                />
              </div>
            </div>
          </div>

          <button className="bg-blue font-lato mt-8 w-full cursor-pointer py-4 text-center text-white uppercase">
            Send
          </button>
        </form>
      </div>

      <img
        src="/images/hero-left.png"
        className="w-[50%] object-cover object-center"
        alt="girls showing dresses"
      />
    </section>
  );
};

export default ContactUs;
