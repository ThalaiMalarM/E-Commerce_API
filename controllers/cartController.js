const Cart = require("../models/Cart");
const User = require("../models/User");
const Product = require("../models/Product");

exports.addToCart = async (req, res) => {
    try{
        const userId = req.user._id;
        const { productId, quantity } = req.body;
        if (!productId || typeof quantity === 'number') return res.status(403).json({message: "Product ID and quantity are invalid"});
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({userId, products: []});
        }
        const existingItem = cart.products.find(product=>product.product.toString()===productId);
        if (existingItem) existingItem.quantity += parseInt(quantity);
        else {
            cart.products.push({product: productId, quantity});
        }
        await cart.save();
        return res.status(200).json({message: "Product added successfully"});
    }
    catch(error){
        res.status(500).json({message: "Server Error"});
    }
};

exports.getCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ userId })
            .populate("products.productId", "name price")
            .populate("userId", "name email");
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        return res.status(200).json({ cart });
    }
    catch (error) {
        console.error("Get Cart Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.updateCartQuantity = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId, quantity } = req.body;

        if (!productId || typeof quantity !== "number") {
            return res.status(400).json({ message: "Product ID and valid quantity are required" });
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const productInCart = cart.products.find(item => item.productId?.toString() === productId.toString());

        if (!productInCart) return res.status(404).json({ message: "Product not found in cart" });

        productInCart.quantity = quantity;
        await cart.save();
        return res.status(200).json({ message: "Cart updated successfully", cart });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.body;
        if (!productId) return res.status(404).json({ message: "Product not found" });
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        const initialLength = cart.products.length;
        cart.products = cart.products.filter((item) => item.productId?.toString() !== productId.toString());
        if (cart.products.length === initialLength) return res.status(404).json({ message: "Product was not found in cart" });
        await cart.save();
        res.status(200).json({ message: "Product removed successfully" });
    }

    catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
};