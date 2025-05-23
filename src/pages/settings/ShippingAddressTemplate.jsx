import React, { useState } from "react";

const ShippingAddressTemplate = ({
  id,
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
          <p><strong>Address:</strong> {shippingAddressData.address}</p>
          <p><strong>City:</strong> {shippingAddressData.city}</p>
          <p><strong>State:</strong> {shippingAddressData.state}</p>
          <p><strong>Postal Code:</strong> {shippingAddressData.postCode}</p>
          <p><strong>Country:</strong> {shippingAddressData.country}</p>
          <p><strong>Phone:</strong> {shippingAddressData.phone}</p>
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