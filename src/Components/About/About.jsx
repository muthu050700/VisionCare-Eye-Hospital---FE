import React from "react";

const About = () => {
  return (
    <>
      {/* Section 1: Welcome Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-12">
        {/* Left Side - Image */}
        <div className="lg:w-1/2 w-full">
          <img
            src="https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?cs=srgb&dl=pexels-pixabay-269077.jpg&fm=jpg"
            alt="About NexGen Eye Care Hospital"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Content */}
        <div className="lg:w-1/2 w-full p-8 lg:p-12 space-y-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-blue-600">
            Welcome To NexGen Eye Care Hospitals
          </h1>
          <p className="text-lg text-gray-700">
            Our patients are our top priority. We provide exceptional medical
            care with a dedicated team of specialists committed to delivering
            the highest standards of healthcare.
          </p>
          <p className="text-lg text-gray-700">
            Our mission is to enhance the well-being of our community by
            offering advanced medical services in a compassionate, welcoming
            environment. Whether you’re here for a routine check-up or
            specialized treatment, we ensure personalized care that meets your
            individual needs.
          </p>
          <p className="text-lg text-gray-700">
            On behalf of all our doctors, nurses, and staff, we warmly welcome
            you to our hospital. We are privileged to support you in your
            healthcare journey. Our goal is to offer the most up-to-date
            treatments, utilizing the latest medical technology to ensure you
            receive the best care possible.
          </p>
          <p className="text-lg text-gray-700">
            We are here to help you achieve optimal health and recovery, and we
            strive to provide an outstanding patient experience in every aspect
            of your visit.
          </p>
        </div>
      </div>

      {/* Section 2: Visual and Informational Section */}
      <div className="flex justify-center">
        {" "}
        <div className="flex flex-col w-full xl:flex-row gap-10 xl:max-w-[1400px] xl:h-[600px] px-4 xl:px-0 my-12">
          {/* Left Side - Images */}
          <div className="flex flex-col md:w-full xl:w-[600px] md:h-[600px] xl:h-auto items-start relative gap-6">
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
              <img
                src="https://img.freepik.com/free-photo/eye-doctor-with-female-patient-examination-modern-clinic-ophthalmologist-is-using-special-medical-equipment-eye-health_657921-161.jpg?ga=GA1.1.1839056023.1727741580&semt=ais_hybrid"
                className="rounded-lg shadow-md object-cover w-full h-full"
              />
            </div>
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] self-end">
              <img
                src="https://img.freepik.com/free-photo/woman-checking-some-new-glasses_23-2149082473.jpg?ga=GA1.1.1839056023.1727741580"
                className="rounded-lg shadow-md object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Right Side - Informational Content */}
          <div className="flex justify-center bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-lg shadow-lg">
            <div className="bg-white md:xl:w-[600px] xl:w-[700px] md:h-[600px] p-8 rounded-lg shadow-xl">
              <h1 className="font-bold text-2xl md:text-3xl xl:text-4xl pb-5 text-center text-blue-800">
                NexGen Eye Care: A Vision for Excellence
              </h1>
              <div className="flex flex-col gap-6 text-gray-700 leading-relaxed">
                <p>
                  NexGen Eye Care Hospitals is a trusted name in eye health,
                  built on a legacy of outstanding ophthalmic care. With
                  state-of-the-art technology and a patient-centric approach, we
                  provide world-class eye care services to people from all walks
                  of life.
                </p>
                <p>
                  Our hospital was founded by Dr. Kiruthika Subramanian, a
                  renowned ophthalmologist with a passion for advancing eye care
                  and helping patients achieve their best vision. Her expertise
                  and dedication have shaped Kiruthika Eye Care into a leading
                  center for eye treatment and surgery.
                </p>
                <p>
                  From routine eye exams to complex surgeries, we are committed
                  to offering innovative treatments and personalized care,
                  ensuring that our patients experience the best possible
                  outcomes in their eye health journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
