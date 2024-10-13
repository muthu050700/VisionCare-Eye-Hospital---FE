import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { userRoleContext } from "../Context/Context";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { userRole } = useContext(userRoleContext);
  return !allowedRoles.includes(userRole) ? (
    <Navigate to="/login" />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoute;
