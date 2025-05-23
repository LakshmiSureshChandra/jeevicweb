import React from "react";

const HeartIcon = ({ filled }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="21"
      viewBox="0 0 24 21"
      fill={filled ? "#ff0800" : "none"}
      className="transition-all duration-300 ease-in-out"
    >
      <path
        d="M12.7153 3.30239L11.9882 4.06262L11.2612 3.3024C8.99957 0.937632 5.3328 0.93763 3.0712 3.3024C0.870342 5.60367 0.802718 9.31235 2.91809 11.6997L8.99556 18.5584C10.6101 20.3806 13.3663 20.3806 14.9808 18.5584L21.0583 11.6996C23.1737 9.31232 23.1061 5.60364 20.9052 3.30238C18.6436 0.937615 14.9769 0.937618 12.7153 3.30239Z"
        stroke={filled ? "none" : "#969696"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: "fill 0.3s ease-in-out, stroke 0.3s ease-in-out" }}
      />
    </svg>
  );
};

const FavouriteButton = ({ liked, setLiked }) => {
  return (
    <button
      className={`cursor-pointer rounded-full p-2 shadow-md transition-colors duration-200 ${
        liked ? "bg-red-100" : "bg-white hover:bg-gray-100"
      } flex h-10 w-10 items-center justify-center`}
      onClick={(e) => {
        e.stopPropagation();
        setLiked(!liked);
      }}
    >
      <HeartIcon filled={liked} />
    </button>
  );
};

export default FavouriteButton;
