// require("dotenv").config();
// const express = require("express");
// const connectDB = require("./config/db");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const { setupScheduledJobs } = require("./services/scheduler");

// // Connect to MongoDB
// connectDB();

// // Initialize app
// const app = express();

// // Middlewares
// app.use(express.json());
// app.use(cookieParser());

// // CORS Configuration
// const allowedOrigins = [
//   'http://localhost:5173',
//   'https://hnb-library-system.vercel.app',
//   // 'https://hnb-library-system.onrender.com', // ✅ Add this line
//   'https://hnb-library-system-git-main-adarshs-projects-3c69f35f.vercel.app',
// ];


// const corsOptions = {
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like mobile apps or curl requests)
//     if (!origin) return callback(null, true);
    
//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       console.warn(`Blocked by CORS: ${origin}`);
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
//   exposedHeaders: ['Authorization'], // Expose Authorization header
//   maxAge: 86400 // 24 hours
// };

// app.use(cors(corsOptions));

// // Handle preflight requests
// app.options('*', cors(corsOptions));

// // Routes
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/admin", require("./routes/adminRoutes"));
// app.use("/api/student", require("./routes/studentRoutes"));
// app.use("/api/books", require("./routes/bookRoutes"));
// app.use("/api/issues", require("./routes/issueRoutes"));
// app.use("/api/returns", require("./routes/returnRoutes"));
// app.use("/api/history", require("./routes/historyRoutes"));

// // Start Scheduled Jobs
// setupScheduledJobs();

// // Start Server
// const PORT = process.env.PORT || 6000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
//   console.log(`🌐 Allowed CORS origins: ${allowedOrigins.join(', ')}`);
// });


require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { setupScheduledJobs } = require("./services/scheduler");

// Connect to MongoDB
connectDB();

// Initialize app
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ Allowed frontend origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://hnb-library-system.vercel.app',
  'https://hnb-library-system.onrender.com',
  'https://hnb-library-system-git-main-adarshs-projects-3c69f35f.vercel.app',
];

// ✅ CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`Blocked by CORS: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // ✅ Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Authorization'],
  maxAge: 86400,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // ✅ Preflight support

// ✅ API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/student", require("./routes/studentRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/issues", require("./routes/issueRoutes"));
app.use("/api/returns", require("./routes/returnRoutes"));
app.use("/api/history", require("./routes/historyRoutes"));

// ✅ Scheduled Jobs (if any)
setupScheduledJobs();

// ✅ Start Server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 Allowed CORS origins: ${allowedOrigins.join(', ')}`);
});

