import React from "react";

const StarIcon = ({ fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      {fill === "full" && (
        <path
          d="M12 1.2L15.34 7.92L22.8 8.99L17.4 14.22L18.68 21.6L12 18.12L5.32 21.6L6.6 14.22L1.2 8.99L8.66 7.92L12 1.2Z"
          fill="#FFC000"
        />
      )}
      {fill === "half" && (
        <>
          <path
            d="M12 1.2L15.34 7.92L22.8 8.99L17.4 14.22L18.68 21.6L12 18.12V1.2Z"
            fill="#C4C4C4"
          />
          <path
            d="M12 1.2V18.12L5.32 21.6L6.6 14.22L1.2 8.99L8.66 7.92L12 1.2Z"
            fill="#FFC000"
          />
        </>
      )}
      {fill === "empty" && (
        <path
          d="M12 1.2L15.34 7.92L22.8 8.99L17.4 14.22L18.68 21.6L12 18.12L5.32 21.6L6.6 14.22L1.2 8.99L8.66 7.92L12 1.2Z"
          fill="#C4C4C4"
        />
      )}
    </svg>
  );
};

const StarRating = ({ stars }) => {
  const starArray = Array.from({ length: 5 }, (_, index) => {
    if (index < Math.floor(stars)) {
      return "full";
    } else if (index < stars) {
      return "half";
    } else {
      return "empty";
    }
  });

  return (
    <div className="flex">
      {starArray.map((fill, index) => (
        <StarIcon key={index} fill={fill} />
      ))}
    </div>
  );
};

export default StarRating;
