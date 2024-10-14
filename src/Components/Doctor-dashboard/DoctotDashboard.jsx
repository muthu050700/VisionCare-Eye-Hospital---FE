import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { deleteUserApi, handleRoleChangeApi, registerApi } from "../APIs/apis";
import { FaTimes } from "react-icons/fa"; // React icon for close button
const BE_URL = import.meta.env.VITE_BE_URL; //vite is must
Modal.setAppElement("#root");

const DoctorDashboard = () => {
  const [doctorData, setDoctorData] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // For editing
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Toggle between Add/Edit mode
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    city: "",
    state: "",
    pinCode: "",
    role: "",
    password: "",
    confirmPassword: "", // Added confirm password
  });

  const token = localStorage.getItem("token");
  const doctorRoles = ["cataracts", "glaucoma", "macular degeneration"];

  // Fetch doctor data once on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${BE_URL}/admin/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      const data = await res.json();
      setDoctorData(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Open modal for editing
  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor);
    setFormData({
      fullName: doctor.fullName,
      email: doctor.email,
      phoneNumber: doctor.phoneNumber,
      address: doctor.address,
      dateOfBirth: doctor.dateOfBirth,
      gender: doctor.gender,
      city: doctor.city,
      state: doctor.state,
      pinCode: doctor.pinCode,
      role: doctor.role,
      password: "", // Empty for edit
      confirmPassword: "", // Empty for edit
    });
    setIsEditing(true);
    setModalIsOpen(true);
  };

  // Open modal for adding new record
  const handleAddRecord = () => {
    setFormData({
      fullName: "",
      email: "",
      phoneNumber: "",
      address: "",
      dateOfBirth: "",
      gender: "",
      city: "",
      state: "",
      pinCode: "",
      role: "",
      password: "", // Empty for new record
      confirmPassword: "", // Empty for new record
    });
    setIsEditing(false);
    setModalIsOpen(true);
  };

  // Handle form submission for Add/Edit
  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (isEditing) {
      // Update doctor
      try {
        delete formData.confirmPassword;
        await handleRoleChangeApi(selectedDoctor.id, { ...formData }); // API call to update role
        alert("Doctor updated successfully");
        fetchData(); // Refresh data after update
        setModalIsOpen(false);
      } catch (error) {
        console.error("Error updating doctor:", error);
      }
    } else {
      // Check if all fields are filled
      if (
        !formData.fullName ||
        !formData.email ||
        !formData.phoneNumber ||
        !formData.address ||
        !formData.dateOfBirth ||
        !formData.gender ||
        !formData.city ||
        !formData.state ||
        !formData.pinCode ||
        !formData.password
      ) {
        alert("Please fill out all required fields.");
        return; // Stop the submission
      }
      // Add new doctor
      delete formData.confirmPassword;
      const res = await registerApi(formData);
      alert(res.msg);
      setModalIsOpen(false);
    }
  };

  // Handle doctor deletion
  const handleDelete = async (id) => {
    const res = await deleteUserApi(id);
    alert(res.msg);
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-3xl font-bold text-gray-700">Doctor Dashboard</h2>
        <button
          onClick={handleAddRecord}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Add Record
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Full Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Phone</th>
              <th className="py-2 px-4 border">Address</th>
              <th className="py-2 px-4 border">Date of Birth</th>
              <th className="py-2 px-4 border">Gender</th>
              <th className="py-2 px-4 border">City</th>
              <th className="py-2 px-4 border">State</th>
              <th className="py-2 px-4 border">Pin Code</th>
              <th className="py-2 px-4 border">Role</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctorData.map(
              (doctor) =>
                doctorRoles.includes(doctor.role) && (
                  <tr key={doctor.id} className="border-b">
                    <td className="py-2 px-4">{doctor.fullName}</td>
                    <td className="py-2 px-4">{doctor.email}</td>
                    <td className="py-2 px-4">{doctor.phoneNumber}</td>
                    <td className="py-2 px-4">{doctor.address}</td>
                    <td className="py-2 px-4">
                      {new Date(doctor.dateOfBirth).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4">{doctor.gender}</td>
                    <td className="py-2 px-4">{doctor.city}</td>
                    <td className="py-2 px-4">{doctor.state}</td>
                    <td className="py-2 px-4">{doctor.pinCode}</td>
                    <td className="py-2 px-4">{doctor.role}</td>
                    <td className="py-2 px-4 flex space-x-2">
                      <button
                        onClick={() => handleEdit(doctor)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(doctor.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        shouldCloseOnOverlayClick={true} // Close on outside click
        contentLabel={isEditing ? "Edit Doctor" : "Add Doctor"}
        className="p-5 bg-white max-w-lg mx-auto mt-10 rounded-lg shadow-lg"
        style={{
          content: {
            maxHeight: "80vh", // Limit height to 80% of the viewport
            overflowY: "auto", // Enable scrolling when content exceeds height
          },
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {isEditing ? "Edit Doctor" : "Add New Doctor"}
          </h2>
          <button onClick={() => setModalIsOpen(false)}>
            <FaTimes className="text-red-600" />
          </button>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="pinCode"
            placeholder="Pin Code"
            value={formData.pinCode}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Specialization</option>
            <option value="cataracts">Cataracts</option>
            <option value="glaucoma">Glaucoma</option>
            <option value="macular degeneration">Macular Degeneration</option>
          </select>
          {/* Password fields */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mt-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            {isEditing ? "Update Doctor" : "Add Doctor"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default DoctorDashboard;
