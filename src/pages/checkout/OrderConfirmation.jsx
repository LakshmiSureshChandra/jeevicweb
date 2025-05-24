import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAddresses } from "../../lib/api";
import { createOrder } from "../../lib/api";
import { useRazorpay } from "react-razorpay";
const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const [orderData, setOrderData] = useState(() => {
    if (!location.state?.orderData) {
      navigate("/");
      return null;
    }

    if (!Array.isArray(location.state.orderData.products)) {
      return {
        ...location.state.orderData,
        products: [location.state.orderData.products],
      };
    }

    return location.state.orderData;
  });

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const SHIPPING_FEE = 0;
  const GST_RATE = 0.18;
  const {
    error: razorpayError,
    isLoading: razorpayLoading,
    Razorpay,
  } = useRazorpay();
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
        setError("Failed to load addresses");
        console.error("Error fetching addresses:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const handleAddressSelect = (e) => {
    const addressId = e.target.value;
    const selected = addresses.find((addr) => addr.id === addressId);
    setSelectedAddress(selected);
  };

  const calculateTotals = () => {
    if (!orderData?.products) return { subtotal: 0, gst: 0, total: 0 };

    const subtotal = orderData.products.reduce((sum, item) => {
      const price = Number(item?.price) || 0;
      const quantity = Number(item?.quantity) || 1;
      return sum + price * quantity;
    }, 0);

    const gst = subtotal * GST_RATE;
    const total = subtotal + gst + SHIPPING_FEE;

    return { subtotal, gst, total };
  };

  const { subtotal, gst, total } = calculateTotals();

  const handlePayment = async () => {
    if (!selectedAddress) {
      alert("Please select a shipping address");
      return;
    }

    try {
      setIsProcessing(true);

      // Create order
      const orderResponse = await createOrder({
        address_id: selectedAddress.id,
      });

      if (orderResponse.error) {
        throw new Error(orderResponse.error);
      }
      console.log(import.meta.env.VITE_RAZORPAY_KEY);
      // Initialize Razorpay payment
      console.log(selectedAddress, orderResponse);
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: orderResponse.razorpay.amount,
        currency: orderResponse.razorpay.currency,
        name: "Jeevic Store",
        description: "Order Payment",
        order_id: orderResponse.razorpay.order_id,
        prefill: {
          name: selectedAddress.name,
          email: selectedAddress.email,
          contact: selectedAddress.phone_number,
        },
        handler: async function (response) {
          // Payment successful
          if (response.razorpay_payment_id) {
            navigate("/profile", {
              state: {
                orderDetails: {
                  ...orderResponse,
                  payment_id: response.razorpay_payment_id,
                  shippingAddress: selectedAddress,
                  orderItems: orderData.products,
                  totals: { subtotal, gst, shippingFee: SHIPPING_FEE, total },
                },
              },
            });
          }
        },
        theme: {
          color: "#3399cc",
        },
      };
      console.log(options);

      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  };

  if (isLoading) {
    return <div className="container mx-auto p-4">Loading addresses...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <h1 className="mb-6 text-2xl font-bold">Order Confirmation</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Left Column - Order Summary */}
        <div className="space-y-6">
          <div className="rounded bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
            {orderData &&
              orderData.products.map((product, index) => (
                <div
                  key={index}
                  className="mb-4 flex items-center gap-4 border-b pb-4 last:mb-0 last:border-b-0"
                >
                  <img
                    src={product.image || "/images/placeholder.jpg"}
                    alt={product.name}
                    className="h-20 w-20 rounded object-cover"
                    onError={(e) => {
                      e.target.src = "/images/placeholder.jpg";
                    }}
                  />
                  <div className="flex-grow">
                    <h3 className="font-medium">{product.name}</h3>
                    {product.items && (
                      <div className="mt-2 space-y-1">
                        <p className="text-sm font-medium text-gray-700">
                          Gift Box Contents:
                        </p>
                        {product.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-sm text-gray-600"
                          >
                            <span>{item.name}</span>
                            <span>₹{item.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-gray-600">
                      Quantity: {product.quantity}
                    </p>
                    <p className="font-semibold">
                      ₹{(product.price * product.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          <div className="rounded bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Price Details</h2>
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
              <div className="flex justify-between border-t pt-2 font-semibold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">
            Select Shipping Address
          </h2>
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
                    {address.name}
                    <br />
                    <span className="text-gray-600">{address.email}</span>
                    <br />
                    {address.address_line_1}
                    <br />
                    {address.city}, {address.state}
                    <br />
                    {address.country}, {address.postcode}
                    <br />
                    {address.phone_number}
                  </span>
                </label>
              ))}
            </div>
          ) : (
            <div className="py-4 text-center">
              <p className="mb-4 text-red-500">No shipping addresses found</p>
              <button
                onClick={() => navigate("/settings/shipping-address")}
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Add New Address
              </button>
            </div>
          )}
        </div>

        <button
          onClick={handlePayment}
          disabled={isProcessing || !selectedAddress}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded border border-[#434343] bg-transparent py-3 transition-colors hover:bg-gray-100 md:py-4"
        >
          {isProcessing ? (
            "Processing..."
          ) : (
            <>
              <span>Proceed to Payment</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
