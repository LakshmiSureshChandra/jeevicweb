import React, { useState, useEffect } from 'react';
import DiningOffers from '../DiningOffers';
import DirectionMap from '../DirectionMap';
import Menu from './Menu';
import axios from 'axios';
import { createDineInBooking } from '../../../lib/api';

const Overview = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedGuests, setSelectedGuests] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [dates, setDates] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateTimeSlotsForDate = (selectedDate) => {
    const slots = [];
    const now = new Date();
    const selectedDateTime = new Date(selectedDate);
    
    // Set opening and closing hours (11:30 AM to 11:00 PM)
    const openingHour = 6;
    const openingMinute = 0;
    const closingHour = 24;
    const closingMinute = 0;

    // Set start time
    let startTime;
    if (selectedDateTime.toDateString() === now.toDateString()) {
      // If selected date is today, start from current time
      startTime = new Date(now);
      // Round up to next 30-minute interval
      const currentMinutes = startTime.getMinutes();
      startTime.setMinutes(currentMinutes + (30 - (currentMinutes % 30)));
      startTime.setSeconds(0);
      startTime.setMilliseconds(0);

      // If current time is past closing time, return empty slots
      if (startTime.getHours() >= closingHour && startTime.getMinutes() > closingMinute) {
        return [];
      }

      // If current time is before opening time, start from opening time
      const openingTime = new Date(selectedDateTime);
      openingTime.setHours(openingHour, openingMinute, 0, 0);
      if (startTime < openingTime) {
        startTime = openingTime;
      }
    } else {
      // If selected date is future date, start from opening time
      startTime = new Date(selectedDateTime);
      startTime.setHours(openingHour, openingMinute, 0, 0);
    }

    // Set end time to closing time of selected date
    const endTime = new Date(selectedDateTime);
    endTime.setHours(closingHour, closingMinute, 0, 0);

    // Generate slots
    while (startTime <= endTime) {
      const timeString = startTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      slots.push(timeString);
      startTime.setMinutes(startTime.getMinutes() + 30);
    }

    return slots;
  };

  useEffect(() => {
    // Generate next 7 days
    const nextSevenDays = Array.from({length: 7}, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return date.toISOString().split('T')[0];
    });
    setDates(nextSevenDays);
  }, []);

  // Update time slots when date changes
  useEffect(() => {
    if (selectedDate) {
      const slots = generateTimeSlotsForDate(selectedDate);
      setTimeSlots(slots);
    }
  }, [selectedDate]);

  const handleBookingConfirmation = async () => {
    if (!selectedDate || !selectedGuests || !selectedTime) {
      setError('Please select all booking details');
      return;
    }
  
    setIsLoading(true);
    setError(null);
  
    try {
      // Convert 12-hour format to 24-hour format
      const [time, period] = selectedTime.split(' ');
      let [hours, minutes] = time.split(':');
      hours = parseInt(hours);
      
      // Convert to 24-hour format
      if (period === 'PM' && hours !== 12) {
        hours += 12;
      } else if (period === 'AM' && hours === 12) {
        hours = 0;
      }
      
      // Format time string for ISO
      const timeString = `${hours.toString().padStart(2, '0')}:${minutes}:00`;
      const fromTime = new Date(`${selectedDate}T${timeString}`);
      const toTime = new Date(fromTime.getTime() + 30 * 60000);

      const bookingData = {
        booking_date: selectedDate,
        booking_time: timeString,
        from_time: fromTime.toISOString(),
        to_time: toTime.toISOString(),
        number_of_people: parseInt(selectedGuests.split(' ')[0]), // Extract number from "2 guests"
      };
  
      const response = await createDineInBooking(bookingData);
  
      if (response) {
        setSelectedDate('');
        setSelectedGuests('');
        setSelectedTime('');
        alert('Booking confirmed successfully!');
      }
    } catch (err) {
      setError(err.message || 'Failed to confirm booking');
      console.error('Booking error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-2">
          <div className="mt-6">
            <Menu />
          </div>
        </div>
        <div className="md:col-span-1 pt-12 md:pt-0">
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-purple-50 border border-purple-200 rounded-t-lg p-4">
              <h2 className="font-medium text-lg mb-1">Table reservation</h2>
              <p className="flex items-center gap-1 text-sm text-sky-700">
                Your booking will be reserved for 30 minutes from the time you select.
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
                <div className="max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        className={`py-2 px-4 rounded text-sm ${
                          selectedTime === time
                            ? 'bg-purple-500 text-white'
                            : 'border border-gray-300 hover:border-purple-500'
                        }`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedTime && (
                <div className="mt-4">
                  <button 
                    className={`w-full ${
                      isLoading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-orange-500 hover:bg-orange-600'
                    } text-white font-medium py-3 px-4 rounded-md transition duration-200`}
                    onClick={handleBookingConfirmation}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Confirming...' : 'Confirm Booking'}
                  </button>
                  {error && (
                    <p className="mt-2 text-red-500 text-sm">{error}</p>
                  )}
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