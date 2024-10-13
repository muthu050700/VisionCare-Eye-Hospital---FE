import React, { useEffect, useState } from "react";
const BE_URL = import.meta.env.VITE_BE_URL; //vite is must

const AssignAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]); // State for storing doctors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState({}); // State to hold selected doctor for each appointment

  // Fetch appointments and doctors from the backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`${BE_URL}/book-appointment`); // Update with your actual API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        setError("Error fetching appointments");
      }
    };

    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${BE_URL}/api/users`); // Update with your actual API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setDoctors(data);
      } catch (error) {
        setError("Error fetching doctors");
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchAppointments(), fetchDoctors()]); // Fetch both appointments and doctors concurrently
      setLoading(false);
    };

    fetchData();
  }, []);

  // Function to handle assigning a doctor
  const handleAssignDoctor = async (appointmentId) => {
    const doctorId = selectedDoctor[appointmentId];

    // Check if a doctor is selected
    if (!doctorId) {
      alert("Please select a doctor before assigning.");
      return;
    }

    // Implement the API call to update the appointment with the assigned doctor
    console.log(
      `Assigned Doctor: ${doctorId} to Appointment ID: ${appointmentId}`
    );

    // Example API call to update appointment
    try {
      const response = await fetch(
        `${BE_URL}/book-appointment/assign-appointments/${appointmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ doctorId }), // Pass the selected doctor ID
        }
      );

      // Optionally, update the local state or re-fetch appointments here
      const updatedAppointment = await response.json();
      alert(updatedAppointment.msg);
      setAppointments((prevAppointments) =>
        prevAppointments.map((app) =>
          app.id === updatedAppointment.id ? updatedAppointment : app
        )
      );
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  // Loading and error handling
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  console.log(appointments[0].email);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Full Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date of Birth
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Doctor Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Assign Doctor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {appointment.fullName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {appointment.dateOfBirth}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {appointment.phoneNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {appointment.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {appointment.address}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {appointment.doctorRole}
              </td>
              {doctors
                .filter((doctor) => doctor.role === appointment.doctorRole)
                .map((doctor) => (
                  <>
                    {" "}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <select
                        value={selectedDoctor[appointment.id] || ""}
                        onChange={(e) =>
                          setSelectedDoctor({
                            ...selectedDoctor,
                            [appointment.id]: e.target.value,
                          })
                        }
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                      >
                        <option value="">Select Doctor</option>
                        {doctors
                          .filter(
                            (doctor) => doctor.role === appointment.doctorRole
                          )
                          .map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                              {doctor.fullName} - {doctor.role}
                            </option>
                          ))}
                      </select>
                    </td>
                  </>
                ))}

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {doctors
                  .filter((doctor) => {
                    return doctor.role === appointment.doctorRole;
                  })
                  .map((doctor) => {
                    return doctor.id === appointment.doctorId ? (
                      <p
                        key={doctor.id}
                        className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700 transition-colors"
                      >
                        Assigned
                      </p>
                    ) : (
                      <button
                        key={doctor.id} // This key prop for the <button> remains the same
                        onClick={() => handleAssignDoctor(appointment.id)}
                        className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition-colors"
                      >
                        Assign
                      </button>
                    );
                  })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignAppointment;
