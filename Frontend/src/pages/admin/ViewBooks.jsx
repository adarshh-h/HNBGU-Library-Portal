import { useEffect, useState } from "react";
import axios from "axios";

const ViewBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `http://localhost:5000/api/books/books?page=${currentPage}&limit=${limit}`,
          { withCredentials: true }
        );
        setBooks(res.data.books);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load books");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [currentPage]);

  const filteredBooks = books.filter((book) =>
    book.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.authorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-4 py-6 sm:px-6 md:px-10 max-w-7xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 text-center sm:text-left">
        📚 All Books
      </h1>

      <div className="mb-4 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
        <input
          type="text"
          placeholder="Search by book name or author"
          className="w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-center text-blue-500">Loading books...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredBooks.length === 0 ? (
        <p className="text-center text-gray-500">No books found.</p>
      ) : (
        <>
          {/* Table for md+ screens */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Accession No</th>
                  <th className="px-4 py-3 text-left">Book Name</th>
                  <th className="px-4 py-3 text-left">Author</th>
                  <th className="px-4 py-3 text-left">Publication</th>
                  <th className="px-4 py-3 text-left">Year</th>
                  <th className="px-4 py-3 text-left">Pages</th>
                  <th className="px-4 py-3 text-left">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBooks.map((book, idx) => (
                  <tr key={book._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {(currentPage - 1) * limit + idx + 1}
                    </td>
                    <td className="px-4 py-3 text-sm">{book.accessionNumber}</td>
                    <td className="px-4 py-3 font-medium">{book.bookName}</td>
                    <td className="px-4 py-3 text-sm">{book.authorName}</td>
                    <td className="px-4 py-3 text-sm">{book.publication}</td>
                    <td className="px-4 py-3 text-sm">{book.year}</td>
                    <td className="px-4 py-3 text-sm">{book.totalPages}</td>
                    <td className="px-4 py-3 text-sm">₹{book.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card layout for small screens */}
          <div className="space-y-4 md:hidden">
            {filteredBooks.map((book, idx) => (
              <div
                key={book._id}
                className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">
                    #{(currentPage - 1) * limit + idx + 1}
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {book.accessionNumber}
                  </span>
                </div>
                <h3 className="text-base font-semibold">{book.bookName}</h3>
                <p className="text-sm text-gray-600">by {book.authorName}</p>
                <p className="text-sm">
                  <span className="font-medium">Publication:</span> {book.publication}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Year:</span> {book.year}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Pages:</span> {book.totalPages}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Price:</span> ₹{book.price}
                </p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center items-center gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewBooks;
