import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { userRoleContext } from "../Context/Context";
const BE_URL = import.meta.env.VITE_BE_URL; //vite is must
const Header = () => {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [profileData, setProfileData] = useState("");
  const navigate = useNavigate();
  const { userRole, userId } = useContext(userRoleContext); //used a user role context
  const doctorRoles = ["cataracts", "glaucoma", "macular degeneration"];
  const token = localStorage.getItem("token");
  const handleProfile = () => setShow(!show);

  const logout = async () => {
    localStorage.removeItem("token");
    location.reload();
    navigate("/login");
  };

  useEffect(() => {
    userFetch();
  }, []);
  const userFetch = async () => {
    const response = await fetch(`${BE_URL}/api/users`); //user fetch URL

    const data = await response.json();
    data.map((val) => {
      val.id === userId && setProfileData(val);
    });
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const profileDropdown = document.getElementById("profile-dropdown");
      if (profileDropdown && !profileDropdown.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openModal = () => {
    setIsOpen(true);

    // Automatically close modal after 5 seconds (5000ms)
    setTimeout(() => {
      setIsOpen(false);
    }, 5000);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {userRole === "patient" && (
        <div className="flex justify-end bg-slate-400 py-2 gap-2 px-2">
          {/* <Link to="/for-emergency">
            <p className="bg-pink-600 px-4 py-2 rounded-md font-medium text-white">
              For Emergencies
            </p>
          </Link> */}
          <div>
            {/* Button to open the modal */}
            <button
              className="bg-pink-600 px-4 py-3 rounded-md font-medium text-white"
              onClick={openModal}
            >
              For Emergencies
            </button>

            {/* Modal */}
            {isOpen && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center relative">
                  <button
                    className="absolute top-2 right-2 text-gray-500"
                    onClick={closeModal}
                  >
                    &times;
                  </button>

                  {/* Modal content */}
                  <h2 className="text-2xl font-bold">+91-98922 242 000</h2>
                  <p className="text-sm mt-2">
                    Use only for Eye emergencies such as sudden vision loss, eye
                    injuries, chemical exposure, or severe eye pain.
                    <br />
                    For more serious problems please call 108.
                  </p>
                  <address className="mt-4">
                    #1234, Fake Street, Vision Plaza, Near Central Park,
                    Metropolis - 101010.
                  </address>

                  {/* Get Directions button */}
                  <button className="bg-blue-500 text-white py-2 px-4 mt-4 rounded">
                    Get Directions
                  </button>
                </div>
              </div>
            )}
          </div>

          <Link to="/book-appointment">
            <p className="bg-pink-600 px-4 py-3 rounded-md font-bold text-white cursor-pointer">
              Book Appointment
            </p>
          </Link>
        </div>
      )}

      <div className="bg-gradient-to-r from-blue-50 to-gray-100 shadow-lg">
        <div className="container mx-auto flex justify-between items-center py-3 px-4 lg:px-0">
          <div className="flex items-center md:pl-3">
            <img
              className="md:w-20 md:h-20 w-16 h-16 rounded-full shadow-md hover:shadow-xl transition-shadow duration-300"
              src="https://t4.ftcdn.net/jpg/00/81/87/63/360_F_81876393_L1H1WOumylTFPT4IzEDqowqUUZWhvi37.jpg"
              alt="Hospital Logo"
            />
            <h1 className="font-extrabold text-lg md:text-xl lg:text-2xl text-gray-700 px-4 tracking-wide leading-tight ">
              Kiruthika Eye Care<br></br> Hospital
            </h1>
          </div>

          <ul className=" gap-10 items-center text-lg font-semibold text-gray-700 lg:flex hidden">
            <Link to="/">
              <li
                className={`cursor-pointer hover:text-blue-700 transition-colors duration-300 relative ${
                  pathname === "/" ? "text-blue-700" : ""
                }`}
              >
                Home
                {pathname === "/" && (
                  <span className="absolute left-0 bottom-0 h-1 w-full bg-blue-600 rounded-t-md"></span>
                )}
              </li>
            </Link>

            <Link to="/about">
              <li
                className={`cursor-pointer hover:text-blue-700 transition-colors duration-300 relative ${
                  pathname === "/about" ? "text-blue-700" : ""
                }`}
              >
                About Us
                {pathname === "/about" && (
                  <span className="absolute left-0 bottom-0 h-1 w-full bg-blue-600 rounded-t-md"></span>
                )}
              </li>
            </Link>

            <Link to="/contact">
              <li
                className={`cursor-pointer hover:text-blue-700 transition-colors duration-300 relative   ${
                  pathname === "/contact" ? "text-blue-700" : ""
                }`}
              >
                Contact Us
                {pathname === "/contact" && (
                  <span className="absolute left-0 bottom-0 h-1 w-full bg-blue-600 rounded-t-md"></span>
                )}
              </li>
            </Link>

            <Link to="/guidelines">
              <li
                className={`cursor-pointer hover:text-blue-700 transition-colors duration-300 relative   ${
                  pathname === "/guidelines" ? "text-blue-700" : ""
                }`}
              >
                Guidelines
                {pathname === "/guidelines" && (
                  <span className="absolute left-0 bottom-0 h-1 w-full bg-blue-600 rounded-t-md"></span>
                )}
              </li>
            </Link>
          </ul>

          {/* Profile Image */}
          <div className="relative pr-3">
            <div className=" flex gap-3 justify-center items-center">
              {" "}
              <p className=" text-xl font-medium hidden md:flex">
                {profileData.fullName}
              </p>
              <img
                src="https://www.zenclass.in/static/media/user.8d49e377.png"
                className="w-[60px] h-[60px]  object-cover rounded-full shadow-lg cursor-pointer hover:shadow-xl transition-all"
                onClick={handleProfile}
                alt="Profile"
              />
            </div>

            {show && (
              <div
                id="profile-dropdown"
                className="bg-slate-800 absolute right-0 z-20 w-80 rounded-lg shadow-lg overflow-y-auto max-h-[400px] transition-all duration-300"
              >
                <div className="flex flex-col p-4 space-y-2">
                  {token ? (
                    <>
                      <Link to="/profile">
                        <p
                          onClick={handleProfile}
                          className="text-white hover:bg-gray-700 rounded-md p-2 transition duration-200"
                        >
                          Profile
                        </p>
                      </Link>
                      <p
                        onClick={logout}
                        className="text-white hover:bg-gray-700 rounded-md p-2 transition duration-200 cursor-pointer"
                      >
                        Logout
                      </p>
                      <ul>
                        {" "}
                        <Link to="/">
                          <p
                            className={`text-white hover:bg-gray-700 rounded-md p-2 transition duration-200 lg:hidden ${
                              pathname === "/" ? "bg-gray-700" : ""
                            }`}
                            onClick={handleProfile}
                          >
                            Home
                          </p>
                        </Link>
                        <Link to="/about">
                          <p
                            className={`text-white hover:bg-gray-700 rounded-md p-2 transition duration-200 lg:hidden ${
                              pathname === "/about" ? "bg-gray-700" : ""
                            }`}
                            onClick={handleProfile}
                          >
                            About
                          </p>
                        </Link>
                        <Link to="/contact">
                          <p
                            className={`text-white hover:bg-gray-700 rounded-md p-2 transition duration-200 lg:hidden ${
                              pathname === "/contact" ? "bg-gray-700" : ""
                            }`}
                            onClick={handleProfile}
                          >
                            Contact
                          </p>
                        </Link>
                        <Link to="/guidelines">
                          <p
                            className={`text-white hover:bg-gray-700 rounded-md p-2 transition duration-200 lg:hidden ${
                              pathname === "/guidelines" ? "bg-gray-700" : ""
                            }`}
                            onClick={handleProfile}
                          >
                            Guidelines
                          </p>
                        </Link>
                      </ul>

                      {doctorRoles.includes(userRole) && (
                        <Link to="/appointments">
                          <p
                            className={`text-white hover:bg-gray-700 rounded-md p-2 transition duration-200 ${
                              pathname === "/appointments" ? "bg-gray-700" : ""
                            }`}
                          >
                            Appointments
                          </p>
                        </Link>
                      )}

                      {userRole === "patient" && (
                        <>
                          <Link to="/patient-appointment">
                            <p
                              className={`text-white hover:bg-gray-700 rounded-md p-2 transition duration-200 ${
                                pathname === "/patient-appointment"
                                  ? "bg-gray-700"
                                  : ""
                              }`}
                              onClick={handleProfile}
                            >
                              Patient Appointment
                            </p>
                          </Link>
                          <Link to="/find_doctor">
                            <p
                              className={`text-white hover:bg-gray-700 rounded-md p-2 transition duration-200 ${
                                pathname === "/find_doctor" ? "bg-gray-700" : ""
                              }`}
                              onClick={handleProfile}
                            >
                              Find a Doctor
                            </p>
                          </Link>
                        </>
                      )}

                      {doctorRoles.includes(userRole) && (
                        <>
                          <Link to="/patient-records">
                            <p
                              className={`text-white hover:bg-gray-700 rounded-md p-2 transition duration-200 ${
                                pathname === "/patient-records"
                                  ? "bg-gray-700"
                                  : ""
                              }`}
                              onClick={handleProfile}
                            >
                              Patient Records
                            </p>
                          </Link>
                          <Link to="/patient-dashboard">
                            <p
                              className={`text-white hover:bg-gray-700 rounded-md p-2 transition duration-200 ${
                                pathname === "/patient-dashboard"
                                  ? "bg-gray-700"
                                  : ""
                              }`}
                              onClick={handleProfile}
                            >
                              Patient Dashboard
                            </p>
                          </Link>
                        </>
                      )}

                      {userRole === "admin" && (
                        <>
                          <Link to="/patient-dashboard">
                            <p
                              className={`text-white hover:bg-gray-700 rounded-md p-2 transition duration-200 ${
                                pathname === "/patient-dashboard"
                                  ? "bg-gray-700"
                                  : ""
                              }`}
                              onClick={handleProfile}
                            >
                              Patient Dashboard
                            </p>
                          </Link>

                          <Link to="/doctor-dashboard">
                            <p
                              className={`text-white hover:bg-gray-700 rounded-md p-2 transition duration-200 ${
                                pathname === "/doctor-dashboard"
                                  ? "bg-gray-700"
                                  : ""
                              }`}
                              onClick={handleProfile}
                            >
                              Doctor Dashboard
                            </p>
                          </Link>

                          <Link to="/patient-records">
                            <p
                              className={`text-white hover:bg-gray-700 rounded-md p-2 transition duration-200 ${
                                pathname === "/patient-records"
                                  ? "bg-gray-700"
                                  : ""
                              }`}
                              onClick={handleProfile}
                            >
                              Patient Records
                            </p>
                          </Link>
                          <Link to="/assign-doctors-appointment">
                            <p
                              className={`text-white hover:bg-gray-700 rounded-md p-2 transition duration-200 ${
                                pathname === "/assign-doctors-appointment"
                                  ? "bg-gray-700"
                                  : ""
                              }`}
                              onClick={handleProfile}
                            >
                              Assign Doctors for Appointment
                            </p>
                          </Link>
                        </>
                      )}
                    </>
                  ) : (
                    <div>
                      <Link to="/login">
                        <p
                          onClick={handleProfile}
                          className="text-white hover:bg-gray-700 rounded-md p-2 transition duration-200"
                        >
                          Login
                        </p>
                      </Link>
                      <Link to="/register">
                        <p
                          onClick={handleProfile}
                          className="text-white hover:bg-gray-700 rounded-md p-2 transition duration-200"
                        >
                          Register
                        </p>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
