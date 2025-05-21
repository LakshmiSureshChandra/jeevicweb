import React, { useState } from "react";

const ecommerceOrders = [
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
const cafeOrders = [
  {
    orderId: "#CF123456",
    items: ["Cappuccino", "Croissant"],
    status: "Ready for pickup",
    total: "$8.50",
  },
];
const tableBookings = [
  {
    bookingId: "#TB789012",
    date: "2023-06-15",
    time: "19:00",
    guests: 4,
    status: "Confirmed",
  },
];

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState("ecommerce");

  const renderTabs = () => (
    <div className="flex space-x-4 mb-6">
      <button
        className={`px-4 py-2 rounded-lg ${activeTab === "ecommerce" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        onClick={() => setActiveTab("ecommerce")}
      >
        E-commerce Orders
      </button>
      <button
        className={`px-4 py-2 rounded-lg ${activeTab === "cafe" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        onClick={() => setActiveTab("cafe")}
      >
        Cafe Orders
      </button>
      <button
        className={`px-4 py-2 rounded-lg ${activeTab === "bookings" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        onClick={() => setActiveTab("bookings")}
      >
        Table Bookings
      </button>
    </div>
  );

  const renderEcommerceOrders = () => (
    <div className="space-y-4">
      {ecommerceOrders.map((order, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Order {order.orderId}</span>
            <span className="text-green-500">{order.status}</span>
          </div>
          <div className="mt-2">
            {/* Replace the line causing the error */}
            <p>{order.noOfItems} items</p>
            {/* Remove or comment out this line if there's no total property */}
            {/* <p className="font-bold mt-2">Total: {order.total}</p> */}
          </div>
        </div>
      ))}
    </div>
  );

  const renderCafeOrders = () => (
    <div className="space-y-4">
      {cafeOrders.map((order, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Order {order.orderId}</span>
            <span className="text-green-500">{order.status}</span>
          </div>
          <div className="mt-2">
            <p>{order.items.join(", ")}</p>
            <p className="font-bold mt-2">Total: {order.total}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTableBookings = () => (
    <div className="space-y-4">
      {tableBookings.map((booking, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Booking {booking.bookingId}</span>
            <span className="text-blue-500">{booking.status}</span>
          </div>
          <div className="mt-2">
            <p>Date: {booking.date} | Time: {booking.time}</p>
            <p>Guests: {booking.guests}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="w-full rounded-lg bg-gray-100 p-6">
      {renderTabs()}
      {activeTab === "ecommerce" && renderEcommerceOrders()}
      {activeTab === "cafe" && renderCafeOrders()}
      {activeTab === "bookings" && renderTableBookings()}
    </section>
  );
};

export default MyOrders;
