import { useContext, useEffect, useState } from "react";
import {
  patientAppointmentCancel,
  patientRescheduleAppointment,
} from "../APIs/apis";
const BE_URL = import.meta.env.VITE_BE_URL; //vite is must
const token = localStorage.getItem("token");

const PatientAppointments = () => {
  // Appointments state
  const [appointments, setAppointments] = useState([]);
  const [rescheduleDate, setRescheduleDate] = useState({});
  const [rescheduleTime, setRescheduleTime] = useState({});
  const [cancelledAppointments, setCancelledAppointments] = useState([]);
  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole");
  const patientId = userId;

  // Fetch appointments when patientId is available
  useEffect(() => {
    if (patientId) {
      fetchData();
    }
  }, []);

  // Fetch the patient's appointments
  const fetchData = async () => {
    try {
      const res = await fetch(
        `${BE_URL}/book-appointment/appointment-status/${patientId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      );

      const data = await res.json();
      if (data.msg === "Access denied") alert(data.msg);
      // Split the appointmentDate into date and time
      const updatedAppointments = data.map((appointment) => ({
        ...appointment,
        appointmentDate: new Date(
          appointment.appointmentDate
        ).toLocaleDateString(),
        appointmentTime: new Date(
          appointment.appointmentDate
        ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }));

      setAppointments(updatedAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  // Handle the rescheduling of an appointment
  const handleRescheduleChange = async (id, value) => {
    setRescheduleDate({
      ...rescheduleDate,
      [id]: value,
    });
  };

  const handleRescheduleTimeChange = (id, value) => {
    setRescheduleTime({
      ...rescheduleTime,
      [id]: value,
    });
  };

  const handleReschedule = async (appointmentId) => {
    const updatedAppointment = {
      rescheduledDate: rescheduleDate[appointmentId],
      rescheduledTime: rescheduleTime[appointmentId],
    };

    try {
      const res = await patientRescheduleAppointment(
        appointmentId,
        updatedAppointment
      );

      const data = await res.json();
      if (data.msg) {
        alert("Appointment rescheduled successfully!");
        fetchData();
      } else {
        alert("Failed to reschedule the appointment");
      }
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
    }
  };

  // Handle cancellation of an appointment
  const handleCancel = async (appointmentId) => {
    try {
      const res = await patientAppointmentCancel(appointmentId);

      const data = await res.json();
      if (data.msg) {
        alert("Appointment cancelled successfully!");
        setCancelledAppointments([...cancelledAppointments, appointmentId]);
        fetchData();
      } else {
        alert("Failed to cancel the appointment");
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">
        {userRole !== "patient" ? "Your Appointments" : "Appointment Status"}
      </h2>
      <div className="overflow-x-auto hidden lg:block">
        <table className="table-auto w-full text-left border-collapse">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Email</th>
              {userRole !== "patient" && <th className="px-4 py-2">Phone</th>}
              {userRole !== "patient" && (
                <th className="px-4 py-2">Date of Birth</th>
              )}
              <th className="px-4 py-2">Appointment Date</th>
              <th className="px-4 py-2">Appointment Time</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Reschedule</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length !== 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment.id} className="border-b">
                  <td className="px-4 py-2">{appointment.fullName}</td>
                  <td className="px-4 py-2">{appointment.email}</td>
                  {userRole !== "patient" && (
                    <td className="px-4 py-2">{appointment.phoneNumber}</td>
                  )}
                  {userRole !== "patient" && (
                    <td className="px-4 py-2">
                      {new Date(appointment.dateOfBirth).toLocaleDateString()}
                    </td>
                  )}

                  <td className="px-4 py-2">
                    {appointment.appointmentDate === "Invalid Date"
                      ? appointment.rescheduledDate
                      : appointment.appointmentDate}
                  </td>
                  <td className="px-4 py-2">
                    {appointment.appointmentDate === "Invalid Date"
                      ? appointment.rescheduledTime
                      : appointment.appointmentTime}
                  </td>
                  <td className="px-4 py-2">{appointment.appointmentType}</td>
                  <td className={`px-4 py-2`}>
                    <p
                      className={`${
                        appointment.status === "approved"
                          ? " bg-green-800 text-white h-fit px-2 py-2 rounded"
                          : "bg-red-700 text-white h-fit px-2 py-2 rounded"
                      }`}
                    >
                      {appointment.status}
                    </p>
                  </td>
                  {appointment.status !== "Appointment cancelled" ? (
                    <td className="px-4 py-2">
                      <input
                        type="date"
                        value={rescheduleDate[appointment.id] || ""}
                        onChange={(e) =>
                          handleRescheduleChange(appointment.id, e.target.value)
                        }
                        className="w-full px-2 py-1 border rounded"
                      />
                      <input
                        type="time"
                        value={rescheduleTime[appointment.id] || ""}
                        onChange={(e) =>
                          handleRescheduleTimeChange(
                            appointment.id,
                            e.target.value
                          )
                        }
                        className="w-full px-2 py-1 border rounded"
                      />
                      <button
                        onClick={() => handleReschedule(appointment.id)}
                        className="bg-green-500 text-white mt-2 px-4 py-2 rounded hover:bg-green-600"
                      >
                        Reschedule
                      </button>
                    </td>
                  ) : (
                    <td>
                      After cancelled the appointment you can't reschedule
                    </td>
                  )}

                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleCancel(appointment.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      disabled={cancelledAppointments.includes(appointment.id)}
                    >
                      {appointment.status === "Appointment cancelled"
                        ? "Cancelled"
                        : "Cancel"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-4">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Card Layout */}
      <div className="block lg:hidden space-y-4">
        {appointments.length !== 0 ? (
          appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="border border-gray-300 rounded-lg p-4 shadow-md"
            >
              <p className="text-lg font-semibold">
                Full Name: {appointment.fullName}
              </p>
              <p>Email: {appointment.email}</p>
              {userRole !== "patient" && (
                <p>Phone: {appointment.phoneNumber}</p>
              )}
              {userRole !== "patient" && (
                <p>
                  Date of Birth:{" "}
                  {new Date(appointment.dateOfBirth).toLocaleDateString()}
                </p>
              )}
              <p>Appointment Date: {appointment.appointmentDate}</p>
              <p>Appointment Time: {appointment.appointmentTime}</p>
              <p>Type: {appointment.appointmentType}</p>
              <p
                className={`${
                  appointment.status === "approved"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                Status: {appointment.status}
              </p>

              {appointment.status !== "Appointment cancelled" ? (
                <div>
                  <label htmlFor="rescheduleDate">Reschedule Date:</label>
                  <input
                    type="date"
                    value={rescheduleDate[appointment.id] || ""}
                    onChange={(e) =>
                      handleRescheduleChange(appointment.id, e.target.value)
                    }
                    className="w-full px-2 py-1 border rounded mt-1"
                  />

                  <label htmlFor="rescheduleTime">Reschedule Time:</label>
                  <input
                    type="time"
                    value={rescheduleTime[appointment.id] || ""}
                    onChange={(e) =>
                      handleRescheduleTimeChange(appointment.id, e.target.value)
                    }
                    className="w-full px-2 py-1 border rounded mt-1"
                  />

                  <button
                    onClick={() => handleReschedule(appointment.id)}
                    className="bg-green-500 text-white mt-2 px-4 py-2 rounded hover:bg-green-600"
                  >
                    Reschedule
                  </button>
                </div>
              ) : (
                <p>After cancellation, rescheduling is not possible</p>
              )}

              <button
                onClick={() => handleCancel(appointment.id)}
                className="bg-red-500 text-white mt-2 px-4 py-2 rounded hover:bg-red-600 w-full"
                disabled={cancelledAppointments.includes(appointment.id)}
              >
                {appointment.status === "Appointment cancelled"
                  ? "Cancelled"
                  : "Cancel"}
              </button>
            </div>
          ))
        ) : (
          <p>No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default PatientAppointments;
