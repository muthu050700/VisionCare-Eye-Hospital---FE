import { useState, useEffect, useContext } from "react";
import { userRoleContext } from "../Context/Context";

const BE_URL = import.meta.env.VITE_BE_URL; //vite is must
const token = localStorage.getItem("token");

const EditablePatientRecordsForm = () => {
  const [patients, setPatients] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [patientData, setPatientData] = useState({
    fullName: "",
    dateOfBirth: "",
    phoneNumber: "",
    email: "",
    consultationNotes: "",
    allergies: "",
    medicalConditions: "",
    currentMedications: "",
    diagnosis: "",
    treatmentPlan: "",
    followUpDate: "",
    additionalNotes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const { userId } = useContext(userRoleContext);

  const doctorId = userId;
  // Fetch the list of patients when the component mounts
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`${BE_URL}/medical-records`); // Use backticks here
        if (!response.ok) throw new Error("Failed to fetch patients.");

        const data = await response.json();
        console.log(data);
        setPatients(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPatients();
  }, []);

  // Fetch existing patient data when patientId changes
  useEffect(() => {
    const fetchPatientData = async () => {
      if (!patientId) return; // Don't fetch if no patient is selected
      try {
        const response = await fetch(
          `${BE_URL}/medical-records/patient-records/${patientId}`
        ); // Use backticks here
        if (!response.ok) throw new Error("Failed to fetch patient data.");

        const data = await response.json();
        setPatientData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPatientData();
  }, [patientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePatientSelect = (e) => {
    setPatientId(e.target.value); // Set selected patient ID
    setPatientData({
      // Reset patient data when a new patient is selected
      fullName: "",
      dateOfBirth: "",
      phoneNumber: "",
      email: "",
      consultationNotes: "",
      allergies: "",
      medicalConditions: "",
      currentMedications: "",
      diagnosis: "",
      treatmentPlan: "",
      followUpDate: "",
      additionalNotes: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const response = await fetch(
        `${BE_URL}/medical-records/patient-records/${patientId}`, // Use backticks here
        {
          method: "PUT", // Use PUT for updating existing records
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(patientData),
        }
      );

      if (response.ok) {
        setSuccessMessage("Patient records updated successfully!");
      } else {
        throw new Error("Failed to update patient records. Please try again.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit Patient Records</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      {successMessage && (
        <div className="mb-4 text-green-600">{successMessage}</div>
      )}

      {/* Patient Selection Dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700">Select Patient:</label>
        <select
          value={patientId}
          onChange={handlePatientSelect}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        >
          <option value="">--Select a Patient--</option>
          {patients.map(
            (patient) =>
              patient.doctorId === doctorId && (
                <option key={patient.id} value={patient.id}>
                  {patient.fullName}
                </option>
              )
          )}
        </select>
      </div>

      {/* Patient Information Form */}
      {patientId && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={patientData.fullName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Date of Birth:</label>
            <input
              type="date"
              name="dateOfBirth"
              value={patientData.dateOfBirth}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={patientData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={patientData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Consultation Details */}
          <div className="mb-4">
            <label className="block text-gray-700">Consultation Notes:</label>
            <textarea
              name="consultationNotes"
              value={patientData.consultationNotes}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="4"
            />
          </div>

          {/* Medical History */}
          <div className="mb-4">
            <label className="block text-gray-700">Allergies:</label>
            <input
              type="text"
              name="allergies"
              value={patientData.allergies}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">
              Previous Medical Conditions:
            </label>
            <textarea
              name="medicalConditions"
              value={patientData.medicalConditions}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="3"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Current Medications:</label>
            <textarea
              name="currentMedications"
              value={patientData.currentMedications}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="3"
            />
          </div>

          {/* Diagnosis */}
          <div className="mb-4">
            <label className="block text-gray-700">Diagnosis:</label>
            <input
              type="text"
              name="diagnosis"
              value={patientData.diagnosis}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Treatment Plan */}
          <div className="mb-4">
            <label className="block text-gray-700">Treatment Plan:</label>
            <textarea
              name="treatmentPlan"
              value={patientData.treatmentPlan}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="4"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">
              Follow-Up Appointment:
            </label>
            <input
              type="date"
              name="followUpDate"
              value={patientData.followUpDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Additional Notes:</label>
            <textarea
              name="additionalNotes"
              value={patientData.additionalNotes}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="4"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 text-white p-2 rounded-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Updating..." : "Update Patient Records"}
          </button>
        </form>
      )}
    </div>
  );
};

export default EditablePatientRecordsForm;
