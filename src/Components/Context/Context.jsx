import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
const BE_URL = import.meta.env.VITE_BE_URL; //vite is must
export const doctorContext = createContext();
export const authContext = createContext();
export const userRoleContext = createContext();

const Context = ({ children }) => {
  const [doctorData, setDoctorData] = useState(null);
  const [doctorId, setDoctorId] = useState("");
  const doctorRoles = ["cataracts", "glaucoma", "macular degeneration"];
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Effect to update token when it's set in localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      setToken(null);
    }
  });
  console.log(token);
  //get a userRole and userId from token

  const getUserDataFromToken = () => {
    if (token) {
      const decodedToken = jwtDecode(token);
      return {
        id: decodedToken.id,
        role: decodedToken.role,
      };
    }
    return null;
  };

  const userData = getUserDataFromToken();
  const userId = userData?.id;
  const userRole = userData?.role;

  //fetching the data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch(`${BE_URL}/api/users`);
    const data = await res.json();
    setDoctorData(data);

    data.map((val) => {
      if (doctorRoles.includes(val.role)) {
        setDoctorId(val.id);
      }
    });
  };

  return (
    <>
      <doctorContext.Provider value={{ doctorData, doctorId, setDoctorId }}>
        <userRoleContext.Provider value={{ userRole, userId }}>
          {children}
        </userRoleContext.Provider>
      </doctorContext.Provider>
    </>
  );
};

export default Context;
