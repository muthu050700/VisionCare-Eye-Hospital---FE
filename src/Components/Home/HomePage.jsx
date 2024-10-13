import { bg_Image } from "../../Utils/HeaderConstant";
import { findHospital } from "../../Utils/HomePageConstant";
import InfoCards from "./InfoCards";
import Service from "./Service";
import WhyChooseUs from "./WhyChooseUs";

const HomePage = () => {
  return (
    <div>
      {/* Hero Section with Background Image */}
      <div
        className="relative bg-cover bg-center w-full h-screen"
        style={{ backgroundImage: `url(${bg_Image})` }}
      >
        {/* Overlay for dark effect */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Main Content */}
        <div className="relative flex flex-col justify-center items-start h-full px-6 md:px-12 lg:px-20">
          {/* Heading */}
          <h1 className="text-white font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight mb-4">
            Delivering Happiness <br /> with Utmost Care.
          </h1>
          {/* Subheading */}
          <p className="text-gray-200 text-xl md:text-2xl lg:text-3xl mb-8">
            See the world better with the experts <br /> in eye care.
          </p>

          {/* Find Doctor/Hospital Buttons */}
          <div className="flex flex-wrap gap-4">
            {findHospital.map((f) => (
              <button
                key={f.id}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-full shadow-lg transition duration-300 ease-in-out"
              >
                <span>{f.icon}</span>
                <span>{f.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Info Cards Component */}
      <InfoCards />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Service Section */}
      <Service />
    </div>
  );
};

export default HomePage;
