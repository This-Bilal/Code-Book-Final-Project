# Lesson 3: Routing and Navigation

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