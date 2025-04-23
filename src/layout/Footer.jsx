import {
  ArrowDown01Icon,
  Facebook01Icon,
  InstagramIcon,
  SentIcon,
} from "hugeicons-react";
import React from "react";

const footerLinks = {
  Company: ["About Us", "Our Store", "Contact Us"],
  "Career Opportunities": ["Selling Programs", "Advertise", "Cooperation"],
  "How to Buy": [
    "Making Payments",
    "Delivery Options",
    "Buyer Protection",
    "New User Guide",
  ],
  Help: ["FAQ", "Contacts Us", "Privacy Policy"],
};

const Footer = () => {
  return (
    <footer className="flex w-full flex-col items-center">
      <div className="flex w-full justify-center bg-[#0966B280] py-16">
        <div className="grid w-[90%] max-w-[800px] grid-cols-2 place-items-start justify-items-center gap-6 md:grid-cols-4">
          {Object.keys(footerLinks).map((footerLink, i) => (
            <div key={i} className="">
              <h3 className="text-dark text-center font-semibold md:text-start">
                {footerLink}
              </h3>
              <ul className="mt-6 flex flex-col items-center gap-4 md:items-start">
                {footerLinks[footerLink].map((item, j) => (
                  <li key={j} className="text-sm text-[#555]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full justify-center">
        <div className="flex w-[90%] max-w-[1440px] flex-col">
          <div className="flex items-center justify-center gap-7 border-b-2 border-[#D9D9D9] py-6 md:justify-start">
            <img src="/images/visa.png" className="grayscale" alt="visa" />
            <img
              src="/images/mastercard.png"
              className="grayscale"
              alt="mastercard"
            />
            <img src="/images/paypal.png" className="grayscale" alt="paypal" />
          </div>

          <div className="flex w-full flex-col items-center justify-between gap-2 py-8 md:flex-row">
            <p className="text-dark text-center text-sm md:text-base">
              165-179 Forster Road City of Monash, Melbourne, Australia
            </p>
            <div className="flex items-center gap-6">
              <button className="cursor-pointer">
                <InstagramIcon />
              </button>
              <button className="cursor-pointer">
                <Facebook01Icon />
              </button>
              <button className="cursor-pointer">
                <SentIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
