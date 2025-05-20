import React, { useState } from 'react';
import Overview from './tabs/Overview';
import Menu from './tabs/Menu';
import BookTable from './tabs/BookTable';

const ContentTabs = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="mt-4">
      <div className="flex border-b">
        <button 
          onClick={() => setActiveTab('overview')} 
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveTab('menu')} 
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'menu' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        >
          Menu
        </button>
        <button 
          onClick={() => setActiveTab('bookTable')} 
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'bookTable' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        >
          Book a Table
        </button>
      </div>
      
      <div className="p-4">
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'menu' && <Menu />}
        {activeTab === 'bookTable' && <BookTable />}
      </div>
    </div>
  );
};

export default ContentTabs;