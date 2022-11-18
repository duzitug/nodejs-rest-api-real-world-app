const express = require("express");
const router = express.Router();

const { signUp, signIn } = require("../controller/User.controller.js");

// Register
router.post("/", signUp);

// Login
router.post("/login", signIn);

module.exports = router;
