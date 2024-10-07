const BE_URL = import.meta.env.VITE_BE_URL; //vite is must
const role = localStorage.getItem("role");
//create a patient

export const createPatientApi = async (patientDetails, role) => {
  const userRole = role.replace(/"/g, "");
  console.log(userRole);
  const res = await fetch(`${BE_URL}/${userRole}`, {
    body: JSON.stringify(patientDetails),
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  console.log(res);
  return await res.json();
};

//verify account

export const verifyAccountApi = async (token) => {
  const res = await fetch(`${BE_URL}/patients/verify-account?token=${token}`);
  return await res.json();
};

//patient login

export const patientLoginApi = async (patientCredentials) => {
  console.log(patientCredentials);
  const res = await fetch(`${BE_URL}/patients/login`, {
    body: JSON.stringify(patientCredentials),
    method: "POST",
    headers: {
      "Content-Type": "application/json;charaset=utf-8",
    },
  });

  if (res.status !== 200) {
    throw new Error("Invalid Credentials or somthing went wrong");
  }
  return await res.json();
};

export const doctorLoginApi = async (doctorCredentials) => {
  const res = await fetch(`${BE_URL}/doctors/login`, {
    body: JSON.stringify(doctorCredentials),
    method: "POST",
    headers: {
      "Content-Type": "application/json;charaset=utf-8",
    },
  });

  if (res.status !== 200) {
    throw new Error("Invalid Credentials or somthing went wrong");
  }
  return await res.json();
};

//logout
// export const patientLogoutApi = async (email) => {
//   console.log(email);
//   const res = await fetch(`${BE_URL}/patients/logout`, {
//     body: JSON.stringify(email),
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json;charaset=utf-8",
//     },
//   });

//   // if (res.status !== 200) {
//   //   throw new Error("Invalid Credentials or somthing went wrong");
//   // }
//   return await res.json();
// };

//book appointent

export const createAppointment = async (appointentDetails) => {
  console.log("runnung Api");
  const res = await fetch(`${BE_URL}/book-appointment`, {
    body: JSON.stringify(appointentDetails),
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  console.log(res);
  return await res.json();
};
