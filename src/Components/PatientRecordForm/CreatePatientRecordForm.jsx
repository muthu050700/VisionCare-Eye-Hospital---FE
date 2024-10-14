import { useContext, useState } from "react";

const BE_URL = import.meta.env.VITE_BE_URL; // vite is must
const token = localStorage.getItem("token");
const initialFormDetails = {
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
};
const CreatePatientRecordForm = () => {
  const [patientData, setPatientData] = useState(initialFormDetails);

  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prevData) => ({ ...prevData, [name]: value }));
  };

  const doctorId = userId;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const response = await fetch(
        `${BE_URL}/medical-records/patient-records`,
        {
          method: "POST", // Use POST for creating a new record
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token for authorization
          },
          body: JSON.stringify({ patientData, doctorId }),
        }
      );

      if (response.ok) {
        setSuccessMessage("Patient record created successfully!");
        const recordToken = await response.json();
        setPatientData(initialFormDetails);
      } else {
        throw new Error("Failed to create patient record. Please try again.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create Patient Record</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      {successMessage && (
        <div className="mb-4 text-green-600">{successMessage}</div>
      )}

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
          <label className="block text-gray-700">Medical Conditions:</label>
          <input
            type="text"
            name="medicalConditions"
            value={patientData.medicalConditions}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Current Medications:</label>
          <input
            type="text"
            name="currentMedications"
            value={patientData.currentMedications}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

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

        <div className="mb-4">
          <label className="block text-gray-700">Treatment Plan:</label>
          <input
            type="text"
            name="treatmentPlan"
            value={patientData.treatmentPlan}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Follow-up Date:</label>
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

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-500 text-white py-2 rounded-md ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Loading..." : "Create Patient Record"}
        </button>
      </form>
    </div>
  );
};

export default CreatePatientRecordForm;
