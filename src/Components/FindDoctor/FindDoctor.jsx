import React, { useEffect, useState } from "react";

const FindDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const BE_URL = import.meta.env.VITE_BE_URL; // Ensure this is set in your environment variables

  // Fetch doctors data
  const fetchDoctors = async () => {
    try {
      const response = await fetch(`${BE_URL}/api/users`);
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const doctorRoles = ["cataracts", "glaucoma", "macular degeneration"];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Find a Doctor
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map(
          (doctor) =>
            doctorRoles.includes(doctor.role) && (
              <div
                key={doctor.id}
                className="border rounded-lg p-6 shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <h2 className="text-2xl font-semibold text-gray-800">
                  {doctor.fullName}
                </h2>
                <p className="text-gray-600 mt-2">
                  Phone:{" "}
                  <span className="text-gray-800 font-medium">
                    {doctor.phoneNumber}
                  </span>
                </p>
                <p className="text-gray-600">
                  Address:{" "}
                  <span className="text-gray-800 font-medium">
                    {doctor.address}
                  </span>
                </p>
                <p className="text-gray-600">
                  Gender:{" "}
                  <span className="text-gray-800 font-medium">
                    {doctor.gender}
                  </span>
                </p>
                <p className="text-gray-600">
                  Email:{" "}
                  <span className="text-gray-800 font-medium">
                    {doctor.email}
                  </span>
                </p>
                <p className="text-gray-600">
                  Specialization:{" "}
                  <span className="text-gray-800 font-medium">
                    {doctor.role}
                  </span>
                </p>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default FindDoctor;
