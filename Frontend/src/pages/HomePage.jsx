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
//     <div className="py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Hero Section */}
//         <div className="text-center mb-16">
//           <div className="flex justify-center mb-6">
//             <img 
//               src={logo} 
//               alt="HNBG Library Logo" 
//               className="h-24 sm:h-28 object-contain"
//             />
//           </div>
//           <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
//             Welcome to HNBGU Library
//           </h1>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Streamline your library operations with our comprehensive management system
//           </p>
//         </div>

//         {/* Features Grid */}
//         <div className="grid md:grid-cols-3 gap-8 mb-16">
//           <FeatureCard
//             title="Easy Book Management"
//             description="Track all library resources efficiently"
//             icon="📚"
//           />
//           <FeatureCard
//             title="Student Portal"
//             description="Access your borrowing history anytime"
//             icon="🎓"
//           />
//           <FeatureCard
//             title="Librarian Tools"
//             description="Powerful tools for library administration"
//             icon="🔍"
//           />
//         </div>

//         {/* Login Options */}
//         <div className="text-center">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-6">
//             Get Started
//           </h2>
//           <div className="grid sm:grid-cols-2 gap-6 max-w-md mx-auto">
//             <LoginCard
//               title="Librarian Login"
//               description="Access admin dashboard"
//               color="bg-blue-600 hover:bg-blue-700"
//               onClick={() => navigate("/librarian-login")}
//             />
//             <LoginCard
//               title="Student Login"
//               description="View your account"
//               color="bg-green-600 hover:bg-green-700"
//               onClick={() => navigate("/student-login")}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const FeatureCard = ({ title, description, icon }) => (
//   <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//     <div className="text-4xl mb-4">{icon}</div>
//     <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
//     <p className="text-gray-600">{description}</p>
//   </div>
// );

// const LoginCard = ({ title, description, color, onClick }) => (
//   <button
//     onClick={onClick}
//     className={`${color} text-white p-6 rounded-lg shadow-md transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-left`}
//   >
//     <div className="flex items-center">
//       <LogIn className="w-6 h-6 mr-3" />
//       <h3 className="text-lg font-semibold">{title}</h3>
//     </div>
//     <p className="mt-2 text-blue-100">{description}</p>
//   </button>
// );

// export default HomePage;
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Book, User, Shield } from "lucide-react";
import logo from "../assets/HNBG-new-logo.png";

const HomePage = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role === "librarian") navigate("/admin-dashboard");
    else if (role === "student") navigate("/student-dashboard");
  }, [role, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 select-none">
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <img 
                src={logo} 
                alt="HNBG Library Logo" 
                className="h-28 sm:h-32 object-contain transition-transform hover:scale-105 pointer-events-none"
                draggable="false"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 cursor-default">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                HNBGU Library Portal
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 cursor-default">
              Your gateway to academic excellence at Hemvati Nandan Bahuguna Garhwal University
            </p>
          </div>

          {/* Login Section */}
          <div className="max-w-2xl mx-auto mb-20">
            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={() => navigate("/librarian-login")}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer select-none"
              >
                <h3 className="text-2xl font-bold mb-2">Librarian Login</h3>
                <p className="text-blue-100 text-sm">Access management system</p>
              </button>
              <button
                onClick={() => navigate("/student-login")}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer select-none"
              >
                <h3 className="text-2xl font-bold mb-2">Student Login</h3>
                <p className="text-blue-100 text-sm">Access your account</p>
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Book className="w-8 h-8 text-blue-600" />}
              title="Digital Library"
              description="Access e-books and online resources anytime, anywhere"
            />
            <FeatureCard
              icon={<User className="w-8 h-8 text-blue-600" />}
              title="User Portal"
              description="Manage your library account and borrowings easily"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-blue-600" />}
              title="Secure Access"
              description="Safe and protected academic environment"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 cursor-default select-none">
    <div className="flex items-center justify-center w-14 h-14 mb-6 rounded-xl bg-blue-50">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

export default HomePage;
