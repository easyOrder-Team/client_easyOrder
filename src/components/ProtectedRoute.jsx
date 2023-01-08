import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export const ProtectedRoute = ({ children, isAuthenticated }) => {
  const { loginWithRedirect } = useAuth0();
  if (isAuthenticated) {
    return children;
  }
  loginWithRedirect();
};
