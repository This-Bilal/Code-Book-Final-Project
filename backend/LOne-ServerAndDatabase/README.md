# Lesson One: Server and Database Setup

This folder contains the foundational backend setup for the **Code Book** e-commerce application. It establishes the Express.js server, MongoDB database connection, and core data models needed for managing users, e-books, shopping carts, and orders.

---

## 📦 Project Overview

**Code Book** is a digital bookstore platform where users can:
- Browse and purchase e-books
- Add items to their shopping cart
- Place and manage orders
- Maintain user accounts with secure authentication

This lesson focuses on setting up the backend infrastructure to support these features.

---

## 🏗️ Architecture

### Tech Stack
- **Framework**: Express.js (Node.js)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcrypt
- **Environment**: dotenv for configuration
- **Development**: nodemon for auto-restart

### Project Structure

```
LOne-ServerAndDatabase/
├── server.js              # Main server entry point
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables (not committed)
├── config/                # Configuration files (empty - ready for setup)
├── controllers/           # Route handlers (empty - ready for setup)
├── middleware/            # Custom middleware (empty - ready for setup)
├── models/                # Database schemas
│   ├── userModel.js       # User schema
│   ├── ebookModel.js      # E-book schema
│   ├── cartModel.js       # Shopping cart schema
│   └── orderModel.js      # Order schema
├── routes/                # API routes (empty - ready for setup)
└── utils/                 # Utility functions (empty - ready for setup)
```

---

## 📋 Database Models

### 1. User Model (`userModel.js`)
Stores user account information with timestamps.

**Fields:**
- `name` (String, required) - User's full name
- `email` (String, unique, required) - User's email address
- `password` (String, required) - Hashed password
- `cartList` (Array) - User's shopping cart items
- `orderList` (Array) - User's order history
- `isAdmin` (Boolean) - Admin privileges flag
- `timestamps` - Auto-managed creation and update times

### 2. EBook Model (`ebookModel.js`)
Stores digital book information.

**Fields:**
- `id` (Number, required) - Unique book identifier
- `name` (String, required) - Book title
- `overview` (String, required) - Short description
- `longDescription` (String, required) - Detailed description
- `price` (Number, required, min: 0) - Book price
- `poster` (String, required) - Book cover image URL
- Additional fields for book metadata

### 3. Cart Model (`cartModel.js`)
Manages shopping cart for each user.

**Fields:**
- `userId` (ObjectId, unique, required) - Reference to User model
- `cartList` (Array, default: []) - List of items in cart

### 4. Order Model (`orderModel.js`)
Tracks user orders and purchase details.

**Fields:**
- `user` (Object) - User information
- `quantity` (Number) - Total items ordered
- `amount_paid` (Number) - Total payment amount
- `cartList` (Array, default: []) - Items ordered

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB database (local or Atlas)
- `.env` file with required environment variables

### Installation

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment:**
   Create a `.env` file in this directory:
   ```env
   PORT=3001
   MONGO_URI=mongodb://localhost:27017/codebook
   # or for MongoDB Atlas:
   # MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/codebook
   ```

3. **Start the Server:**
   ```bash
   # Development with auto-restart
   npm run dev

   # Production
   npm start
   ```

---

## 🔌 Server Features

### Core Endpoints

1. **Welcome Route**
   ```
   GET /
   Response: "hello welcome to code book"
   ```

2. **Health Check**
   ```
   GET /health
   Response: { status: "ok", message: "Sever is running" }
   ```

### Middleware Setup

- **JSON Parser** - Parses incoming JSON requests
- **URL Encoded** - Parses form data
- **Cookie Parser** - Extracts cookies from requests
- **Request Logger** - Logs all incoming requests with timestamp, method, and path

### Database Connection

- **Automatic Connection** - Connects to MongoDB on server startup
- **Error Handling** - Gracefully handles connection failures
- **Non-blocking** - Server continues running even if database connection fails

### Error Handling

- **Port In Use** - Detects if port is already in use
- **Server Errors** - Catches and logs server errors
- **Connection Errors** - Logs database connection issues

---

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^5.2.1 | Web framework |
| mongoose | ^9.6.3 | MongoDB ODM |
| dotenv | ^17.4.2 | Environment variables |
| cookie-parser | ^1.4.7 | Cookie handling |
| bcrypt | ^6.0.0 | Password hashing |
| jsonwebtoken | ^9.0.3 | JWT authentication |
| express-async-handler | ^1.2.0 | Async error handling |
| nodemon | ^3.1.14 | Development auto-restart |

---

## 🎯 What's Next

This is **Lesson One** - the foundation. 

### 📚 Lesson Two: Utilities and Middlewares
The next lesson will focus on:
- **Middleware** - Authentication, validation, error handling
- **Utilities** - Helper functions and validation
- Request interceptors and custom middleware
- Error handling patterns

After that, future lessons will add:
- **Controllers** - Business logic for handling requests
- **Routes** - API endpoints for CRUD operations

---

## 💡 Key Concepts Covered

✅ Express.js server setup
✅ MongoDB/Mongoose connection
✅ Schema design and models
✅ Environment configuration
✅ Request logging middleware
✅ Error handling and health checks
✅ Port and connection management