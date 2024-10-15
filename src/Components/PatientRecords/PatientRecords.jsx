import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import noRecord from "../../assets/no_data.svg";
const BE_URL = import.meta.env.VITE_BE_URL; // vite is must
const token = localStorage.getItem("token");

const PatientRecords = () => {
  const [patientRecords, setPatientRecords] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { pathname } = useLocation();
  const userRole = localStorage.getItem("userRole");
  const userId = localStorage.getItem("userId");
  const [selectedDoctors, setSelectedDoctors] = useState({}); // Track selected doctor for each patient
  const [noAccessMessageShown, setNoAccessMessageShown] = useState(false); // Track if "No Access" message has been shown
  const doctorRoles = ["cataracts", "glaucoma", "macular degeneration"];

  const doctorId = userId; //assigning userID has doctorID
  // Function to fetch patient records from the API
  const fetchPatientRecords = async () => {
    try {
      const response = await fetch(`${BE_URL}/medical-records`);
      if (!response.ok) {
        throw new Error("Failed to fetch patient records");
      }
      const data = await response.json();
      setPatientRecords(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Function to fetch doctors from the API
  const fetchDoctors = async () => {
    try {
      const response = await fetch(`${BE_URL}/api/users`);
      if (!response.ok) {
        throw new Error("Failed to fetch doctors");
      }
      const data = await response.json();
      setDoctors(data);
      console.log(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Function to give access to the selected doctor for a patient
  const giveAccess = async (patientId, doctorId) => {
    console.log(doctorId);
    try {
      const response = await fetch(`${BE_URL}/medical-records/give-access`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ patientId, doctorId, doctors }),
      });

      const res = await response.json();
      alert(res.msg);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchPatientRecords();
      await fetchDoctors();
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 h-screen">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Patient Records
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {userRole === "admin" ? (
          <>
            {patientRecords.map((record, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-white to-blue-50 border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow p-6"
              >
                <h3 className="font-bold text-xl mb-2 text-gray-700">
                  {record.fullName}
                </h3>

                <p className="text-sm text-gray-600 mb-2">
                  <strong>Date of Birth:</strong> {record.dateOfBirth}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Phone Number:</strong> {record.phoneNumber}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Email:</strong> {record.email}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Consultation Notes:</strong>{" "}
                  {record.consultationNotes}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Allergies:</strong> {record.allergies}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Medical Conditions:</strong>{" "}
                  {record.medicalConditions}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Current Medications:</strong>{" "}
                  {record.currentMedications}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Diagnosis:</strong> {record.diagnosis}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Treatment Plan:</strong> {record.treatmentPlan}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Follow-Up Date:</strong> {record.followUpDate}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Additional Notes:</strong> {record.additionalNotes}
                </p>

                {/* Doctor access info */}
                {record.doctorName && (
                  <p className="text-sm text-green-600 mt-2">
                    {`${record.doctorName} has access to this patient's medical records.`}
                  </p>
                )}

                {/* Doctor Selection Dropdown */}
                <select
                  value={selectedDoctors[record.id] || ""}
                  onChange={(e) =>
                    setSelectedDoctors({
                      ...selectedDoctors,
                      [record.id]: e.target.value,
                    })
                  }
                  className="mt-4 w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled>
                    Select Doctor
                  </option>
                  {doctors.map(
                    (doctor) =>
                      doctorRoles.includes(doctor.role) && (
                        <option key={doctor.id} value={doctor.id}>
                          {doctor.fullName} - {doctor.role}
                        </option>
                      )
                  )}
                </select>

                {/* Give Access Button */}
                <button
                  onClick={() =>
                    giveAccess(record.id, selectedDoctors[record.id])
                  }
                  className="mt-4 w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white px-3 py-2 rounded-lg font-semibold hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 transition-all disabled:opacity-50"
                  disabled={!selectedDoctors[record.id]}
                >
                  Give Access
                </button>
              </div>
            ))}
          </>
        ) : (
          <>
            {patientRecords.map(
              (record, index) =>
                record.doctorId === doctorId && (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-white to-yellow-50 border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow p-6"
                  >
                    <h3 className="font-bold text-xl mb-2 text-gray-700">
                      {record.fullName}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Date of Birth:</strong> {record.dateOfBirth}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Phone Number:</strong> {record.phoneNumber}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Email:</strong> {record.email}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Consultation Notes:</strong>{" "}
                      {record.consultationNotes}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Allergies:</strong> {record.allergies}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Medical Conditions:</strong>{" "}
                      {record.medicalConditions}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Current Medications:</strong>{" "}
                      {record.currentMedications}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Diagnosis:</strong> {record.diagnosis}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Treatment Plan:</strong> {record.treatmentPlan}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Follow-Up Date:</strong> {record.followUpDate}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Additional Notes:</strong>{" "}
                      {record.additionalNotes}
                    </p>

                    <Link to="/patient-editRecord-form">
                      <p className="mt-4 bg-gradient-to-r from-green-400 to-lime-500 text-white px-3 py-2 rounded-lg font-semibold text-center hover:bg-gradient-to-l transition-all">
                        Edit Record
                      </p>
                    </Link>
                  </div>
                )
            )}
            {!noAccessMessageShown &&
              patientRecords.every(
                (record) => record.doctorId !== doctorId
              ) && (
                <div className="max-w-2xl mx-auto mt-8">
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md flex items-center">
                    <div className="hidden lg:block">
                      <img src={noRecord} alt="Login" className="h-full" />
                    </div>
                    <div>
                      <p className="text-center">
                        No access to see the patient records. Please contact
                        Admin.
                      </p>
                    </div>
                  </div>
                </div>
              )}
          </>
        )}
      </div>
    </div>
  );
};

export default PatientRecords;
