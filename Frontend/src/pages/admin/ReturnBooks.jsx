// import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ReturnBooks = () => {
//   const [rollNumber, setRollNumber] = useState("");
//   const [student, setStudent] = useState(null);
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [hasSearched, setHasSearched] = useState(false);

//   axios.defaults.withCredentials = true;
//   axios.defaults.baseURL = "http://localhost:5000";

//   // Format date as dd-mm-yyyy
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   const handleSearch = async () => {
//     if (!rollNumber.trim()) {
//       toast.warning("Please enter a roll number");
//       return;
//     }

//     setStudent(null);
//     setBooks([]);
//     setLoading(true);
//     setHasSearched(true);
    
//     try {
//       const res = await axios.get(`/api/issues/student-by-roll/${rollNumber}`);
//       if (res.data.success) {
//         setStudent(res.data.student);
//         await fetchUnreturnedBooks(res.data.student._id);
//       } else {
//         toast.error(res.data.message || "Student not found");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error searching for student");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUnreturnedBooks = async (studentId) => {
//     try {
//       const res = await axios.get(`/api/returns/student/${studentId}`);
//       if (res.data.success) {
//         setBooks(res.data.books);
//         if (res.data.books.length === 0) {
//           toast.info(res.data.message || "No books to return");
//         }
//       } else {
//         toast.info(res.data.message || "No unreturned books found");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error fetching unreturned books");
//     }
//   };

//   const handleReturn = async (book) => {
//     if (!student) return;

//     try {
//       const res = await axios.post("/api/returns", {
//         studentId: student._id,
//         bookId: book._id,
//         issueId: book.issueId
//       });

//       if (res.data.success) {
//         setBooks(prev => prev.filter(b => b._id !== book._id));
//         toast.success(
//           <div>
//             <p className="font-medium">Book returned successfully!</p>
//             {res.data.data.fineAmount > 0 && (
//               <p className="text-sm">Fine: ₹{res.data.data.fineAmount} ({res.data.data.daysOverdue} days overdue)</p>
//             )}
//           </div>
//         );
//       }
//     } catch (err) {
//       toast.error(
//         <div>
//           <p className="font-medium">Failed to return book</p>
//           <p className="text-sm">{err.response?.data?.message || "Please try again"}</p>
//         </div>
//       );
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <div className="bg-white rounded-xl shadow-md p-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">📘 Book Return System</h2>

//         {/* Search Section */}
//         <div className="mb-6">
//           <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700 mb-1">
//             Student Roll Number
//           </label>
//           <div className="flex gap-2">
//             <input
//               id="rollNumber"
//               type="text"
//               placeholder="Enter student roll number"
//               value={rollNumber}
//               onChange={(e) => setRollNumber(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//               className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               disabled={loading}
//             />
//             <button
//               onClick={handleSearch}
//               disabled={loading || !rollNumber.trim()}
//               className={`px-6 py-3 rounded-lg font-medium ${
//                 loading || !rollNumber.trim()
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-blue-600 hover:bg-blue-700 text-white"
//               }`}
//             >
//               {loading ? (
//                 <span className="flex items-center">
//                   <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Searching...
//                 </span>
//               ) : (
//                 "Search"
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Student Info */}
//         {student && (
//           <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
//             <h3 className="text-lg font-semibold text-blue-800 mb-3">Student Details</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Name</p>
//                 <p className="font-medium">{student.name}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Roll No.</p>
//                 <p className="font-medium">{student.rollNumber}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Department</p>
//                 <p className="font-medium">{student.department}</p>
//               </div>
//               {student.batch && (
//                 <div>
//                   <p className="text-sm font-medium text-gray-500">Batch</p>
//                   <p className="font-medium">{student.batch}</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Results Section */}
//         {hasSearched && (
//           <div className="border border-gray-200 rounded-lg overflow-hidden">
//             {books.length > 0 ? (
//               <>
//                 <div className="bg-gray-50 px-4 py-3 border-b">
//                   <h3 className="font-semibold text-gray-800">
//                     Books to Return <span className="text-blue-600">({books.length})</span>
//                   </h3>
//                 </div>
//                 <div className="divide-y divide-gray-200">
//                   {books.map((book) => (
//                     <div key={book._id} className="p-4 hover:bg-gray-50">
//                       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                         <div className="flex-1">
//                           <div className="flex items-start gap-3">
//                             <div className="bg-gray-100 p-2 rounded-lg">
//                               <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                               </svg>
//                             </div>
//                             <div>
//                               <h4 className="font-medium text-gray-900">{book.bookName}</h4>
//                               <p className="text-sm text-gray-600">by {book.authorName}</p>
//                               <p className="text-xs text-gray-500 mt-1">Accession: {book.accessionNumber}</p>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="md:text-right">
//                           <div className="flex flex-col gap-1">
//                             <p className="text-sm">
//                               <span className="font-medium">Issued:</span> {formatDate(book.issueDate)}
//                             </p>
//                             <p className={`text-sm ${book.isOverdue ? 'text-red-600' : 'text-gray-600'}`}>
//                               <span className="font-medium">Due:</span> {formatDate(book.dueDate)}
//                               {book.isOverdue && " (Overdue)"}
//                             </p>
//                           </div>
//                         </div>
//                         <button
//                           onClick={() => handleReturn(book)}
//                           className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
//                         >
//                           Return Book
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             ) : student ? (
//               <div className="p-8 text-center">
//                 <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
//                   <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-1">No Books to Return</h3>
//                 <p className="text-gray-500">This student has no outstanding books to return.</p>
//               </div>
//             ) : (
//               <div className="p-8 text-center">
//                 <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
//                   <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                   </svg>
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-1">Student Not Found</h3>
//                 <p className="text-gray-500">No student found with this roll number. Please verify and try again.</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ReturnBooks;

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-blue-50/50 p-4 rounded border mb-6">
      <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
    </div>
    <div className="space-y-4">
      {[1, 2].map((i) => (
        <div key={i} className="flex justify-between items-center p-4 border rounded">
          <div className="w-full">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div className="h-10 w-24 bg-gray-200 rounded ml-4"></div>
        </div>
      ))}
    </div>
  </div>
);

const ReturnBooks = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [student, setStudent] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [returningBookId, setReturningBookId] = useState(""); // For disabling button during return

  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const handleSearch = async () => {
    if (!rollNumber.trim()) {
      toast.warning("Please enter a roll number");
      return;
    }

    setStudent(null);
    setBooks([]);
    setLoading(true);
    setHasSearched(true);

    try {
      const res = await axios.get(`/api/issues/student-by-roll/${rollNumber}`);
      if (res.data.success) {
        setStudent(res.data.student);
        await fetchUnreturnedBooks(res.data.student._id);
      } else {
        toast.error(res.data.message || "Student not found");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error searching for student");
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreturnedBooks = async (studentId) => {
    try {
      const res = await axios.get(`/api/returns/student/${studentId}`);
      if (res.data.success) {
        setBooks(res.data.books);
        if (res.data.books.length === 0) {
          toast.info("No unreturned books.");
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error fetching unreturned books");
    }
  };

  const handleReturn = async (book) => {
    if (!student || !book.issuedBookId || !book.issueId) {
      toast.error("Missing return information");
      return;
    }

    setReturningBookId(book.issuedBookId); // Disable this button

    try {
      const res = await axios.post("/api/returns", {
        studentId: student._id,
        bookId: book._id,
        issueId: book.issueId,
        issuedBookId: book.issuedBookId, // ✅ correct key
      });

      if (res.data.success) {
        toast.success("✅ Book returned successfully!");
        setBooks((prev) => prev.filter((b) => b.issuedBookId !== book.issuedBookId));
      } else {
        toast.error(res.data.message || "Failed to return book.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error returning book.");
    } finally {
      setReturningBookId(""); // Re-enable buttons
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📕 Return Books</h2>

        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-1">Roll Number</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="border px-4 py-2 rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter roll number"
              disabled={loading}
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400 transition-colors duration-200 min-w-[120px]"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                  <span className="ml-2">Searching...</span>
                </div>
              ) : (
                "Search"
              )}
            </button>
          </div>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {student && (
              <div className="bg-blue-50 p-4 rounded border mb-6 transform transition-all duration-200 hover:shadow-md">
                <p className="font-semibold">👤 {student.name}</p>
                <p className="text-sm text-gray-600">
                  🎓 {student.department} | 🆔 {student.rollNumber} {student.batch && `| 🎯 Batch: ${student.batch}`}
                </p>
              </div>
            )}

            {hasSearched && !loading && (
              <div className="mt-6">
                {books.length > 0 ? (
                  <div className="space-y-4">
                    {books.map((book) => (
                      <div
                        key={book.issuedBookId}
                        className="flex justify-between items-center p-4 border rounded hover:shadow-md transition-shadow duration-200"
                      >
                        <div>
                          <h6 className="text-xs text-gray-500 mt-1">Accession: {book.accessionNumber}</h6>
                          <h4 className="font-medium text-lg">{book.bookName}</h4>
                          <p className="text-sm text-gray-600">by {book.authorName}</p>
                          <p className="text-xs text-gray-500">Issued: {formatDate(book.issueDate)}</p>
                          <p className="text-xs text-gray-500">
                            Due: {formatDate(book.dueDate)}{" "}
                            {book.isOverdue && (
                              <span className="text-red-600 font-semibold ml-1 animate-pulse">(Overdue)</span>
                            )}
                          </p>
                        </div>
                        <button
                          onClick={() => handleReturn(book)}
                          disabled={returningBookId === book.issuedBookId}
                          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:bg-gray-400 transition-colors duration-200 min-w-[120px] flex items-center justify-center"
                        >
                          {returningBookId === book.issuedBookId ? (
                            <>
                              <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                              Returning...
                            </>
                          ) : (
                            "Return"
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  student && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">📚 This student has no books to return.</p>
                    </div>
                  )
                )}
                {!student && hasSearched && !loading && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">🔍 No student found with this roll number.</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ReturnBooks;

