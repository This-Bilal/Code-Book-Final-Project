import {apiRequest, USER_ENDPOINTS} from "../config/api"

// Store user email in localstorage for quick access
const persistEmail = (email) => {
    if (typeof window === 'undefined') {
        return;
    }
    window.localStorage.setItem('email', JSON.stringify(email))
    window.localStorage.setItem('user', JSON.stringify(email))
}

// Clear user email from local storage
const clearPersistence = () => {
    if (typeof window === 'undefined') {
        return;
    }
    window.localStorage.removeItem('email')
    window.localStorage.removeItem('user')
}

// normalise email
const normaliseEmail = (email = '') => email.trim().toLocaleLowerCase()

// transform user data to match the frontend format
export const transformUserData = (userData) => {
    return {
        id: userData._id,
        _id: userData._id,
        name: userData.name,
        isAdmin: Boolean(userData.isAdmin),
        email: userData.email,
        cartList: userData.cartList || [],
        orderList: userData.orderList || []
    }
}

/**
 * Login User
 * @param {email, password}
 * @returns User data
 */


export const loginUser = async (authDetail) => {
    const {email, password} = authDetail

    if (!email || !password) {
        throw new Error('Email and password are required')
    }

    try {
        const userData = await apiRequest(USER_ENDPOINTS.LOGIN, {
            method: "POST",
            body: JSON.stringify({
                email: normaliseEmail(email),
                password
            })
        })

        const transFormedUser = transformUserData(userData)
        persistEmail(transFormedUser.email)

        return transFormedUser
    } catch (error) {
        throw new Error (error.message || 'Invalid email or password')
    }
}


/**
 * Register User
 * @param {name, email, password}
 * @returns User data
 */
export const registerUser = async (authDetail) => {
    const {email, password, name} = authDetail

    if (!name || !password || !email) {
        throw new Error("All fields are required")
    }

    try {
        const userData = await apiRequest(USER_ENDPOINTS.REGISTER_USER, {
            method: "POST",
            body: JSON.stringify({
                email: normaliseEmail(email),
                password,
                name: name.trim()
            })
        })

        const transFormedUser = transformUserData(userData)
        persistEmail(transFormedUser.email)

        return transFormedUser
    } catch (error) {
        throw new Error(error.message || "Registration failed")
    }
}


/**
 * Logout
 * @returns Boolean
 */
const logout = async () => {
    try {
        await apiRequest(USER_ENDPOINTS.LOGOUT, {
            method: "POST"
        })
        clearPersistence()
        return true

    } catch (error) {
        // even if the request fails, clear the localstorage
        clearPersistence()
        throw new Error(error.message || "Logout failed")
    }
}


const authService = {
    loginUser, registerUser, logout
}

export default authService