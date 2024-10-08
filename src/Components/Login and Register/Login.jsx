import React, { useState } from "react";
import { userLogin } from "../APIs/apis";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginFormDetails, setLoginFormDetails] = useState({
    email: "",
    password: "",
  });

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
    try {
      const { email, password } = loginFormDetails;
      const res = await userLogin({ email, password });
      alert(res.msg);
      navigate("/");
    } catch (e) {
      console.log("error", e);
      alert(e.message);
    }
  };

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
