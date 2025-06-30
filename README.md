# HNBGU Central Library Portal

A modern, full-featured web application for managing the resources and operations of a college library, supporting both students and librarians.

---

## 🚀 Features

- Digital catalog with advanced search
- Book issue and return workflows
- Borrowing and return history
- Bulk import of books and students (CSV)
- Email notifications for due dates
- Admin dashboard for user and book management
- Secure authentication and role-based access

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

## 💻 Frontend Setup

1. **Install dependencies:**
   ```bash
   cd Frontend
   npm install
   ```

2. **Environment variables:**
   - Create a `.env` file in `Frontend/` with:
     ```
     VITE_API_BASE_URL=http://localhost:6000
     ```

3. **Run the frontend app:**
   ```bash
   npm run dev
   ```
   - The app runs on [http://localhost:5173](http://localhost:5173) by default.

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

