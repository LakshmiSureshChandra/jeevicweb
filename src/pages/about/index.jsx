import React from "react";
import Hero from "./Hero";
import ContactUs from "./ContactUs";

const About = () => {
  return (
    <main className="flex w-full justify-center">
      <div className="w-[90%] max-w-[1440px]">
        <Hero />
        <ContactUs />
      </div>
    </main>
  );
};

export default About;
