# Lesson 4: Custom Hooks

## Topic
Creating reusable custom hooks to encapsulate component logic and state management patterns. Building `useTitle`, `useCart`, and `useFilter` hooks that can be used across multiple components.

## Features Introduced in This Lesson
- **useTitle Hook** — Sets the browser document title based on current page
- **useCart Hook** — Encapsulates cart state and methods (add, remove, clear)
- **useFilter Hook** — Encapsulates product filtering logic with sorting, stock filtering, rating filtering
- **useMemo Hook** — Optimizes computed values to prevent unnecessary recalculations
- **useCallback Hook** — Memoizes functions to prevent unnecessary re-renders
- **Functional Composition** — Using hooks instead of class methods or component props

## Features Carried Forward From Previous Lesson
- All pages (Home, Products, Login, Register, Cart, ProductDetails)
- React Router integration
- Components (Header, Footer, ProductCard, Rating)
- Tailwind CSS styling

## Features Still To Come
- Context API for global state management
- API integration with json-server
- Admin panel and protected routes
- User authentication service
- Search functionality
- Order management

## What Changed From the Previous Lesson

### New Files Created
- `src/Hooks/useTitle.js` — Custom hook for page title management ✨ NEW
- `src/Hooks/useCart.js` — Custom hook for cart state ✨ NEW
- `src/Hooks/useFilter.js` — Custom hook for product filtering ✨ NEW

### Modified Files
- `src/Pages/Home/HomePage.jsx` — Now uses useTitle hook
- `src/Pages/Products/ProductList.jsx` — Now uses useFilter hook and displays filter controls
- `src/Pages/ProductDetails.jsx` — Now uses useTitle hook
- `src/Pages/Login.jsx` — Now uses useTitle hook
- `src/Pages/Register.jsx` — Now uses useTitle hook
- `src/Pages/Cart/CartPage.jsx` — Now uses useTitle hook
- `package.json` — Updated project name to "code-book-lesson-4"

## Key Concepts Introduced
- **Custom Hooks** — JavaScript functions that use React hooks to encapsulate logic
- **Hook Composition** — Building complex hooks from simpler hooks
- **Separation of Concerns** — Logic separated from component rendering
- **Memoization** — Optimizing performance with useMemo and useCallback
- **Reusability** — Same logic used across multiple components
- **State Normalization** — Filtering and sorting logic extracted from components

## Why These Changes Were Made
Custom hooks are a **powerful pattern for reusing stateful logic** in React. By extracting cart management, filtering, and title management into hooks, we:
1. Make components simpler and more focused on rendering
2. Create reusable logic that can be shared across pages
3. Make testing easier (hooks can be tested independently)
4. Set the foundation for Context API integration in the next lesson

## What You Should See When You Run This
When you run `npm install && npm run dev`:
- **Page Titles** — Browser tab title changes based on current page (e.g., "Home - Access Latest Computer Science eBooks")
- **Product Filtering** — Click the menu button on Products page to see filter controls:
  - "In Stock Only" checkbox
  - "Best Sellers Only" checkbox
  - Sort dropdown (Price: Low to High / High to Low)
  - Clear Filters button
- **Filtered Results** — Product grid updates instantly when filters change
- **No Product State Duplication** — Filtering logic is centralized in the hook, not scattered across components
- **Performance Optimized** — Filters use memoization to avoid unnecessary recalculations

## How to Run
```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173/`

## Hook Usage Examples

### useTitle Hook
```javascript
import { useTitle } from "../Hooks/useTitle";

function HomePage() {
  useTitle("Home - Buy Programming eBooks");
  // Page title is now "Home - Buy Programming eBooks - CodeBook"
}
```

### useFilter Hook
```javascript
import { useFilter } from "../Hooks/useFilter";

function ProductList() {
  const { 
    productList,
    setProductList,
    filteredProducts,     // Already sorted/filtered
    sortBy,
    setSortBy,
    clearFilters
  } = useFilter();
}
```

### useCart Hook
```javascript
import { useCart } from "../Hooks/useCart";

function ProductCard({ product }) {
  const { addToCart, removeFromCart, cartList } = useCart();
  // Use these methods to manage cart
}
```

## Reference
See `frontend/main-client/` for the full production version of this project.

## Hook Architecture
```
LFour-customHooks/
├── src/
│   ├── Hooks/
│   │   ├── useTitle.js ✨ NEW
│   │   ├── useCart.js ✨ NEW
│   │   └── useFilter.js ✨ NEW
│   ├── Pages/
│   │   ├── Home/HomePage.jsx (uses useTitle)
│   │   ├── Products/ProductList.jsx (uses useFilter)
│   │   ├── ProductDetails.jsx (uses useTitle)
│   │   ├── Login.jsx (uses useTitle)
│   │   ├── Register.jsx (uses useTitle)
│   │   └── Cart/CartPage.jsx (uses useTitle)
│   └── ...
└── ...
```

## Next Steps
In Lesson 5, we'll integrate these hooks with the **Context API** to share cart and filter state globally across all components. This will replace the local state in these hooks with context providers.