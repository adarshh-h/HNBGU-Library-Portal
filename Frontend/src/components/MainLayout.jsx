import { Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/HNBG-new-logo.png";
import { useState, useEffect } from "react";

const MainLayout = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    role: '',
    name: 'User',
    initials: 'U'
  });
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Check localStorage on component mount
    const role = localStorage.getItem("role") || '';
    const name = localStorage.getItem("name") || 'User';
    const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2);

    setUserData({
      role,
      name,
      initials
    });
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.clear();
      navigate("/login"); // Redirect to login page
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
            <div className="relative">
              <button
                onClick={() => setShowDropdown(prev => !prev)}
                className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
              >
                <span className="font-medium hidden sm:inline">{userData.name}</span>
                <div className="w-8 h-8 bg-blue-800 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {userData.initials}
                </div>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border z-50 overflow-hidden">
                  {/* <button
                    onClick={() => {
                      navigate("/profile");
                      setShowDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                  >
                    My Profile
                  </button> */}
                  <button
                    onClick={() => {
                      const profilePath = userData.role === "librarian"
                        ? "/librarian/profile"
                        : "/student/profile";
                      navigate(profilePath);
                      setShowDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                  >
                    My Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                  >
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