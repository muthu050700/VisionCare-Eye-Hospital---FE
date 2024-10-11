import React, { createContext, useEffect, useState } from "react";
const BE_URL = import.meta.env.VITE_BE_URL; //vite is must
export const doctorContext = createContext();
export const authContext = createContext();

const Context = ({ children }) => {
  const [doctorData, setDoctorData] = useState(null);
  const [doctorId, setDoctorId] = useState("");
  const doctorRoles = [
    "doctor",
    "Optometrist",
    "Ophthalmologist",
    "Surgeon",
    "Consultant",
  ];
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
        {children}
      </doctorContext.Provider>
    </>
  );
};

export default Context;
