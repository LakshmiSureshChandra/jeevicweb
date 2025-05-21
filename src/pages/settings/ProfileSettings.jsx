import React, { useState } from "react";
import settingsData from "../../data/settingsData";
import Profile from "./Profile";
import MyOrders from "./MyOrders";
import ShippingAddress from "./ShippingAddress";
import JeevicPoints from "./JeevicPoints";
import ContactUs from "../about/ContactUs"; // Import the ContactUs component
import { useNavigate } from "react-router-dom";

const componentMap = {
  "Profile": Profile,
  "My Orders": MyOrders,
  "Shipping Address": ShippingAddress,
  "Jeevic Points": JeevicPoints,
  "Contact Us": ContactUs, // Add ContactUs to the componentMap
};

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const navigate = useNavigate();
  const ActiveComponent = componentMap[activeTab];

  const handleLogout = () => {
    // Remove access_token (or jwtToken) from localStorage
    localStorage.removeItem("access_token");

    // Redirect to sign-in page
    navigate("/sign-in");
  };

  // Filter out any items that don't have a corresponding component
  const filteredSettingsData = Object.fromEntries(
    Object.entries(settingsData).map(([section, items]) => [
      section,
      [items[0].filter(item => componentMap.hasOwnProperty(item.name))]
    ])
  );

  return (
    <main className="flex w-full justify-center">
      <div className="w-[90%] max-w-[1440px] py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Profile Settings</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            {Object.entries(filteredSettingsData).map(([section, items]) => (
              <div key={section} className="mb-6">
                <h2 className="text-xl font-medium mb-2">{section}</h2>
                <ul className="space-y-2">
                  {items[0].map((item) => (
                    <li key={item.name}>
                      <button
                        onClick={() => setActiveTab(item.name)}
                        className={`w-full text-left px-3 py-2 rounded transition-colors ${
                          activeTab === item.name
                            ? "bg-blue-600 text-white"
                            : "text-blue-600 hover:bg-blue-100"
                        }`}
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="md:w-3/4 bg-white rounded-lg shadow-md p-6">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileSettings;