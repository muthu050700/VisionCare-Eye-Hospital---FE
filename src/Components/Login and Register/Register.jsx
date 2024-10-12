import React, { useState } from "react";
import { registerApi } from "../APIs/apis";
import { Navigate, useNavigate } from "react-router-dom";
import { checkValidData } from "./validate";
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
  medicalHistory: "",
};

const Register = () => {
  //Form Details
  const [formDetails, setFormDetails] = useState(initialFormDetails);
  // Form Email and password error
  const [errorMessage, setErrorMessage] = useState(null);
  //navigate
  const navigate = useNavigate();
  //For Role
  const [role, setRole] = useState("option");
  // is auth
  const isAuthenticated = Boolean(localStorage.getItem("userType"));
  // handle change in form field details

  const checkAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();
    const dayDifference = today.getDate() - dob.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      return "Enter valid date";
    }

    // If age is less than 18, return an error message
    if (age < 18) {
      return "You must be at least 18 years old to register.";
    }

    return null; // Age is valid
  };

  const handleFormChange = (e) => {
    setFormDetails({
      ...formDetails,
      role: role,
      [e.target.name]: e.target.value,
    });
  };

  //Handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Reset error message initially
    setErrorMessage("");

    // Validate email and password
    const validationMessage = checkValidData(
      formDetails.email,
      formDetails.password
    );
    console.log("validationMessage", validationMessage);
    if (validationMessage) {
      setErrorMessage(validationMessage);
      return;
    }
    console.log(formDetails.password !== formDetails.confirmPassword);
    // Ensure passwords match
    if (formDetails.password !== formDetails.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // Ensure a role is selected
    if (role === "option") {
      setErrorMessage("Please select a valid role");
      return;
    }
    // Validate age (only allow registration if user is 18 or older)
    const ageValidationMessage = checkAge(formDetails.dateOfBirth);
    console.log(ageValidationMessage);
    if (ageValidationMessage) {
      setErrorMessage(ageValidationMessage);
      return;
    }

    try {
      role === "patient" ? "" : delete formDetails.medicalHistory;
      const { confirmPassword, ...userDetails } = formDetails; // Exclude confirmPassword from API payload
      const res = await registerApi(userDetails, role); // Use the selected role directly

      // Check if profile is already registered
      if (res.status === 409) {
        setErrorMessage(res.msg);
      } else {
        alert(`${role} profile registered successfully`);
        navigate("/login");
      }
    } catch (error) {
      setErrorMessage("Something went wrong during registration");
    } finally {
      setFormDetails(initialFormDetails); // Reset form after submission
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="px-6 py-8 bg-white shadow-md rounded-md w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Your Profile
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Patients are required to register their information on this form.
        </p>
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
              onChange={(e) => handleFormChange(e)}
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
              onChange={(e) => handleFormChange(e)}
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
              onChange={(e) => handleFormChange(e)}
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
            onChange={(e) => handleFormChange(e)}
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
            onChange={(e) => handleFormChange(e)}
          />
          {errorMessage === "Passwords do not match" && (
            <p className="text-red-500">{errorMessage}</p>
          )}
          {errorMessage === "Password is not valid" && (
            <p className="text-red-500">{errorMessage}</p>
          )}
          {/* Role */}
          <label className="block font-medium text-gray-700">Role:</label>
          <select
            className={`w-full px-3 py-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 ${
              errorMessage === "Please select a valid role"
                ? "border-red-500"
                : ""
            }`}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="option">Select an option</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>
          {errorMessage === "Please select a valid role" && (
            <p className="text-red-500">{errorMessage}</p>
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
              onChange={(e) => handleFormChange(e)}
              required
            />
            {errorMessage ===
              "You must be at least 18 years old to register." && (
              <p className="text-red-500">{errorMessage}</p>
            )}
            {errorMessage === "Enter valid date" && (
              <p className="text-red-500">{errorMessage}</p>
            )}
          </div>
          {/* Gender */}
          <div>
            <label className="block font-medium text-gray-700">Gender:</label>
            <input
              type="text"
              name="gender"
              value={formDetails.gender}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              onChange={(e) => handleFormChange(e)}
              required
            />
          </div>
          {/* Address */}
          <div>
            <label className="block font-medium text-gray-700">Address:</label>
            <input
              type="text"
              name="address"
              value={formDetails.address}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              onChange={(e) => handleFormChange(e)}
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
              onChange={(e) => handleFormChange(e)}
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
              onChange={(e) => handleFormChange(e)}
              required
            />
          </div>
          {/* Pin Code */}
          <div>
            <label className="block font-medium text-gray-700">Pin Code:</label>
            <input
              type="number"
              name="pinCode"
              value={formDetails.pinCode}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              onChange={(e) => handleFormChange(e)}
              required
            />
          </div>
          {/* Medical History */}
          {role === "patient" && (
            <div>
              <label className="block font-medium text-gray-700">
                Medical History:
              </label>
              <textarea
                name="medicalHistory"
                value={formDetails.medicalHistory}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                onChange={(e) => handleFormChange(e)}
                required={role === "patient"} // Required only if patient role is selected
              />
            </div>
          )}
          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
