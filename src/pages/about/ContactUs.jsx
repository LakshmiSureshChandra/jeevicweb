import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create email content
    const subject = `Contact from ${formData.name}`;
    const body = `Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}`;

    try {
      // Create mailto URL with encoded parameters
      const mailtoUrl = `mailto:store@jeevic.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Directly change window location to mailto URL
      window.location.href = mailtoUrl;
      
      // Clear form after a short delay
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
      }, 1000);
    } catch (error) {
      console.error('Error opening email client:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Contact Information */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-8 md:p-12">
              <h2 className="text-3xl font-bold text-white mb-6">Contact Us</h2>
              <div className="space-y-6 text-white">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Address</h3>
                  <p>Shutter no 4 Ground floor, KLC one building, Nallagandla</p>
                  <p>Hyderabad, Telangana 500019</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Email</h3>
                  <p>store@jeevic.com</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Phone</h3>
                  <p>+91 0000000000</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Hours</h3>
                  <p>24 hours</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8 md:p-12">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
