import { Navigate } from "react-router-dom";
import { AuthState } from "../types/auth";

interface PrivateRouteProps {
  children: React.ReactNode;
  auth: AuthState;
}

const PrivateLogin = ({ children, auth }: PrivateRouteProps) => {
  if (auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default PrivateLogin;
