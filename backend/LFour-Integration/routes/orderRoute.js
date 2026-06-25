const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const { placeOrder, getUserOrders, getOrderById } = require('../controllers/orderController')
const router = express.Router()

router.post('/placeOrder', protect, placeOrder)
router.get('/getUserOrders', protect, getUserOrders)
router.get('/getOrderById/:id', protect, getOrderById)

module.exports = router