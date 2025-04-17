require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
connectDB();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is connected on ${PORT}`);
});