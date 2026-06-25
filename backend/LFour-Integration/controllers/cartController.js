const Cart = require("../models/cartModel");
const asyncHandler = require("express-async-handler");
const Ebook = require("../models/ebookModel");

// To add to cart
const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { id } = req.body;
  const ebookId = Number(id);

  let cart = await Cart.findOne({ userId });
  const ebook = await Ebook.findOne({ id });

  if (!ebook) {
    return res.status(404).json({ mesaasge: "Ebook not found" });
  }

  if (!cart) {
    cart = new Cart({
      userId,
      cartList: [ebook],
    });
  } else {
    const existingCartIndex = cart.cartList.findIndex((item) => item.id === ebookId);

    if (existingCartIndex !== -1) {
      return res.status(400).json({ message: "Ebook already exist" });
    } else {
      cart.cartList.push(ebook);
    }
  }

  const savedCart = await cart.save();

  res.status(200).json(savedCart);
});

// To remove from cart
const removeFromCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { id } = req.body
  const ebookId = Number(id);

  const cart = await Cart.findOne({ userId });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const existingCartIndex = cart.cartList.findIndex((item) => item.id === ebookId);

  if (existingCartIndex === -1) {
    return res.status(404).json({ message: "Ebook not found in the cart" });
  }

  cart.cartList.splice(existingCartIndex, 1);

  const savedCart = await cart.save();
  res.status(200).json(savedCart);
});

// Clearing the  cart
const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ userId });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  cart.cartList = [];

  const clearCart = await cart.save();
  res.status(200).json(clearCart);
});

// Get user cart
const getUserCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const cart = await Cart.findOne({ userId });

  // If cart doesn't exist, return empty cart instead of 404
  if (!cart) {
    return res.status(200).json({
      userId: userId,
      cartList: [],
    });
  }

  res.status(200).json(cart);
});

module.exports = {
  addToCart,
  removeFromCart,
  clearCart,
  getUserCart,
};
