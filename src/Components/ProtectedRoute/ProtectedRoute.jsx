import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem("userRole");

  return !allowedRoles.includes(userRole) ? (
    <Navigate to="/login" />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoute;
