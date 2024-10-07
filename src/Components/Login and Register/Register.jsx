import React, { useState } from "react";
import { createPatientApi } from "../APIs/apis";
import { Navigate, useNavigate } from "react-router-dom";
import { checkVaildData } from "./validate";
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

  const handleFormChange = (e) => {
    setFormDetails({
      ...formDetails,
      Role: role,
      [e.target.name]: e.target.value,
    });
  };

  //Handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const message = checkVaildData(formDetails.email, formDetails.password);
    setErrorMessage(message);
    if (message) return;

    //Checking wheather the password and confirm password is same or not
    if (formDetails.password !== formDetails.confirmPassword) {
      alert("Password do not match");
      return;
    }

    //checking wheather the user is seleting the role or not
    if (role === "option") {
      setErrorMessage("Please select the role");
      return;
    }

    try {
      delete formDetails.confirmPassword;
      const res = await createPatientApi(formDetails, formDetails.Role);
      //Checking wheather the patient profile is already exist or not
      if (res.status !== 409) {
        //if not it execute this
        alert(`${role} profile registered successfully`);
        localStorage.setItem("role", formDetails.Role);
        navigate("/login");
      } else {
        //otherwise it will execute this
        alert(res.msg);
        return;
      }
    } catch (e) {
      alert("Something went wrong");
    }
    setFormDetails(initialFormDetails);
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div className="">
      <div className="px-4 py-10 bg-gray-300 w-6/12 flex flex-col m-auto">
        <h1>Create your Profile</h1>
        <p>Patients are required to register their information on this form.</p>
        <form className="flex flex-col py-5 gap-1" onSubmit={handleFormSubmit}>
          <label>Enter your Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formDetails.fullName}
            className=" border-black border"
            onChange={(e) => handleFormChange(e)}
            required
          />{" "}
          <br />
          <label>Enter your Email:</label>
          <input
            type="email"
            name="email"
            value={formDetails.email}
            className=" border-black border"
            onChange={(e) => handleFormChange(e)}
            required
          />
          {errorMessage === "Email is not valid" && (
            <p className=" text-red-500 font-bold">{errorMessage}</p>
          )}
          <br />
          <label>Phone Number:</label>{" "}
          <input
            type="number"
            name="phoneNumber"
            value={formDetails.phoneNumber}
            className=" border-black border"
            onChange={(e) => handleFormChange(e)}
            required
          />{" "}
          <br />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formDetails.password}
            className=" border-black border"
            onChange={(e) => handleFormChange(e)}
            required
          />{" "}
          {errorMessage === "Password is not valid" && (
            <p className=" text-red-500 font-bold">{errorMessage}</p>
          )}
          <br />
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formDetails.confirmPassword}
            className=" border-black border"
            onChange={(e) => handleFormChange(e)}
            required
          />{" "}
          <br />
          <label>Role:</label>
          <select
            className="mx-1 px-2 py-2 sm:py-2 rounded-lg bg-gray-800 border-gray-800 text-gray-200 font-bold"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="option">Select a option</option>
            <option value="patients">Patient</option>
            <option value="doctors">Doctor</option>
            <option value="admins">Admin</option>
          </select>
          {errorMessage === "Please select the role" && (
            <p className=" text-red-500 font-bold">{errorMessage}</p>
          )}
          <br />
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formDetails.dateOfBirth}
            className=" border-black border"
            onChange={(e) => handleFormChange(e)}
            required
          />{" "}
          <br />
          <label>Gender:</label>
          <input
            type="text"
            name="gender"
            value={formDetails.gender}
            className=" border-black border"
            onChange={(e) => handleFormChange(e)}
            required
          />{" "}
          <br />
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formDetails.address}
            className=" border-black border"
            onChange={(e) => handleFormChange(e)}
            required
          />{" "}
          <br />
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formDetails.city}
            className=" border-black border"
            onChange={(e) => handleFormChange(e)}
            required
          />{" "}
          <br />
          <label>State:</label>
          <input
            type="text"
            name="state"
            value={formDetails.state}
            className=" border-black border"
            onChange={(e) => handleFormChange(e)}
            required
          />{" "}
          <br />
          <label>Pin Code:</label>
          <input
            type="number"
            name="pinCode"
            value={formDetails.pinCode}
            className=" border-black border"
            onChange={(e) => handleFormChange(e)}
            required
          />{" "}
          <br />
          <label>Medical History:</label>
          <textarea
            type="string"
            name="medicalHistory"
            value={formDetails.medicalHistory}
            className=" border-black border"
            onChange={(e) => handleFormChange(e)}
            required
          />{" "}
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
