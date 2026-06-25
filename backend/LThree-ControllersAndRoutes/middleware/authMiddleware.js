const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const adminProtect = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.token
    if (!token) {
        res.status(401)
        throw new Error('Not Authorized, no token')
    }

    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    const user = await User.findById(decoded.id).select("-password")

    if (!user) {
        res.status(400)
        throw new Error("User not found")
    }

    if (!user.isAdmin) {
        res.status(403)
        throw new Error("Access denied: not an admin")
    }

    req.user = user
    next()
})

const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.token

    if (!token) {
        res.status(401)
        throw new Error("Not Authorized, No token")
    }

    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    const user = await User.findById(decoded.id).select("-password")

    if (!user) {
        res.status(404)
        throw new Error("User not found")
    }

    req.user = user
    next()
}) 

module.exports = {
    adminProtect,
    protect
}