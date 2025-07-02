# HNBGU Library System

A modern, full-featured web application for managing the resources and operations of a college library, supporting both students and librarians.

> **This project was specially designed and developed for the School of Engineering & Technology Library of Hemvati Nandan Bahuguna Garhwal University (HNBGU) and is actively used by the Computer Science & Engineering Library department.**

## 🎓 About

This project was custom-built for the School of Engineering & Technology Library of Hemvati Nandan Bahuguna Garhwal University (HNBGU) and is currently in active use by the Computer Science & Engineering Library departmentto manage daily operations.

---

## 🚀 Features

- Admin Dashboard: Centralized hub for all administrative tasks.
- Student Dashboard: Personalized space for students to view their issued books and history.
- Role-Based Access Control: Secure access for Admins and Students.
- Book Management: Add, view, update, and delete books from the library catalog.
- Student Management: Create, view, and manage student accounts.
- Bulk Import: Easily add multiple books or students at once by uploading .csv files.
- Issue & Return System: Seamlessly manage the process of issuing and returning books.
- Transaction History: Keeps a detailed log of all book transactions.
- Email Notifications: Automatic email confirmations for book issues, returns, and due date reminders.
- Scheduled Reminders: Automated daily checks to send reminders for books due within 7 days.
---

## 🏗️ Project Structure

```
Library/
  ├── Backend/    # Node.js/Express API
  └── Frontend/   # React + Vite client
```

---

## ⚙️ Backend Setup

1. **Install dependencies:**
   ```bash
   cd Backend
   npm install
   ```

2. **Environment variables:**
   - Create a `.env` file in `Backend/` with:
     ```
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     EMAIL_USER=your_email@example.com
     EMAIL_PASS=your_email_password
     ```
   - (Adjust as needed for your email provider and environment.)

3. **Run the backend server:**
   ```bash
   npm run dev
   ```
   - The server runs on port `6000` by default.

---
## 🛠️ Tech Stack
-- Frontend: React.js, Vite, CSS
-- Backend: Node.js, Express.js
-- Database: MongoDB
-- Authentication: JSON Web Tokens (JWT), Cookies
-- Email Service: Nodemailer with Gmail

---

## 💻 Frontend Setup

1. **Install dependencies:**
   ```bash
   cd Frontend
   npm install
   ```

2. **Environment variables:**
   - Create a `.env` file in `Frontend/` with:
     ```
     VITE_API_BASE_URL=http://localhost:5000
     ```

3. **Run the frontend app:**
   ```bash
   npm run dev
   ```
   - The app runs on [http://localhost:5173](http://localhost:5173) by default.

---
## 🧪 Testing Credentials
For testing purposes, you can use the following credentials to log in:

-- Admin/Librarian Email: kumaradarsh0811@gmail.com
-- Password: 87654321
You will need to create this user in your database first. You can use the "Add Librarian" feature or create it directly in your MongoDB instance with the role admin. The password will be automatically hashed when the user is created through the application.

---

## 📦 Bulk Import (CSV)

- **Books:** Use the admin dashboard to upload a CSV file with columns:
  ```
  Accession Number, Author Name, Book Name, Category, Publication, Year, Total Pages, Supplier, Price
  ```
- **Students:** Use the admin dashboard to upload a CSV file with columns:
  ```
  name, email, phone, department, batch (YYYY-YYYY), rollNumber
  ```

---

## 🛡️ Authentication & Roles

- **Librarian/Admin:** Can manage books, students, and view reports.
- **Student:** Can view and manage their own borrowings and profile.

---

## 📬 Notifications

- Email notifications are sent for due dates and important events (requires email setup in backend `.env`).

---

## 📝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the ISC License.

---

## ✅ Project Status

This project is **complete** and production-ready. All major features have been implemented and tested. For support or feature requests, please open an issue.
