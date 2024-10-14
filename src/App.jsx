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
import DoctotDashboard from "./Components/Doctor-dashboard/DoctotDashboard";
import PatientDashboard from "./Components/Patient-Dashboard/PatientDashboard";
import PatientAppointment from "./Components/Patient-appointment/PatientAppointment";
import PatientRecordsForm from "./Components/PatientRecordForm/CreatePatientRecordForm";
import EditPatientRecordForm from "./Components/PatientRecordForm/EditPatientRecordForm";
import PatientRecords from "./Components/PatientRecords/PatientRecords";
import AssignAppointment from "./Components/AssignAppointments/AssignAppointments";
import Contact from "./Components/Contact/Contact";
import Guideline from "./Components/GuideLine/GuideLine";
import { jwtDecode } from "jwt-decode";

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
            element={
              <ProtectedRoute
                allowedRoles={[
                  "patient",
                  "cataracts",
                  "glaucoma",
                  "macular degeneration",
                  "admin",
                ]}
              />
            }
          >
            <Route path="/register" element={<Navigate to="/" />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route index element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* patient route */}
          <Route element={<ProtectedRoute allowedRoles={["patient"]} />}>
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/find_doctor" element={<About />} />
            <Route
              path="/patient-appointment"
              element={<PatientAppointment />}
            />
          </Route>
          {/* doctor route */}
          <Route
            element={
              <ProtectedRoute
                allowedRoles={["cataracts", "glaucoma", "macular degeneration"]}
              />
            }
          >
            <Route path="/appointments" element={<Appointments />} />
            <Route
              path="/patient-record-form"
              element={<PatientRecordsForm />}
            />
            <Route
              path="/patient-editRecord-form"
              element={<EditPatientRecordForm />}
            />
          </Route>
          <Route
            element={
              <ProtectedRoute
                allowedRoles={[
                  "admin",
                  "cataracts",
                  "glaucoma",
                  "macular degeneration",
                ]}
              />
            }
          >
            {" "}
            <Route path="/patient-records" element={<PatientRecords />} />
            <Route path="/patient-dashboard" element={<PatientDashboard />} />
          </Route>
          {/* admin route */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/doctor-dashboard" element={<DoctotDashboard />} />
            <Route
              path="/assign-doctors-appointment"
              element={<AssignAppointment />}
            />
          </Route>
          <Route path="/verify-account" element={<VerifyAccount />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/guidelines" element={<Guideline />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
