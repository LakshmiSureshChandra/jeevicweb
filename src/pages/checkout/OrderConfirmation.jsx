import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAddresses } from '../../lib/api';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [orderData, setOrderData] = useState(() => {
    if (!location.state?.orderData) {
      navigate('/');
      return null;
    }

    if (!Array.isArray(location.state.orderData.products)) {
      return {
        ...location.state.orderData,
        products: [location.state.orderData.products]
      };
    }

    return location.state.orderData;
  });

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const SHIPPING_FEE = 49;
  const GST_RATE = 0.18;

  // Fetch addresses when component mounts
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setIsLoading(true);
        const addressData = await getAddresses();
        setAddresses(addressData || []);
        // Set first address as default if available
        if (addressData && addressData.length > 0) {
          setSelectedAddress(addressData[0]);
        }
      } catch (err) {
        setError('Failed to load addresses');
        console.error('Error fetching addresses:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const handleAddressSelect = (e) => {
    const addressId = e.target.value;
    const selected = addresses.find(addr => addr.id === addressId);
    setSelectedAddress(selected);
  };

  const calculateTotals = () => {
    if (!orderData?.products) return { subtotal: 0, gst: 0, total: 0 };
    
    const subtotal = orderData.products.reduce((sum, item) => {
      const price = Number(item?.price) || 0;
      const quantity = Number(item?.quantity) || 1;
      return sum + (price * quantity);
    }, 0);
    
    const gst = subtotal * GST_RATE;
    const total = subtotal + gst + SHIPPING_FEE;
    
    return { subtotal, gst, total };
  };

  const { subtotal, gst, total } = calculateTotals();

  const handlePayment = () => {
    if (!selectedAddress) {
      alert('Please select a shipping address');
      return;
    }

    const orderDetails = {
      shippingAddress: selectedAddress,
      orderItems: orderData.products,
      paymentMethod,
      totals: { subtotal, gst, shippingFee: SHIPPING_FEE, total }
    };

    if (paymentMethod === 'cod') {
      navigate('/checkout/success', { state: { orderDetails } });
    } else {
      console.log('Initiating online payment');
    }
  };

  if (isLoading) {
    return <div className="container mx-auto p-4">Loading addresses...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Order Confirmation</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Order Summary */}
        <div className="space-y-6">
          <div className="bg-white shadow-md rounded p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {orderData && orderData.products.map((product, index) => (
  <div key={index} className="flex items-center gap-4 border-b pb-4 mb-4 last:border-b-0 last:mb-0">
    <img 
      src={product.image || '/images/placeholder.jpg'} // Add fallback image
      alt={product.name}
      className="w-20 h-20 object-cover rounded"
      onError={(e) => {
        e.target.src = '/images/placeholder.jpg'; // Fallback on error
      }}
    />
    <div className="flex-grow">
      <h3 className="font-medium">{product.name}</h3>
      {product.selectedSize && (
        <p className="text-gray-600">Size: {product.selectedSize}</p>
      )}
      {product.selectedColor && (
        <p className="text-gray-600">Color: {product.selectedColor}</p>
      )}
      <p className="text-gray-600">Quantity: {product.quantity}</p>
      <p className="font-semibold">₹{(product.price * product.quantity).toFixed(2)}</p>
    </div>
  </div>
))}
          </div>

          <div className="bg-white shadow-md rounded p-6">
            <h2 className="text-xl font-semibold mb-4">Price Details</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST (18%)</span>
                <span>₹{gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping Fee</span>
                <span>₹{SHIPPING_FEE.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t font-semibold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

          <div className="bg-white shadow-md rounded p-6">
            <h2 className="text-xl font-semibold mb-4">Select Shipping Address</h2>
            {addresses.length > 0 ? (
              <div className="space-y-4">
                {addresses.map((address) => (
                  <label key={address.id} className="block">
                    <input
                      type="radio"
                      name="address"
                      value={address.id}
                      checked={selectedAddress?.id === address.id}
                      onChange={handleAddressSelect}
                      className="mr-2"
                    />
                    <span className="ml-2">
                      {address.name}<br />
                      {address.address_line_1}<br />
                      {address.city}, {address.state}<br />
                      {address.country}, {address.postcode}<br />
                      {address.phone_number}
                    </span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-red-500 mb-4">No shipping addresses found</p>
                <button
                  onClick={() => navigate('/settings/shipping-address')}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add New Address
                </button>
              </div>
            )}
          </div>

          <button
            onClick={handlePayment}
            disabled={!selectedAddress}
            className={`w-full py-3 rounded-lg transition-colors ${
              selectedAddress 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            proceed to payment
          </button>
        </div>
      </div>
  );
};

export default OrderConfirmation;