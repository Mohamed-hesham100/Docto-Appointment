import { authContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { access_token, user } = useContext(authContext);
  const [unauthorized, setUnauthorized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (access_token && !allowedRoles.includes(user.role)) {
      toast.warn("You are not authorized to access this route");
      setUnauthorized(true);
    }
  }, [access_token, user, allowedRoles]);

  if (!access_token) {
    return <Navigate to="/login" replace={true} state={{ from: location }} />;
  }

  if (unauthorized) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;