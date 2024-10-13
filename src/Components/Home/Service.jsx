import React from "react";

const services = [
  {
    title: "Emergency Eye Care",
    description:
      "Immediate attention for eye injuries, infections, and trauma.",
    image:
      "https://expertsonsight.com/wp-content/uploads/2022/10/ExpertsOnSight-SupportingImages-October2022-EmergencyEyeCare.jpg",
  },
  {
    title: "Routine Eye Exams",
    description:
      "Comprehensive eye exams for early detection of vision problems.",
    image:
      "https://s3.amazonaws.com/static.organiclead.com/Site-63f1c040-b367-443d-81a0-6c9682e4de00/shutterstock_662473075.jpg",
  },
  {
    title: "Cataract Surgery",
    description:
      "Safe and effective surgery for cataract removal and lens replacement.",
    image:
      "https://mmchokshieyehospital.com/wp-content/uploads/2021/01/cataract-surgery-_500.jpg",
  },
  {
    title: "Glaucoma Management",
    description:
      "Diagnosis and treatment plans to manage and prevent vision loss.",
    image:
      "https://www.globaleyeclinic.com/wp-content/uploads/2024/08/glaucoma.jpg",
  },
];

const ServicesCard = () => {
  return (
    <div className="py-14">
      {" "}
      <h1 className="text-4xl font-bold text-center py-4">Our Services</h1>{" "}
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
    </div>
  );
};

export default ServicesCard;
