const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const Issue = require("../models/Issue");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { changePassword } = require("../controllers/authController");

const router = express.Router();

// Dashboard route
router.get("/dashboard", protect("student"), (req, res) => {
    res.json({ 
        message: "Welcome to Student Dashboard!", 
        user: req.user 
    });
});

// Get currently issued books
router.get("/issued-books", protect("student"), async (req, res) => {
    try {
        const issues = await Issue.find({ 
            student: req.user._id 
        })
        .populate({
            path: "books.book",
            select: "bookName accessionNumber authorName"
        })
        .populate({
            path: "returnedBooks.book",
            select: "_id"
        });

        const unreturnedBooks = [];
        
        issues.forEach(issue => {
            const returnedSet = new Set(
                issue.returnedBooks.map(r => r.book._id.toString())
            );

            issue.books.forEach(bookObj => {
                const bookId = bookObj.book._id.toString();
                if (!returnedSet.has(bookId)) {
                    unreturnedBooks.push({
                        _id: bookObj.book._id,
                        bookName: bookObj.book.bookName,
                        accessionNumber: bookObj.book.accessionNumber,
                        authorName: bookObj.book.authorName,
                        issueDate: bookObj.issueDate,
                        dueDate: bookObj.dueDate
                    });
                }
            });
        });

        res.json({ books: unreturnedBooks });
    } catch (error) {
        console.error("Error fetching issued books:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Get transaction history
router.get("/history", protect("student"), async (req, res) => {
    try {
        const issues = await Issue.find({ 
            student: req.user._id 
        })
        .populate({
            path: "books.book",
            select: "bookName accessionNumber authorName"
        })
        .populate({
            path: "returnedBooks.book",
            select: "bookName accessionNumber"
        })
        .sort({ createdAt: -1 });

        const transactions = [];
        
        issues.forEach(issue => {
            const returnedMap = new Map();
            issue.returnedBooks.forEach(returnEntry => {
                returnedMap.set(returnEntry.book._id.toString(), returnEntry.returnedAt);
            });

            issue.books.forEach(bookEntry => {
                transactions.push({
                    book: bookEntry.book,
                    issueDate: bookEntry.issueDate,
                    dueDate: bookEntry.dueDate,
                    returned: returnedMap.has(bookEntry.book._id.toString()),
                    returnedAt: returnedMap.get(bookEntry.book._id.toString())
                });
            });
        });

        res.json({ transactions });
    } catch (error) {
        console.error("Error fetching history:", error);
        res.status(500).json({ message: "Server error" });
    }
});
  
// Add these routes near the other profile routes
router.get('/profile', protect('student'), async (req, res) => {
  try {
    res.json({ 
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone,
        department: req.user.department,
        batch: req.user.batch,
        rollNumber: req.user.rollNumber,
        role: req.user.role  // Make sure this is included
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/profile', protect('student'), async (req, res) => {
  try {
    const { name, phone, department, batch } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone, department, batch },
      { new: true }
    ).select('-password');
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
});

router.post("/change-password", protect("student"), changePassword);

module.exports = router;