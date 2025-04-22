const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const {userRegisterSchemaZod, userLoginSchemaZod} = require("../validations/userValidation");
const { register, login } = require("../controllers/authController");

router.post("/register", validate(userRegisterSchemaZod), register);
router.post("/login", validate(userLoginSchemaZod), login);

module.exports = router;