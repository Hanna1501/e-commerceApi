const express = require("express");
const { loginUser, signUpUser } = require("../controllers/authController");
const router = express.Router();

router.post("/signUp", signUpUser);

router.post("/login", loginUser);

module.exports = router;