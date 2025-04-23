import React from "react";

const TermsAndConditions = () => {
  return (
    <section className="flex w-full flex-col gap-8 rounded-[8px] bg-[rgba(9,102,178,0.1)] p-6">
      <h2 className="text-xl font-semibold text-[#202020]">
        Terms and Conditons
      </h2>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <h3 className="font-lato text-xl font-bold text-[#494949]">
            Clause 1
          </h3>
          <p className="text-[#494949]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra
            condimentum eget purus in. Consectetur eget id morbi amet amet, in.
            Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean
            leo pharetra in sit semper et. Amet quam placerat sem.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-lato text-xl font-bold text-[#494949]">
            Clause 2
          </h3>
          <p className="text-[#494949]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra
            condimentum eget purus in. Consectetur eget id morbi amet amet, in.
            Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean
            leo pharetra in sit semper et. Amet quam placerat sem.
            <br />
            <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Viverra condimentum eget purus in.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
