import React, { useState } from "react";

const ShippingAddressTemplate = ({
  id,
  address,
  phone,
  country,
  postCode,
  onDelete,
  onUpdate,
  isEditing,
  onToggleEdit,
  deletingId,
}) => {
  const [shippingAddressData, setShippingAddressData] = useState({
    address,
    phone,
    country,
    postCode,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddressData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col justify-center gap-4 rounded-[8px] bg-white px-12 py-6">
      <div className="flex flex-col gap-2">
        {/* Address field */}
        <div className="flex flex-col">
          <h2 className="px-1 font-semibold">Address:</h2>
          {isEditing ? (
            <textarea
              name="address"
              placeholder="Enter your address"
              value={shippingAddressData.address}
              className="field-sizing-content resize-none px-1 outline placeholder:text-sm"
              onChange={handleChange}
            />
          ) : (
            <p className="px-1">{shippingAddressData.address}</p>
          )}
        </div>

        {/* Phone field */}
        <div className="flex gap-2">
          <h2 className="px-1 font-semibold">Phone:</h2>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={shippingAddressData.phone}
              className="px-1 outline placeholder:text-sm"
              onChange={handleChange}
            />
          ) : (
            <p className="px-1">{shippingAddressData.phone}</p>
          )}
        </div>

        {/* Country field */}
        <div className="flex gap-2">
          <h2 className="px-1 font-semibold">Country:</h2>
          {isEditing ? (
            <input
              type="text"
              name="country"
              placeholder="Enter your country"
              value={shippingAddressData.country}
              className="px-1 outline placeholder:text-sm"
              onChange={handleChange}
            />
          ) : (
            <p className="px-1">{shippingAddressData.country}</p>
          )}
        </div>

        {/* Post Code field */}
        <div className="flex gap-2">
          <h2 className="px-1 font-semibold">Post Code:</h2>
          {isEditing ? (
            <input
              type="text"
              name="postCode"
              placeholder="Enter your post code"
              value={shippingAddressData.postCode}
              className="px-1 outline placeholder:text-sm"
              onChange={handleChange}
            />
          ) : (
            <p className="px-1">{shippingAddressData.postCode}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        {isEditing ? (
          <button
            className="border-blue text-blue w-[250px] cursor-pointer rounded-full border bg-transparent py-1 text-center text-lg"
            onClick={() => {
              onToggleEdit();
              onUpdate(shippingAddressData);
            }}
          >
            Save
          </button>
        ) : (
          <>
            <button
              className="w-[250px] cursor-pointer rounded-full border border-black bg-transparent py-1 text-center text-lg"
              onClick={onToggleEdit}
            >
              Edit
            </button>
            <button
              className="w-[250px] cursor-pointer rounded-full border border-[#F81140] bg-transparent py-1 text-center text-lg text-[#F81140]"
              onClick={onDelete}
              disabled={deletingId === id}
            >
              {deletingId === id ? "Deleting..." : "Delete"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ShippingAddressTemplate;