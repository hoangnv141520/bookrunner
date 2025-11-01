import { Navigate } from "react-router-dom";
import { AuthState } from "../types/auth";

interface PrivateRouteProps {
  children: React.ReactNode;
  auth: AuthState;
}

const PrivateRoute = ({ children, auth }: PrivateRouteProps) => {
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
