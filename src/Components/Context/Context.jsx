import React, { createContext, useEffect, useState } from "react";

export const doctorContext = createContext();
export const authContext = createContext();

const Context = ({ children }) => {
  const [doctorData, setDoctorData] = useState(null);
  const [doctorId, setDoctorId] = useState("");

  //fetching the data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("http://localhost:4500/doctors");
    const data = await res.json();
    setDoctorData(data);
    console.log(data);
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
