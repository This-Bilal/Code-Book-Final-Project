import apiRequest from "../config/api";

export const saveCart = async (email, cartData) => {
    try {
        return await apiRequest ('/carts', {
            method: 'POST',
            body: JSON.stringify({
                items: cartData.cartList,
                total: cartData.total,
                updatedAt: new Date().toISOString()
            })
        })
    } catch (error) {
        console.error('Failed to save to cart', error)
        throw error
    }
}

export const getCart = async (email) => {
    try {
        const carts = await apiRequest(`/carts?email=${email}`)
        return carts[0] || null
    } catch (error) {
        console.error('Faile to retrieve cart:', error)
        throw error
    }
}