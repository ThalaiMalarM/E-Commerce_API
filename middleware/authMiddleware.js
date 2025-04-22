const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "No Token, Authorization denied" });
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        if (!req.user) return res.status(401).json({message: "User not found"});
        next();
    }
    catch(error){
        return res.status(401).json({message: "Invalid token"});
    }
};

const isAdmin = async (req, res, next) => {
    if (req.user.role !== "admin") return res.status(403).json({message: "Access Denied"});
    next();
};

module.exports = { authMiddleware, isAdmin };