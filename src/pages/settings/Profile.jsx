import React from "react";

const Profile = () => {
  return (
    <section className="flex w-full flex-col items-center gap-10 rounded-[8px] bg-[rgba(9,102,178,0.1)] py-6">
      <div className="flex flex-col items-center gap-1">
        <h2 className="font-medium text-[#4C535F]">Your Profile Picture</h2>
        <img
          src="/images/pfp-placeholder.png"
          alt="profile pic"
          className="w-[150px]"
        />
      </div>

      <form className="flex w-[90%] max-w-[400px] flex-col gap-4">
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full flex-col gap-1">
            <label
              htmlFor="profile-phonenumber"
              className="font-medium text-[#4C535F]"
            >
              Phone Number
            </label>
            <div className="flex w-full rounded-[8px] border border-[#E0E4EC] bg-[#EDF2F6] p-4">
              +
              <input
                type="tel"
                maxLength={2}
                className="field-sizing-content max-w-[30px] border-r border-r-[#E0E4EC] pr-2 pl-0.5 outline-none"
                placeholder="1"
              />
              <input
                type="tel"
                className="w-full pl-2 outline-none"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className="flex w-full flex-col gap-1">
            <label
              htmlFor="profile-fullname"
              className="font-medium text-[#4C535F]"
            >
              Full name
            </label>

            <input
              type="text"
              id="profile-fullname"
              className="w-full rounded-[8px] border border-[#E0E4EC] bg-[#EDF2F6] p-4 outline-none"
              placeholder="Enter your Full name"
            />
          </div>

          <div className="flex w-full flex-col gap-1">
            <label
              htmlFor="profile-email"
              className="font-medium text-[#4C535F]"
            >
              Email
            </label>

            <input
              type="email"
              id="profile-email"
              className="w-full rounded-[8px] border border-[#E0E4EC] bg-[#EDF2F6] p-4 outline-none"
              placeholder="Enter your Email"
            />
          </div>
        </div>

        <div className="flex w-full justify-between gap-4">
          <button className="bg-blue flex h-[50px] w-full cursor-pointer items-center justify-center rounded-[6px] text-lg font-medium text-white">
            Save Changes
          </button>
          <button className="flex h-[50px] w-full cursor-pointer items-center justify-center rounded-[6px] border border-black bg-transparent text-lg font-medium">
            Reset
          </button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
