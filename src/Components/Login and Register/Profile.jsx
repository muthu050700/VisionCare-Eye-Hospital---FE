import { useContext, useEffect, useState } from "react";
import { profileApi } from "../APIs/apis";
import profileSvg from "../../assets/profile.svg";
const BE_URL = import.meta.env.VITE_BE_URL; // vite is must

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const userRole = localStorage.getItem("userRole");
  const userId = localStorage.getItem("userId");
  const doctorRoles = ["cataracts", "glaucoma", "macular degeneration"];
  console.log(userId);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${BE_URL}/api/users`); // user fetch URL
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        data.map((d) => {
          console.log(d.id === userId);
          d.id === userId && setUser(d);
        });

        if (doctorRoles.includes(userRole) || userRole === "admin") {
          setIsEditable(true);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
  console.log(user);
  // Function to handle profile update for doctor or admin
  const handleProfileUpdate = async () => {
    console.log(user, userId);
    try {
      const response = await profileApi(userId, user);
      alert("Profile updated successfully");
    } catch (error) {
      setError(error);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center">{error.message}</div>;
  if (user === null)
    return <h1>Something went wrong, Please logout and try agin.</h1>;
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow-lg overflow-hidden flex">
      {/* SVG on the left side */}
      <div className="hidden lg:block">
        <img src={profileSvg} alt="Login" className="h-full" />
      </div>

      {/* Profile Form on the right side */}
      <div className="w-full p-6 my-10">
        <div className="bg-blue-500 text-white py-4 text-center">
          <h2 className="text-2xl font-semibold">Profile</h2>
        </div>
        <div className="space-y-6 mt-6">
          {/* Name */}
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-600">Name</span>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded-md w-60"
              value={user.fullName}
              onChange={(e) =>
                isEditable && setUser({ ...user, fullName: e.target.value })
              }
              readOnly={!isEditable} // Conditionally readOnly
            />
          </div>
          {/* Phone */}
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-600">Phone</span>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded-md w-60"
              value={user.phoneNumber}
              onChange={(e) =>
                isEditable && setUser({ ...user, phoneNumber: e.target.value })
              }
              readOnly={!isEditable} // Conditionally readOnly
            />
          </div>
          {/* Email */}
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-600">Email</span>
            <input
              type="email"
              className="border border-gray-300 p-2 rounded-md w-60"
              value={user.email}
              onChange={(e) =>
                isEditable && setUser({ ...user, email: e.target.value })
              }
              readOnly={!isEditable} // Conditionally readOnly
            />
          </div>
          {/* Address */}
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-600">Address</span>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded-md w-60"
              value={user.address}
              onChange={(e) =>
                isEditable && setUser({ ...user, address: e.target.value })
              }
              readOnly={!isEditable} // Conditionally readOnly
            />
          </div>
          {/* Gender */}
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-600">Gender</span>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded-md w-60"
              value={user.gender}
              readOnly
            />
          </div>
          {/* Date of Birth */}
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-600">Date of Birth</span>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded-md w-60"
              value={new Date(user.dateOfBirth).toLocaleDateString()}
              readOnly
            />
          </div>

          {/* Only show the save button if the profile is editable */}
          {isEditable && (
            <div className="flex justify-end">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={handleProfileUpdate}
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
