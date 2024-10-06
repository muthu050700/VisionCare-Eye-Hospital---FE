import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../../Utils/HeaderConstant";

const Header = () => {
  //Finding pathname
  const { pathname } = useLocation();
  return (
    <div>
      {/* for Emergencies and Appointment header */}
      <div className="flex justify-end bg-slate-400 py-2 gap-2 px-2">
        <button className="bg-pink-600 px-4 py-2 rounded-md font-medium text-white">
          For Emergencies
        </button>
        <button className="bg-pink-600 px-4 py-3 rounded-md font-bold text-white ">
          Book Appointment
        </button>
      </div>

      {/* logo and nav links */}
      <div className="bg-slate-300 flex justify-between ">
        <div className="flex">
          <img
            className="w-28"
            src="https://t4.ftcdn.net/jpg/00/81/87/63/360_F_81876393_L1H1WOumylTFPT4IzEDqowqUUZWhvi37.jpg"
          />
          <div className="flex items-center font-bold text-[30px] px-2">
            <h1>Kiruthika Eye Care Hospital</h1>
          </div>
        </div>

        <ul className="flex gap-5 items-center px-2 text-[20px] font-medium">
          {navLinks.map((val) => {
            return (
              <li key={val.id}>
                <Link
                  to={val.route}
                  className={
                    pathname === val.route
                      ? " border-b-4 border-orange-500"
                      : undefined
                  }
                >
                  {val.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Header;
