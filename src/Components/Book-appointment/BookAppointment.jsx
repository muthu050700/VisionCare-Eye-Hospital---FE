import React, { useState } from "react";
import { createAppointment } from "../APIs/apis";

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    phoneNumber: "",
    email: "",
    address: "",
    doctor: "",
    appointmentDate: "",
    appointmentType: "In-person", // Default to In-person consultation
  });

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
    // Here you can send the form data to the backend (API call)
    const res = await createAppointment(formData);
    try {
      alert(`appointment successfully`);
    } catch (e) {
      alert("Something went wrong", e);
    }
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
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

        {/* Address */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Select Doctor */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Select Doctor
          </label>
          <select
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          >
            <option value="">-- Select Doctor --</option>
            <option value="Dr. John Doe">Dr. John Doe</option>
            <option value="Dr. Jane Smith">Dr. Jane Smith</option>
            {/* Add more doctors as needed */}
          </select>
        </div>

        {/* Preferred Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Preferred Date
          </label>
          <input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Appointment Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Appointment Type
          </label>
          <div className="flex space-x-4">
            <label>
              <input
                type="radio"
                name="appointmentType"
                value="In-person"
                checked={formData.appointmentType === "In-person"}
                onChange={handleChange}
              />{" "}
              In-person Consultation
            </label>
            <label>
              <input
                type="radio"
                name="appointmentType"
                value="Virtual"
                checked={formData.appointmentType === "Virtual"}
                onChange={handleChange}
              />{" "}
              Virtual Consultation
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Book Appointment
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookAppointment;
