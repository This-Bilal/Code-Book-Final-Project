# Lesson 6: Advanced Features

## Topic
Building **admin functionality** with protected routes and product management. Implementing role-based access control and an admin dashboard where privileged users can create, edit, and delete products.

## Features Introduced in This Lesson
- **AdminProtectedRoute Component** — Route protection based on admin status ✨ NEW
- **AdminPage Component** — Full admin dashboard with tabbed interface ✨ NEW
- **AdminProductForm** — Form for creating/editing products with validation ✨ NEW
- **AdminProductList** — Table view of all products with edit/delete actions ✨ NEW
- **Role-Based Access Control** — Admin-only routes using localStorage flags
- **Demo Authentication** — Simple login that grants admin access for testing
- **Toast Notifications** — User feedback on product operations

## Features Carried Forward From Previous Lessons
- All Context API functionality
- All custom hooks
- All pages and components
- Tailwind CSS styling with dark mode
- React Router with protected routes
- Cart and filter state management

## Features Still To Come
- Real authentication with password hashing
- Persistent product database with json-server
- Order management and user dashboard
- Payment processing
- User profile management

## What Changed From the Previous Lesson

### New Files Created
- `src/Routes/AdminProtectedRoute.jsx` — Route guard for admin pages ✨ NEW
- `src/Pages/Admin/AdminPage.jsx` — Admin dashboard main page ✨ NEW
- `src/Components/Admin/AdminProductForm.jsx` — Product form for CRUD operations ✨ NEW
- `src/Components/Admin/AdminProductList.jsx` — Table of products with actions ✨ NEW

### Modified Files
- `src/Routes/AllRoutes.jsx` — Added /admin route with AdminProtectedRoute
- `src/Pages/Login.jsx` — Now saves admin flag to localStorage on login
- `package.json` — Updated project name to "code-book-lesson-6"

## Key Concepts Introduced
- **Protected Routes** — Restricting access based on authentication status
- **Role-Based Access Control** — Different permissions for different users
- **Admin Dashboard** — Centralized interface for site management
- **CRUD Operations** — Create, Read, Update, Delete functionality
- **Form Validation** — Client-side validation before submission
- **Tab Navigation** — Organizing multiple views within a page

## Why These Changes Were Made
Admin functionality is essential for a complete e-commerce platform because it:
1. **Allows Content Management** — Admins can add/update/delete products
2. **Establishes Security** — Protected routes prevent unauthorized access
3. **Scales the Application** — Separates admin and user experiences
4. **Prepares for Backend** — Structure ready for API integration in Lesson 7
5. **Demonstrates Real-World Patterns** — Common in production applications

## What You Should See When You Run This
When you run `npm install && npm run dev`:

### User Experience
1. **Without Login**: 
   - Visiting `/admin` redirects to `/login`
   - Can browse products and add to cart normally

2. **After Login**:
   - Email saved to localStorage
   - Admin flag set (in demo mode, all users are admins)
   - New `/admin` route accessible

3. **In Admin Dashboard**:
   - Two tabs: "View Products" and "Add Product"
   - Product list shows all items with edit/delete buttons
   - Form validates required fields before submission
   - Tab switching and form state management working
   - Logout button clears authentication and returns to home

4. **Product Management**:
   - Add Product form captures: name, price, rating, image URL, descriptions, stock/bestseller flags
   - Edit Product pre-fills form with existing data
   - Delete confirms before removing
   - Toast notifications confirm actions
   - Demo mode shows feedback but doesn't persist to database

## How to Run
```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173/`

### Accessing Admin Features
1. Click Login in the header
2. Enter any email and password
3. Get redirected to home with admin privileges
4. Click browser address bar and go to `/admin`
5. See the admin dashboard with product management

## Admin Dashboard Architecture

### AdminProtectedRoute
```javascript
// Checks localStorage for adminUser flag
const isAdmin = JSON.parse(localStorage.getItem("adminUser")) || false;
// Returns children if admin, otherwise redirects to /login
return isAdmin ? children : <Navigate to="/login" />;
```

### AdminPage
```javascript
// Provides tabbed interface:
- View Products tab: Shows AdminProductList
- Add/Edit Product tab: Shows AdminProductForm
- Logout button: Clears auth and redirects

// State:
- activeTab: "products" | "add"
- editingProduct: null | product object
```

### AdminProductForm
```javascript
// Handles both add and edit modes
// Fields: name, price, rating, poster, overview, long_description, in_stock, best_seller
// Validation: Required fields checked before submit
// Callbacks: onSubmit with new product data
```

### AdminProductList
```javascript
// Table display of products with columns:
- Product Name
- Price
- Rating
- In Stock (yes/no)
- Best Seller (yes/no)
- Actions (Edit/Delete buttons)

// Events:
- onEdit: Pass to form for editing
- onDelete: Remove with confirmation
```

## Project Structure
```
LSix-advancedFeatures/
├── src/
│   ├── Routes/
│   │   ├── AdminProtectedRoute.jsx ✨ NEW
│   │   └── AllRoutes.jsx (updated)
│   ├── Pages/
│   │   ├── Admin/ ✨ NEW
│   │   │   └── AdminPage.jsx ✨ NEW
│   │   └── Login.jsx (updated)
│   ├── Components/
│   │   └── Admin/ ✨ NEW
│   │       ├── AdminProductForm.jsx ✨ NEW
│   │       └── AdminProductList.jsx ✨ NEW
│   ├── context/
│   │   ├── CartContext.jsx
│   │   └── FilterContext.jsx
│   └── ...
└── package.json
```

## State Flow: Admin Operations

### Adding a Product
1. Click "Add Product" tab
2. Fill in form fields
3. Click "Add Product" button
4. `handleAddProduct` validates and creates product
5. Toast confirms action
6. Form resets
7. (In Lesson 7: Sent to API)

### Editing a Product
1. Click Edit icon on product row
2. Tab switches to "Edit Product"
3. Form pre-fills with product data
4. Update fields as needed
5. Click "Update Product"
6. Changes applied
7. (In Lesson 7: Sent to API)

### Deleting a Product
1. Click Delete icon on product row
2. Confirmation dialog appears
3. Confirm deletion
4. Product removed from list
5. Toast confirms action
6. (In Lesson 7: Sent to API)

## Form Validation
```javascript
// Before submission, checks:
- Product name is not empty
- Price is not empty
- Image URL is not empty

// Shows toast error if validation fails
if (!formData.name || !formData.price || !formData.poster) {
  toast.error("Please fill in all required fields");
  return;
}
```

## localStorage Structure
```javascript
// After login:
localStorage.setItem("email", "user@example.com");
localStorage.setItem("adminUser", true);

// On logout:
localStorage.removeItem("email");
localStorage.removeItem("adminUser");
```

## Comparison: User vs Admin Views

### User View
```
HomePage
├── Browse products
├── Filter/Sort
└── Add to Cart

ProductDetails
├── View full details
└── Add to Cart

CartPage
├── View cart items
└── Checkout (future)
```

### Admin View (New!)
```
AdminPage
├── AdminProductList (View/Edit/Delete)
├── AdminProductForm (Create/Update)
└── Logout
```

## How Login Works (Demo Mode)
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  // Save email
  localStorage.setItem("email", email);
  // Grant admin access (in Lesson 7: check against user roles)
  localStorage.setItem("adminUser", true);
  toast.success("Logged in successfully!");
  navigate("/");
};
```

## Next Steps
In **Lesson 7: json-server Integration**, we'll:
- Replace localStorage-based admin flag with real authentication
- Connect product form to json-server POST/PUT/DELETE endpoints
- Fetch products from API instead of hardcoded data
- Implement real user authentication with backend validation
- Add order management and user dashboard
- Make all admin operations persist to database

## Demo Limitations (Upgraded in Lesson 7)
- ⚠️ Product changes don't persist (no database)
- ⚠️ All logins are admin (no role differentiation)
- ⚠️ No password validation
- ⚠️ No user profile management
- ⚠️ Product IDs are temporary (Date.now())

## Reference
See `frontend/main-client/` for the full production version of this project.

## Topic
Implementing client-side routing with React Router v7 to enable multi-page navigation without page reloads. Building linked pages for browsing, viewing details, authentication forms, and shopping cart.

## Features Introduced in This Lesson
- **React Router v7** — Client-side routing for single-page application (SPA)
- **BrowserRouter** — Root routing context provider
- **Routes & Route Components** — Defining URL routes and mapping them to page components
- **Link Component** — Navigation links that don't reload the page
- **useParams Hook** — Accessing URL parameters (e.g., product ID)
- **useNavigate Hook** — Programmatic navigation
- **Login Page** — Form for user authentication (placeholder, no backend yet)
- **Register Page** — User registration form (placeholder)
- **Product Details Page** — Full product view accessible via `/products/:id`
- **Cart Page** — Shopping cart interface (empty in this lesson)
- **Navigation Header** — Updated with working links to Home, Products, Login, and Cart

## Features Carried Forward From Previous Lesson
- Header, Footer, ProductCard, Rating components
- HomePage and ProductList pages (now routed)
- Tailwind CSS and dark mode
- Project structure

## Features Still To Come
- Custom hooks (useTitle, useCart, useFilter)
- Context API for state management
- API integration with json-server
- Admin panel and protected routes
- Form submission with backend integration
- Search functionality
- Product filtering and sorting

## What Changed From the Previous Lesson

### New Files Created
- `src/Pages/Login.jsx` — Login form page
- `src/Pages/Register.jsx` — Registration form page
- `src/Pages/ProductDetails.jsx` — Individual product view with full details
- `src/Pages/Cart/CartPage.jsx` — Shopping cart page

### Modified Files
- `src/main.jsx` — Added BrowserRouter wrapper
- `src/App.jsx` — Now uses AllRoutes component
- `src/Routes/AllRoutes.jsx` — Routing configuration with all page routes
- `src/Components/Layout/Header.jsx` — Added navigation Links
- `src/Components/Elements/ProductCard.jsx` — Product images and titles are now clickable Links
- `package.json` — Updated project name to "code-book-lesson-3"

## Key Concepts Introduced
- **Client-Side Routing** — Navigation without server requests
- **Single Page Application (SPA)** — App that dynamically updates instead of full page reloads
- **URL Parameters** — Dynamic routes like `/products/:id`
- **Navigation Links** — Using Link instead of anchors to maintain app state
- **Programmatic Navigation** — Using useNavigate for form submissions or redirects

## Why These Changes Were Made
This lesson transforms the app from a static single-page view to a **multi-page navigable application**. React Router is the industry-standard for client-side routing in React. By introducing this now, learners can build realistic workflows like browsing products, viewing details, and accessing authentication pages—all without full page reloads.

## What You Should See When You Run This
When you run `npm install && npm run dev`:
- **Header Navigation** — Links to Home, Products, and icon links to Login/Cart work without page reload
- **Home Page** (`/`) — Shows featured eBooks (same as before)
- **Products Page** (`/products`) — Shows all eBooks as clickable cards
- **Product Details** (`/products/:id`) — Click any product card to see full details (back button works)
- **Login Page** (`/login`) — Form page with email/password inputs
- **Register Page** (`/register`) — Form page with name, email, password fields
- **Cart Page** (`/cart`) — Empty cart with "Continue Shopping" link
- **Fast Navigation** — Clicking links should be instant (no full page refresh)
- **Back Button Works** — Browser back button navigates between pages correctly

## How to Run
```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173/`

## Routes Available
- `/` — Home page
- `/products` — All products
- `/products/:id` — Single product details (try `/products/10001`)
- `/login` — Login page
- `/register` — Register page
- `/cart` — Shopping cart

## Reference
See `frontend/main-client/` for the full production version of this project.

## Component & Route Structure Created
```
LThree-routingAndNavigation/
├── src/
│   ├── Routes/
│   │   └── AllRoutes.jsx ✨ NEW (routing config)
│   ├── Pages/
│   │   ├── Login.jsx ✨ NEW
│   │   ├── Register.jsx ✨ NEW
│   │   ├── ProductDetails.jsx ✨ NEW
│   │   ├── Cart/
│   │   │   └── CartPage.jsx ✨ NEW
│   │   └── ... (other pages)
│   ├── Components/
│   │   └── Layout/
│   │       └── Header.jsx (modified with Links)
│   └── App.jsx (modified to use AllRoutes)
└── src/main.jsx (modified with BrowserRouter)
```

## Next Steps
In Lesson 4, we'll introduce custom hooks (useTitle to set page titles, useCart for cart management, useFilter for product filtering). These hooks will encapsulate component logic and make pages more reusable.

## Topic
Creating reusable React components (Header, Footer, ProductCard, Rating) and building page layouts using component composition and state management with hooks.

## Features Introduced in This Lesson
- **Header Component** — Navigation bar with dark mode toggle, search icon, cart badge, and profile icon
- **Footer Component** — Multi-column footer with links and copyright info
- **Rating Component** — Star display for product ratings
- **ProductCard Component** — Reusable component displaying product information with image, name, price, rating, and "Add to Cart" button
- **HomePage** — Landing page with featured eBooks grid
- **ProductList Page** — Page displaying all products in a grid with sorting button
- **Component Composition** — Using smaller, reusable components to build larger pages
- **Sample Data** — Hardcoded product data (will be replaced with API calls in later lessons)

## Features Carried Forward From Previous Lesson
- Vite + React setup
- Tailwind CSS styling with dark mode
- Project folder structure
- Global CSS configuration

## Features Still To Come
- React Router integration and navigation between pages
- Custom hooks (useTitle, useCart, useFilter)
- Context API for state management
- API integration with json-server
- Admin panel and protected routes
- User authentication

## What Changed From the Previous Lesson

### New Files Created
- `src/Components/Layout/Header.jsx` — Navigation header component
- `src/Components/Layout/Footer.jsx` — Footer component
- `src/Components/Elements/Rating.jsx` — Star rating display component
- `src/Components/Elements/ProductCard.jsx` — Product card component
- `src/Pages/Home/HomePage.jsx` — Home page component
- `src/Pages/Products/ProductList.jsx` — Products page component

### Modified Files
- `src/App.jsx` — Now uses Header, Footer, and HomePage components
- `src/Components/index.js` — Exports Header, Footer, Rating, ProductCard
- `src/Pages/index.js` — Exports HomePage, ProductList
- `package.json` — Updated project name to "code-book-lesson-2"

## Key Concepts Introduced
- **Component Composition** — Building complex UIs by combining smaller components
- **Props** — Passing data to components
- **useState Hook** — Managing local component state
- **useEffect Hook** — Loading data when components mount
- **Conditional Rendering** — Showing/hiding UI elements based on state
- **Tailwind Responsive Classes** — Grid layouts that adapt to screen size

## Why These Changes Were Made
This lesson focuses on **component-driven development**, a fundamental React concept. By building reusable components (Header, Footer, ProductCard) and composing them into pages, learners understand how modern React applications are structured as hierarchies of components. This foundation makes it easy to understand routing, state management, and API integration in later lessons.

## What You Should See When You Run This
When you run `npm install && npm run dev`:
- **Header** — Visible at the top with CodeBook logo, dark mode toggle, search icon, cart icon, and profile icon
- **Featured eBooks Section** — Three product cards displaying on the home page
- **All eBooks Page** — Navigate would show a grid of 12 product cards (functionality added in Lesson 3)
- **Dark Mode** — Clicking the gear icon toggles dark mode and persists in localStorage
- **Product Cards** — Each card displays product image, name, 5-star rating, price, and "Add to Cart" button
- **Footer** — Visible at the bottom with links and copyright info
- **Responsive Layout** — Grid adapts from 1 column on mobile to 3 columns on desktop

## How to Run
```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173/`

## Reference
See `frontend/main-client/` for the full production version of this project.

## Component Structure Created
```
LTwo-buildingTheComponents/
├── src/
│   ├── Components/
│   │   ├── Layout/
│   │   │   ├── Header.jsx ✨ NEW
│   │   │   └── Footer.jsx ✨ NEW
│   │   ├── Elements/
│   │   │   ├── Rating.jsx ✨ NEW
│   │   │   └── ProductCard.jsx ✨ NEW
│   │   └── index.js
│   ├── Pages/
│   │   ├── Home/
│   │   │   └── HomePage.jsx ✨ NEW
│   │   ├── Products/
│   │   │   └── ProductList.jsx ✨ NEW
│   │   └── index.js
│   └── App.jsx (modified)
```

## Next Steps
In Lesson 3, we'll add React Router to enable navigation between pages. The ProductList page will become fully functional, and we'll add routes for product details, login, registration, and cart pages.