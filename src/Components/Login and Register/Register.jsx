import React, { useState } from "react";
import { registerApi } from "../APIs/apis";
import { useNavigate } from "react-router-dom";
import { checkValidData } from "./validate";
import registerSvg from "../../assets/register.svg";

const initialFormDetails = {
  fullName: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  address: "",
  gender: "",
  dateOfBirth: "",
  city: "",
  state: "",
  pinCode: "",
  email: "",
  medicalHistory: "No Records",
  role: "patient",
};

const Register = () => {
  // Form Details
  const [formDetails, setFormDetails] = useState(initialFormDetails);
  // Form Email and password error
  const [errorMessage, setErrorMessage] = useState(null);
  // navigate
  const navigate = useNavigate();
  // Tab state
  const [activeTab, setActiveTab] = useState("patient");

  const checkAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();
    const dayDifference = today.getDate() - dob.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      return "Enter valid date";
    }

    if (age < 18) {
      return "You must be at least 18 years old to register.";
    }

    return null; // Age is valid
  };

  const handleFormChange = (e) => {
    setFormDetails({
      ...formDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormDetails({
      ...formDetails,
      role: tab === "doctor" ? formDetails.specialization : tab, // Assign role based on tab or specialization
    });
  };

  const handleSpecializationChange = (e) => {
    const specialization = e.target.value;
    setFormDetails({
      ...formDetails,
      specialization,
      role: specialization, // Assign specialization to role
    });
  };

  // Handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const validationMessage = checkValidData(
      formDetails.email,
      formDetails.password
    );
    if (validationMessage) {
      setErrorMessage(validationMessage);
      return;
    }

    if (formDetails.password !== formDetails.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    if (activeTab === "patient" && !formDetails.medicalHistory) {
      setErrorMessage("Medical history is required for patients");
      return;
    }

    const ageValidationMessage = checkAge(formDetails.dateOfBirth);
    if (ageValidationMessage) {
      setErrorMessage(ageValidationMessage);
      return;
    }

    try {
      const {
        confirmPassword,
        specialization,
        medicalHistory,
        ...userDetails
      } = formDetails;
      const res = await registerApi(userDetails, formDetails.role);

      if (res.status === 409) {
        setErrorMessage(res.msg);
      } else {
        alert(`profile registered successfully`);
        navigate("/login");
      }
    } catch (error) {
      setErrorMessage("Something went wrong during registration");
    } finally {
      setFormDetails(initialFormDetails); // Reset form after submission
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-end">
      <div className="hidden lg:block">
        <img src={registerSvg} alt="Register" className="h-full" />
      </div>
      <div className="px-6 py-8 bg-white shadow-md rounded-md w-full max-w-lg mr-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Your Profile
        </h1>
        <div className="flex justify-center mb-4">
          <button
            onClick={() => handleTabChange("patient")}
            className={`px-4 py-2 rounded-l-lg ${
              activeTab === "patient"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Patient
          </button>
          <button
            onClick={() => handleTabChange("doctor")}
            className={`px-4 py-2 ${
              activeTab === "doctor"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Doctor
          </button>
          <button
            onClick={() => handleTabChange("admin")}
            className={`px-4 py-2 rounded-r-lg ${
              activeTab === "admin"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Admin
          </button>
        </div>
        <form className="space-y-5" onSubmit={handleFormSubmit}>
          {/* Full Name */}
          <div>
            <label className="block font-medium text-gray-700">
              Full Name:
            </label>
            <input
              type="text"
              name="fullName"
              value={formDetails.fullName}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleFormChange}
              required
            />
          </div>
          {/* Email */}
          <div>
            <label className="block font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formDetails.email}
              className={`w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errorMessage === "Email is not valid" ? "border-red-500" : ""
              }`}
              onChange={handleFormChange}
            />
            {errorMessage === "Email is not valid" && (
              <p className="text-red-500 mt-1">{errorMessage}</p>
            )}
          </div>
          {/* Phone Number */}
          <div>
            <label className="block font-medium text-gray-700">
              Phone Number:
            </label>
            <input
              type="number"
              name="phoneNumber"
              value={formDetails.phoneNumber}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleFormChange}
              required
            />
          </div>
          {/* Password */}
          <label className="block font-medium text-gray-700">Password:</label>
          <input
            type="password"
            name="password"
            value={formDetails.password}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 ${
              errorMessage === "Passwords do not match" ? "border-red-500" : ""
            }`}
            onChange={handleFormChange}
          />
          <label className="block font-medium text-gray-700">
            Confirm Password:
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formDetails.confirmPassword}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 ${
              errorMessage === "Passwords do not match" ? "border-red-500" : ""
            }`}
            onChange={handleFormChange}
          />
          {errorMessage === "Passwords do not match" && (
            <p className="text-red-500">{errorMessage}</p>
          )}
          {/* Role and Conditional Fields */}
          {activeTab === "doctor" && (
            <>
              <label className="block font-medium text-gray-700">
                Specialization:
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                onChange={handleSpecializationChange}
                required
              >
                <option value="">Select Specialization</option>
                <option value="cataracts">Cataracts</option>
                <option value="glaucoma">Glaucoma</option>
                <option value="macular degeneration">
                  Macular Degeneration
                </option>
              </select>
            </>
          )}
          {/* Date of Birth */}
          <div>
            <label className="block font-medium text-gray-700">
              Date of Birth:
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formDetails.dateOfBirth}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleFormChange}
              required
            />
          </div>
          {/* Gender */}
          <div>
            <label className="block font-medium text-gray-700">Gender:</label>
            <select
              name="gender"
              value={formDetails.gender}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block font-medium text-gray-700">Address:</label>
            <input
              type="text"
              name="address"
              value={formDetails.address}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleFormChange}
              required
            />
          </div>
          {/* City */}
          <div>
            <label className="block font-medium text-gray-700">City:</label>
            <input
              type="text"
              name="city"
              value={formDetails.city}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleFormChange}
              required
            />
          </div>
          {/* State */}
          <div>
            <label className="block font-medium text-gray-700">State:</label>
            <input
              type="text"
              name="state"
              value={formDetails.state}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleFormChange}
              required
            />
          </div>
          {/* Pin Code */}
          <div>
            <label className="block font-medium text-gray-700">Pin Code:</label>
            <input
              type="text"
              name="pinCode"
              value={formDetails.pinCode}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleFormChange}
              required
            />
          </div>
          {/* Medical History */}
          {activeTab === "patient" && (
            <div>
              <label className="block font-medium text-gray-700">
                Medical History: (optional)
              </label>
              <textarea
                name="medicalHistory"
                value={formDetails.medicalHistory}
                onChange={handleFormChange}
                className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
              onClick={() => navigate("/login")}
            >
              Already have an account?
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Register
            </button>
          </div>
        </form>
        {errorMessage && (
          <p className="text-red-500 text-center mt-4">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Register;
