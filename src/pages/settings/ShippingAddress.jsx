import React, { useState, useEffect } from "react";
import ShippingAddressTemplate from "./ShippingAddressTemplate";
import { getAddresses, addAddress, updateAddress, deleteAddress } from "../../lib/api";

const ShippingAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await getAddresses();
      // Check if response.data exists and use it, otherwise use response
      const addressData = response?.data || response || [];
      setAddresses(Array.isArray(addressData) ? addressData : []);
    } catch (err) {
      setError("Failed to fetch addresses");
      setAddresses([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    // Add confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this address?");
    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      await deleteAddress(id);
      setAddresses((prev) => prev.filter((address) => address.id !== id));
    } catch (err) {
      setError("Failed to delete address");
    } finally {
      setDeletingId(null);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    const data = {
      phone_number: updatedData.phone,
      address_line_1: updatedData.address,
      postcode: updatedData.postCode,
      country: updatedData.country,
      state: updatedData.state, // Add state field
      city: updatedData.city, // Add city field
    };

    try {
      if (id.startsWith("temp-")) {
        const response = await addAddress(data);
        const newAddress = response?.data || response;
        setAddresses((prev) => [...prev.filter((item) => item.id !== id), newAddress]);
      } else {
        const response = await updateAddress(id, data);
        const updatedAddress = response?.data || response;
        setAddresses((prev) =>
          prev.map((address) => (address.id === id ? updatedAddress : address))
        );
      }
      setEditingId(null);
      // Fetch updated addresses after successful update
      await fetchAddresses();
    } catch (err) {
      setError("Failed to update address");
    }
  };

  const handleAdd = () => {
    const newAddress = {
      id: `temp-${crypto.randomUUID()}`,
      address_line_1: "",
      phone_number: "",
      country: "",
      postcode: "",
      state: "",
      city: "",
    };
    setAddresses((prev) => [...prev, newAddress]);
    setEditingId(newAddress.id);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex flex-col gap-6">
      {Array.isArray(addresses) && addresses.map((address) => (
        address && address.id ? (
          <ShippingAddressTemplate
            key={address.id}
            id={address.id}
            address={address.address_line_1}
            phone={address.phone_number}
            country={address.country}
            postCode={address.postcode}
            state={address.state}
            city={address.city}
            onDelete={() => handleDelete(address.id)}
            onUpdate={(data) => handleUpdate(address.id, data)}
            isEditing={editingId === address.id}
            onToggleEdit={() => setEditingId(editingId === address.id ? null : address.id)}
            deletingId={deletingId}
          />
        ) : null
      ))}
      <button
        onClick={handleAdd}
        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Add New Address
      </button>
    </div>
  );
};

export default ShippingAddress;
