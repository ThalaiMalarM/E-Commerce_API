const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/productController");

router.post("/product", authMiddleware, isAdmin, addProduct); // Create a product
router.get("/products", authMiddleware, isAdmin, getAllProducts); //Get products
router.get("/products/:id", authMiddleware, isAdmin, getProductById); //Get product by product ID
router.put("/products/:id", authMiddleware, isAdmin, updateProduct); //Update a Product by ID
router.delete("/products/:id", authMiddleware, isAdmin, deleteProduct); //Delete a Product by ID

module.exports = router;

