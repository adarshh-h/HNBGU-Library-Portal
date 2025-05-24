const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const csv = require("csv-parser");
const fs = require("fs");
const multer = require("multer");
const { createStudent, getStudents, getStudentById, updateStudent, deleteStudent, bulkImportStudents } = require("../controllers/studentController");
const { createLibrarian } = require("../controllers/librarianController");


const router = express.Router();
const upload = multer({ dest: "uploads/" }); 

router.get("/dashboard", protect("librarian"), (req, res) => {
    res.json({ message: "Welcome to Admin Dashboard!", user: req.user });
});

router.post("/create-student", protect("librarian"), createStudent);

router.get("/students", protect("librarian"), getStudents);

router.get("/students/:id", protect("librarian"), getStudentById);

router.put("/students/:id", protect("librarian"), updateStudent);

router.delete("/students/:id", protect("librarian"), deleteStudent);

router.post("/bulk-import-students", protect("librarian"), upload.single("file"), bulkImportStudents);

router.post("/create-librarian", protect("librarian"), createLibrarian);

// router.get("/profile", protect("librarian"), async (req, res) => {
//   try {
//     res.json({ user: req.user });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// router.put("/profile", protect("librarian"), async (req, res) => {
//   try {
//     const { name, phone, department } = req.body;
//     const updated = await User.findByIdAndUpdate(
//       req.user._id,
//       { name, phone, department },
//       { new: true }
//     ).select("-password");
//     res.json({ user: updated });
//   } catch (err) {
//     res.status(500).json({ message: "Update failed" });
//   }
// });


// router.post('/change-password', protect('librarian'), async (req, res) => {
//   try {
//        const { currentPassword, newPassword } = req.body;
   
//        // Validate input
//        if (!currentPassword || !newPassword) {
//          return res.status(400).json({
//            success: false,
//            error: "Both current and new password are required.",
//          });
//        }
   
//        if (newPassword.length < 6) {
//          return res.status(400).json({
//            success: false,
//            error: "New password must be at least 6 characters long.",
//          });
//        }
   
//        // Fetch user
//        const user = await User.findById(req.user._id);
//        if (!user) {
//          return res.status(404).json({
//            success: false,
//            error: "User not found.",
//          });
//        }
   
//        // Match current password
//        const isMatch = await bcrypt.compare(currentPassword, user.password);
//        if (!isMatch) {
//          return res.status(400).json({
//            success: false,
//            error: "Current password is incorrect.",
//          });
//        }
   
//        // Check if new password is same as current
//        const isSame = await bcrypt.compare(newPassword, user.password);
//        if (isSame) {
//          return res.status(400).json({
//            success: false,
//            error: "New password must be different from current password.",
//          });
//        }
   
//        // Set new password (will hash automatically via pre-save middleware)
//        user.password = newPassword;
//        user.passwordChangedAt = Date.now();
//        await user.save();
   
//        res.json({
//          success: true,
//          message: "Password changed successfully. Please login again.",
//        });
//      } catch (error) {
//        console.error("Error changing password:", error.message);
//        res.status(500).json({
//          success: false,
//          error: "Server error while changing password.",
//        });
//      }
// });

module.exports = router;