import React from "react";

const Guideline = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Introduction */}
      <section className="mb-10">
        <h1 className="text-4xl font-bold text-center mb-6">
          Eye Hospital Management System Guide
        </h1>
        <p className="text-lg mb-4">
          Welcome to the Eye Hospital Management System. This system is designed
          to help you manage hospital operations efficiently. Here’s how
          different roles interact with the system and what features are
          available for each role.
        </p>
      </section>

      {/* Roles and Responsibilities Section */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-4">Roles & Responsibilities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Admin Role */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">Admin</h3>
            <p className="text-gray-600 mb-4">
              The Admin has full control of the system, including assigning
              roles, viewing all appointments, and managing hospital data.
              Admins can:
            </p>
            <ul className="list-disc ml-5 space-y-1 text-gray-600">
              <li>
                Manage users and assign roles (Doctor, Nurse, Receptionist,
                etc.)
              </li>
              <li>View and generate reports for hospital operations</li>
              <li>Monitor appointments and doctor availability</li>
            </ul>
          </div>

          {/* Doctor Role */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">Doctor</h3>
            <p className="text-gray-600 mb-4">
              Doctors can manage their appointments and view patient
              information. Doctors can:
            </p>
            <ul className="list-disc ml-5 space-y-1 text-gray-600">
              <li>View upcoming appointments</li>
              <li>Access patient medical history</li>
              <li>Update patient treatment records</li>
            </ul>
          </div>

          {/* Nurse Role */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">Nurse</h3>
            <p className="text-gray-600 mb-4">
              Nurses can assist doctors by managing patient records and viewing
              appointments. Nurses can:
            </p>
            <ul className="list-disc ml-5 space-y-1 text-gray-600">
              <li>Update patient medical records</li>
              <li>Assist doctors during appointments</li>
              <li>Help patients navigate the hospital</li>
            </ul>
          </div>

          {/* Patient Role */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">Patient</h3>
            <p className="text-gray-600 mb-4">
              Patients can book appointments and view their own medical history.
              Patients can:
            </p>
            <ul className="list-disc ml-5 space-y-1 text-gray-600">
              <li>Book an appointment with a doctor</li>
              <li>View and update their personal information</li>
              <li>Access past appointment history</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Navigation and Features Section */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-4">Navigation & Features</h2>
        <p className="text-lg mb-4">
          This system offers an intuitive interface for both patients and staff.
          Here's a quick overview of key features:
        </p>
        <ul className="list-disc ml-5 space-y-2 text-gray-600">
          <li>
            <strong>Appointment Booking:</strong> Patients can book appointments
            based on doctor availability.
          </li>
          <li>
            <strong>View Appointments:</strong> Doctors and patients can easily
            view their scheduled appointments.
          </li>
          <li>
            <strong>Edit Profile:</strong> Users can update their personal
            information in the profile section.
          </li>
          <li>
            <strong>Medical History:</strong> Doctors can view detailed patient
            medical records, and patients can see their treatment history.
          </li>
        </ul>
      </section>

      {/* Forms and Input Section */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-4">Forms & Inputs</h2>
        <p className="text-lg mb-4">
          Each user is required to fill out accurate information in forms for
          registration, profile editing, and appointment booking. The system
          includes validation checks to ensure that fields like email, phone
          number, and passwords are properly formatted.
        </p>
      </section>

      {/* Security and Permissions Section */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-4">Security & Permissions</h2>
        <p className="text-lg mb-4">
          The system uses Role-Based Access Control (RBAC) to manage what
          different users can view and edit. Based on your role (Admin, Doctor,
          Nurse, etc.), your permissions will vary. Admins have full access,
          while other roles have restricted access to ensure data privacy.
        </p>
      </section>

      {/* Frequently Asked Questions (FAQ) */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-4">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-bold">
              1. How do I book an appointment?
            </h3>
            <p className="text-gray-600">
              To book an appointment, log in as a patient and navigate to the
              "Book Appointment" section. Select your preferred doctor, choose
              an available time slot, and confirm your appointment.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-bold">2. Can I edit my appointment?</h3>
            <p className="text-gray-600">
              Yes, as a patient, you can reschedule or cancel an appointment
              before the appointment date. Navigate to the "My Appointments"
              section and choose the option to edit.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-bold">
              3. How do I view my medical history?
            </h3>
            <p className="text-gray-600">
              Patients can view their medical history by going to the "My
              Medical History" section, where all past appointments and
              treatment details are available.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-bold">
              4. What if I forgot my password?
            </h3>
            <p className="text-gray-600">
              You can reset your password by clicking on the "Forgot Password"
              link on the login page. You will receive an email with
              instructions to reset your password.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-bold">
              5. Who should I contact for technical issues?
            </h3>
            <p className="text-gray-600">
              If you experience any technical issues, please contact the
              hospital’s IT support team using the contact information provided
              on the "Contact Us" page.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Guideline;
