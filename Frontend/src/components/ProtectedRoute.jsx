// import { useEffect, useState } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import axios from "axios";

// const ProtectedRoute = ({ allowedRole }) => {
//     const [sessionValid, setSessionValid] = useState(true);
//     const role = localStorage.getItem("role");

//     useEffect(() => {
//         axios.get("http://localhost:5000/api/auth/check-session", { withCredentials: true })
//             .then((res) => {
//                 if (res.data.user.role !== allowedRole) {
//                     window.location.href = allowedRole === "librarian" ? "/admin-dashboard" : "/student-dashboard";
//                 }
//             })
//             .catch(() => {
//                 localStorage.removeItem("role");
//                 window.location.href = "/";
//                 setSessionValid(false);
//             });
//     }, [allowedRole]);

//     if (!sessionValid) return null;
    
//     return <Outlet />;
// };

// export default ProtectedRoute;
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ProtectedRoute = ({ allowedRole }) => {
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .get(`${API_BASE_URL}/api/auth/check-session`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       if (res.data.user.role !== allowedRole) {
  //         // Redirect to the correct dashboard for *their* role
  //         const redirectPath =
  //           res.data.user.role === "librarian"
  //             ? "/admin-dashboard"
  //             : "/student-dashboard";
  //         navigate(redirectPath, { replace: true });
  //       } else {
  //         setIsChecking(false);
  //       }
  //     })
  //     .catch(() => {
  //       localStorage.removeItem("role");
  //       navigate("/", { replace: true });
  //     });
  // }, [allowedRole, navigate]);

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
