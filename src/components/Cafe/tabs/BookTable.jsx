import React, { useState } from 'react';
// import { Calendar } from 'lucide-react';

const TimeSlot = ({ time, available = true, selected = false, onClick }) => (
  <button
    className={`py-2 px-4 rounded text-sm ${
      !available 
        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
        : selected
          ? 'bg-orange-500 text-white'
          : 'border border-gray-300 hover:border-orange-500'
    }`}
    disabled={!available}
    onClick={onClick}
  >
    {time}
  </button>
);

const BookTable = () => {
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedGuests, setSelectedGuests] = useState('2 guests');
  const [selectedTime, setSelectedTime] = useState('7:30 PM');
  
  const timeSlots = [
    { time: '6:00 PM', available: true },
    { time: '6:30 PM', available: true },
    { time: '7:00 PM', available: true },
    { time: '7:30 PM', available: true },
    { time: '8:00 PM', available: true },
    { time: '8:30 PM', available: false },
    { time: '9:00 PM', available: true },
    { time: '9:30 PM', available: true },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-medium mb-4">Select date and party size</h2>
          
          <div className="space-y-4">
            <div className="relative">
              <select 
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                <option>Today</option>
                <option>Tomorrow</option>
                <option>Friday</option>
                <option>Saturday</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
            
            <div className="relative">
              <select 
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={selectedGuests}
                onChange={(e) => setSelectedGuests(e.target.value)}
              >
                <option>1 guest</option>
                <option>2 guests</option>
                <option>3 guests</option>
                <option>4 guests</option>
                <option>5+ guests</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="font-medium mb-4">Available time slots</h2>
          
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map(slot => (
              <TimeSlot 
                key={slot.time}
                time={slot.time}
                available={slot.available}
                selected={selectedTime === slot.time}
                onClick={() => setSelectedTime(slot.time)}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Your reservation</h3>
        <div className="flex items-start space-x-3">
          {/* <Calendar className="h-5 w-5 text-gray-500 mt-1" /> */}
          <div>
            <p className="font-medium">{selectedDate} at {selectedTime}</p>
            <p className="text-sm text-gray-600">{selectedGuests}</p>
            <p className="text-sm text-gray-600 mt-1">Jeevic Cafe, Jubilee Hills</p>
          </div>
        </div>
        
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg mt-4 transition duration-200">
          Confirm reservation
        </button>
        
        <p className="text-xs text-gray-500 mt-2 text-center">
          You will receive a confirmation email once your booking is confirmed
        </p>
      </div>
    </div>
  );
};

export default BookTable;