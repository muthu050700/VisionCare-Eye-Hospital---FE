const BE_URL = import.meta.env.VITE_BE_URL; //vite is must

// user register Api

export const registerApi = async (userDetails) => {
  const res = await fetch(`${BE_URL}/auth-router/register`, {
    body: JSON.stringify(userDetails),
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

//user login

export const userLogin = async (patientCredentials) => {
  console.log(patientCredentials);
  const res = await fetch(`${BE_URL}/auth-router/login`, {
    body: JSON.stringify(patientCredentials),
    method: "POST",
    headers: {
      "Content-Type": "application/json;charaset=utf-8",
    },
  });

  if (res.status !== 200) {
    throw new Error("Invalid Credentials or somthing went wrong");
  } else {
    const data = await res.json();
    console.log(data);
    localStorage.setItem("token", data.tokenLogin);
    return data;
  }
};

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
