const Cart = require('../models/cartModel')
const Order = require('../models/orderModel')
const asyncHandler = require('express-async-handler')

const placeOrder = asyncHandler(async (req, res) => {
    const user = req.user

    const cart = await Cart.findOne({userId: user._id})

    if (!cart || cart.cartList.length === 0) {
        return res.status(404).json({message: 'Your cart is Empty'})
    }

    const cartList = cart.cartList
    const quantity = cartList.length
    const amount_paid = cartList.reduce((acc, item) => acc + item.price, 0)

    const newOrder = new Order({
        user: {
            name: user.name,
            email:user.email,
            id: user._id
        },
        quantity,
        cartList,
        amount_paid
    })

    const savedOrder = await newOrder.save()
    cart.cartList = []
    await cart.save()

    res.status(201).json(savedOrder)
})

const getUserOrders = asyncHandler(async (req, res) => {
    const userId = req.user._id
    const orders = await Order.find({"user.id": userId})

    if (!orders || orders.length === 0) {
        return res.status(404).json({message: 'No order found'})
    }

    res.status(200).json(orders)
})

const getOrderById = asyncHandler(async (req, res) => {
    const orderId = req.params.id
    const userId = req.user._id

    const order = await Order.findById(orderId)

    if (!order) {
        return res.status(404).json({message: 'Order not found'})
    }

    if (order.user.id.toString() !== userId.toString()) {
        return res.status(401).json({message: 'you are not authorized to view this order'})
    }

    res.status(200).json(order)
})

module.exports = {
    placeOrder,
    getUserOrders,
    getOrderById
}