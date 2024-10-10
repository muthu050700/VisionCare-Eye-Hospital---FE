import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  //Finding pathname
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  // is auth
  const token = localStorage.getItem("token");
  const handleProfile = () => setShow(!show);

  //clear local storage for logout
  const logout = async () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  //for userRole
  const getUserRole = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.role;
    }
    return null;
  };
  const userRole = getUserRole();
  return (
    <div>
      {/* for Emergencies and Appointment header */}
      {userRole === "patient" && (
        <>
          {" "}
          <div className="flex justify-end bg-slate-400 py-2 gap-2 px-2">
            <button className="bg-pink-600 px-4 py-2 rounded-md font-medium text-white">
              For Emergencies
            </button>
            <Link to="/book-appointment">
              {" "}
              <p className="bg-pink-600 px-4 py-3 rounded-md font-bold text-white cursor-pointer">
                Book Appointment
              </p>
            </Link>
          </div>
        </>
      )}

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

        <div className="flex gap-5 items-center px-2 text-[20px] font-medium list-none">
          <Link to="/">
            <li
              className={
                pathname === "/" ? " border-b-4 border-orange-500" : undefined
              }
            >
              Home
            </li>
          </Link>
          {userRole === "doctor" && (
            <Link to="/appointments">
              <li
                className={
                  pathname === "/appointments"
                    ? " border-b-4 border-orange-500"
                    : undefined
                }
              >
                Appointments
              </li>
            </Link>
          )}
          <Link to="/about">
            {" "}
            <li
              className={
                pathname === "/about"
                  ? " border-b-4 border-orange-500"
                  : undefined
              }
            >
              About us
            </li>
          </Link>
          <Link to="/contact">
            {" "}
            <li
              className={
                pathname === "/contact"
                  ? " border-b-4 border-orange-500"
                  : undefined
              }
            >
              Contact us
            </li>
          </Link>

          {userRole === "patient" && (
            <Link to="/find_doctor">
              <li
                className={
                  pathname === "/find_doctor"
                    ? " border-b-4 border-orange-500"
                    : undefined
                }
              >
                Find a doctor
              </li>
            </Link>
          )}
          <Link to="/guidelines">
            <li
              className={
                pathname === "/guidelines"
                  ? " border-b-4 border-orange-500"
                  : undefined
              }
            >
              Guidelines
            </li>
          </Link>
          {/* profile image */}
          <div className="relative">
            <img
              src="https://www.zenclass.in/static/media/user.8d49e377.png"
              className="w-[60px] h-[60px] object-fill"
              onClick={handleProfile}
            />

            {show ? (
              <div className=" bg-slate-800 p-3 absolute right-2 z-20">
                {token ? (
                  <div>
                    <Link to="/profile">
                      <li>Profile</li>
                    </Link>
                    <p onClick={logout}>
                      <li>logout</li>
                    </p>
                  </div>
                ) : (
                  <div>
                    <Link to="/login">
                      <li>Login</li>
                    </Link>
                    <Link to="/register">
                      <li>Register</li>
                    </Link>
                  </div>
                )}
              </div>
            ) : undefined}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
