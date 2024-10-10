import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.role;
  }
  return null;
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userRole = getUserRole();
  return !allowedRoles.includes(userRole) ? (
    <Navigate to="/login" />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoute;
