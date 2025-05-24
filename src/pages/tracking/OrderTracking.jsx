import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { trackOrder } from '../../lib/api';

const OrderTracking = () => {
  const { ship_order_id } = useParams();
  const { data: trackingData, isLoading } = useQuery({
    queryKey: ['order-tracking', ship_order_id],
    queryFn: () => trackOrder(ship_order_id),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">Loading tracking information...</div>
      </div>
    );
  }

  const orderData = trackingData?.data?.[0]?.[ship_order_id];
  
  if (!orderData || !orderData.tracking_data) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">No Tracking Information Available</h2>
          <p className="text-gray-600">Unable to fetch tracking details for this order.</p>
        </div>
      </div>
    );
  }

  const { tracking_data } = orderData;

  if (tracking_data.error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Tracking Update</h2>
          <p className="text-gray-600">{tracking_data.error}</p>
        </div>
      </div>
    );
  }

  const shipmentDetails = tracking_data.shipment_track?.[0] || {};
  const trackActivities = tracking_data.shipment_track_activities || [];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Order Tracking</h1>
      
      {/* Shipment Details */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Shipment Details</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <p className="text-gray-600">AWB Number</p>
            <p className="font-medium">{shipmentDetails.awb_code || 'Not Available'}</p>
          </div>
          <div>
            <p className="text-gray-600">Current Status</p>
            <p className="font-medium">{shipmentDetails.current_status || 'Pending'}</p>
          </div>
          <div>
            <p className="text-gray-600">Expected Delivery</p>
            <p className="font-medium">
              {shipmentDetails.edd ? new Date(shipmentDetails.edd).toLocaleDateString() : 'Not Available'}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Origin</p>
            <p className="font-medium">{shipmentDetails.origin || 'Not Available'}</p>
          </div>
          <div>
            <p className="text-gray-600">Destination</p>
            <p className="font-medium">{shipmentDetails.destination || 'Not Available'}</p>
          </div>
          {shipmentDetails.courier_name && (
            <div>
              <p className="text-gray-600">Courier</p>
              <p className="font-medium">{shipmentDetails.courier_name}</p>
            </div>
          )}
        </div>
      </div>

      {/* Tracking Timeline */}
      {trackActivities && trackActivities.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Tracking Updates</h2>
          <div className="space-y-6">
            {trackActivities.map((activity, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  {index !== trackActivities.length - 1 && (
                    <div className="w-0.5 h-full bg-blue-200"></div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.activity}</p>
                  <p className="text-sm text-gray-600">{activity.location}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(activity.date).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;