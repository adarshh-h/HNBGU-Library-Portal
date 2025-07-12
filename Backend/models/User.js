const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["librarian", "student"], required: true }, // Role-based access

    department: { type: String, required: true }, 
    batch: { type: String, default: null }, // Only for students
    rollNumber: { type: String, default: null, unique: true }, // Only for students, now unique
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // Tracks librarian who added student
});

// ✅ Hash password before saving
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// ✅ Ensure batch and rollNumber are only for students
UserSchema.pre("save", function (next) {
    if (this.role === "librarian") {
        this.batch = undefined;
        this.rollNumber = undefined;
    }
    next();
});

module.exports = mongoose.model("User", UserSchema);
