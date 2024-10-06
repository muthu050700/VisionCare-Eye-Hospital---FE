const BE_URL = import.meta.env.VITE_BE_URL; //vite is must

//create a patient

export const createPatientApi = async (patientDetails) => {
  console.log("runnung Api");
  const res = await fetch(`${BE_URL}/patients`, {
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
