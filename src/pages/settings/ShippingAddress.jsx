import React, { useState } from "react";
import ShippingAddressTemplate from "./ShippingAddressTemplate";

const ShippingAddress = () => {
  // Mock data
  const initialAddresses = [
    {
      id: "1",
      address_line_1: "123 Main St",
      phone_number: "123-456-7890",
      country: "USA",
      postcode: "12345",
    },
    {
      id: "2",
      address_line_1: "456 Elm St",
      phone_number: "098-765-4321",
      country: "Canada",
      postcode: "67890",
    },
  ];

  const [addresses, setAddresses] = useState(initialAddresses);
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const handleDelete = (id) => {
    setDeletingId(id);
    setAddresses((prev) => prev.filter((address) => address.id !== id));
    setDeletingId(null);
  };

  const handleUpdate = (id, updatedData) => {
    const isTemp = id.startsWith("temp-");
    const data = {
      phone_number: updatedData.phone,
      address_line_1: updatedData.address,
      postcode: updatedData.postCode,
      country: updatedData.country,
    };

    if (isTemp) {
      const newAddress = { ...data, id: crypto.randomUUID() };
      setAddresses((prev) => [...prev.filter((item) => item.id !== id), newAddress]);
    } else {
      setAddresses((prev) =>
        prev.map((address) => (address.id === id ? { ...address, ...data } : address))
      );
    }
    setEditingId(null);
  };

  const handleAdd = () => {
    const newAddress = {
      id: "temp-" + crypto.randomUUID(),
      address_line_1: "",
      phone_number: "",
      country: "",
      postcode: "",
    };
    setAddresses((prev) => [...prev, newAddress]);
    setEditingId(newAddress.id);
  };

  const handleEdit = (id) => {
    setEditingId(id === editingId ? null : id);
  };

  return (
    <section className="flex w-full flex-col gap-4 rounded-[8px] bg-[rgba(9,102,178,0.1)] p-6">
      {addresses.map((address) => (
        <ShippingAddressTemplate
          key={address.id}
          id={address.id}
          address={address.address_line_1}
          phone={address.phone_number}
          country={address.country}
          postCode={address.postcode}
          isEditing={editingId === address.id}
          onToggleEdit={() => handleEdit(address.id)}
          deletingId={deletingId}
          onDelete={() => handleDelete(address.id)}
          onUpdate={(updatedData) => handleUpdate(address.id, updatedData)}
        />
      ))}
      <button
        className="flex w-full cursor-pointer justify-center rounded-[8px] bg-white py-6 text-[rgba(0,0,0,0.5)]"
        onClick={handleAdd}
      >
        +Add New
      </button>
    </section>
  );
};

export default ShippingAddress;
