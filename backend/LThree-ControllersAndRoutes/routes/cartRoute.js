const express = require('express')
const { addToCart, clearCart, getUserCart, removeFromCart } = require('../controllers/cartController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/addToCart', protect, addToCart)
router.delete('/removeFromCart', protect, removeFromCart)
router.delete('/clearCart', protect, clearCart)
router.get('/getUserCart', protect, getUserCart)

module.exports = router