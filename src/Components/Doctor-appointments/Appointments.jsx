import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
const BE_URL = import.meta.env.VITE_BE_URL; //vite is must
const token = localStorage.getItem("token");

const DoctorAppointments = () => {
  // Appointments state
  const [appointments, setAppointments] = useState([]);
  const [rescheduleDate, setRescheduleDate] = useState({});
  const [rescheduleTime, setRescheduleTime] = useState({});
  const [status, setStatus] = useState({});

  // Get doctor ID from the JWT token
  const getDoctorId = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.id;
    }
    return null;
  };

  const doctorId = getDoctorId();
  console.log(doctorId);
  // Fetch appointments when doctorId is available
  useEffect(() => {
    if (doctorId) {
      fetchData();
    }
  }, [doctorId]);

  // Fetch the doctor's appointments
  const fetchData = async () => {
    try {
      const res = await fetch(`${BE_URL}/doctor/appointments/${doctorId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=utf-8",
        },
      });

      const data = await res.json();
      if (data.msg === "Access denied") alert(data.msg);

      // Format appointments
      const updatedAppointments = data.appointments.map((appointment) => ({
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
  const handleRescheduleChange = (id, value) => {
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
      const res = await fetch(
        `${BE_URL}/book-appointment/doctor/reschedule/${appointmentId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(updatedAppointment),
        }
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

  // Handle status update (Approved/Rejected)
  const handleStatusChange = (id, value) => {
    setStatus({
      ...status,
      [id]: value,
    });
  };

  const handleStatusUpdate = async (appointmentId) => {
    const updatedStatus = {
      status: status[appointmentId],
    };

    try {
      const res = await fetch(
        `${BE_URL}/book-appointment/doctor/update-status/${appointmentId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(updatedStatus),
        }
      );

      const data = await res.json();
      if (data.msg) {
        alert("Status updated successfully!");
        fetchData();
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Appointments</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="px-4 py-2 border-b-2 border-gray-300 font-semibold">
                Full Name
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-300 font-semibold">
                Email
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-300 font-semibold">
                Phone
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-300 font-semibold">
                Date of Birth
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-300 font-semibold">
                Appointment Date
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-300 font-semibold">
                Appointment Time
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-300 font-semibold">
                Type
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-300 font-semibold">
                Status
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-300 font-semibold">
                Reschedule
              </th>
            </tr>
          </thead>

          <tbody>
            {appointments.length !== 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment.id} className="border-b">
                  <td className="px-4 py-2">{appointment.fullName}</td>
                  <td className="px-4 py-2">{appointment.email}</td>
                  <td className="px-4 py-2">{appointment.phoneNumber}</td>
                  <td className="px-4 py-2">
                    {new Date(appointment.dateOfBirth).toLocaleDateString()}
                  </td>
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
                  {appointment.status !== "Appointment cancelled" ? (
                    <td className="px-4 py-2">
                      <select
                        value={status[appointment.id] || appointment.status}
                        onChange={(e) =>
                          handleStatusChange(appointment.id, e.target.value)
                        }
                        className="px-2 py-1 border rounded"
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      <button
                        onClick={() => handleStatusUpdate(appointment.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Update Status
                      </button>
                    </td>
                  ) : (
                    <td>Appointment cancelled by patient</td>
                  )}

                  {appointment.status !== "Appointment cancelled" && (
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
                        className="w-full px-2 py-1 border rounded mt-2"
                      />
                      <button
                        onClick={() => handleReschedule(appointment.id)}
                        className="bg-green-500 text-white mt-2 px-4 py-2 rounded hover:bg-green-600"
                      >
                        Reschedule
                      </button>
                    </td>
                  )}
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
    </div>
  );
};

export default DoctorAppointments;
