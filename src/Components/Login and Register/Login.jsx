import React, { useState } from "react";
import { patientLoginApi } from "../APIs/apis";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginFormDetails, setLoginFormDetails] = useState({
    email: "",
    password: "",
  });
  const isAuthenticated = Boolean(localStorage.getItem("patient"));
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
      const res = await patientLoginApi({ email, password });
      alert(res.msg);
      localStorage.setItem("patient", JSON.stringify(res.patient));
      navigate("/");
    } catch (e) {
      console.log("error", e);
      alert(e.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="px-4 py-10 bg-gray-300 w-6/12 flex flex-col m-auto">
      <h1>Login</h1>
      <form
        className="flex flex-col py-5 gap-1"
        onSubmit={handleLoginFormSubmit}
      >
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={loginFormDetails.email}
          className=" border-black border"
          onChange={(e) => handleLoginFormChange(e)}
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={loginFormDetails.password}
          className=" border-black border"
          onChange={(e) => handleLoginFormChange(e)}
        />{" "}
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
