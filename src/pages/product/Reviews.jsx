import React from "react";
import StarRating from "../../components/ui/StarRating";

const reviewsData = {
  5: 25,
  4: 21,
  3: 4,
  2: 2,
  1: 7,
};

const Reviews = () => {
  const total = Object.values(reviewsData).reduce((acc, curr) => acc + curr, 0);
  const percentData = Object.entries(reviewsData).reduce(
    (acc, [key, value]) => {
      acc[key] = Math.round((value / total) * 100);
      return acc;
    },
    {},
  );

  return (
    <section className="mt-8 flex flex-col items-center justify-center gap-5 border-b border-b-[#d9d9d9]">
      <h2 className="text-dark font-bold uppercase">REVIEWS (5)</h2>
      <div className="h-[1px] w-full bg-[#D9D9D9]"></div>
      <div className="my-8 flex w-full flex-col justify-around gap-4 md:flex-row">
        <div className="flex flex-col gap-3 md:gap-5">
          <h3 className="text-dark font-semibold">Total review rate</h3>
          <p className="text-sm text-[#555] md:max-w-[16em] md:text-base lg:max-w-none">
            Average rating (10 Reviews & 125 Ratings)
          </p>
          <div className="flex items-center gap-4">
            <StarRating stars={4.8} />
            <p className="text-[#555]">4.8/5</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {Object.keys(percentData)
            .reverse()
            .map((star, i) => {
              return (
                <Reviewbar key={i} stars={star} percent={percentData[star]} />
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Reviews;

const Reviewbar = ({ stars, percent }) => {
  return (
    <div className="font-lato mt-2 flex items-center gap-2 text-[#555] md:mt-0">
      <span className="text-nowrap">{stars} Stars</span>
      <div className="h-[5px] w-full rounded-full bg-[#D9D9D9] md:w-[230px] lg:w-[300px]">
        <div
          className="bg-blue h-full w-1/2 rounded-full"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <span className="text-nowrap">{percent}%</span>
    </div>
  );
};
