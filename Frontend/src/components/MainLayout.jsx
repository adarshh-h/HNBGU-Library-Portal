// import { Outlet, useNavigate } from "react-router-dom";
// import logo from "../assets/HNBG-new-logo.png";
// import { useState, useEffect } from "react";
// import { User, LogOut } from "lucide-react";

// const MainLayout = () => {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState({
//     role: '',
//     name: 'User',
//     initials: 'U'
//   });
//   const [showDropdown, setShowDropdown] = useState(false);

//   useEffect(() => {
//     const role = localStorage.getItem("role") || '';
//     const name = localStorage.getItem("name") || 'User';
//     const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

//     setUserData({
//       role,
//       name,
//       initials
//     });

//     // Close dropdown when clicking outside
//     const handleClickOutside = (e) => {
//       if (!e.target.closest('.user-dropdown')) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener('click', handleClickOutside);
//     return () => document.removeEventListener('click', handleClickOutside);
//   }, []);

//   const isStudent = userData.role === "student";
//   const colorScheme = {
//     bg: isStudent ? "bg-green-600" : "bg-blue-600",
//     bgHover: isStudent ? "hover:bg-green-700" : "hover:bg-blue-700",
//     bgLight: isStudent ? "bg-green-100" : "bg-blue-100",
//     text: isStudent ? "text-green-800" : "text-blue-800",
//     icon: isStudent ? "text-green-600" : "text-blue-600"
//   };

//   const handleLogout = () => {
//     if (window.confirm("Are you sure you want to log out?")) {
//       localStorage.clear();
//       navigate("/login");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <button
//               onClick={() => navigate(userData.role === "librarian" ? "/admin-dashboard" : "/student-dashboard")}
//               className="flex items-center space-x-2 focus:outline-none"
//             >
//               <img src={logo} alt="HNBG Library Logo" className="h-10 w-auto" />
//               <span className="hidden md:inline text-xl font-semibold text-gray-800">
//                 Library System
//               </span>
//             </button>

//             {/* User Dropdown */}
//             <div className="relative user-dropdown">
//               <button
//                 onClick={() => setShowDropdown(prev => !prev)}
//                 className={`flex items-center space-x-2 ${colorScheme.bgLight} ${colorScheme.text} px-3 py-1 rounded-full hover:${colorScheme.bgHover.replace('hover:', '')} transition-colors`}
//                 aria-label="User menu"
//                 aria-expanded={showDropdown}
//               >
//                 <span className="font-medium hidden sm:inline">{userData.name}</span>
//                 <div className={`w-8 h-8 ${isStudent ? 'bg-green-600' : 'bg-blue-600'} text-white rounded-full flex items-center justify-center font-bold text-sm`}>
//                   {userData.initials}
//                 </div>
//               </button>

//               {showDropdown && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border z-50 overflow-hidden">
//                   <button
//                     onClick={() => {
//                       const profilePath = userData.role === "librarian"
//                         ? "/librarian/profile"
//                         : "/student/profile";
//                       navigate(profilePath);
//                       setShowDropdown(false);
//                     }}
//                     className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
//                   >
//                     <User className={`w-4 h-4 mr-2 ${colorScheme.icon}`} />
//                     My Profile
//                   </button>

//                   <button
//                     onClick={handleLogout}
//                     className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
//                   >
//                     <LogOut className="w-4 h-4 mr-2" />
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex-grow p-4 sm:p-6">
//         <div className="max-w-7xl mx-auto">
//           <Outlet />
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-white border-t py-4 mt-auto">
//         <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
//           © {new Date().getFullYear()} HNBGU Library Management System
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default MainLayout;


import { Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/HNBG-new-logo.png";
import { useState, useEffect } from "react";
import { User, LogOut } from "lucide-react";

const MainLayout = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    role: '',
    name: 'User',
    initials: 'U'
  });
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role") || '';
    const name = localStorage.getItem("name") || 'User';
    const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

    setUserData({ role, name, initials });

    // Close dropdown when clicking outside
    const handleClickOutside = (e) => {
      if (!e.target.closest('.user-dropdown')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);

    // ✅ Listen for logout in other tabs
    const handleStorageLogout = (event) => {
      if (event.key === "logout") {
        navigate("/login");
      }
    };
    window.addEventListener("storage", handleStorageLogout);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener("storage", handleStorageLogout);
    };
  }, [navigate]);

  const isStudent = userData.role === "student";
  const colorScheme = {
    bg: isStudent ? "bg-green-600" : "bg-blue-600",
    bgHover: isStudent ? "hover:bg-green-700" : "hover:bg-blue-700",
    bgLight: isStudent ? "bg-green-100" : "bg-blue-100",
    text: isStudent ? "text-green-800" : "text-blue-800",
    icon: isStudent ? "text-green-600" : "text-blue-600"
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      // ✅ Broadcast logout to other tabs
      localStorage.setItem("logout", Date.now());

      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <button
              onClick={() => navigate(userData.role === "librarian" ? "/admin-dashboard" : "/student-dashboard")}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img src={logo} alt="HNBG Library Logo" className="h-10 w-auto" />
              <span className="hidden md:inline text-xl font-semibold text-gray-800">
                Library System
              </span>
            </button>

            {/* User Dropdown */}
            <div className="relative user-dropdown">
              <button
                onClick={() => setShowDropdown(prev => !prev)}
                className={`flex items-center space-x-2 ${colorScheme.bgLight} ${colorScheme.text} px-3 py-1 rounded-full hover:${colorScheme.bgHover.replace('hover:', '')} transition-colors`}
                aria-label="User menu"
                aria-expanded={showDropdown}
              >
                <span className="font-medium hidden sm:inline">{userData.name}</span>
                <div className={`w-8 h-8 ${isStudent ? 'bg-green-600' : 'bg-blue-600'} text-white rounded-full flex items-center justify-center font-bold text-sm`}>
                  {userData.initials}
                </div>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border z-50 overflow-hidden">
                  <button
                    onClick={() => {
                      const profilePath = userData.role === "librarian"
                        ? "/librarian/profile"
                        : "/student/profile";
                      navigate(profilePath);
                      setShowDropdown(false);
                    }}
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <User className={`w-4 h-4 mr-2 ${colorScheme.icon}`} />
                    My Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} HNBGU Library Management System
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
