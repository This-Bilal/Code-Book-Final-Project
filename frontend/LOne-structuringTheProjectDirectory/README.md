# Lesson 1: Structuring the Project Directory

## Topic
Setting up the React project structure with Vite, Tailwind CSS, and establishing the folder hierarchy for a scalable e-book marketplace application.

## Features Introduced in This Lesson
- **Vite + React Setup** — Modern build tool with instant HMR (Hot Module Replacement)
- **Tailwind CSS** — Utility-first CSS framework with dark mode support
- **Project Folder Structure** — Organized directories for components, pages, services, contexts, hooks, and utilities
- **Basic Header & Footer** — Simple layout shell visible in the browser
- **Dark Mode Configuration** — Tailwind theme customization

## Features Carried Forward From Previous Lesson
N/A - This is the first lesson.

## Features Still To Come
- Individual components (Header with navigation, ProductCard, etc.)
- Pages (Home, Products, Login, Cart, etc.)
- React Router integration
- Custom hooks (useTitle, useCart, useFilter)
- Context API (CartContext, FilterContext)
- API integration with json-server
- Admin panel and protected routes

## What Changed From the Previous Lesson

### New Files Created
- `package.json` — Dependencies and scripts
- `vite.config.js` — Vite configuration with Tailwind CSS plugin
- `eslint.config.js` — ESLint configuration
- `index.html` — HTML entry point
- `src/main.jsx` — React app entry point
- `src/App.jsx` — Root component (basic structure)
- `src/index.css` — Global styles with Tailwind
- `src/App.css` — Layout styles
- **Folder Structure** — Organized directories for future development:
  - `src/Components/` — Reusable UI components
  - `src/Pages/` — Page components
  - `src/Routes/` — Routing configuration
  - `src/context/` — Context API providers
  - `src/Services/` — API and service layer
  - `src/config/` — Configuration files
  - `src/Hooks/` — Custom React hooks
  - `src/reducers/` — State reducers
  - `Data/db.json` — Mock database for json-server

## Key Concepts Introduced
- **Vite** — Fast, modern frontend build tool
- **Tailwind CSS** — Utility-first CSS for rapid UI development
- **Project Organization** — How to structure a scalable React application
- **Dark Mode** — Theme support using CSS classes

## Why These Changes Were Made
This lesson establishes the **foundation** for the entire application. Vite provides fast development feedback, and Tailwind CSS accelerates UI development. The folder structure follows React best practices and mirrors the final `main-client` project, making it easy for learners to understand how a professional React application is organized before diving into components and logic.

## What You Should See When You Run This
When you run `npm install && npm run dev`:
- Your browser should open to `http://localhost:5173`
- You'll see a simple page with "Welcome to CodeBook" as a heading
- Dark mode toggle will work (though it's not yet integrated into the header UI)
- The page should have basic styling with Tailwind CSS

## How to Run
```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173/`

## Reference
See `frontend/main-client/` for the full production version of this project.

## File Structure Created
```
LOne-structuringTheProjectDirectory/
├── package.json
├── vite.config.js
├── eslint.config.js
├── index.html
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── App.css
│   ├── Components/
│   │   └── index.js
│   ├── Pages/
│   │   └── index.js
│   ├── Routes/
│   │   └── AllRoutes.jsx
│   ├── context/
│   │   └── index.js
│   ├── Services/
│   │   └── index.js
│   ├── config/
│   │   └── api.js
│   ├── Hooks/
│   │   └── useTitle.js
│   ├── reducers/
│   │   └── index.js
│   └── assets/
└── Data/
    └── db.json
```

## Next Steps
In Lesson 2, we'll build individual React components (Header, Footer, ProductCard, Rating) and start adding interactivity to this basic structure.