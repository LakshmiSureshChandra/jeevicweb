import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const [orderData, setOrderData] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: ''
  });
  const navigate = useNavigate();

  const handlePayment = () => {
    // Trigger payment gateway here
    console.log('Payment initiated');
    // After successful payment, navigate to a success page
    // navigate('/checkout/success');
  };

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  useEffect(() => {
    // Fetch user's addresses from backend
    // This is a placeholder, replace with actual API call
    const fetchAddresses = async () => {
      // const response = await fetch('/api/user/addresses');
      // const data = await response.json();
      // setAddresses(data);
    };
    fetchAddresses();
  }, []);

  const handleAddressSelect = (e) => {
    const addressId = e.target.value;
    setSelectedAddress(addressId === 'new' ? null : addressId);
  };

  const handleNewAddressChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>
      
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        {/* Display order items and total here */}
      </div>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="John Doe"
              value={userInfo.name}
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="john@example.com"
              value={userInfo.email || ''}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
              Select Address
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              value={selectedAddress || 'new'}
              onChange={handleAddressSelect}
            >
              <option value="new">Enter a new address</option>
              {addresses.map((address) => (
                <option key={address.id} value={address.id}>
                  {address.street}, {address.city}, {address.state} {address.zipCode}
                </option>
              ))}
            </select>
          </div>
          {!selectedAddress && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="street">
                  Street Address
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="street"
                  name="street"
                  type="text"
                  placeholder="1234 Main St"
                  value={newAddress.street}
                  onChange={handleNewAddressChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                  City
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="city"
                  name="city"
                  type="text"
                  placeholder="City"
                  value={newAddress.city}
                  onChange={handleNewAddressChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
                  State
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="state"
                  name="state"
                  type="text"
                  placeholder="State"
                  value={newAddress.state}
                  onChange={handleNewAddressChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zipCode">
                  Zip Code
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  placeholder="Zip Code"
                  value={newAddress.zipCode}
                  onChange={handleNewAddressChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                  Country
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="country"
                  name="country"
                  type="text"
                  placeholder="Country"
                  value={newAddress.country}
                  onChange={handleNewAddressChange}
                />
              </div>
            </>
          )}
        </form>
      </div>

      <button
        onClick={handlePayment}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Click to Pay
      </button>
    </div>
  );
};

export default OrderConfirmation;