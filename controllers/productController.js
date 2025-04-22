const express = require("express");
const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
    try{
        const { title, description, price, category, stock } = req.body;
        const product = new Product({
            title,
            description,
            price,
            category,
            stock,
        });
        await product.save();
        res.status(201).json({message: "Product created successfully", product});
    }
    catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }
};

exports.getAllProducts = async (req, res) => {
    try{
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    }
    catch(error){
        res.status(500).json({message: "Server Error"});
    }
};

exports.getProductById = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({message: "Product not found"});
        res.status(200).json(product);
    }
    catch{
        res.status(500).json({message: "Server Error"})
    }
};

exports.updateProduct = async (req, res) => {
    try{
        const updatedData = req.body;
        const product = await Product.findByIdAndUpdate(req.params.id, updatedData, {
            new: true,
            runValidators: true,
        });
        if (!product) return res.status(404).json({message: "Produt not found"});
        res.status(200).json({message: "Product updated successfully", product});
    }
    catch(error){
        res.status(500).json({message: "Server Error"});
    }
};

exports.deleteProduct = async (req, res) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({message: "Product not found"});
        res.status(200).json({message: "Product deleted successfully", product});
    }
    catch(error){
        res.status(500).json({message: "Server Error"});
    }
};