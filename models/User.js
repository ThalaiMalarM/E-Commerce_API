const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: [true, "Please provide your full name"],
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "Please provide your email"],
    },
    phone: {
        type: String,
        unique: true,
        required: [true, "Please provide the phone number"],
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    password: {
        type: String,
        required: [true, "Please provide the password"],
    },
}, { timestamps: true },
);

userSchema.pre("save", async function (next){
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);