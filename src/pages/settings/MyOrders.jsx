import React from "react";

const ordersData = [
  {
    images: [
      "/images/my-orders-1.png",
      "/images/my-orders-2.png",
      "/images/my-orders-3.png",
      "/images/my-orders-4.png",
    ],
    orderId: "#92287157",
    deliveryType: "Standard Delivery",
    status: "Shipped",
    noOfItems: 4,
  },

  {
    images: [
      "/images/my-orders-1.png",
      "/images/my-orders-2.png",
      "/images/my-orders-3.png",
      "/images/my-orders-4.png",
    ],
    orderId: "#92287157",
    deliveryType: "Standard Delivery",
    status: "Shipped",
    noOfItems: 4,
  },

  {
    images: [
      "/images/my-orders-1.png",
      "/images/my-orders-2.png",
      "/images/my-orders-3.png",
      "/images/my-orders-4.png",
    ],
    orderId: "#92287157",
    deliveryType: "Standard Delivery",
    status: "Delivered",
    noOfItems: 4,
  },

  {
    images: [
      "/images/my-orders-1.png",
      "/images/my-orders-2.png",
      "/images/my-orders-3.png",
      "/images/my-orders-4.png",
    ],
    orderId: "#92287157",
    deliveryType: "Standard Delivery",
    status: "Delivered",
    noOfItems: 4,
  },

  {
    images: [
      "/images/my-orders-1.png",
      "/images/my-orders-2.png",
      "/images/my-orders-3.png",
      "/images/my-orders-4.png",
    ],
    orderId: "#92287157",
    deliveryType: "Standard Delivery",
    status: "Delivered",
    noOfItems: 4,
  },
];
const MyOrders = () => {
  return (
    <section className="flex w-full flex-col gap-6 rounded-[8px] bg-[rgba(9,102,178,0.1)] p-6">
      {ordersData.map((orderData, i) => {
        return (
          <div key={i} className="flex w-full items-center justify-between">
            <div className="grid aspect-square w-[100px] shrink-0 grid-cols-2 gap-1 rounded-xl bg-white p-1">
              {orderData.images.map((image, i) => (
                <img
                  className="w-full rounded-[8px]"
                  src={image}
                  key={i}
                  alt=""
                />
              ))}
            </div>

            <span className="text-sm font-semibold text-[#202020]">
              Order {orderData.orderId}
            </span>

            <span className="text-sm font-medium text-[#202020]">
              {orderData.deliveryType}
            </span>

            <span className="text-lg font-semibold text-[#202020]">
              {orderData.status}
            </span>

            <div className="flex flex-col items-center justify-between gap-1">
              <span className="rounded-[8px] bg-white p-1 text-center text-sm font-medium text-black">
                {orderData.noOfItems} items
              </span>
              {orderData.status === "Delivered" && (
                <button className="border-blue text-blue cursor-pointer rounded-xl border bg-transparent p-1 px-4 font-medium">
                  Review
                </button>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default MyOrders;
