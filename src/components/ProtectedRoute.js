import { Navigate } from "react-router-dom";
import { UserAuth } from "../contexts/AuthContext";
const ProtectedRoute = ({ children }) => {
  const { currentUser } = UserAuth();
  if (!currentUser) {
    return <Navigate to="/auth/login" />;
  }
  return children;
};

export default ProtectedRoute;
