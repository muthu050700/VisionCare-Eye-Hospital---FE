import React from "react";

const WhyChooseUs = () => {
  return (
    <div
      className="bg-cover bg-right lg:bg-center w-full lg:h-screen "
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827775.jpg?t=st=1728844082~exp=1728847682~hmac=014e13372b34e7b763013715c47ff207cf11a04d5a19e7d339338de17ac49ae2&w=1060')", // Placeholder background image
      }}
    >
      <div className="absolute bg-black opacity-30 w-full lg:h-full "></div>{" "}
      {/* Overlay for better text visibility */}
      <div className=" flex flex-col justify-center items-start p-8 md:p-20">
        <h1 className="text-4xl font-bold  mb-6">Why Choose Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className=" rounded-lg shadow-lg p-6 bg-white/30">
            <h2 className="text-xl font-bold text-black-800 mb-2">
              Experience
            </h2>
            <p className="text-black-600 font-medium ">
              Be confident in the treatment plan and your doctor’s abilities.
            </p>
          </div>
          <div className="rounded-lg shadow-lg p-6 bg-white/30">
            <h2 className="text-xl font-bold text-black-800 mb-2">Expertise</h2>
            <p className="text-black-600 font-medium">
              Get the answers and assurance you deserve with accuracy you can
              trust.
            </p>
          </div>
          <div className=" rounded-lg shadow-lg p-6 bg-white/30">
            <h2 className="text-xl font-bold text-black-800 mb-2">
              Compassionate Care
            </h2>
            <p className="text-black-600 font-medium">
              We’re committed to delivering compassionate healthcare.
            </p>
          </div>
          <div className=" rounded-lg shadow-lg p-6 bg-white/30">
            <h2 className="text-xl font-bold text-black-800 mb-2">
              The Right Treatment
            </h2>
            <p className="text-black-600 font-medium">
              Rest assured, you’re receiving expert care.
            </p>
          </div>
        </div>
        <div className="mt-12  rounded-lg shadow-lg p-8 bg-white/30">
          <h2 className="text-2xl font-bold text-black-800 mb-4">About Us</h2>
          <p className="text-black-600 font-medium">
            Our mission is to provide you with exceptional healthcare services
            that are personalized to your needs. We prioritize your health and
            well-being, ensuring you receive the highest quality of care.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
