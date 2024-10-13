import { useContext, useState } from "react";
import { createAppointment } from "../APIs/apis";
import { doctorContext } from "../Context/Context";
import { userRoleContext } from "../Context/Context";
const initialFormData = {
  fullName: "",
  dateOfBirth: "",
  phoneNumber: "",
  email: "",
  address: "",
  doctorId: "Not assigned yet",
  appointmentDate: "",
  appointmentTime: "", // Add appointmentTime to the state
  appointmentType: "In-person", // Default to In-person consultation
  status: "Pending", // Default status when booking an appointment
};
const BookAppointment = () => {
  const [formData, setFormData] = useState(initialFormData);
  const doctorRoles = ["cataracts", "glaucoma", "macular degeneration"];
  const { doctorData } = useContext(doctorContext);
  const { userId } = useContext(userRoleContext);
  const patientId = userId;
  // Function to validate that the patient is at least 18 years old
  const isValidAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }
    return age;
  };

  // Function to ensure the appointment date is today or a future date
  const isValidAppointmentDate = (appointmentDate) => {
    const today = new Date();
    const selectedDate = new Date(appointmentDate);
    return selectedDate >= today.setHours(0, 0, 0, 0); // Set time to midnight for date comparison
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the age
    if (isValidAge(formData.dateOfBirth) < 18) {
      alert("You must be at least 18 years old to book an appointment.");
      return;
    }

    // Validate the appointment date
    if (!isValidAppointmentDate(formData.appointmentDate)) {
      alert("You can only book appointments for today or future dates.");
      return;
    }

    try {
      const res = await createAppointment({ formData, patientId }); // Make the API call
      alert(res.msg);
      setFormData(initialFormData);
    } catch (e) {
      alert("Something went wrong. Please try again.", e);
    }
    console.log("Form Data Submitted:", formData);
  };

  if (doctorData === null) return null;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Email Address */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Select Doctor */}
        {/* <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Select Doctor
          </label>
          <select
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          >
            <option value="">-- Select Doctor --</option>
            {doctorData.map(
              (val) =>
                doctorRoles.includes(val.role) && (
                  <option key={val.id} value={val.id}>
                    {val.fullName}-{val.role}
                  </option>
                )
            )}
          </select>
        </div> */}
        {/* Select Doctor Role */}
        {/* Select Doctor Role */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Select Doctor Role
          </label>
          <select
            name="doctorRole" // Use doctorRole here
            value={formData.doctorRole} // Bind to doctorRole in formData
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          >
            <option value="">-- Select Doctor Role --</option>
            {doctorRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Preferred Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Preferred Date
          </label>
          <input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Preferred Time */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Preferred Time
          </label>
          <input
            type="time"
            name="appointmentTime" // Add appointmentTime field
            value={formData.appointmentTime} // Bind to appointmentTime
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Appointment Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Appointment Type
          </label>
          <div className="flex space-x-4">
            <label>
              <input
                type="radio"
                name="appointmentType"
                value="In-person"
                checked={formData.appointmentType === "In-person"}
                onChange={handleChange}
              />{" "}
              In-person Consultation
            </label>
            <label>
              <input
                type="radio"
                name="appointmentType"
                value="Virtual"
                checked={formData.appointmentType === "Virtual"}
                onChange={handleChange}
              />{" "}
              Virtual Consultation
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Book Appointment
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookAppointment;
