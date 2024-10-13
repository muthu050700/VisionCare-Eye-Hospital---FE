import React from "react";

const DoctorSpecialties = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between p-6 bg-gray-100">
      {/* SVG Section */}
      <div className="flex-1 lg:w-1/2 mb-6 lg:mb-0">
        <img
          src="https://www.ucsfhealth.org/-/media/project/ucsf/ucsf-health/images/home/specialize-desktop-100-2.jpg?rev=8108a2e6e84e474f9a13831a4dba5e10&hash=403FB800973706BBAEF85D2E1B51669C"
          alt="Doctors"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Text Content Section */}
      <div className="flex-1 lg:w-1/2 lg:pl-10">
        <h2 className="text-5xl font-bold mb-4">
          Our Doctors Specialize in You
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          From treating the rarest symptoms to performing the most complicated
          surgeries, we have expertise in your condition.
        </p>
        <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
          Browse by Specialty
        </button>
      </div>
    </div>
  );
};

export default DoctorSpecialties;
