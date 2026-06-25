/**
 * API Configuration
 * Centralized configuration for backend
 */
import axios from 'axios'

// Getting base uri
const getBaseUrl = () => {

    // In developement mode
    // if (import.meta.env.DEV) {
    //     return '/api'
    // }

    return import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'
}

// Helper funcgion to build the api endpoint
const api = (path) => {
    const base = getBaseUrl()
    return base.endsWith('/') ? `${base}${path}` : `${base}/${path}`
}


// User/Auth endpoint
export const USER_ENDPOINTS = {
    REGISTER_USER: api('users/registerUser'),
    REGISTER_ADMIN: api('users/registerAdmin'),
    LOGIN: api('/users/login'),
    LOGOUT: api('users/logout'),
    USER_PROFILE: api('users/userProfile'),
    LOGIN_STATUS: api('users/loginStatus')
}


// Ebook endpoints
export const EBOOK_ENDPOINT = {
    CREATE_EBOOK: api('ebook/createEbook'),
    GET_AN_EBOOK: api('ebook/singleEbook'),
    GET_ALL_EBBOKS: api('ebook/allEbooks'),
    UPDATE_EBOOK: api('ebook/updateEbook')
}


// Cart endpoints
export const CART_ENDPOINTS = {
    ADD_TO_CART: api('cart/addToCart'),
    REMOVE_FROM_CART: api('cart/removeFromCart'),
    CLEAR_CART: api('cart/clearCart'),
    USER_CART: api('cart/getUserCart')
}


// Order endpoints
export const ORDER_ENDPOINTS = {
    PLACE_ORDER: api('order/placeOrder'),
    GET_USER_ORDER: api('order/getUserOrders'),
    GET_A_SINLGE_ORDER: api('order/getOrderById')
}


// API configuration for axios requests
export const API_CONFIG = {
    withCredentials: true, // Required for httpOnly cookies
    headers: {
        'Content-Type': 'application/json'
    }
}

export const apiClient = axios.create(API_CONFIG)


/**
 * Helper function to makem api requests
 */
export const apiRequest = async(url, options = {}) => {
    const {method = 'GET', body, headers, ...rest} = options 

    const config = {
        url,
        method,
        headers: {
            ...API_CONFIG.headers,
            ...headers

        },
        ...rest
    }

    if (body !== undefined) {
        config.data = typeof body === 'string' ? JSON.parse(body) : body
    }

    try {
        const response = await apiClient.request(config)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const message = error.response.data?.message || `HTTP error! status:${error.response.status}`
                throw new Error(message)
            }

            if (error.request) {
                throw new Error('Unable to connect to server. Please make sure that the backend server is running on the required port.')
            }
        }

        throw error
    }
}