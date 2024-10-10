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
    const res = await fetch("http://localhost:4500/api/users");
    const data = await res.json();
    setDoctorData(data);

    data.map((val) => {
      if (val.role === "doctor") {
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
