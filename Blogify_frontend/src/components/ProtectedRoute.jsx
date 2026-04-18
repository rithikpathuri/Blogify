import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = localStorage.getItem("userId");
  return user ? children : <Navigate to="/" />;
}

export default ProtectedRoute;