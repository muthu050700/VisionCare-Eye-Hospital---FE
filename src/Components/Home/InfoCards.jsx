import React from "react";
import { Link } from "react-router-dom";

const InfoCards = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6 py-8 px-4">
      {/* Our Doctors Card */}
      <div className="bg-white rounded-lg p-6 shadow-lg w-full md:w-80 transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Our Doctors</h2>
        <p className="text-gray-600 mb-6">
          Select a doctor and schedule an appointment.
        </p>
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 01-8 0M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <Link to="" className="text-blue-700 font-semibold hover:underline">
            DOCTORS &gt;
          </Link>
        </div>
      </div>

      {/* Our Location Card */}
      <div className="bg-white rounded-lg p-6 shadow-lg w-full md:w-80 transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Our Location</h2>
        <p className="text-gray-600 mb-6">
          Search our locations to find the one nearest you.
        </p>
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V8a4 4 0 10-8 0v3M12 15v4m-4 4h8"
            />
          </svg>
          <Link to="" className="text-blue-700 font-semibold hover:underline">
            DIRECTIONS AND PARKING &gt;
          </Link>
        </div>
      </div>

      {/* Appointments Card */}
      <div className="bg-white rounded-lg p-6 shadow-lg w-full md:w-80 transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Appointments</h2>
        <p className="text-gray-600 mb-6">
          Call <span className="text-pink-600 font-bold">+91-9962 242 000</span>{" "}
          or click to request a same-day appointment.
        </p>
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3M5 8h14M7 12h10m-7 8v-4m4 4v-4"
            />
          </svg>
          <Link
            to="/book-appointment"
            className="text-blue-700 font-semibold hover:underline"
          >
            REQUEST AN APPOINTMENT &gt;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InfoCards;
