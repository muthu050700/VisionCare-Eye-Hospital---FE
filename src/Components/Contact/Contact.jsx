import React, { useState } from "react";
import contactSvg from "../../assets/register.svg"; // Replace with your SVG file

const initialFormData = {
  name: "",
  email: "",
  message: "",
};

const Contact = () => {
  const [formData, setFormData] = useState(initialFormData);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can add form validation here before submitting

    try {
      // Implement your API call to send the message
      console.log("Form Data Submitted:", formData);
      alert("Your message has been sent!");
      setFormData(initialFormData); // Reset form
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gray-100">
      {/* SVG Section */}
      <div className="hidden lg:block w-1/2">
        <img src={contactSvg} alt="Contact Us" className="h-full" />
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Email Address */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Message */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              rows="4"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
