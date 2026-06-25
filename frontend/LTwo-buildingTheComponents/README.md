# Lesson 2: Building Components and Pages

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