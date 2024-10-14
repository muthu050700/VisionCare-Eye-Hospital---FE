import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { deleteUserApi, registerApi, handleRoleChangeApi } from "../APIs/apis"; // Import your API functions
import { FaTimes } from "react-icons/fa"; // React icon for close button
const BE_URL = import.meta.env.VITE_BE_URL; //vite is must
Modal.setAppElement("#root");

const PatientDashboard = () => {
  const [patientData, setPatientData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null); // For editing
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const userRole = localStorage.getItem("userRole");

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
    medicalHistory: "",
    role: "",
    password: "", // Add password field
    confirmPassword: "", // Add confirm password field
  });
  const doctorRoles = ["cataracts", "glaucoma", "macular degeneration"];
  const token = localStorage.getItem("token");

  // Fetch patient data once on mount
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
      setPatientData(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Open modal for editing
  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setFormData({
      fullName: patient.fullName,
      email: patient.email,
      phoneNumber: patient.phoneNumber,
      address: patient.address,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      city: patient.city,
      state: patient.state,
      pinCode: patient.pinCode,
      medicalHistory: patient.medicalHistory,
      role: patient.role,
      password: "", // Reset password field for editing
      confirmPassword: "", // Reset confirm password field for editing
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
      medicalHistory: "",
      role: "patient",
      password: "", // Initialize password field
      confirmPassword: "", // Initialize confirm password field
    });
    setIsEditing(false);
    setModalIsOpen(true);
  };

  // Handle form submission for Add/Edit
  const handleSubmit = async () => {
    if (isEditing) {
      // Update patient
      try {
        delete formData.confirmPassword;
        await handleRoleChangeApi(selectedPatient.id, { ...formData }); // API call to update role
        alert("Patient updated successfully");
        fetchData(); // Refresh data after update
        setModalIsOpen(false);
      } catch (error) {
        console.error("Error updating patient:", error);
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
        !formData.medicalHistory ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        alert("Please fill out all required fields.");
        return; // Stop the submission
      }
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      // Add new patient
      const res = await registerApi(formData);
      alert(res.msg);
      fetchData(); // Refresh data after adding
      setModalIsOpen(false);
    }
  };

  // Handle patient deletion
  const handleDelete = async (id) => {
    const res = await deleteUserApi(id);
    alert(res.msg);
    fetchData(); // Refresh data after deletion
  };
  if (patientData.length !== 0)
    return (
      <div className="p-5">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-3xl font-bold text-gray-700">
            Patient Dashboard
          </h2>
          {!doctorRoles.includes(userRole) && (
            <button
              onClick={handleAddRecord}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Add Record
            </button>
          )}
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
                <th className="py-2 px-4 border">Medical History</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patientData.map(
                (patient) =>
                  patient.role === "patient" && (
                    <tr key={patient.id} className="border-b">
                      <td className="py-2 px-4">{patient.fullName}</td>
                      <td className="py-2 px-4">{patient.email}</td>
                      <td className="py-2 px-4">{patient.phoneNumber}</td>
                      <td className="py-2 px-4">{patient.address}</td>
                      <td className="py-2 px-4">
                        {new Date(patient.dateOfBirth).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4">{patient.gender}</td>
                      <td className="py-2 px-4">{patient.city}</td>
                      <td className="py-2 px-4">{patient.state}</td>
                      <td className="py-2 px-4">{patient.pinCode}</td>
                      <td className="py-2 px-4">{patient.medicalHistory}</td>
                      <td className="py-2 px-4 flex space-x-2">
                        <button
                          onClick={() => handleEdit(patient)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        {!doctorRoles.includes(userRole) && (
                          <button
                            onClick={() => handleDelete(patient.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        )}
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
          shouldCloseOnOverlayClick={true}
          contentLabel={isEditing ? "Edit Patient" : "Add Patient"}
          className="p-5 bg-white max-w-lg mx-auto mt-10 rounded-lg shadow-lg"
          style={{
            content: {
              maxHeight: "80vh",
              overflowY: "auto",
            },
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {isEditing ? "Edit Patient" : "Add New Patient"}
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
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
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
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              name="pinCode"
              placeholder="Pin Code"
              value={formData.pinCode}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
            <textarea
              name="medicalHistory"
              placeholder="Medical History"
              value={formData.medicalHistory}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            ></textarea>

            {/* New Password Fields */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />

            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              {isEditing ? "Update Patient" : "Add Patient"}
            </button>
          </div>
        </Modal>
      </div>
    );
};

export default PatientDashboard;
