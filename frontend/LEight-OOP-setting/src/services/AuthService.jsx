import apiRequest from "../config/api"

export const loginUser = async (email, password) => {
    try {
        const users = await apiRequest ('/users')
        const user = users.find(u => u.email === email)

    if (user && user.password === password) {
        return {success: true, user}
    }
    throw new Error ('Invalid credentials')
    } catch (error) {
        throw new Error (error.message || 'Login failed')
    }
}

export const registerUser = async (name, email, password) => {
    try {
        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            isAdmin: false,
            createdAt: new Date().toISOString()
        }
        return await apiRequest ('/user', {
            method: 'POST',
            body: JSON.stringify(newUser)
        })
    } catch (error) {
        throw new Error(error.message || 'Registration Failed')
    }
}

export const verifyToken = async (token) => {
    return {valid: true}
}