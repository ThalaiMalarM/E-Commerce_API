const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const userRegisterSchemaZod = require("../validations/userValidation");
const { register } = require("../controllers/authController");

router.post("/register", validate(userRegisterSchemaZod), register);

module.exports = router;