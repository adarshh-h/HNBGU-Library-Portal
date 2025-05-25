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
//     <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 p-6">
//       {/* Logo Container with better spacing */}
//       <div className="flex flex-col items-center mb-8">
//         <img 
//           src={logo} 
//           alt="HNBG Library Logo" 
//           className="h-28 mb-4 object-contain"  // Increased height slightly
//         />
//         <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-2">
//           Library Management System
//         </h1>
//         <div className="w-16 h-1 bg-blue-500 rounded-full mb-4"></div>  {/* Decorative line */}
//       </div>

//       {/* Content Section */}
//       <section className="text-center max-w-2xl mb-10">
//         <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
//           Manage book issues, returns, and student records with ease. 
//           Choose your role to continue.
//         </p>
//       </section>

//       {/* Action Buttons */}
//       <div className="grid gap-6 sm:grid-cols-2 w-full max-w-md">
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
//   );
// };

// const RoleCard = ({ label, onClick, color, hoverColor, ariaLabel }) => (
//   <button
//     onClick={onClick}
//     aria-label={ariaLabel}
//     className={`flex items-center justify-center gap-3 px-6 py-4 text-white text-lg font-semibold rounded-xl shadow-md transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${color} ${hoverColor}`}
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
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <img 
              src={logo} 
              alt="HNBG Library Logo" 
              className="h-24 sm:h-28 object-contain"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Welcome to HNBGU Library
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Streamline your library operations with our comprehensive management system
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            title="Easy Book Management"
            description="Track all library resources efficiently"
            icon="📚"
          />
          <FeatureCard
            title="Student Portal"
            description="Access your borrowing history anytime"
            icon="🎓"
          />
          <FeatureCard
            title="Librarian Tools"
            description="Powerful tools for library administration"
            icon="🔍"
          />
        </div>

        {/* Login Options */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Get Started
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-md mx-auto">
            <LoginCard
              title="Librarian Login"
              description="Access admin dashboard"
              color="bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate("/librarian-login")}
            />
            <LoginCard
              title="Student Login"
              description="View your account"
              color="bg-green-600 hover:bg-green-700"
              onClick={() => navigate("/student-login")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const LoginCard = ({ title, description, color, onClick }) => (
  <button
    onClick={onClick}
    className={`${color} text-white p-6 rounded-lg shadow-md transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-left`}
  >
    <div className="flex items-center">
      <LogIn className="w-6 h-6 mr-3" />
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <p className="mt-2 text-blue-100">{description}</p>
  </button>
);

export default HomePage;