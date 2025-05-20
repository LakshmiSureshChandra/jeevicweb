import React from 'react';
import DiningOffers from '../DiningOffers';
import DirectionMap from '../DirectionMap';
import Menu from './Menu';

const Overview = () => {
  return (
    <div>
      
      <div className=" md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-2">
          <DiningOffers />
          <div className="mt-6">
            <Menu />
          </div>
        </div>
        <div className="md:col-span-1 pt-12 md:pt-0">
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-purple-50 border border-purple-200 rounded-t-lg p-4">
              <h2 className="font-medium text-lg mb-1">Table reservation</h2>
              <p className="flex items-center gap-1 text-sm text-sky-700">
                <img src="/disc.svg" className='h-4 w-4 text-sky-600' alt="" />
                Flat 15% OFF + 2 more offers
              </p>
            </div>
            
            <div className='p-4 flex flex-col gap-4'>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <select className="w-full bg-white border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-purple-500">
                    <option>Tomorrow</option>
                    <option>Today</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                    <svg className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                
                <div className="relative flex-1">
                  <select className="w-full bg-white border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-purple-500">
                    <option>2 guests</option>
                    <option>1 guest</option>
                    <option>3 guests</option>
                    <option>4 guests</option>
                    <option>5+ guests</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                    <svg className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-md transition duration-200">
                Book a table
              </button>
            </div>
          </div>
          
          <div className="mt-6">
            <h2 className="font-medium text-lg mb-4">Direction</h2>
            <DirectionMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;