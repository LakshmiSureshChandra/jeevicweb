import React, { useState, useEffect } from 'react';
import DiningOffers from '../DiningOffers';
import DirectionMap from '../DirectionMap';
import Menu from './Menu';

const Overview = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedGuests, setSelectedGuests] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const nextSevenDays = Array.from({length: 7}, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return date.toISOString().split('T')[0];
    });
    setDates(nextSevenDays);
  }, []);

  const timeSlots = ['12:00 PM', '1:00 PM', '2:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

  return (
    <div>
      <div className="md:grid md:grid-cols-3 md:gap-6">
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
                  <select 
                    className="w-full bg-white border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-purple-500"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  >
                    <option value="">Select Date</option>
                    {dates.map((date) => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                    <svg className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                
                <div className="relative flex-1">
                  <select 
                    className="w-full bg-white border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-purple-500"
                    value={selectedGuests}
                    onChange={(e) => setSelectedGuests(e.target.value)}
                  >
                    <option value="">Select Guests</option>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={`${num} guest${num > 1 ? 's' : ''}`}>
                        {num} guest{num > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                    <svg className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {selectedDate && selectedGuests && (
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      className={`py-2 px-3 text-sm font-medium rounded-md ${
                        selectedTime === time
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}
              
              {selectedTime && (
                <div className="mt-4 space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full border border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                  <input
                    type="tel"
                    placeholder="Your Mobile Number"
                    className="w-full border border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                  <button className="w-full bg-orange-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-md transition duration-200">
                    Confirm Booking
                  </button>
                </div>
              )}
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