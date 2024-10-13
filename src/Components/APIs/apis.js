const BE_URL = import.meta.env.VITE_BE_URL; //vite is must
const token = localStorage.getItem("token");

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
  console.log(token);
  const res = await fetch(`${BE_URL}/book-appointment`, {
    body: JSON.stringify(appointentDetails),
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  console.log(res);
  return await res.json();
};

//update the user details

export const handleRoleChangeApi = async (id, userDetails) => {
  const details = { id, userDetails };
  const res = await fetch(`${BE_URL}/admin/updateRole/${details.id}`, {
    body: JSON.stringify(userDetails),
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  try {
    const data = await res.json();
    console.log(data.updatedToken);
    return data;
  } catch (e) {
    console.log(e);
  }
};

//delete the user details

export const deleteUserApi = async (id) => {
  const res = await fetch(`${BE_URL}/admin/delete/?id=${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return await res.json();
};

//

export const profileApi = async (userId, user) => {
  try {
    const res = await fetch(`${BE_URL}/profile/user-profile-update/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (e) {
    console.log(e);
  }
};
