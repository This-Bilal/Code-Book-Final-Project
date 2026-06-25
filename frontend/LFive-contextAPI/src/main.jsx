import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FilterProvider } from './context/FilterContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <CartProvider>
      <FilterProvider>
        <App />
      <ToastContainer position='top-right'/>
      </FilterProvider>
    </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
