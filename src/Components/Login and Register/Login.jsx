import React, { useState } from "react";
import { doctorLoginApi, patientLoginApi } from "../APIs/apis";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginFormDetails, setLoginFormDetails] = useState({
    email: "",
    password: "",
  });
  const role = localStorage.getItem("role");
  // const isAuthenticated = Boolean(localStorage.getItem("userType"));
  // handle login form details
  const handleLoginFormChange = (e) => {
    setLoginFormDetails({
      ...loginFormDetails,
      [e.target.name]: e.target.value,
    });
  };

  //handle login form submit
  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    if (role === "patients") {
      try {
        const { email, password } = loginFormDetails;
        const res = await patientLoginApi({ email, password });
        alert(res.msg);
        const patientJSON = JSON.stringify(res.user);
        localStorage.setItem("userEmail", JSON.parse(patientJSON).email);
        localStorage.setItem("userLogged", JSON.stringify(res.user.Role));
        localStorage.setItem("userType", JSON.parse(patientJSON).Role);
        navigate("/");
      } catch (e) {
        console.log("error", e);
        alert(e.message);
      }
    } else if (role === "doctors") {
      try {
        const { email, password } = loginFormDetails;
        const res = await doctorLoginApi({ email, password });
        console.log(res);
        alert(res.msg);
        const patientJSON = JSON.stringify(res.doctor);
        localStorage.setItem("userEmail", JSON.parse(patientJSON).email);
        localStorage.setItem("userLogged", JSON.stringify(res.doctor.Role));
        localStorage.setItem("userType", JSON.parse(patientJSON).Role);
        navigate("/");
      } catch (e) {
        console.log("error", e);
        alert(e.message);
      }
    }
  };

  // if (isAuthenticated) {
  //   return <Navigate to="/" />;
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="px-6 py-10 bg-white shadow-lg rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-5 text-center text-gray-800">
          Login
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleLoginFormSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={loginFormDetails.email}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              onChange={(e) => handleLoginFormChange(e)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={loginFormDetails.password}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              onChange={(e) => handleLoginFormChange(e)}
              required
            />
          </div>
          <button
            type="submit"
            className="mt-5 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
