import { Link, Navigate, useLocation } from "react-router-dom";
import { navLinks } from "../../Utils/HeaderConstant";
import { useState } from "react";
// import { patientLogoutApi } from "../APIs/apis";

const Header = () => {
  //Finding pathname
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);

  // is auth
  const isAuthenticated = Boolean(localStorage.getItem("userLogged"));
  const userType = localStorage.getItem("userType");
  const userEmail = localStorage.getItem("userEmail");
  const handleProfile = () => setShow(!show);

  //clear local storage
  const clearLocalStorage = async () => {
    localStorage.removeItem("userLogged");
    location.reload();
    // localStorage.removeItem("token");

    // Navigate("/login");
    // try {
    //   const res = await patientLogoutApi({ userEmail });
    //   alert(res.msg);
    //   Navigate("/login");
    // } catch (e) {
    //   console.log("error", e);
    // }
  };
  return (
    <div>
      {/* for Emergencies and Appointment header */}
      {userType === "patients" && (
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
          {navLinks.map((val) => {
            return (
              val.id !== userType && (
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
              )
            );
          })}
          {/* profile image */}
          <div className="relative">
            <img
              src="https://www.zenclass.in/static/media/user.8d49e377.png"
              className="w-[60px] h-[60px] object-fill"
              onClick={handleProfile}
            />

            {show ? (
              <div className=" bg-slate-800 p-3 absolute right-2 z-20">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      <li>Profile</li>
                    </Link>
                    <p onClick={clearLocalStorage}>
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
