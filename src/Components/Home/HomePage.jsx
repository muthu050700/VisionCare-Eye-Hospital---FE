import { bg_Image } from "../../Utils/HeaderConstant";
import { findHospital } from "../../Utils/HomePageConstant";
import InfoCards from "./InfoCards";
import Service from "./Service";
const HomePage = () => {
  return (
    <div>
      {/* home backgroundImage */}
      <div
        className="bg-cover md:bg-top bg-center w-full h-screen"
        style={{ backgroundImage: `url(${bg_Image})` }}
      >
        <div className="absolute bg-black opacity-40 w-full h-screen"></div>

        <div className="flex flex-col justify-center h-full gap-5 pl-10">
          {/* Main page content */}{" "}
          <div>
            <h1 className=" font-normal text-[55px]">
              Delivering happiness <br /> with utmost care.
            </h1>
            <p className=" font-normal text-[35px]">
              See the world better with the experts <br /> in eye care.
            </p>
          </div>
          {/*  buttons to find the doctor and hospital */}
          <div className="flex gap-3">
            {findHospital.map((f) => (
              <div
                key={f.id}
                className="flex gap-1 bg-gray-500 w-fit px-3 py-4 rounded-full"
              >
                <p className="px-2">{f.icon}</p>
                <p className="px-3 border-l-2 text-lg">{f.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Info cards component */}
      <InfoCards />
      <Service />
    </div>
  );
};

export default HomePage;
