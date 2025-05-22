import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginRequest, verifyAccountAccess, fetchUserProfile, updateUserProfile } from '../../lib/api';

const SignIn = () => {
  const [signInMethod, setSignInMethod] = useState('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleSendOtp = async () => {
    setError('');
    setLoading(true);
    try {
      if (signInMethod === 'phone') {
        await loginRequest('+91', phoneNumber);
      } else {
        await loginRequest(null, null, email);
      }
      setOtpSent(true);
      setResendTimer(30);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send OTP. Please try again.');
    }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    setError('');
    setLoading(true);
    try {
      const response = await verifyAccountAccess(
        signInMethod === 'phone' ? '+91' : null,
        signInMethod === 'phone' ? phoneNumber : null,
        otp// Include the user-entered OTP
      );
      if (response.access_token) {
        localStorage.setItem('access_token', response.access_token);
        await checkAndUpdateUserProfile();
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid OTP. Please try again.');
    }
    setLoading(false);
  };

  const checkAndUpdateUserProfile = async () => {
    try {
      const userProfile = await fetchUserProfile();
      if (!userProfile.first_name || !userProfile.last_name || !userProfile.email) {
        setShowProfileForm(true);
      } else {
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // Handle error
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      await updateUserProfile(formData);
      navigate('/', { replace: true });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-center mb-6">
          <img src="/jeeviclogo.png" alt="Jeevic Logo" className="h-12" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign In</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="flex mb-4">
          <button
            onClick={() => setSignInMethod('phone')}
            className={`w-1/2 py-2 text-sm font-medium rounded-l-md ${signInMethod === 'phone' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Phone
          </button>
          <button
            onClick={() => setSignInMethod('email')}
            className={`w-1/2 py-2 text-sm font-medium rounded-r-md ${signInMethod === 'email' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Email
          </button>
        </div>

        {signInMethod === 'phone' ? (
          <div className="mb-4">
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ) : (
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        <button
          onClick={handleSendOtp}
          disabled={loading || resendTimer > 0}
          className={`w-full bg-blue-500 text-white py-2 rounded-md mb-4 hover:bg-blue-600 transition-colors ${(loading || resendTimer > 0) && 'opacity-50 cursor-not-allowed'}`}
        >
          {loading ? 'Sending...' : resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Send OTP'}
        </button>

        {otpSent && (
          <>
            <input
              type="number"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className={`w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors ${loading && 'opacity-50 cursor-not-allowed'}`}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </>
        )}
        {showProfileForm && (
    <form onSubmit={handleProfileSubmit} className="mt-4">
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors ${loading && 'opacity-50 cursor-not-allowed'}`}
      >
        {loading ? 'Updating...' : 'Update Profile'}
      </button>
    </form>
  )}
      </div>
    </div>
  );
};

export default SignIn;