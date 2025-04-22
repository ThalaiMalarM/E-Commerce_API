const express = require("express");
const { addToCart, getCart, updateCartQuantity, removeFromCart } = require("../controllers/cartController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const Cart = require("../models/Cart");
const router = express.Router();

router.post("/cart", authMiddleware, addToCart);
router.get("/cart/:id", authMiddleware, getCart);
router.put("/cart/update/:id", authMiddleware, updateCartQuantity);
router.delete("/cart/delete/:id", authMiddleware, removeFromCart);

module.exports = router;
