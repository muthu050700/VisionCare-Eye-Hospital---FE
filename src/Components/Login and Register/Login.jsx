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
        const patientJSON = JSON.stringify(res.patient);
        localStorage.setItem("userEmail", JSON.parse(patientJSON).email);
        localStorage.setItem("userLogged", JSON.stringify(res.patient.Role));
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
