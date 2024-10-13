import React from "react";

const services = [
  {
    title: "Urgent",
    description: "Stomach pain, Trauma, Headache, Car Accidents...",
    image: "https://via.placeholder.com/150", // Sample image URL
  },
  {
    title: "Adults",
    description: "Primary Care, Physicals, Immunizations",
    image: "https://via.placeholder.com/150", // Sample image URL
  },
  {
    title: "Oncology",
    description: "Prevention, diagnosis, and treatment of cancer.",
    image: "https://via.placeholder.com/150", // Sample image URL
  },
  {
    title: "Emergency & Trauma",
    description:
      "Deliver rapid treatment when a patient is in the crucial edge.",
    image: "https://via.placeholder.com/150", // Sample image URL
  },
];

const ServicesCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
      {services.map((service, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
        >
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {service.title}
            </h2>
            <p className="text-gray-600">{service.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesCard;
