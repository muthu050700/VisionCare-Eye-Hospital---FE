import React, { useContext } from "react";
import { userRoleContext } from "../Context/Context"; // Assuming context is set up

const About = () => {
  const { userRole } = useContext(userRoleContext);

  const adminContent = (
    <div className="flex flex-col items-center space-y-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm">
        <img
          src="https://via.placeholder.com/400x200.png?text=Admin+Management"
          alt="Admin Management"
          className="w-full"
        />
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Admin Management</h2>
          <p className="text-gray-600">
            Our administrative team ensures smooth and efficient hospital
            operations, handling all management tasks, including system roles,
            permissions, and hospital services.
          </p>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm">
        <img
          src="https://via.placeholder.com/400x200.png?text=Role+Assignment"
          alt="Role Assignment"
          className="w-full"
        />
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Role Assignment</h2>
          <p className="text-gray-600">
            Admins can assign roles to new staff, oversee daily operations, and
            manage doctor-patient interactions to maintain high-quality care.
          </p>
        </div>
      </div>
    </div>
  );

  const doctorContent = (
    <div className="flex flex-col items-center space-y-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm">
        <img
          src="https://via.placeholder.com/400x200.png?text=Doctor+Excellence"
          alt="Doctor Excellence"
          className="w-full"
        />
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Excellence in Care</h2>
          <p className="text-gray-600">
            Our doctors specialize in cutting-edge eye care treatments, focusing
            on cataracts, glaucoma, and other conditions to ensure the best
            patient outcomes.
          </p>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm">
        <img
          src="https://via.placeholder.com/400x200.png?text=Patient+Appointments"
          alt="Patient Appointments"
          className="w-full"
        />
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Patient Appointments</h2>
          <p className="text-gray-600">
            Our medical staff manages appointments efficiently, ensuring each
            patient receives the care they need when they need it most.
          </p>
        </div>
      </div>
    </div>
  );

  const userContent = (
    <div className="flex flex-col items-center space-y-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm">
        <img
          src="https://via.placeholder.com/400x200.png?text=Quality+Care"
          alt="Quality Care"
          className="w-full"
        />
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Compassionate Care</h2>
          <p className="text-gray-600">
            As patients, we prioritize your health and well-being. Our facility
            provides the highest level of care to all patients in need of eye
            care services.
          </p>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm">
        <img
          src="https://via.placeholder.com/400x200.png?text=Advanced+Technology"
          alt="Advanced Technology"
          className="w-full"
        />
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Advanced Technology</h2>
          <p className="text-gray-600">
            Our hospital utilizes the latest in medical technology, ensuring
            precise and safe treatment for all patients.
          </p>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (userRole) {
      case "admin":
        return adminContent;
      case "doctor":
        return doctorContent;
      case "user":
      default:
        return userContent;
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 py-12">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://via.placeholder.com/1920x1080.png?text=Hospital+Background')`,
          opacity: 0.3,
        }}
      ></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800">
            About Us -{" "}
            {userRole === "admin"
              ? "Administration"
              : userRole === "doctor"
              ? "Doctors"
              : "Patients"}
          </h1>
          <p className="mt-4 text-gray-700 text-lg">
            Learn more about our hospital services and the dedicated team that
            makes it all possible.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default About;
