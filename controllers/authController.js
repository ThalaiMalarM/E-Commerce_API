const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (user) => {
    return jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, { expiresIn: "7d" });
};

exports.register = async (req, res) => {
    try{
        const { full_name, email, phone, role, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({message: "User already exists"});
        const user = await User.create({ full_name, email, phone, role, password });
        const token = generateToken(user);
        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {id: user._id, full_name: user.full_name, email: user.email, phone: user.phone, role: user.role}
        });
    }
    catch(error){
        res.status(500).json({message: "Server error"});
    }
};