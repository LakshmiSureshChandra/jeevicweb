import React, { useState, useEffect } from "react";
import { useGetOrdersByUserID } from "../../services/queries/OrdersQueries";
import { useGetProductsByIds } from "../../services/queries/ProductQueries";

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState("ecommerce");
  const { data: orders = [], isLoading: ordersLoading } = useGetOrdersByUserID();

  // Get all product IDs from orders
  const productIds = orders.flatMap(order => 
    order.products.map(product => product.product_id)
  );

  // Fetch product details
  const { data: products = [] } = useGetProductsByIds(productIds);

  const renderTabs = () => (
    <div className="flex space-x-4 mb-6">
      <button
        className={`px-4 py-2 rounded-lg ${activeTab === "ecommerce" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        onClick={() => setActiveTab("ecommerce")}
      >
        E-commerce Orders
      </button>
    </div>
  );

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'text-green-500';
      case 'shipped': return 'text-blue-500';
      case 'processing': return 'text-orange-500';
      case 'cancelled': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleTrackOrder = (orderId) => {
    window.open(`/tracking/${orderId}`, '_blank');
  };

  const renderEcommerceOrders = () => {
    if (ordersLoading) {
      return <div className="text-center py-4">Loading orders...</div>;
    }

    if (!orders.length) {
      return <div className="text-center py-4">No orders found</div>;
    }

    return (
      <div className="space-y-6">
        {orders.map((order) => {
          const orderProducts = order.products.map(product => {
            const productDetails = products.find(p => p.id === product.product_id);
            return { ...product, details: productDetails };
          });

          return (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">Order #{order.ship_order_id}</h3>
                  <p className="text-sm text-gray-500">
                    Placed on {formatDate(order.created_at)}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </p>
                  <p className="text-sm text-gray-500">
                    Payment: {order.payment_status}
                  </p>
                  {order.status !== 'delivered' && order.status !== 'cancelled' && (
                    <button
                      onClick={() => handleTrackOrder(order.ship_order_id)}
                      className="mt-2 px-4 py-1 text-sm bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                    >
                      Track Order
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {orderProducts.map((product, idx) => (
                  <div key={idx} className="flex items-center gap-4 border-b pb-4 last:border-b-0">
                    <img
                      src={product.details?.image_url?.[0] || '/images/placeholder.jpg'}
                      alt={product.details?.name}
                      className="w-20 h-20 object-cover rounded"
                      onError={(e) => {
                        e.target.src = '/images/placeholder.jpg';
                      }}
                    />
                    <div className="flex-grow">
                      <h4 className="font-medium">{product.details?.name || 'Product'}</h4>
                      <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                      <p className="text-sm font-medium">₹{product.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span>₹{(order.total_amount - order.tax_amount - order.shipping_amount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax:</span>
                  <span>₹{order.tax_amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping:</span>
                  <span>₹{order.shipping_amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium mt-2 pt-2 border-t">
                  <span>Total:</span>
                  <span>₹{order.total_amount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section className="w-full rounded-lg bg-gray-100 p-6">
      {renderTabs()}
      {activeTab === "ecommerce" && renderEcommerceOrders()}
    </section>
  );
};

export default MyOrders;
