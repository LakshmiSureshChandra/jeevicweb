import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// Import necessary components and functions

const SignIn = () => {
  const [signInMethod, setSignInMethod] = useState('email');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleVerifyOtp = () => {
    // Simulate JWT token verification
    const fakeJwtToken = 'fake_jwt_token';
    localStorage.setItem('jwtToken', fakeJwtToken);

    // Check the origin of the sign-in request
    const from = location.state?.from || '/';
    
    // Navigate to the appropriate page
    navigate(from === '/cafe' ? '/cafe' : '/', { replace: true });
  };

  const handleGoogleSignIn = () => {
    // Implement Google Sign-In logic
    console.log('Google Sign-In');
  };

  const handleSendOtp = () => {
    // Implement OTP sending logic
    console.log('Send OTP to', emailOrPhone);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-center mb-6">
          <img src="/jeeviclogo.png" alt="Jeevic Logo" className="h-12" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign In</h2>

        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-md mb-4 hover:bg-gray-50 transition-colors flex items-center justify-center"
        >
          <img src="/google-icon.png" alt="Google" className="h-5 mr-2" />
          Sign in with Google
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex mb-4">
          <button
            onClick={() => setSignInMethod('email')}
            className={`w-1/2 py-2 text-sm font-medium rounded-l-md ${signInMethod === 'email' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Email
          </button>
          <button
            onClick={() => setSignInMethod('phone')}
            className={`w-1/2 py-2 text-sm font-medium rounded-r-md ${signInMethod === 'phone' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Phone
          </button>
        </div>

        <input
          type={signInMethod === 'email' ? 'email' : 'tel'}
          placeholder={signInMethod === 'email' ? 'Enter your email' : 'Enter your phone number'}
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSendOtp}
          className="w-full bg-blue-500 text-white py-2 rounded-md mb-4 hover:bg-blue-600 transition-colors"
        >
          Send OTP
        </button>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleVerifyOtp}
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default SignIn;