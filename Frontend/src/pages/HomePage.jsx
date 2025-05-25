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
import { LogIn, Book, User, Library, Shield, BookOpen } from "lucide-react";
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
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-6">
            <img 
              src={logo} 
              alt="HNBG Library Logo" 
              className="h-24 sm:h-28 object-contain transition-transform hover:scale-105"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              HNBGU Library Portal
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Modern library management solution for students and librarians
          </p>
        </div>
 <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Get Started
            </h2>
            <p className="text-gray-500">
              Select your role to access the system
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <LoginCard
              title="Librarian Access"
              description="Manage library resources and users"
              icon={<Library className="w-6 h-6" />}
              color="from-blue-500 to-blue-600"
              onClick={() => navigate("/librarian-login")}
            />
            <LoginCard
              title="Student Access"
              description="View your account and history"
              icon={<BookOpen className="w-6 h-6" />}
              color="from-green-500 to-green-600"
              onClick={() => navigate("/student-login")}
            />
          </div>
        </div>
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={<Book className="w-8 h-8 text-blue-600" />}
            title="Comprehensive Catalog"
            description="Access thousands of books and resources"
            color="bg-blue-50"
          />
          <FeatureCard
            icon={<User className="w-8 h-8 text-green-600" />}
            title="User Portal"
            description="Manage your account and checkouts"
            color="bg-green-50"
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8 text-purple-600" />}
            title="Admin Tools"
            description="Powerful management dashboard"
            color="bg-purple-50"
          />
        </div>

        {/* Login Section */}
       
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, color }) => (
  <div className={`${color} p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all`}>
    <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-white shadow-xs">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const LoginCard = ({ title, description, icon, color, onClick }) => (
  <button
    onClick={onClick}
    className={`bg-gradient-to-br ${color} text-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white text-left h-full`}
  >
    <div className="flex items-center mb-3">
      <div className="flex items-center justify-center w-10 h-10 mr-3 rounded-full bg-white bg-opacity-20">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-blue-100 opacity-90">{description}</p>
    <div className="mt-4 flex justify-end">
      <div className="flex items-center text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">
        Login <LogIn className="ml-1 w-4 h-4" />
      </div>
    </div>
  </button>
);

export default HomePage;