# Lesson Two: Middlewares and Utilities

Building on the foundation from **Lesson One**, this lesson introduces critical middleware for authentication and authorization, along with utility functions for token management and data generation.

---

## 📚 What's Different from Lesson One

### ✅ New Additions

| Component | Purpose |
|-----------|---------|
| **authMiddleware.js** | Authentication & authorization middleware |
| **utils/index.js** | Utility functions for tokens and ID generation |

### 📁 Enhanced Folder Structure

```
LTwo-MiddlewaresAndUtilities/
├── server.js              # Main server (same as Lesson One)
├── package.json           # Dependencies (same)
├── .env                   # Environment variables (now includes JWT_TOKEN)
├── models/                # Database schemas (from Lesson One)
│   ├── userModel.js
│   ├── ebookModel.js
│   ├── cartModel.js
│   └── orderModel.js
├── middleware/            # ✨ NOW POPULATED
│   └── authMiddleware.js  # JWT-based auth & authorization
├── utils/                 # ✨ NOW POPULATED
│   └── index.js           # Token generation & ID helpers
├── config/                # Still empty - ready for database config
├── controllers/           # Still empty - ready for route handlers
└── routes/                # Still empty - ready for API endpoints
```

---

## 🔐 Authentication Middleware (`middleware/authMiddleware.js`)

### Overview
Provides two middleware functions for protecting routes based on user authentication and authorization levels.

### 1. `protect` - User Authentication
Verifies that a request includes a valid JWT token and attaches the user to the request.

```javascript
const protect = asyncHandler(async (req, res, next) => {
    // Extracts token from cookies
    // Verifies JWT token
    // Fetches user from database (without password)
    // Attaches user to req.user
    // Proceeds to next middleware/route
})
```

**Usage:**
```javascript
router.get('/profile', protect, getUserProfile);
router.post('/cart', protect, addToCart);
```

**Behavior:**
- ✅ Allows authenticated users to access protected routes
- ❌ Returns 401 if no token is provided
- ❌ Returns 404 if user is not found in database

### 2. `adminProtect` - Admin Authorization
Verifies both authentication AND admin privileges.

```javascript
const adminProtect = asyncHandler(async (req, res, next) => {
    // Performs all checks from protect()
    // Additionally checks if user.isAdmin === true
    // Only allows admin users to proceed
})
```

**Usage:**
```javascript
router.delete('/admin/ebooks/:id', adminProtect, deleteEbook);
router.post('/admin/users', adminProtect, createUser);
```

**Behavior:**
- ✅ Allows authenticated admin users to access protected admin routes
- ❌ Returns 401 if no token is provided
- ❌ Returns 400 if user is not found
- ❌ Returns 403 if user exists but is not an admin

### Key Features
- **async/await Pattern** - Uses `express-async-handler` for error handling
- **Cookie-based Tokens** - Extracts JWT from `req.cookies.token`
- **Password Protection** - Excludes password field from user object
- **Database Validation** - Verifies user still exists in database

---

## 🛠️ Utility Functions (`utils/index.js`)

### 1. `generateToken(id)`
Creates a JSON Web Token (JWT) for user authentication.

**Parameters:**
- `id` (String/ObjectId) - User's MongoDB ID

**Returns:**
- Token string if successful
- `null` if generation fails

**Token Configuration:**
- Algorithm: HS256 (HMAC)
- Expiration: 1 day
- Secret: `process.env.JWT_TOKEN`

**Example:**
```javascript
const { generateToken } = require('../utils');

const token = generateToken(user._id);
res.cookie('token', token);
res.json({ success: true, token });
```

### 2. `generateUniqueId()`
Generates the next unique ID for a new e-book.

**Returns:**
- Promise that resolves to the next ID as a string
- Starts at 1000 if no ebooks exist
- Increments by 1 from the highest existing ID

**Process:**
1. Finds the e-book with the highest ID
2. Increments it by 1
3. Returns as string

**Example:**
```javascript
const { generateUniqueId } = require('../utils');

const newId = await generateUniqueId();
const ebook = await Ebook.create({
    id: newId,
    name: 'New Book',
    // ... other fields
});
```

**ID Sequence:**
```
First ebook:  "1000"
Second ebook: "1001"
Third ebook:  "1002"
```

---

## 📋 Module Exports

### authMiddleware.js
```javascript
const { protect, adminProtect } = require('../middleware/authMiddleware');
```

- `protect` - User authentication middleware
- `adminProtect` - Admin authentication + authorization middleware

### utils/index.js
```javascript
const { generateToken, generateUniqueId } = require('../utils');
```

- `generateToken(id)` - JWT token generation
- `generateUniqueId()` - Next ebook ID generator

---

## 🔧 Environment Variables

Update your `.env` file with:

```env
PORT=3001
MONGO_URI=mongodb://localhost:27017/codebook
JWT_TOKEN=your_secret_jwt_key_here_change_in_production
```

**Important:** 
- `JWT_TOKEN` is used to sign and verify JWT tokens
- Keep it secret - never commit to version control
- Use a strong, random string in production

---

## 💡 How It All Works Together

### Authentication Flow

```
1. User logs in with email/password
   ↓
2. Server verifies credentials in database
   ↓
3. generateToken() creates JWT
   ↓
4. Token stored in secure cookie
   ↓
5. On next request, protect middleware:
   - Extracts token from cookie
   - Verifies JWT signature
   - Fetches user from DB
   - Attaches user to req.user
   ↓
6. Route handler has access to authenticated user
```

### Authorization Flow (Admin Routes)

```
1. Client requests admin-only endpoint with token
   ↓
2. adminProtect middleware:
   - Runs all protect checks first
   - Verifies user.isAdmin === true
   ↓
3. If admin: proceeds to route handler
   If not admin: returns 403 Forbidden
```

---

## 🎯 Typical Usage Pattern

### In Routes
```javascript
const express = require('express');
const { protect, adminProtect } = require('../middleware/authMiddleware');
const { getUserProfile, createEbook } = require('../controllers/ebookController');

const router = express.Router();

// Public route - no middleware needed
router.get('/ebooks', getEbooks);

// User route - requires authentication
router.get('/profile', protect, getUserProfile);

// Admin route - requires authentication + admin role
router.post('/admin/ebooks', adminProtect, createEbook);

module.exports = router;
```

### In Controllers
```javascript
const createEbook = async (req, res) => {
    // req.user is available here (from protect middleware)
    console.log(`Admin ${req.user.name} is creating a new ebook`);
    
    const newId = await generateUniqueId();
    const ebook = await Ebook.create({
        id: newId,
        ...req.body
    });
    
    res.json(ebook);
};
```

---

## ⚠️ Error Handling

All middleware uses `express-async-handler` which automatically:
- Catches async errors
- Prevents "unhandled promise rejection" crashes
- Passes errors to Express error handler

**Status Codes Used:**
| Code | Meaning |
|------|---------|
| 401 | Unauthorized (no/invalid token) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found (user doesn't exist) |
| 400 | Bad Request (user not found) |

---

## 🔑 Key Concepts Covered

✅ JWT (JSON Web Tokens) for stateless authentication
✅ Cookie-based token transmission
✅ Role-based access control (RBAC)
✅ Middleware chaining and composition
✅ async/await with error handling
✅ Password exclusion in queries
✅ Unique ID generation from database
✅ Environment-based configuration

---

## 🚀 Next Steps

### 📚 Lesson Three: Controllers
The next lesson will focus on:
- **Controllers** - Business logic for handling requests
- Complete request/response handlers for:
  - User authentication (register, login, logout)
  - User profile management
  - E-book operations
  - Cart management
- Integration with middlewares and utilities

### 📚 Lesson Four: Routes
Following that, we'll add:
- **Routes** - Complete API endpoints structure
- Route definitions for all CRUD operations:
  - User registration and authentication endpoints
  - E-book browsing and management endpoints
  - Shopping cart endpoints
  - Order processing endpoints
- Route protection with `protect` and `adminProtect` middlewares

---

**The Complete Flow:**
1. **Lesson One** - Server & Database Foundation
2. **Lesson Two** - Middlewares & Utilities (you are here) 🔐
3. **Lesson Three** - Controllers (business logic) 🎮
4. **Lesson Four** - Routes (API endpoints) 🛣️

These middlewares and utilities will be called from the controllers to handle authentication, authorization, and data generation.

---

## 📦 Dependencies Used

- **jsonwebtoken** - JWT creation and verification
- **express-async-handler** - Async error handling
- **mongoose** - Database queries
- **dotenv** - Environment variables

---

## 💾 File Structure Summary

**Middleware:**
- Protects routes from unauthorized access
- Validates JWT tokens
- Checks admin privileges
- Attaches user data to requests

**Utilities:**
- Generate secure JWT tokens
- Create unique identifiers for e-books
- Reusable helper functions

Together, they form the security and utility backbone for all API routes that will be added in future lessons.