import React, { useState } from "react";
import cartData from "../../data/cartData";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const ViewCart = () => {
  const [cart, setCart] = useState(cartData);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [usedPoints, setUsedPoints] = useState(0);

  // Assume these values come from an API or user context
  const availableCoupons = [
    { code: 'SUMMER10', discount: 10 },
    { code: 'NEWUSER20', discount: 20 },
  ];
  const userPoints = 500; // Assume 1 point = $0.01

  const updateQuantity = (id, change) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const applyCoupon = (coupon) => {
    setAppliedCoupon(coupon);
  };

  const applyPoints = (points) => {
    setUsedPoints(Math.min(points, userPoints, total * 100)); // Limit points usage
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountedTotal = appliedCoupon 
    ? total * (1 - appliedCoupon.discount / 100) 
    : total;
  const finalTotal = Math.max(0, discountedTotal - usedPoints / 100);

  const navigate = useNavigate();

  const handleProceedToPayment = () => {
    navigate('/checkout/confirmation');
  };

  const [manualCoupon, setManualCoupon] = useState('');

  // Add this new function
  const handleManualCoupon = () => {
    const coupon = availableCoupons.find(c => c.code === manualCoupon);
    if (coupon) {
      applyCoupon(coupon);
      setManualCoupon('');
    } else {
      // You might want to show an error message here
      console.log('Invalid coupon code');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          {cart.length > 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-xl text-gray-600">Your cart is empty</p>
              <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
                Continue Shopping
              </Link>
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            {appliedCoupon && (
              <div className="flex justify-between mb-2 text-green-600">
                <span>Coupon Discount</span>
                <span>-${(total * appliedCoupon.discount / 100).toFixed(2)}</span>
              </div>
            )}
            {usedPoints > 0 && (
              <div className="flex justify-between mb-2 text-green-600">
                <span>Points Applied</span>
                <span>-${(usedPoints / 100).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className="border-t border-gray-200 my-4"></div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={handleProceedToPayment}
              className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700 transition-colors"
              disabled={cart.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Available Coupons</h3>
            {availableCoupons.map((coupon) => (
              <div key={coupon.code} className="flex justify-between items-center mb-2">
                <span>{coupon.code} - {coupon.discount}% off</span>
                <button 
                  onClick={() => applyCoupon(coupon)}
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm hover:bg-blue-200"
                >
                  Apply
                </button>
              </div>
            ))}
            <div className="mt-4">
              <h4 className="text-md font-semibold mb-2">Enter Coupon Code</h4>
              <div className="flex">
                <input
                  type="text"
                  value={manualCoupon}
                  onChange={(e) => setManualCoupon(e.target.value)}
                  className="flex-grow border border-gray-300 rounded-l-lg p-2"
                  placeholder="Enter coupon code"
                />
                <button
                  onClick={handleManualCoupon}
                  className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Use Jeevic Points</h3>
            <p className="mb-2">Available Points: {userPoints}</p>
            <div className="flex items-center">
              <input 
                type="number" 
                max={userPoints}
                value={usedPoints}
                onChange={(e) => applyPoints(Number(e.target.value))}
                className="flex-grow border border-gray-300 rounded-l-lg p-2"
              />
              <button 
                onClick={() => applyPoints(userPoints)}
                className="bg-green-500 text-white px-4 py-2 rounded-r-lg hover:bg-green-600 transition-colors"
              >
                Apply Max
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartItem = ({ item, updateQuantity, removeItem }) => (
  <div className="flex items-center border-b border-gray-200 py-4 last:border-b-0">
    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
    <div className="ml-4 flex-grow">
      <h3 className="font-semibold text-gray-800">{item.name}</h3>
      <p className="text-sm text-gray-500">{item.description}</p>
      <div className="flex items-center mt-2">
        <button
          onClick={() => updateQuantity(item.id, -1)}
          className="text-gray-500 hover:text-gray-700 px-2 py-1 border rounded"
        >
          -
        </button>
        <span className="mx-2">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, 1)}
          className="text-gray-500 hover:text-gray-700 px-2 py-1 border rounded"
        >
          +
        </button>
      </div>
    </div>
    <div className="text-right">
      <p className="font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
      <button
        onClick={() => removeItem(item.id)}
        className="text-red-500 hover:text-red-700 mt-2"
      >
        Remove
      </button>
    </div>
  </div>
);

export default ViewCart;

const Voucher = () => {
  return (
    <div className="shrink-0">
      <div
        style={{ backgroundImage: "url('/images/voucher-bg.png')" }}
        className="flex h-[120px] flex-col gap-2 bg-contain bg-no-repeat px-6 pt-2"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-blue text-lg font-semibold">Voucher</h2>
          <p className="rounded bg-[#FE770240] p-1 text-[12px] font-medium">
            Valid Until 5.16.20
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1">
              <img src="/images/shopping-bag.svg" alt="" role="presentation" />
              <h3 className="text-lg font-semibold text-[#202020]">
                First Purchase
              </h3>
            </div>
            <p className="hidden text-sm font-medium text-black sm:block">
              5% off for your next order
            </p>
          </div>
          <button className="bg-blue cursor-pointer rounded-[8px] px-2 py-1 text-sm text-white">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductDisplay = ({ name, image, quantity, price, color }) => {
  const [productQuantity, setProductQuantity] = useState(quantity);
  return (
    <div className="flex items-center justify-between">
      <div className="flex w-[180px] gap-2 sm:w-[200px] sm:gap-4">
        <img
          src={image}
          className="h-[70px] w-auto rounded-[12px] object-cover sm:h-[90px]"
          alt="cart product"
        />
        <div className="gap-0.5s flex flex-col justify-center">
          <h3 className="text-dark text-sm font-medium sm:font-semibold md:text-base">
            {name}
          </h3>
          <div className="hidden items-center gap-2 sm:flex">
            <h4 className="text-sm text-[#555]">Color:</h4>
            <div
              className="aspect-square w-5 rounded-full"
              style={{ backgroundColor: color }}
            ></div>
          </div>
        </div>
      </div>

      <span className="font-lato hidden text-sm text-[#555] sm:block md:w-[100px] md:text-base">
        ${price}
      </span>

      <div className="flex items-center gap-2 rounded bg-transparent px-2 py-1 text-[#C4C4C4] sm:border sm:border-[#C4C4C4] md:gap-4 md:px-4 md:py-2">
        <button
          className="cursor-pointer disabled:opacity-50"
          onClick={() =>
            setProductQuantity(productQuantity === 1 ? 1 : productQuantity - 1)
          }
          disabled={productQuantity === 1}
        >
          <MinusSignIcon />
        </button>
        <span className="font-lato text-dark text-sm font-bold md:text-lg">
          {productQuantity}
        </span>
        <button
          className="cursor-pointer"
          onClick={() => setProductQuantity(productQuantity + 1)}
        >
          <PlusSignIcon />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center gap-1 md:justify-start xl:flex-row">
        <span className="font-lato w-[100px] text-center text-sm text-[#555] md:text-base">
          ${(price * productQuantity).toFixed(2)}
        </span>

        <button className="cursor-pointer">
          <Delete02Icon />
        </button>
      </div>
    </div>
  );
};
