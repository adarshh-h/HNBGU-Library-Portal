// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// const HistorySearch = () => {
//   const [rollNumber, setRollNumber] = useState("");
//   const [student, setStudent] = useState(null);
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [hasSearched, setHasSearched] = useState(false);
//   const [apiError, setApiError] = useState(false);

//   useEffect(() => {
//     axios.defaults.withCredentials = true;
//     axios.defaults.baseURL = "http://localhost:5000";
//   }, []);

//   const formatDate = (date) => {
//     if (!date) return "N/A";
//     return new Date(date).toLocaleDateString("en-GB");
//   };

//   const fetchHistory = async () => {
//     if (!rollNumber.trim()) {
//       toast.warning("Please enter a valid roll number");
//       return;
//     }

//     setLoading(true);
//     setApiError(false);
//     setStudent(null);
//     setTransactions([]);
//     setHasSearched(true);

//     try {
//       const { data: studentData } = await axios.get(`/api/issues/student-by-roll/${rollNumber}`);
//       if (!studentData.success) {
//         toast.error("Student not found");
//         setApiError(true);
//         return;
//       }

//       setStudent(studentData.student);

//       const { data: historyData } = await axios.get(`/api/history/history/${studentData.student._id}`);
//       if (!historyData.success || !historyData.transactions.length) {
//         toast.info(historyData.message || "No transactions found");
//         return;
//       }

//       setTransactions(historyData.transactions);
//       toast.success(`Found ${historyData.transactions.length} transactions`);
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Error fetching history");
//       setApiError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 sm:p-6 max-w-6xl mx-auto">
//       <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-700">📚 Student Transaction History</h2>

//       {/* Search Bar */}
//       <div className="mb-6 flex flex-col sm:flex-row items-center gap-3">
//         <input
//           type="text"
//           placeholder="Enter Student Roll Number"
//           value={rollNumber}
//           onChange={(e) => setRollNumber(e.target.value)}
//           onKeyDown={(e) => e.key === 'Enter' && fetchHistory()}
//           className="w-full sm:flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//         />
//         <button
//           onClick={fetchHistory}
//           disabled={loading}
//           className={`w-full sm:w-auto px-6 py-3 rounded-lg text-white font-semibold transition ${
//             loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
//           } flex items-center justify-center gap-2`}
//         >
//           {loading ? (
//             <>
//               <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
//                 <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//               </svg>
//               Searching...
//             </>
//           ) : (
//             "Search History"
//           )}
//         </button>
//       </div>

//       {/* Student Info */}
//       {student && (
//         <div className="bg-blue-50 p-6 border rounded-lg mb-6">
//           <h3 className="text-xl font-semibold text-blue-800 mb-4">🎓 Student Info</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-700">
//             <div><strong>Name:</strong> {student.name}</div>
//             <div><strong>Roll No:</strong> {student.rollNumber}</div>
//             <div><strong>Department:</strong> {student.department}</div>
//             <div><strong>Batch:</strong> {student.batch || "N/A"}</div>
//           </div>
//         </div>
//       )}

//       {/* Transaction Section */}
//       {hasSearched && (
//         <div className="bg-white shadow-md rounded-lg">
//           {apiError ? (
//             <div className="p-8 text-center text-red-600">
//               <svg className="mx-auto h-12 w-12 text-red-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636L5.636 18.364M5.636 5.636L18.364 18.364" />
//               </svg>
//               <h3 className="text-lg font-semibold mb-1">Error Fetching Data</h3>
//               <p>Please check the server or try again later.</p>
//             </div>
//           ) : transactions.length > 0 ? (
//             <div className="p-6 space-y-4">
//               <div className="flex justify-between items-center">
//                 <h3 className="text-lg font-semibold text-gray-800">📖 Transaction Records</h3>
//                 <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{transactions.length} records</span>
//               </div>

//               {/* Responsive Transaction List */}
//               <div className="space-y-4">
//                 {transactions.map((txn, index) => (
//                   <div key={index} className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 hover:bg-gray-100 transition">
//                     <div className="flex-1">
//                       <p className="font-semibold text-gray-800">{txn.book?.bookName}</p>
//                       <p className="text-sm text-gray-500">{txn.book?.authorName}</p>
//                       <p className="text-xs text-gray-400">Accession: {txn.book?.accessionNumber}</p>
//                     </div>
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 mt-4 sm:mt-0">
//                       <div className="text-sm">
//                         <p><strong>Issued:</strong> {formatDate(txn.issueDate)}</p>
//                         <p><strong>Due:</strong> {formatDate(txn.dueDate)}</p>
//                       </div>
//                       <div className="text-sm mt-2 sm:mt-0">
//                         <p>
//                           <strong>Status:</strong>{" "}
//                           <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
//                             txn.returned ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
//                           }`}>
//                             {txn.returned ? "Returned" : "Not Returned"}
//                           </span>
//                         </p>
//                         <p><strong>Returned:</strong> {txn.returned ? formatDate(txn.returnedAt) : "-"}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <div className="p-8 text-center text-gray-600">
//               <h4 className="text-lg font-medium mb-1">No Transaction History</h4>
//               <p>This student has no recorded book transactions.</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HistorySearch;

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const HistorySearch = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [student, setStudent] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;;
  }, []);

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-GB");
  };

  const fetchHistory = async () => {
    if (!rollNumber.trim()) {
      toast.warning("Please enter a valid roll number");
      return;
    }

    setLoading(true);
    setApiError(false);
    setStudent(null);
    setTransactions([]);
    setHasSearched(true);

    try {
      const { data: studentData } = await axios.get(`/api/issues/student-by-roll/${rollNumber}`);
      if (!studentData.success) {
        toast.error("Student not found");
        setApiError(true);
        return;
      }

      setStudent(studentData.student);

      const { data: historyData } = await axios.get(`/api/history/history/${studentData.student._id}`);
      if (!historyData.success || !historyData.transactions.length) {
        toast.info(historyData.message || "No transactions found");
        return;
      }

      setTransactions(historyData.transactions);
      toast.success(`Found ${historyData.transactions.length} transactions`);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error fetching history");
      setApiError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-700">📚 Student Transaction History</h2>

      {/* Search Input */}
      <div className="mb-6 flex flex-col sm:flex-row items-center gap-3">
        <input
          type="text"
          placeholder="Enter Student Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchHistory()}
          className="w-full sm:flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchHistory}
          disabled={loading}
          className={`w-full sm:w-auto px-6 py-3 rounded-lg text-white font-semibold transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          } flex items-center justify-center gap-2`}
        >
          {loading ? (
            <>
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Searching...
            </>
          ) : (
            "Search History"
          )}
        </button>
      </div>

      {/* Student Info */}
      {student && (
        <div className="bg-blue-50 p-4 rounded-lg border mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-gray-700">
            <div><strong>Name:</strong> {student.name}</div>
            <div><strong>Roll No:</strong> {student.rollNumber}</div>
            <div><strong>Dept:</strong> {student.department}</div>
            <div><strong>Batch:</strong> {student.batch || "N/A"}</div>
          </div>
        </div>
      )}

      {/* Transaction Section */}
      {hasSearched && (
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          {apiError ? (
            <div className="text-center text-red-600">
              <p className="font-semibold">Error fetching data</p>
              <p className="text-sm">Please try again later.</p>
            </div>
          ) : transactions.length > 0 ? (
            <>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">📖 Transaction Records</h3>
              <div className="space-y-4">
                {transactions.map((txn, idx) => (
                  <div
                    key={`${txn.issueId}-${txn.issuedBookId || idx}`}
                    className="border p-4 rounded-lg bg-gray-50 hover:bg-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center transition"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{txn.book?.bookName}</p>
                      <p className="text-sm text-gray-600">By {txn.book?.authorName}</p>
                      <p className="text-xs text-gray-500">Accession: {txn.book?.accessionNumber}</p>
                    </div>

                    <div className="mt-3 sm:mt-0 sm:text-right text-sm">
                      <p><strong>Issued:</strong> {formatDate(txn.issueDate)}</p>
                      <p>
                        <strong>Due:</strong> <span className={`${txn.isOverdue && !txn.returned ? "text-red-600 font-semibold" : ""}`}>{formatDate(txn.dueDate)}</span>
                      </p>
                      <p>
                        <strong>Status:</strong>{" "}
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          txn.returned ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {txn.returned ? "Returned" : "Not Returned"}
                        </span>
                      </p>
                      <p><strong>Returned:</strong> {txn.returned ? formatDate(txn.returnedAt) : "-"}</p>
                      {txn.fine > 0 && (
                        <p className="text-xs text-red-500 font-medium">Fine: ₹{txn.fine}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-gray-600 py-10">
              <h4 className="text-lg font-medium mb-1">No Transaction History</h4>
              <p>This student has no recorded book transactions.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HistorySearch;
