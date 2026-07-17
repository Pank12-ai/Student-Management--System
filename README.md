# Student Management System

A full-stack Student Management System built using the MERN stack. The application provides secure authentication and role-based authorization for managing student records efficiently.

---

## 🚀 Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Password Validation
- Authentication Middleware
- Protected Routes

### Authorization
- Role-Based Authorization
- Admin can create student accounts.
- Students can access only their own information.
- Unauthorized users cannot access protected resources.

### Student Management
- Create Student
- View Student Details
- Update Student Details
- Delete Student Details

---

## 🛠️ Tech Stack

### Frontend
- React.js *(In Progress)*

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JSON Web Token (JWT)
- bcrypt

### Tools
- Git
- GitHub
- Postman

---

## 📌 API Endpoints

### Authentication

POST /api/auth/register

POST /api/auth/login

### Student

GET /api/students

GET /api/students/:id

POST /api/students

PUT /api/students/:id

DELETE /api/students/:id

---

## 🔐 Security

- JWT-based Authentication
- Authentication Middleware
- Role-Based Authorization
- Protected API Routes
- Password Hashing using bcrypt

---

## 📂 Project Structure

Backend/
├── Controllers/
├── Middleware/
├── Models/
├── Routes/
├── Config/
├── package.json
└── index.js

Frontend/ *(In Progress)*

---

## 🚧 Future Improvements

- Student Dashboard
- Admin Dashboard
- Attendance Management
- Search & Filter
- Pagination
- File Upload
- Email Verification
- Forgot Password
- Password Reset

---

## 👨‍💻 Author

Pankaj Kumar