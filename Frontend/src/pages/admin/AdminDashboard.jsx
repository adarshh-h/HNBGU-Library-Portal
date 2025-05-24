import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  UserPlus, Users, Upload, LogOut,
  BookOpen, Book, ArrowDownUp, CornerDownLeft, User
} from "lucide-react";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/dashboard", { withCredentials: true })
      .then(res => {
        setUser(res.data.user);
        setIsLoading(false);
      })
      .catch(() => {
        navigate("/");
        setIsLoading(false);
      });
  }, [navigate]);

  // const handleLogout = () => {
  //   if (window.confirm("Are you sure you want to log out?")) {
  //     axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true })
  //       .then(() => navigate("/"))
  //       .catch(err => console.error("Logout Failed", err));
  //   }
  // };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Welcome, <span className="text-blue-600">{user.name}</span>
            </h1>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">Librarian Dashboard</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-xs sm:text-sm px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium">
              Active
            </span>
            <span className="text-xs sm:text-sm text-gray-500 hidden sm:block">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Grid Cards */}
      <div className="max-w-7xl mx-auto space-y-10">
        {/* User Management */}
        <Section title="User Management">
          <DashboardCard 
            title="Add Librarian" 
            icon={UserPlus} 
            onClick={() => navigate("/add-librarian")} 
            color="bg-purple-600 hover:bg-purple-700"
          />
          <DashboardCard 
            title="Register Student" 
            icon={UserPlus} 
            onClick={() => navigate("/create-student")} 
            color="bg-blue-600 hover:bg-blue-700"
          />
          <DashboardCard 
            title="View Students" 
            icon={Users} 
            onClick={() => navigate("/view-students")} 
            color="bg-teal-600 hover:bg-teal-700"
          />
          <DashboardCard 
            title="Bulk Register" 
            icon={Upload} 
            onClick={() => navigate("/bulk-import-students")} 
            color="bg-amber-600 hover:bg-amber-700"
          />
        </Section>

        {/* Book Management */}
        <Section title="Book Management">
          <DashboardCard 
            title="View Books" 
            icon={Book} 
            onClick={() => navigate("/view-books")} 
            color="bg-indigo-600 hover:bg-indigo-700"
          />
          <DashboardCard 
            title="Bulk Add Books" 
            icon={Upload} 
            onClick={() => navigate("/bulk-import-books")} 
            color="bg-sky-600 hover:bg-sky-700"
          />
          <DashboardCard 
            title="Issue Books" 
            icon={ArrowDownUp} 
            onClick={() => navigate("/issue-books")} 
            color="bg-pink-600 hover:bg-pink-700"
          />
          <DashboardCard 
            title="Return Books" 
            icon={CornerDownLeft} 
            onClick={() => navigate("/return-books")} 
            color="bg-orange-600 hover:bg-orange-700"
          />
        </Section>

        {/* Other Features */}
        <Section title="Other Features">
          <DashboardCard 
            title="Transaction History" 
            icon={BookOpen} 
            onClick={() => navigate("/history-books")} 
            color="bg-blue-700 hover:bg-blue-800"
          />
          {/* <DashboardCard 
            title="Profile" 
            icon={User} 
            onClick={() => navigate("/profile")} 
            color="bg-gray-600 hover:bg-gray-700"
          />
          <DashboardCard 
            title="Logout" 
            icon={LogOut} 
            onClick={handleLogout} 
            color="bg-red-600 hover:bg-red-700"
          /> */}
        </Section>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div>
    <h2 className="text-lg font-semibold text-gray-700 mb-4 pl-2 border-l-4 border-blue-500">
      {title}
    </h2>
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {children}
    </div>
  </div>
);

const DashboardCard = ({ title, icon: Icon, onClick, color = "bg-blue-600 hover:bg-blue-700" }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center rounded-xl shadow-md transition-all duration-200 p-5 ${color} hover:shadow-lg hover:-translate-y-1`}
    aria-label={title}
  >
    <div className="mb-3 p-3 rounded-full flex items-center justify-center text-white">
      <Icon className="w-6 h-6" />
    </div>
    <span className="text-sm font-medium text-center text-white">{title}</span>
  </button>
);

export default AdminDashboard;