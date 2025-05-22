import React, { useState, useEffect } from "react";
import { fetchUserProfile, updateUserProfile, updateUserEmail, verifyEmailOtp } from "../../lib/api";

const Profile = () => {
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    profile_picture: ''
  });
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadUserProfile();
  }, []);

  useEffect(() => {
    // Create preview URL for the selected image
    if (newProfilePicture) {
      const objectUrl = URL.createObjectURL(newProfilePicture);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [newProfilePicture]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewProfilePicture(e.target.files[0]);
    }
  };

  const loadUserProfile = async () => {
    try {
      const data = await fetchUserProfile();
      setUserData(data);
      setIsLoading(false);
    } catch (error) {
      setError('Failed to load profile');
      setIsLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (newEmail && newEmail !== userData.email) {
        await updateUserEmail(newEmail);
        setShowOtpInput(true);
        return;
      }

      const formData = new FormData();
      formData.append('first_name', String(userData.first_name || ''));
      formData.append('last_name', String(userData.last_name || ''));
      if (newProfilePicture) {
        formData.append('profile_picture', newProfilePicture);
      }

      await updateUserProfile(formData);
      setNewProfilePicture(null);
      setError('Profile updated successfully!');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await verifyEmailOtp(otp);
      setShowOtpInput(false);
      setUserData(prev => ({ ...prev, email: newEmail }));
      setNewEmail('');
      setOtp('');
      setError('Email updated successfully!');
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid OTP');
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="flex w-full flex-col items-center gap-10 rounded-[8px] bg-[rgba(9,102,178,0.1)] py-6">
      <div className="flex flex-col items-center gap-4">
        <h2 className="font-medium text-[#4C535F]">Your Profile Picture</h2>
        <div className="relative group">
          <img
            src={previewUrl || userData.profile_picture || "/images/pfp-placeholder.png"}
            alt="profile pic"
            className="w-[150px] h-[150px] rounded-full object-cover"
          />
          <label htmlFor="profile-picture" className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity">
            <span className="text-white text-sm">Change Photo</span>
          </label>
          <input
            type="file"
            id="profile-picture"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>

      <form onSubmit={handleSave} className="flex w-[90%] max-w-[400px] flex-col gap-4">
        {error && (
          <div className={`p-3 rounded-md ${error.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {error}
          </div>
        )}

        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full flex-col gap-1">
            <label className="font-medium text-[#4C535F]">Phone Number</label>
            <div className="flex w-full rounded-[8px] border border-[#E0E4EC] bg-[#EDF2F6] p-4">
              <span>+91 {userData.phone_number}</span>
            </div>
          </div>

          <div className="flex w-full flex-col gap-1">
            <label htmlFor="profile-firstname" className="font-medium text-[#4C535F]">
              First Name
            </label>
            <input
              type="text"
              id="profile-firstname"
              className="w-full rounded-[8px] border border-[#E0E4EC] bg-[#EDF2F6] p-4 outline-none"
              value={userData.first_name}
              onChange={(e) => {
                setUserData(prev => ({
                  ...prev,
                  first_name: e.target.value
                }));
              }}
              placeholder="Enter your first name"
            />
          </div>

          <div className="flex w-full flex-col gap-1">
            <label htmlFor="profile-lastname" className="font-medium text-[#4C535F]">
              Last Name
            </label>
            <input
              type="text"
              id="profile-lastname"
              className="w-full rounded-[8px] border border-[#E0E4EC] bg-[#EDF2F6] p-4 outline-none"
              value={userData.last_name}
              onChange={(e) => {
                setUserData(prev => ({
                  ...prev,
                  last_name: e.target.value
                }));
              }}
              placeholder="Enter your last name"
            />
          </div>

          <div className="flex w-full flex-col gap-1">
            <label htmlFor="profile-email" className="font-medium text-[#4C535F]">
              Email
            </label>
            <input
              type="email"
              id="profile-email"
              className="w-full rounded-[8px] border border-[#E0E4EC] bg-[#EDF2F6] p-4 outline-none"
              value={newEmail || userData.email}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter your Email"
            />
          </div>

          {showOtpInput && (
            <div className="flex w-full flex-col gap-1">
              <label htmlFor="otp" className="font-medium text-[#4C535F]">
                Enter OTP
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="otp"
                  className="w-full rounded-[8px] border border-[#E0E4EC] bg-[#EDF2F6] p-4 outline-none"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Verify
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-blue-500 py-3 text-white hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </section>
  );
};

export default Profile;
