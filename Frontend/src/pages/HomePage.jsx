// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { LogIn } from "lucide-react";
// import logo from "../assets/HNBG-new-logo.png";
// const HomePage = () => {
//   const navigate = useNavigate();
//   const role = localStorage.getItem("role");

//   useEffect(() => {
//     if (role === "librarian") navigate("/admin-dashboard");
//     else if (role === "student") navigate("/student-dashboard");
//   }, [role, navigate]);

//   return (
//      <main className="min-h-screen flex flex-col items-center justify-center p-6">
//       {/* Logo only on home page */}
//       <img 
//         src={logo} 
//         alt="HNBG Logo" 
//         className="h-24 mb-8"
//       />
//     <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 p-6">
//       <section className="text-center max-w-2xl">
//         <h1 className="text-5xl font-extrabold text-blue-700 mb-4 drop-shadow-sm tracking-tight">
//           📚 Library Management System
//         </h1>
//         <p className="text-gray-600 text-lg leading-relaxed mb-8">
//           Manage book issues, returns, and student records with ease. Choose your role to continue.
//         </p>
//       </section>

//       <div className="grid gap-6 sm:grid-cols-2 w-full max-w-lg">
//         <RoleCard
//           label="Librarian Login"
//           color="bg-blue-600"
//           hoverColor="hover:bg-blue-700"
//           onClick={() => navigate("/librarian-login")}
//           ariaLabel="Login as librarian"
//         />
//         <RoleCard
//           label="Student Login"
//           color="bg-green-600"
//           hoverColor="hover:bg-green-700"
//           onClick={() => navigate("/student-login")}
//           ariaLabel="Login as student"
//         />
//       </div>
//     </main>
//         </main>
//   );
// };

// const RoleCard = ({ label, onClick, color, hoverColor, ariaLabel }) => (
//   <button
//     onClick={onClick}
//     aria-label={ariaLabel}
//     className={`flex items-center justify-center gap-3 px-6 py-4 text-white text-lg font-semibold rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${color} ${hoverColor}`}
//   >
//     <LogIn className="w-5 h-5" />
//     {label}
//   </button>
// );

// export default HomePage;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import logo from "../assets/HNBG-new-logo.png";

const HomePage = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role === "librarian") navigate("/admin-dashboard");
    else if (role === "student") navigate("/student-dashboard");
  }, [role, navigate]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 p-6">
      {/* Logo Container with better spacing */}
      <div className="flex flex-col items-center mb-8">
        <img 
          src={logo} 
          alt="HNBG Library Logo" 
          className="h-28 mb-4 object-contain"  // Increased height slightly
        />
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-2">
          Library Management System
        </h1>
        <div className="w-16 h-1 bg-blue-500 rounded-full mb-4"></div>  {/* Decorative line */}
      </div>

      {/* Content Section */}
      <section className="text-center max-w-2xl mb-10">
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
          Manage book issues, returns, and student records with ease. 
          Choose your role to continue.
        </p>
      </section>

      {/* Action Buttons */}
      <div className="grid gap-6 sm:grid-cols-2 w-full max-w-md">
        <RoleCard
          label="Librarian Login"
          color="bg-blue-600"
          hoverColor="hover:bg-blue-700"
          onClick={() => navigate("/librarian-login")}
          ariaLabel="Login as librarian"
        />
        <RoleCard
          label="Student Login"
          color="bg-green-600"
          hoverColor="hover:bg-green-700"
          onClick={() => navigate("/student-login")}
          ariaLabel="Login as student"
        />
      </div>
    </main>
  );
};

const RoleCard = ({ label, onClick, color, hoverColor, ariaLabel }) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    className={`flex items-center justify-center gap-3 px-6 py-4 text-white text-lg font-semibold rounded-xl shadow-md transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${color} ${hoverColor}`}
  >
    <LogIn className="w-5 h-5" />
    {label}
  </button>
);

export default HomePage;