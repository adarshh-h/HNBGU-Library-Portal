// import { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const StudentDashboard = () => {
//     const [user, setUser] = useState(null);
//     const [issuedBooks, setIssuedBooks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Fetch user data and issued books
//         axios.all([
//             axios.get(`${API_BASE_URL}/api/student/dashboard`, { withCredentials: true }),
//             axios.get(`${API_BASE_URL}/api/student/issued-books`, { withCredentials: true })
//         ])
//         .then(axios.spread((userRes, booksRes) => {
//             setUser(userRes.data.user);
//             setIssuedBooks(booksRes.data.books);
//         }))
//         .catch(() => navigate("/"))
//         .finally(() => setLoading(false));
//     }, [navigate]);

//     const handleLogout = () => {
//         axios.post(`${API_BASE_URL}/api/auth/logout`, {}, { withCredentials: true })
//             .then(() => navigate("/"))
//             .catch(err => console.error("Logout Failed", err));
//     };

//     if (loading) return <div className="text-center mt-10">Loading...</div>;

//     return (
//         <div className="p-6 max-w-4xl mx-auto">
//             <div className="flex justify-between items-center mb-8">
//                 <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
//                 <button 
//                     onClick={handleLogout}
//                     className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
//                 >
//                     Logout
//                 </button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Current Issues Card */}
//                 <div className="bg-white p-6 rounded-lg shadow">
//                     <h2 className="text-xl font-semibold mb-4">📚 My Issued Books</h2>
//                     {issuedBooks.length > 0 ? (
//                         <ul className="space-y-3">
//                             {issuedBooks.map(book => (
//                                 <li key={book._id} className="border-b pb-3">
//                                     <p className="font-medium">{book.bookName}</p>
//                                     <p className="text-sm text-gray-600">by {book.authorName}</p>
//                                     <p className="text-sm mt-1">
//                                         <span className="font-medium">Issued:</span> {new Date(book.issueDate).toLocaleDateString()}
//                                     </p>
//                                     <p className={`text-sm ${new Date(book.dueDate) < new Date() ? 'text-red-500' : ''}`}>
//                                         <span className="font-medium">Due:</span> {new Date(book.dueDate).toLocaleDateString()}
//                                         {new Date(book.dueDate) < new Date() && " (Overdue)"}
//                                     </p>
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p className="text-gray-500">You don't have any books issued currently</p>
//                     )}
//                 </div>

//                 {/* Account and History Card */}
//                 <div className="space-y-6">
//                     <div className="bg-white p-6 rounded-lg shadow">
//                         <h2 className="text-xl font-semibold mb-4">🕒 My History</h2>
//                         <Link 
//                             to="/student/history" 
//                             className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//                         >
//                             View Issue/Return History
//                         </Link>
//                     </div>

//                     <div className="bg-white p-6 rounded-lg shadow">
//                         <h2 className="text-xl font-semibold mb-4">👤 My Account</h2>
//                         <div className="space-y-2 mb-4">
//                             <p><span className="font-medium">Roll No:</span> {user.rollNumber}</p>
//                             <p><span className="font-medium">Department:</span> {user.department}</p>
//                             <p><span className="font-medium">Email:</span> {user.email}</p>
//                             {user.batch && <p><span className="font-medium">Batch:</span> {user.batch}</p>}
//                         </div>
//                         <Link 
//                             to="/student/change-password" 
//                             className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-2"
//                         >
//                             Change Password
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default StudentDashboard;

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Format to dd-mm-yyyy
const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString("en-GB");

const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .all([
        axios.get(`${API_BASE_URL}/api/student/dashboard`, { withCredentials: true }),
        axios.get(`${API_BASE_URL}/api/student/issued-books`, { withCredentials: true }),
      ])
      .then(
        axios.spread((userRes, booksRes) => {
          setUser(userRes.data.user);
          setIssuedBooks(booksRes.data.books);
        })
      )
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600 border-solid"></div>
      </div>
    );
  }

  const overdueCount = issuedBooks.filter(
    (book) => new Date(book.dueDate) < new Date()
  ).length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">👋 Welcome, {user.name}</h1>
        <p className="text-gray-500 mt-1">Here’s a quick overview of your library activity.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard label="Currently Borrowed Books" value={issuedBooks.length} color="bg-blue-100" />
        <DashboardCard label="Overdue Books" value={overdueCount} color="bg-red-100" />
        <div className="bg-green-100 p-5 rounded-lg shadow text-center">
          <Link to="/student/history" className="text-green-700 font-medium hover:underline">
            📖 View Borrow/Return History
          </Link>
        </div>
      </div>

      {/* Currently Borrowed Books List */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">📚 Currently Borrowed Books</h2>
        {issuedBooks.length === 0 ? (
          <p className="text-gray-500">You have no books currently borrowed.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {issuedBooks.map((book) => (
              <li key={book._id} className="py-4">
                <div className="text-lg font-medium text-gray-800">{book.bookName}</div>
                <div className="text-sm text-gray-600">by {book.authorName}</div>
                <div className="text-sm text-gray-500 mt-1">
                  <p>📅 Issued: {formatDate(book.issueDate)}</p>
                  <p className={new Date(book.dueDate) < new Date() ? "text-red-600 font-semibold" : ""}>
                    ⏰ Due: {formatDate(book.dueDate)}
                    {new Date(book.dueDate) < new Date() && " (Overdue)"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const DashboardCard = ({ label, value, color }) => (
  <div className={`${color} p-5 rounded-lg shadow text-center`}>
    <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
    <p className="text-sm font-medium text-gray-700 mt-1">{label}</p>
  </div>
);

export default StudentDashboard;
