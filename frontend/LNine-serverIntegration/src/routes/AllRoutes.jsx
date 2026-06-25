import { Route, Routes } from "react-router-dom"
import { HomePage, Order, ProductList } from "../pages"
import Login from "../pages/Login"
import Register from "../pages/Register"
import ProductDetails from "../pages/ProductDetails"
import CartPage from "../pages/Cart/CartPage"
import AdminProtectedRoute from "./AdminProtectedRoute"
import AdminPage from "../pages/admin/AdminPage"
import Dashboard from "../pages/Dashboard/Dashboard"

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/products" element={<ProductList/>}/>
        <Route path="/products/:id" element={<ProductDetails/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/order-summary" element={<Order/>}/>
        <Route path="/admin" element={
          <AdminProtectedRoute>
            <AdminPage/>
          </AdminProtectedRoute>
          }/>
    </Routes>
  )
}

export default AllRoutes