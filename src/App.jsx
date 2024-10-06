// Importing Routing
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Components/Home/HomePage";
import Body from "./Components/Body/Body";
import About from "./Components/About/About";
import Register from "./Components/Login and Register/Register";
import Login from "./Components/Login and Register/Login";
import VerifyAccount from "./Components/verify-account/VerifyAccount";

import PropTypes from "prop-types";
import Profile from "./Components/Login and Register/Profile";
function App() {
  const PrivateRoute = ({ component }) => {
    const isAuthenticated = Boolean(localStorage.getItem("patient"));

    if (isAuthenticated) {
      return component;
    }
    return <Navigate to="/login" />;
  };
  PrivateRoute.propTypes = {
    component: PropTypes.node,
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<PrivateRoute component={<HomePage />} />} />
          <Route path="/about" element={<About />} />
          <Route path="/find_doctor" element={<About />} />
          <Route path="/contact" element={<About />} />
          <Route path="/guidelines" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-account" element={<VerifyAccount />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
