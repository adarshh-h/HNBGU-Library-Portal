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
// import { useEffect, useState } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import axios from "axios";
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const ProtectedRoute = ({ allowedRole }) => {
//   const [isChecking, setIsChecking] = useState(true);
//   const navigate = useNavigate();
//     useEffect(() => {
//   axios
//     .get(`${API_BASE_URL}/api/auth/check-session`, { withCredentials: true })
//     .then((res) => {
//       if (res.data.user.role !== allowedRole) {
//         const redirectPath =
//           res.data.user.role === "librarian" ? "/admin-dashboard" : "/student-dashboard";
//         navigate(redirectPath, { replace: true });
//       } else {
//         setIsChecking(false);
//       }
//     })
//     .catch((err) => {
//       console.error("Error during session check:", err);
//       localStorage.removeItem("role");
//       navigate("/", { replace: true });
//     });
// }, [allowedRole, navigate]);


//   if (isChecking) return <div>Checking session...</div>;

//   return <Outlet />;
// };

// export default ProtectedRoute;



import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProtectedRoute = ({ allowedRole }) => {
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/auth/check-session`, {
          withCredentials: true,
        });

        if (res.data.user.role !== allowedRole) {
          // Redirect based on the role of the user
          const redirectPath =
            res.data.user.role === "librarian"
              ? "/admin-dashboard"
              : "/student-dashboard";
          navigate(redirectPath, { replace: true });
        } else {
          // Role matches, continue with the flow
          setIsChecking(false);
        }
      } catch (err) {
        console.error("Error during session check:", err);

        // Handle different error types
        if (err.response) {
          // Server responded with a status other than 2xx
          console.error("Server error:", err.response.data);
        } else if (err.request) {
          // Request was made but no response was received
          console.error("Network error:", err.request);
        } else {
          // Something went wrong during the request setup
          console.error("Error message:", err.message);
        }

        // Clear local storage and redirect to the login page
        localStorage.removeItem("role");
        navigate("/", { replace: true });
      }
    };

    checkSession();
  }, [allowedRole, navigate]);

  if (isChecking) {
    return <div>Checking session...</div>;
  }

  return <Outlet />;
};

export default ProtectedRoute;

