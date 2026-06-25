import { apiRequest, USER_ENDPOINTS } from "../config/api";
import { transformUserData } from "./AuthService";


/**
 * Get current user profile
 * @returns User data or null if not authenticated
 */

const getUser = async() => {
    if (typeof window === undefined) {
        return null
    }

    try {
        const userData = await apiRequest(USER_ENDPOINTS.USER_PROFILE, {
            method: "GET"
        })

        return transformUserData(userData)
    } catch (error) {
        return null
    }
}

/**
 * Check login status
 * @return True if logged in, false otherwise
 */

const checkLoginStatus = async() => {
    if (typeof window === undefined) {
        return null
    }

    try {
        const status = await apiRequest(USER_ENDPOINTS.LOGIN_STATUS, {
            method: "GET"
        })

        return Boolean(status)
    } catch (error) {
        return false
    }
}

const dataService = {
    getUser,
    checkLoginStatus
}

export default dataService