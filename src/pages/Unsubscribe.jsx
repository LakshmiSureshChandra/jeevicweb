import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deletePromotionalMail } from '../lib/api';

const Unsubscribe = () => {
  const [unsubscribeEmail, setUnsubscribeEmail] = useState('');
  const navigate = useNavigate();

  const handleUnsubscribe = async () => {
    if (!unsubscribeEmail) {
      alert("Please enter an email.");
      return;
    }

    try {
      await deletePromotionalMail(unsubscribeEmail);
      alert("Unsubscribed successfully!");
      setUnsubscribeEmail('');
      navigate('/');
    } catch (error) {
      console.error('Error unsubscribing:', error);
      alert("Failed to unsubscribe. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Unsubscribe from Newsletter</h3>
        <input
          type="email"
          placeholder="Enter your email"
          value={unsubscribeEmail}
          onChange={(e) => setUnsubscribeEmail(e.target.value)}
          className="mb-4 w-full rounded border border-gray-300 px-4 py-2 outline-none"
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={() => navigate('/')}
            className="rounded bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleUnsubscribe}
            className="rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
          >
            Unsubscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unsubscribe;