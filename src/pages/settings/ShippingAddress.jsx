import React, { useState } from "react";
import { use } from "react";
import {
  useCreateAddress,
  useDeleteAddress,
  useUpdateAddress,
} from "../../services/mutations/AddressMutations";
import { useGetAddresses } from "../../services/queries/AddressQueries";

const ShippingAddress = () => {
  const [shippingData, setShippingData] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const createAddressMutation = useCreateAddress();
  const updateAddressMutation = useUpdateAddress();
  const getAddressesQuery = useGetAddresses();
  const deleteAddressMutation = useDeleteAddress();

  const handleDelete = (id) => {
    setDeletingId(id);
    deleteAddressMutation.mutate(id, {
      onSuccess: () => {
        setDeletingId(null);
      },
      onError: () => {
        setDeletingId(null);
      },
    });
  };

  const handleUpdate = (id, updatedData) => {
    console.log(id);
    const isTemp = id.startsWith("temp-");

    const data = {
      phone_number: updatedData.phone,
      address_line_1: updatedData.address,
      address_line_2: updatedData.address,
      postcode: updatedData.postCode,
      country: updatedData.country,
    };

    if (isTemp) {
      createAddressMutation.mutate(data, {
        onSuccess: (response) => {
          setShippingData((prev) => prev.filter((item) => item.id !== id));
        },
      });
    } else {
      updateAddressMutation.mutate({ id, data: data });
    }

    setEditingId(null);
  };

  const handleAdd = () => {
    const id = "temp-" + crypto.randomUUID();
    setShippingData((prev) => [
      ...prev,
      { id, address: "", phone: "", country: "", postCode: "" },
    ]);
    setEditingId(id);
  };

  const handleEdit = (id) => {
    setEditingId(id === editingId ? null : id);
  };

  return (
    <section className="flex w-full flex-col gap-4 rounded-[8px] bg-[rgba(9,102,178,0.1)] p-6">
      {getAddressesQuery.isPending && "loading..."}
      {getAddressesQuery.isError && "Failed To Fetch Data"}
      {getAddressesQuery.isSuccess &&
        getAddressesQuery.data.data.map((shipping) => (
          <ShippingAddressTemplate
            key={shipping.id}
            id={shipping.id}
            address={shipping.address_line_1}
            phone={shipping.phone_number}
            country={shipping.country}
            postCode={shipping.postcode}
            isEditing={editingId === shipping.id}
            onToggleEdit={() => handleEdit(shipping.id)}
            deletingId={deletingId}
            onDelete={() => handleDelete(shipping.id)}
            onUpdate={(updatedData) => handleUpdate(shipping.id, updatedData)}
          />
        ))}
      {shippingData.map((shipping) => (
        <ShippingAddressTemplate
          key={shipping.id}
          {...shipping}
          isEditing={editingId === shipping.id}
          onToggleEdit={() => handleEdit(shipping.id)}
          onDelete={() => handleDelete(shipping.id)}
          onUpdate={(updatedData) => handleUpdate(shipping.id, updatedData)}
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

const ShippingAddressTemplate = ({
  address,
  id,
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

        <div className="flex gap-2">
          <h2 className="px-1 font-semibold">Country:</h2>
          {isEditing ? (
            <input
              placeholder="Enter your country"
              type="text"
              name="country"
              value={shippingAddressData.country}
              className="px-1 outline placeholder:text-sm"
              onChange={handleChange}
            />
          ) : (
            <p className="px-1">{shippingAddressData.country}</p>
          )}
        </div>

        <div className="flex gap-2">
          <h2 className="px-1 font-semibold">Post Code:</h2>
          {isEditing ? (
            <input
              type="text"
              placeholder="Enter your post code"
              name="postCode"
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
            done
          </button>
        ) : (
          <>
            <button
              className="w-[250px] cursor-pointer rounded-full border border-black bg-transparent py-1 text-center text-lg"
              onClick={onToggleEdit}
            >
              edit
            </button>
            <button
              className="w-[250px] cursor-pointer rounded-full border border-[#F81140] bg-transparent py-1 text-center text-lg text-[#F81140]"
              onClick={onDelete}
              disabled={deletingId === id}
            >
              {deletingId === id ? "deleting..." : "delete"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};
