import adminService from "./adminServices";
import authService from "./AuthService";
import dataService from "./dataService";
import cartService from "./cartService"
import orderService from "./orderServices";

export {getFeaturedList, getProductList, getProduct} from './productServices'
export const {loginUser, logout, registerUser} = authService 
export const {checkLoginStatus, getUser} = dataService
export const {checkAdminStatus, createEbook, updateEbook} = adminService
export const {getUserCart, addToCartAPI, removeFromCartAPI, clearCartAPI} = cartService
export const {placeOrder, getUserOrder, getOrderById} = orderService