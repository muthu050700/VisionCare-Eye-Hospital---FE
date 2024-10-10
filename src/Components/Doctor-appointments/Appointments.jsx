import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
const token = localStorage.getItem("token");
const DoctorAppointments = () => {
  // Appointments state
  const [appointments, setAppointments] = useState([]);
  const getDoctorId = () => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      return decodedToken.id;
    }
    return null;
  };

  const doctorId = getDoctorId();
  console.log(doctorId);
  // Fetch appointments once doctorId is available
  useEffect(() => {
    if (doctorId) {
      fetchData();
    }
  }, [doctorId]); // Add doctorId as a dependency

  // Fetch the doctor's appointments
  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://localhost:4500/doctor/appointments/${doctorId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json;charset=utf-8",
          },
        } // Use doctorId dynamically
      );

      const data = await res.json();

      if (data.msg === "Access denied") alert(data.msg);
      console.log(data.appointments);
      setAppointments(data.appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };
  console.log(appointments);
  return (
    <div>
      <h2>Appointments for Dr. {doctorId}</h2>
      <ul>
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-5"
            >
              <div className="md:flex">
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    {appointment.fullName}
                  </h3>
                  <p className="text-gray-600">Email: {appointment.email}</p>
                  <p className="text-gray-600">
                    Phone: {appointment.phoneNumber}
                  </p>
                  <p className="text-gray-600">
                    Address: {appointment.address}
                  </p>
                  <p className="text-gray-600">
                    Date of Birth:{" "}
                    {new Date(appointment.dateOfBirth).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    Appointment Date:{" "}
                    {new Date(appointment.appointmentDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    Appointment Type: {appointment.appointmentType}
                  </p>

                  <div className="mt-4">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <li>No appointments found.</li>
        )}
      </ul>
    </div>
  );
};

export default DoctorAppointments;
