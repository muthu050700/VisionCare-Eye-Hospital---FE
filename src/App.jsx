// Importing Routing
import { BrowserRouter, Routes, Route, Navigate, json } from "react-router-dom";
import HomePage from "./Components/Home/HomePage";
import Body from "./Components/Body/Body";
import About from "./Components/About/About";
import Register from "./Components/Login and Register/Register";
import Login from "./Components/Login and Register/Login";
import VerifyAccount from "./Components/verify-account/VerifyAccount";
import Profile from "./Components/Login and Register/Profile";
import BookAppointment from "./Components/Book-appointment/BookAppointment";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Appointments from "./Components/Doctor-appointments/Appointments";
function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          {/* unAuthorized route */}
          {!token && (
            <>
              {" "}
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </>
          )}

          {/* Protected Route */}
          <Route
            element={<ProtectedRoute allowedRoles={["patient", "doctor"]} />}
          >
            <Route path="/register" element={<Navigate to="/" />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route index element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<About />} />
            <Route path="/guidelines" element={<About />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* patient route */}
          <Route element={<ProtectedRoute allowedRoles={["patient"]} />}>
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/find_doctor" element={<About />} />
          </Route>
          {/* doctor route */}
          <Route element={<ProtectedRoute allowedRoles={["doctor"]} />}>
            <Route path="/appointments" element={<Appointments />} />
          </Route>

          <Route path="/verify-account" element={<VerifyAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
