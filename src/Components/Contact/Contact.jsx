import React, { useState } from "react";
import contactSvg from "../../assets/contact.svg"; // Replace with your SVG file
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"; // Import icons from react-icons

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

      {/* Form and Content Section */}
      <div className="w-full lg:w-1/2 p-6 bg-white shadow-md rounded-lg">
        {/* Heading */}
        <h2 className="text-3xl font-bold mb-4 text-center">Get in Touch</h2>

        {/* Contact Cards */}
        <div className="grid gap-6 mb-8">
          {/* Phone Card */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center">
            <FaPhone className="text-blue-600 text-3xl mr-4" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-gray-700">+1 234 567 890</p>
            </div>
            <a
              href="tel:+1234567890"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Call Us
            </a>
          </div>

          {/* Email Card */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center">
            <FaEnvelope className="text-blue-600 text-3xl mr-4" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Email</h3>
              <p className="text-gray-700">contact@example.com</p>
            </div>
            <a
              href="mailto:contact@example.com"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Mail Us
            </a>
          </div>

          {/* Location Card */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center">
            <FaMapMarkerAlt className="text-blue-600 text-3xl mr-4" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Location</h3>
              <p className="text-gray-700">123 Main St, City, Country</p>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Visit Us
            </a>
          </div>
        </div>

        {/* Form Section */}
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
