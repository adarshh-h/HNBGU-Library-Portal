import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ProtectedRoute = ({ allowedRole }) => {
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();
    useEffect(() => {
  axios
    .get(`${API_BASE_URL}/api/auth/check-session`, { withCredentials: true })
    .then((res) => {
      if (res.data.user.role !== allowedRole) {
        const redirectPath =
          res.data.user.role === "librarian" ? "/admin-dashboard" : "/student-dashboard";
        navigate(redirectPath, { replace: true });
      } else {
        setIsChecking(false);
      }
    })
    .catch((err) => {
      console.error("Error during session check:", err);
      localStorage.removeItem("role");
      navigate("/", { replace: true });
    });
}, [allowedRole, navigate]);


  if (isChecking) return <div>Checking session...</div>;

  return <Outlet />;
};

export default ProtectedRoute;





