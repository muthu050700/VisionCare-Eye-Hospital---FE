// Importing Routing
import { BrowserRouter, Routes, Route, Navigate, json } from "react-router-dom";
import HomePage from "./Components/Home/HomePage";
import Body from "./Components/Body/Body";
import About from "./Components/About/About";
import Register from "./Components/Login and Register/Register";
import Login from "./Components/Login and Register/Login";
import VerifyAccount from "./Components/verify-account/VerifyAccount";

import PropTypes from "prop-types";
import Profile from "./Components/Login and Register/Profile";
import BookAppointment from "./Components/Book-appointment/BookAppointment";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
function App() {
  // const PrivateRoute = ({ component }) => {

  //   if (isAuthenticated) {
  //     return component;
  //   }
  //   return <Navigate to="/login" />;
  // };
  // PrivateRoute.propTypes = {
  //   component: PropTypes.node,
  // };
  const isAuthenticated = Boolean(localStorage.getItem("userLogged"));
  const userType = localStorage.getItem("userType");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          {/* unAuthorized route */}

          {!isAuthenticated && (
            <>
              {" "}
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </>
          )}

          {/* Protected Route */}
          <Route element={<ProtectedRoute />}>
            <Route path="/register" element={<Navigate to="/" />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route index element={<HomePage />} />
            {userType === "patients" && (
              <>
                <Route path="/book-appointment" element={<BookAppointment />} />
              </>
            )}
            {userType === "doctor" && <> </>}
            <Route path="/find_doctor" element={<About />} />
            <Route path="/guidelines" element={<About />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<About />} />
          <Route path="/verify-account" element={<VerifyAccount />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
