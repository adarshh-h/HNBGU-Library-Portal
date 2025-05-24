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
    axios.defaults.baseURL = "http://localhost:5000";
  }, []);

  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return d.toLocaleDateString("en-GB");
  };

  const handleError = (err, fallbackMsg) => {
    const msg = err?.response?.data?.message || fallbackMsg;
    toast.error(msg);
    setApiError(true);
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
      handleError(err, "Error fetching history");
    } finally {
      setLoading(false);
    }
  };

  const renderSkeletonRow = () => (
    <tr className="animate-pulse border-t">
      {[...Array(5)].map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
        </td>
      ))}
    </tr>
  );

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-700">📚 Student Transaction History</h2>

      <div className="mb-6 flex flex-col sm:flex-row items-center gap-3">
        <input
          type="text"
          placeholder="Enter Student Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchHistory()}
          className="w-full sm:flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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

      {hasSearched && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {apiError ? (
            <div className="p-8 text-center text-red-600">
              <svg className="mx-auto h-12 w-12 text-red-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636L5.636 18.364M5.636 5.636L18.364 18.364" />
              </svg>
              <h3 className="text-lg font-semibold mb-1">Error Fetching Data</h3>
              <p>Please check the server or try again later.</p>
            </div>
          ) : (
            <>
              {student && (
                <div className="bg-blue-50 p-6 border-b">
                  <h3 className="text-xl font-semibold text-blue-800 mb-4">🎓 Student Info</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-700">
                    <div><strong>Name:</strong> {student.name}</div>
                    <div><strong>Roll:</strong> {student.rollNumber}</div>
                    <div><strong>Dept:</strong> {student.department}</div>
                    <div><strong>Batch:</strong> {student.batch || "N/A"}</div>
                  </div>
                </div>
              )}

              <div className="p-6 overflow-x-auto">
                {loading ? (
                  <table className="min-w-full text-sm text-left text-gray-600">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-500">
                      <tr>
                        <th className="px-4 py-3">Book</th>
                        <th className="px-4 py-3">Issued</th>
                        <th className="px-4 py-3">Due</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Returned</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 4 }).map((_, i) => renderSkeletonRow())}
                    </tbody>
                  </table>
                ) : transactions.length > 0 ? (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">📖 Transaction Records</h3>
                      <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{transactions.length} records</span>
                    </div>
                    <table className="min-w-full text-sm text-left text-gray-600">
                      <thead className="bg-gray-100 text-xs uppercase text-gray-500">
                        <tr>
                          <th className="px-4 py-3">Book</th>
                          <th className="px-4 py-3">Issued</th>
                          <th className="px-4 py-3">Due</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Returned</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((txn, i) => (
                          <tr key={i} className="border-t hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <div className="font-medium">{txn.book?.bookName}</div>
                              <div className="text-xs text-gray-500">{txn.book?.authorName}</div>
                              <div className="text-xs text-gray-400">Acc: {txn.book?.accessionNumber}</div>
                            </td>
                            <td className="px-4 py-3">{formatDate(txn.issueDate)}</td>
                            <td className="px-4 py-3">{formatDate(txn.dueDate)}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                                txn.returned ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                              }`}>
                                {txn.returned ? "Returned" : "Not Returned"}
                              </span>
                            </td>
                            <td className="px-4 py-3">{txn.returned ? formatDate(txn.returnedAt) : "-"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                ) : (
                  <div className="text-center text-gray-600 py-10">
                    <h4 className="text-lg font-medium mb-1">No Transaction History</h4>
                    <p>This student has no recorded book transactions.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default HistorySearch;
