# Lesson 8: Object-Oriented Programming (OOP) Design Patterns

## Topic
**Mastering OOP principles in React** by applying design patterns and best practices. Transitioning from procedural state management to organized, maintainable code architecture using encapsulation, abstraction, and composition. Building scalable applications with clear separation of concerns and reusable abstractions.

## Features Introduced in This Lesson
- **OOP Design Patterns** — Service Layer, Adapter, Factory patterns ✨ NEW
- **Encapsulation** — Context API wrapping state and behavior ✨ NEW
- **Abstraction** — Service layer abstracting API complexity ✨ NEW
- **Custom Hooks** — Reusable logic extraction with hooks ✨ NEW
- **Reducers** — Predictable state management with pure functions ✨ NEW
- **Error Handling** — Structured error management across services ✨ NEW
- **Type Safety** — Better code organization and predictability ✨ NEW
- **Composition** — Building complex UI with composed components ✨ NEW

## Features Carried Forward From Previous Lessons
- All json-server API integration
- All advanced features (admin dashboard, protected routes)
- All Context API functionality
- All components and pages
- Dark mode and responsive design
- Cart persistence and management
- Product filtering and sorting

## What Changed From the Previous Lesson

### New Concepts
- **Service Classes** — Organized API request handlers
- **Reducer Functions** — Pure functions for state transitions
- **Custom Hooks** — Encapsulated state logic
- **Error Handling Patterns** — Consistent error management
- **Configuration Management** — Centralized API configuration

### Refactored Files
- `src/config/api.js` — Advanced API configuration with helper functions ✨ REFACTORED
- `src/services/` — Service layer with organized API calls ✨ REFACTORED
- `src/context/CartContext.jsx` — Context with reducer pattern ✨ REFACTORED
- `src/context/FilterContext.jsx` — Filter state management ✨ REFACTORED
- `src/reducers/` — Pure reducer functions for state management ✨ NEW
- `src/hooks/` — Custom hooks for reusable logic ✨ NEW

## Key Concepts Introduced

### 1. Encapsulation
Bundling data and methods together in a cohesive unit (Context + Reducer):
```javascript
// Cart is encapsulated within CartContext
const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState);
    // Public interface: addToCart, removeFromCart, clearCart
    // Private: cartReducer, dispatch logic
};
```

### 2. Abstraction
Hiding complex API logic behind simple interfaces:
```javascript
// Component doesn't need to know about HTTP details
const products = await getProducts();

// Service handles all complexity
export const getProducts = async () => {
   return await apiRequest("/products");
};
```

### 3. Single Responsibility Principle
Each module handles one concern:
- `productServices.js` → Product API calls
- `authService.jsx` → Authentication logic
- `cartService.js` → Cart operations
- `cartReducer.js` → Cart state transitions

### 4. Composition
Building complex functionality from simpler, reusable pieces:
```javascript
// Components compose multiple contexts and hooks
<CartProvider>
  <FilterProvider>
    <App />
  </FilterProvider>
</CartProvider>
```

### 5. Dependency Injection
Passing dependencies through context providers:
```javascript
const value = {
    cartList,
    total,
    addToCart,      // Injected method
    removeFromCart, // Injected method
    clearCart       // Injected method
};
return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
```

## API Configuration (api.js)

### Base URL Management
```javascript
const getBaseUrl = () => {
    return import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'
}
```
- Supports environment variables for flexible deployment
- Defaults to local backend server
- Enables switching between development and production servers

### Endpoint Organization
```javascript
export const USER_ENDPOINTS = {
    REGISTER_USER : api('users/registerUser'),
    LOGIN: api('users/login'),
    USER_PROFILE: api('users/userProfile'),
    // ... more endpoints
}

export const EBOOK_ENDPOINTS = {
    CREATE : api('ebook/createEbook'),
    GET_ALL: api('ebook/getAllEbook'),
    // ... more endpoints
}

export const CART_ENDPOINTS = { /* ... */ }
export const ORDER_ENDPOINTS = { /* ... */ }
```
**Benefits:**
- Centralized endpoint definitions
- Single source of truth for URLs
- Easy to update endpoints globally
- Type-safe endpoint references

### Axios Configuration
```javascript
export const API_CONFIG = {
    withCredentials: true,  // Required for httponly cookies
    headers: {
        'Content-Type': 'application/json'
    }
}

export const apiClient = axios.create(API_CONFIG);
```
**Features:**
- Credential handling for authentication
- Default JSON content type
- Reusable axios instance

### Generic API Request Helper
```javascript
export const apiRequest = async (URL, options = {}) => {
    const { method = 'GET', body, headers, ...rest } = options;
    
    const config = {
        url,
        method,
        headers: { ...API_CONFIG.headers, ...headers },
        ...rest,
    };

    if (body !== undefined) {
        config.data = typeof body === 'string' 
            ? JSON.parse(body) 
            : body;
    }

    try {
        const response = await apiClient.request(config);
        return response.data;
    } catch (error) {
        // Error handling
    }
}
```
**Advantages:**
- Works with any HTTP method
- Automatic request/response transformation
- Centralized error handling
- Flexible configuration merging

## Service Layer Pattern

### ProductService Example
```javascript
export const getProducts = async () => {
   return await apiRequest("/products");
};

export const getProduct = async (id) => {
    return await apiRequest(`/products/${id}`);
};

export const getProductsBestseller = async () => {
    return await apiRequest("/products?best_seller=true");
}
```
**Principles:**
- Single responsibility (only product-related calls)
- Reusable across components
- Easy to test and mock
- Consistent error handling

### AuthService Example
```javascript
export const loginUser = async (email, password) => {
    try {
        const users = await apiRequest("/users");
        const user = users.find(u => u.email === email);

        if (user && user.password === password) {
            return { success: true, user };
        }
        throw new Error("Invalid credentials");
    } catch (error) {
        throw new Error(error.message || "Login failed");
    }
};
```
**Features:**
- Business logic abstraction
- Error handling and validation
- Clear success/error states

## State Management with Reducers

### Reducer Pattern
```javascript
const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case "ADD_TO_CART":
            return {...state, cartList: payload.products, total: payload.total};
        case "REMOVE_FROM_CART":
            return {...state, cartList: payload.products, total: payload.total};
        case "CLEAR_CART":
            return {...state, cartList: [], total: 0};
        default:
            throw new Error(`No case found for action type: ${type}`);
    }
}
```
**Benefits:**
- Predictable state transitions
- Pure functions (same input = same output)
- Easier to debug state changes
- Time-travel debugging possible

### Context with Reducer
```javascript
const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState);

    const addToCart = (product) => {
        try {
            dispatch({type: "SET_LOADING", payload: true});
            const newCartList = [...state.cartList, product];
            dispatch({
                type: "ADD_TO_CART",
                payload: { products: newCartList, total: ... }
            });
        } catch (error) {
            toast.error(error.message);
        } finally {
            dispatch({type: "SET_LOADING", payload: false});
        }
    };

    return <cartContext.Provider value={{...state, addToCart}}>{children}</cartContext.Provider>;
};
```

## Custom Hooks for Reusability

### useCart Hook
```javascript
export const useCart = () => {
  const [cartList, setCartList] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const addToCart = useCallback((product) => {
    setCartList((prev) => [...prev, product]);
    setTotal((prev) => prev + Number(product.price || 0));
  }, []);

  return { cartList, total, loading, addToCart, removeFromCart, clearCart };
};
```
**OOP Principle: Abstraction**
- Hides cart implementation details
- Provides clean interface
- Encapsulates related logic

### Other Custom Hooks
- `useFilter()` — Filter and search state management
- `useTitle()` — Dynamic page title management

## Project Structure
```
LEight-OOP-setting/
├── src/
│   ├── config/
│   │   └── api.js ✨ API configuration with helper functions
│   ├── services/
│   │   ├── productServices.js — Product API calls
│   │   ├── authService.jsx — Authentication logic
│   │   ├── cartService.js — Cart operations
│   │   ├── orderServices.js — Order management
│   │   ├── adminServices.js — Admin operations
│   │   └── dataService.js — General data fetching
│   ├── context/
│   │   ├── CartContext.jsx — Cart state + methods
│   │   ├── FilterContext.jsx — Filter state
│   │   └── index.js
│   ├── reducers/
│   │   ├── cartReducer.js — Pure reducer for cart
│   │   ├── filterReducer.js — Pure reducer for filter
│   │   └── Index.js
│   ├── hooks/
│   │   ├── useCart.js — Cart logic hook
│   │   ├── useFilter.js — Filter logic hook
│   │   └── useTitle.js — Title update hook
│   ├── components/
│   │   ├── elements/
│   │   │   ├── ProductCard.jsx
│   │   │   └── Rating.jsx
│   │   └── layout/
│   ├── pages/
│   │   ├── home/
│   │   ├── products/
│   │   ├── Admin/
│   │   ├── Cart/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── ProductDetails.jsx
│   ├── routes/
│   │   └── AllRoutes.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── package.json
└── vite.config.js
```

## OOP Design Patterns Used

### 1. **Service Layer Pattern**
Encapsulates all API communication logic.
```
Component → Service → API Client → Backend
```

### 2. **Adapter Pattern**
`apiRequest()` adapts axios to a simpler interface.
```javascript
// Complex: await apiClient.get(url)
// Simple: await apiRequest(url)
```

### 3. **Factory Pattern**
Service functions create and configure API requests.
```javascript
export const getProduct = (id) => 
    // Creates a configured request
    apiRequest(`/products/${id}`);
```

### 4. **Observer Pattern**
React Context acts as an observable state container.
- State changes notify all subscribers (Context consumers)

### 5. **Strategy Pattern**
Reducer function encapsulates state update strategies.
```javascript
// Different strategies for different actions
case "ADD_TO_CART": return addStrategy(state, payload);
case "REMOVE_FROM_CART": return removeStrategy(state, payload);
```

## Why These Patterns Matter

### Maintainability
- Changes to API endpoints? Update one file (`api.js`)
- New authentication logic? Update `authService.jsx`
- State structure changes? Update reducer and context

### Testability
- Service functions are pure and easy to mock
- Reducers are pure functions (easy to test)
- Context logic separated from rendering

### Scalability
- New features follow established patterns
- Easy to add new services and contexts
- Clear responsibilities prevent code bloat

### Collaboration
- Clear separation of concerns
- Multiple developers can work on different services
- Easy code reviews with defined patterns

## Best Practices Applied

1. **Single Responsibility** — Each module does one thing
2. **DRY (Don't Repeat Yourself)** — Shared logic in hooks and services
3. **SOLID Principles** — Layered architecture respects SOLID rules
4. **Error Handling** — Consistent try/catch patterns
5. **Performance** — `useCallback` prevents unnecessary renders
6. **Security** — `withCredentials: true` for secure cookie handling
7. **Configuration Management** — Environment variables for flexibility

## Getting Started

### Install Dependencies
```bash
npm install
```

### Environment Setup
Create `.env` or `.env.local`:
```
VITE_API_BASE_URL=http://localhost:3001/api
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

## Key Takeaways

This lesson demonstrates that **OOP isn't just about classes**. React functional components combined with design patterns provide:

✅ **Encapsulation** — Context wraps state and behavior  
✅ **Abstraction** — Services hide API complexity  
✅ **Composition** — Components composed from contexts and hooks  
✅ **Single Responsibility** — Each module has one job  
✅ **Reusability** — Custom hooks and services across components  
✅ **Maintainability** — Clear structure and patterns  
✅ **Scalability** — Easy to add features following established patterns  

This architecture is **production-ready** and mirrors modern React applications used in industry.
