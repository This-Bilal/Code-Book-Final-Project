const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, "Please, input your password."],
            trim: true
        },
        cartList: {
            type: Array
        },
        orderList: {
            type: Array
        },
        isAdmin: {
            type: Boolean
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("User", userSchema)