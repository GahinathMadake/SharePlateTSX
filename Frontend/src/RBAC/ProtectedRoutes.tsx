import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

type Role = "NGO" | "Admin" | "Donar";

interface ProtectedRouteProps {
  allowedRoles: Role[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, isLogin } = useAuth();

  if (!isLogin || !user || !user.role) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role as Role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;