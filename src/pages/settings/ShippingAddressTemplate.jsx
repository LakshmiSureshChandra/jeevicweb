import React, { useState } from "react";

const ShippingAddressTemplate = ({
  id,
  name,
  email,
  address,
  phone,
  country,
  postCode,
  state,
  city,
  onDelete,
  onUpdate,
  isEditing,
  onToggleEdit,
  deletingId,
}) => {
  const [shippingAddressData, setShippingAddressData] = useState({
    name,
    email,
    address,
    phone,
    country,
    postCode,
    state,
    city,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddressData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdate(shippingAddressData);
    onToggleEdit();
  };

  return (
    <div className="flex flex-col justify-center gap-4 rounded-[8px] bg-white px-6 py-4 shadow-md">
      {isEditing ? (
        <>
          <div className="grid grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Full Name"
              value={shippingAddressData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={shippingAddressData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <input
            name="address"
            placeholder="Address"
            value={shippingAddressData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          <div className="flex gap-2">
            <input
              name="city"
              placeholder="City"
              value={shippingAddressData.city}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border rounded-md"
            />
            <input
              name="state"
              placeholder="State"
              value={shippingAddressData.state}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex gap-2">
            <input
              name="postCode"
              placeholder="Postal Code"
              value={shippingAddressData.postCode}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border rounded-md"
            />
            <input
              name="country"
              placeholder="Country"
              value={shippingAddressData.country}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border rounded-md"
            />
          </div>
          <input
            name="phone"
            placeholder="Phone Number"
            value={shippingAddressData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <p className="font-medium">{name}</p>
            <p className="text-gray-600">{email}</p>
            <p className="text-gray-600">{address}</p>
            <p className="text-gray-600">{city}, {state}</p>
            <p className="text-gray-600">{country}, {postCode}</p>
            <p className="text-gray-600">{phone}</p>
          </div>
        </>
      )}
      <div className="flex justify-end gap-2 mt-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={onToggleEdit}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onToggleEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(id)}
              disabled={deletingId === id}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-red-300"
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