import {apiRequest, ORDER_ENDPOINTS} from "../config/api";

const transformOrderData = (orderData) => {
    return {
        ...orderData,
        id: orderData._id || orderData.id,
        orderId: orderData._id || orderData.orderId,
        amount_paid: orderData.amount_paid || orderData.amountPaid,
        createdAt: orderData.createdAt || orderData.created_at
    }
}

const placeOrder = async (cartItems) => {
    try {
        const orderData = await apiRequest(ORDER_ENDPOINTS.PLACE_ORDER, {
            method: "POST",
            body: JSON.stringify({})
        })

        return transformOrderData(orderData)
    } catch (error) {
        throw new Error(error.message || "Failed to place order")
    }
}

const getUserOrder = async () => {
    try {
        const orders = await apiRequest(ORDER_ENDPOINTS.GET_USER_ORDER, {
            method: "GET"
        })

        return orders.map(transformOrderData)
    } catch (error) {
        if (error.message.includes("not found") || error.message.includes("No Order")) {
            return []
        }

        throw new Error(error.message || "Failed to fetch orders")
    }
}

const getOrderById = async (orderId) => {
    if (!orderId) {
        throw new Error("Order id is required")
    }

    try {
        const orderData = await apiRequest(ORDER_ENDPOINTS.GET_A_SINLGE_ORDER(orderId), {
            method: "GET"
        })

        return transformOrderData(orderData)
    } catch (error) {
        throw new Error(error.message || "Order not found")
    }
}

const orderService = {
    placeOrder,
    getUserOrder,
    getOrderById
}

export default orderService